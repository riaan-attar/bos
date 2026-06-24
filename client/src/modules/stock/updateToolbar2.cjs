const fs = require('fs');
const path = require('path');

const newToolbar = `      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <List size={14} /> List View
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <MoreHorizontal size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <RefreshCw size={14} />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <Filter size={14} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <ArrowUpDown size={14} /> Sort
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <Columns size={14} />
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>`;

const filesToUpdate = [
  'setup/Item.jsx',
  'setup/ItemGroup.jsx',
  'setup/UnitOfMeasure.jsx',
  'setup/Warehouse.jsx',
  'tools/Batch.jsx',
  'tools/QualityInspection.jsx',
  'tools/SerialNo.jsx'
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(__dirname, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace table div start to insert toolbar before it
  content = content.replace(
    /      <div style=\{\{ backgroundColor: 'var\(--card-bg, #ffffff\)', border: '1px solid var\(--border-color, #e5e7eb\)', borderRadius: '8px', overflow: 'hidden' \}\}>/g,
    newToolbar
  );

  // Update lucide-react imports
  // Find current lucide-react import
  const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+'lucide-react';/);
  if (importMatch) {
    let imports = importMatch[1].split(',').map(s => s.trim());
    const requiredImports = ['List', 'MoreHorizontal', 'RefreshCw', 'Filter', 'ArrowUpDown', 'Columns'];
    for (const req of requiredImports) {
      if (!imports.includes(req)) {
        imports.push(req);
      }
    }
    const newImportStr = "import { " + imports.join(', ') + " } from 'lucide-react';";
    content = content.replace(importMatch[0], newImportStr);
  }

  fs.writeFileSync(fullPath, content);
  console.log('Updated ' + relPath);
}
