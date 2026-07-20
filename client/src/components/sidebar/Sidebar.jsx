import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SidebarBrand from './SidebarBrand';
import SidebarNavItem from './SidebarNavItem';
import SidebarFooter from './SidebarFooter';
import { SIDEBAR_CONFIG, PROJECTS_SIDEBAR_CONFIG, STOCK_SIDEBAR_CONFIG, PAYMENTS_SIDEBAR_CONFIG, INVOICING_SIDEBAR_CONFIG } from './sidebar.config';

function SidebarSectionLabel({ label, isOpen, onToggle, isCollapsed }) {
  if (isCollapsed) return null;

  return (
    <div
      onClick={onToggle}
      style={{
        padding: '10px 16px 4px',
        fontSize: '11px',
        fontWeight: 500,
        color: '#383838',
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {isOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
      {label}
    </div>
  );
}

export default function Sidebar({ isCollapsed, setIsCollapsed, onOpenNotifications }) {
  const location = useLocation();
  const isProjects = location.pathname.startsWith('/projects');
  const isStock = location.pathname.startsWith('/stock');

  const [crmOpen, setCrmOpen] = useState(true);
  const [publicViewsOpen, setPublicViewsOpen] = useState(true);
  const [pinnedViewsOpen, setPinnedViewsOpen] = useState(true);

  // Projects collapsible states
  const [erpOpen, setErpOpen] = useState(true);
  const [setupOpen, setSetupOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(true);

  // Stock collapsible states
  const [stockErpOpen, setStockErpOpen] = useState(true);
  const [stockToolsOpen, setStockToolsOpen] = useState(true);
  const [stockSetupOpen, setStockSetupOpen] = useState(true);
  const [stockReportsOpen, setStockReportsOpen] = useState(true);

  // Payments collapsible states
  const [paymentsErpOpen, setPaymentsErpOpen] = useState(true);
  const [paymentsReportsOpen, setPaymentsReportsOpen] = useState(true);

  const isPayments = location.pathname.startsWith('/payments');

  // Invoicing collapsible states
  const [invReceivablesOpen, setInvReceivablesOpen] = useState(true);
  const [invPayablesOpen, setInvPayablesOpen] = useState(true);
  const [invPaymentsOpen, setInvPaymentsOpen] = useState(true);
  const [invReportsOpen, setInvReportsOpen] = useState(true);

  const isInvoicing = location.pathname.startsWith('/invoicing');

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isCollapsed ? '48px' : '220px',
        minWidth: isCollapsed ? '48px' : '220px',
        height: '100vh',
        background: '#0f0f0f',
        borderRight: '1px solid #1c1c1c',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'width 0.2s ease, min-width 0.2s ease',
        zIndex: 40,
      }}
    >
      <SidebarBrand
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(prev => !prev)}
      />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '4px 0',
        }}
      >
        {isProjects ? (
          // ─── PROJECTS SIDEBAR ──────────────────────────────────────────────
          <>
            {/* Search (if present in config, but rendered as NavLink) */}
            {PROJECTS_SIDEBAR_CONFIG.main.filter(item => item.key === 'search').map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}

            {/* Notifications outside setup/reports collapsible folder */}
            {PROJECTS_SIDEBAR_CONFIG.main.filter(item => item.key === 'notifications').map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
                onClick={onOpenNotifications}
              />
            ))}

            {/* ERP Group Accordion */}
            <SidebarSectionLabel
              label="ERP"
              isOpen={erpOpen}
              onToggle={() => setErpOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: erpOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {PROJECTS_SIDEBAR_CONFIG.erp.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            {/* Setup Group Accordion */}
            <SidebarSectionLabel
              label="Setup"
              isOpen={setupOpen}
              onToggle={() => setSetupOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: setupOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {PROJECTS_SIDEBAR_CONFIG.setup.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            {/* Reports Group Accordion */}
            <SidebarSectionLabel
              label="Reports"
              isOpen={reportsOpen}
              onToggle={() => setReportsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: reportsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {PROJECTS_SIDEBAR_CONFIG.reports.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            {/* Settings Link */}
            {PROJECTS_SIDEBAR_CONFIG.settings.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}

            {/* Getting Started Link */}
            {PROJECTS_SIDEBAR_CONFIG.footer.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </>
        ) : isStock ? (
          // ─── STOCK SIDEBAR ──────────────────────────────────────────────
          <>
            {STOCK_SIDEBAR_CONFIG.main.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
                onClick={item.key === 'notifications' ? onOpenNotifications : undefined}
              />
            ))}

            <SidebarSectionLabel
              label="Stock"
              isOpen={stockErpOpen}
              onToggle={() => setStockErpOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: stockErpOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {STOCK_SIDEBAR_CONFIG.erp.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            <SidebarSectionLabel
              label="Tools"
              isOpen={stockToolsOpen}
              onToggle={() => setStockToolsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: stockToolsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {STOCK_SIDEBAR_CONFIG.tools.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            <SidebarSectionLabel
              label="Setup"
              isOpen={stockSetupOpen}
              onToggle={() => setStockSetupOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: stockSetupOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {STOCK_SIDEBAR_CONFIG.setup.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            <SidebarSectionLabel
              label="Reports"
              isOpen={stockReportsOpen}
              onToggle={() => setStockReportsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: stockReportsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {STOCK_SIDEBAR_CONFIG.reports.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            {STOCK_SIDEBAR_CONFIG.settings.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}

            {STOCK_SIDEBAR_CONFIG.footer.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </>
        ) : isPayments ? (
          // ─── PAYMENTS SIDEBAR ───────────────────────────────────────────
          <>
            {PAYMENTS_SIDEBAR_CONFIG.main.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}

            <SidebarSectionLabel
              label="Payments"
              isOpen={paymentsErpOpen}
              onToggle={() => setPaymentsErpOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: paymentsErpOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {PAYMENTS_SIDEBAR_CONFIG.payments.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            <SidebarSectionLabel
              label="Reports"
              isOpen={paymentsReportsOpen}
              onToggle={() => setPaymentsReportsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: paymentsReportsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {PAYMENTS_SIDEBAR_CONFIG.reports.map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            {PAYMENTS_SIDEBAR_CONFIG.footer.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </>
        ) : isInvoicing ? (
          // ─── INVOICING SIDEBAR ─────────────────────────────────────────────
          <>
            {INVOICING_SIDEBAR_CONFIG.main.map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
              />
            ))}

            <SidebarSectionLabel
              label="Receivables"
              isOpen={invReceivablesOpen}
              onToggle={() => setInvReceivablesOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div style={{ maxHeight: invReceivablesOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.2s ease' }}>
              {INVOICING_SIDEBAR_CONFIG.receivables.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>

            <SidebarSectionLabel
              label="Payables"
              isOpen={invPayablesOpen}
              onToggle={() => setInvPayablesOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div style={{ maxHeight: invPayablesOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.2s ease' }}>
              {INVOICING_SIDEBAR_CONFIG.payables.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>

            <SidebarSectionLabel
              label="Payments"
              isOpen={invPaymentsOpen}
              onToggle={() => setInvPaymentsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div style={{ maxHeight: invPaymentsOpen ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
              {INVOICING_SIDEBAR_CONFIG.payments.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>

            <SidebarSectionLabel
              label="Reports"
              isOpen={invReportsOpen}
              onToggle={() => setInvReportsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div style={{ maxHeight: invReportsOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.2s ease' }}>
              {INVOICING_SIDEBAR_CONFIG.reports.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>

            {INVOICING_SIDEBAR_CONFIG.settings.map(item => (
              <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
            ))}

            {INVOICING_SIDEBAR_CONFIG.footer.map(item => (
              <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
            ))}
          </>
        ) : (
          // ─── CRM SIDEBAR (DEFAULT) ────────────────────────────────────────
          <>
            {/* Notifications placed outside the CRM collapsible folder */}
            {SIDEBAR_CONFIG.main.filter(item => item.key === 'notifications').map(item => (
              <SidebarNavItem 
                key={item.key} 
                item={item} 
                isCollapsed={isCollapsed} 
                onClick={onOpenNotifications}
              />
            ))}

            <SidebarSectionLabel
              label="CRM"
              isOpen={crmOpen}
              onToggle={() => setCrmOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: crmOpen ? '800px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {SIDEBAR_CONFIG.main.filter(item => item.key !== 'notifications').map(item => (
                <SidebarNavItem 
                  key={item.key} 
                  item={item} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>

            <SidebarSectionLabel
              label="Public Views"
              isOpen={publicViewsOpen}
              onToggle={() => setPublicViewsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: publicViewsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {SIDEBAR_CONFIG.publicViews.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>

            <SidebarSectionLabel
              label="Pinned Views"
              isOpen={pinnedViewsOpen}
              onToggle={() => setPinnedViewsOpen(p => !p)}
              isCollapsed={isCollapsed}
            />
            <div
              style={{
                maxHeight: pinnedViewsOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
            >
              {SIDEBAR_CONFIG.pinnedViews.map(item => (
                <SidebarNavItem key={item.key} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>
          </>
        )}
      </div>

      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
}

