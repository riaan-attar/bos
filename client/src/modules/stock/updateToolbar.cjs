const fs = require('fs');
const path = require('path');

const newToolbar = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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
      </div>`;

const regex = /<div style=\{\{\s*display:\s*'flex',\s*justifyContent:\s*'space-between',\s*alignItems:\s*'center',\s*marginBottom:\s*'16px'\s*\}\}>\s*<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'8px'\s*\}\}>\s*<button style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'6px',\s*padding:\s*'6px 12px',\s*background:\s*'var\(--card-bg, #ffffff\)',\s*border:\s*'1px solid var\(--border-color, #e5e7eb\)',\s*borderRadius:\s*'6px',\s*fontSize:\s*'13px',\s*color:\s*'var\(--text-secondary, #6b7280\)',\s*cursor:\s*'pointer'\s*\}\}>\s*<List size=\{14\}\s*\/> List View\s*<\/button>\s*<\/div>\s*<\/div>/g;

const filesToUpdate = [
  'DeliveryNote.jsx',
  'MaterialRequest.jsx',
  'PickList.jsx',
  'PurchaseReceipt.jsx',
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
  
  if (regex.test(content)) {
    content = content.replace(regex, newToolbar);
    fs.writeFileSync(fullPath, content);
    console.log('Updated ' + relPath);
  } else {
    console.log('No match found in ' + relPath);
  }
}
