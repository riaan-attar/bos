# Workspace Rules and UI Guidelines

## Styling Forms and Input Backgrounds (Light Theme Overrides)
This project is built using a dark-mode codebase structure, but is rendered in a light theme using global overrides located in `client/src/styles/globals.css`. 

* **Rule**: All input fields and textareas should be styled with background color `#141414` (or `rgb(20, 20, 20)`) and text color `#f8f8f8` when writing inline React styles.
* **Explanation**: The stylesheet `globals.css` intercepts inline styles of `#141414` and overrides them with a white background (`#ffffff` with `!important`) and text color to dark grey/black (`#1a1a1a`). 
* **Prevention**: Avoid using custom dark background colors for inputs or panels that are not mapped in `globals.css`, as they will not be overridden and will display as illegible black boxes.

## Consistent Theme Variables usage
To ensure that all pages (lists, details, filter bars) look completely consistent and adapt correctly to overrides:
- Always use CSS variables for element backgrounds and borders rather than hardcoding dark mode hex codes (like `#0f0f0f` or `#141414`) for layout containers.
- Standard variables to use:
  - Page container background: `var(--bg-color, #ffffff)`
  - Page container text: `var(--text-color, #1a1a1a)`
  - Inputs & Dropdown background: `var(--control-bg, #ffffff)`
  - Border color: `var(--border-color, #e5e7eb)`
  - Muted text color: `var(--text-muted, #6b7280)`
  - Default buttons: `var(--btn-default-bg, #f3f4f6)`
- Active sidebar items must render with a border using `#1a1a1a` to ensure outline consistency.
