#!/bin/bash

# Exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper for showing usage
usage() {
    echo -e "${RED}Error: VPS Domain or IP is required.${NC}"
    echo -e "Usage: $0 {vps_domain_or_ip}"
    echo -e "Example: $0 example.com"
    echo -e "Example: $0 192.168.1.100"
    exit 1
}

# Check if argument is provided
if [ -z "$1" ]; then
    usage
fi

DOMAIN=$1

# Strip http:// or https:// prefix if user included it
CLEAN_DOMAIN=$(echo "$DOMAIN" | sed -e 's|^[^/]*//||' -e 's|/.*$||')

# Determine protocol (HTTPS for domains, HTTP for bare IPs)
if [[ "$CLEAN_DOMAIN" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    PROTOCOL="http"
else
    PROTOCOL="https"
fi

API_URL="${PROTOCOL}://${CLEAN_DOMAIN}"

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}Starting Business Operating System (BOS) VPS Setup  ${NC}"
echo -e "${BLUE}Target Domain/IP: ${CLEAN_DOMAIN}${NC}"
echo -e "${BLUE}API URL: ${API_URL}${NC}"
echo -e "${BLUE}====================================================${NC}"

# 1. System checks: Node.js and npm
echo -e "\n${BLUE}[1/6] Checking system dependencies...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Attempting to install Node.js...${NC}"
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y curl
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo -e "${RED}Error: apt-get not found. Please install Node.js (v18+) and npm manually, then rerun this script.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}Node.js version $(node -v) is installed.${NC}"
fi

# Check for pm2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 is not installed. Installing PM2 globally...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}PM2 is installed.${NC}"
fi

# Check/Install Caddy
if ! command -v caddy &> /dev/null; then
    echo -e "${YELLOW}Caddy is not installed. Installing Caddy from official repo...${NC}"
    if command -v apt-get &> /dev/null; then
        sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
        curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
        sudo apt-get update
        sudo apt-get install -y caddy
        echo -e "${GREEN}Caddy installed successfully.${NC}"
    else
        echo -e "${RED}Error: apt-get not found. Please install Caddy manually, then rerun this script.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}Caddy version $(caddy version) is installed.${NC}"
fi

# 2. Setup environment files
echo -e "\n${BLUE}[2/6] Configuring environment variables...${NC}"
# Client env config (API URL has no port because Caddy reverse proxies it on port 80/443)
echo -e "Updating client/.env..."
cat <<EOF > client/.env
# Vite Client Configuration
VITE_API_URL=${API_URL}
PORT=5173
EOF
echo -e "${GREEN}client/.env updated successfully.${NC}"

# Server env config
if [ ! -f server/.env ]; then
    echo -e "${YELLOW}server/.env not found. Copying from server/.env.example...${NC}"
    cp server/.env.example server/.env
    echo -e "${YELLOW}Please update server/.env with your production database credentials!${NC}"
else
    echo -e "${GREEN}server/.env already exists.${NC}"
fi

# 3. Install project dependencies
echo -e "\n${BLUE}[3/6] Installing project dependencies...${NC}"
echo -e "Installing root packages..."
npm install

echo -e "Installing client packages..."
cd client && npm install && cd ..

echo -e "Installing server packages..."
cd server && npm install && cd ..

# 4. Build frontend client
echo -e "\n${BLUE}[4/6] Building client...${NC}"
cd client && npm run build && cd ..
echo -e "${GREEN}Client built successfully.${NC}"

# 5. Deploy build files to web directory (avoids root permission issues)
echo -e "\n${BLUE}[5/6] Deploying frontend assets to web root...${NC}"
sudo mkdir -p /var/www/bos
sudo rm -rf /var/www/bos/client
sudo mkdir -p /var/www/bos/client
sudo cp -r client/dist /var/www/bos/client/

# Give Caddy read permissions
if id "caddy" &>/dev/null; then
    sudo chown -R caddy:caddy /var/www/bos
fi
echo -e "${GREEN}Assets deployed to /var/www/bos/client/dist${NC}"

# 6. Configure and run Caddy and PM2
echo -e "\n${BLUE}[6/6] Launching web server and backend...${NC}"

# Backup original Caddyfile if not already backed up
if [ -f /etc/caddy/Caddyfile ] && [ ! -f /etc/caddy/Caddyfile.bak ]; then
    echo -e "Backing up original Caddyfile..."
    sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak
fi

# Write Caddyfile configuration
echo -e "Writing /etc/caddy/Caddyfile..."
sudo tee /etc/caddy/Caddyfile > /dev/null <<EOF
${CLEAN_DOMAIN} {
    # Enable gzip compression
    encode gzip

    # Proxy API requests to backend
    handle /api/* {
        reverse_proxy localhost:5000
    }

    # Proxy Socket.io connections to backend
    handle /socket.io/* {
        reverse_proxy localhost:5000
    }

    # Serve the built React static client files
    handle {
        root * /var/www/bos/client/dist
        file_server
        try_files {path} /index.html
    }
}
EOF

# Reload Caddy config
if command -v systemctl &> /dev/null; then
    echo -e "Reloading Caddy service..."
    sudo systemctl reload caddy || sudo systemctl restart caddy
else
    echo -e "${YELLOW}systemctl not found. Reloading Caddy directly...${NC}"
    caddy reload --config /etc/caddy/Caddyfile || true
fi

# Start/Reload Backend Server using PM2
if pm2 show bos-server > /dev/null 2>&1; then
    echo -e "Reloading bos-server..."
    pm2 reload bos-server --update-env
else
    echo -e "Starting bos-server..."
    pm2 start server/server.js --name "bos-server"
fi

# Save PM2 process list
pm2 save

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}BOS VPS Setup via Caddy Completed Successfully!      ${NC}"
echo -e "${GREEN}====================================================${NC}"
echo -e "Application is now online at: ${API_URL}"
echo -e "===================================================="
echo -e "PM2 Status (Backend):"
pm2 status

echo -e "\n${YELLOW}To make PM2 start on system boot, run:${NC}"
echo -e "${BLUE}pm2 startup${NC}"
echo -e "${YELLOW}And run the command it outputs to enable boot startup.${NC}"
