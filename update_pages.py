import os
import re

files = [
  'client/src/modules/stock/StockEntry.jsx',
  'client/src/modules/stock/PurchaseReceipt.jsx',
  'client/src/modules/stock/DeliveryNote.jsx',
  'client/src/modules/stock/MaterialRequest.jsx',
  'client/src/modules/stock/PickList.jsx',
  'client/src/modules/stock/setup/Warehouse.jsx',
  'client/src/modules/stock/setup/Item.jsx',
  'client/src/modules/stock/setup/ItemGroup.jsx',
  'client/src/modules/stock/setup/UnitOfMeasure.jsx',
  'client/src/modules/stock/tools/SerialNo.jsx',
  'client/src/modules/stock/tools/Batch.jsx',
  'client/src/modules/stock/tools/QualityInspection.jsx'
]

base_dir = r"c:\Users\arpita\.gemini\antigravity-ide\scratch\bos"

labels = {
  'StockEntry.jsx': '+ Add Stock Entry',
  'PurchaseReceipt.jsx': '+ Add Purchase Receipt',
  'DeliveryNote.jsx': '+ Add Delivery Note',
  'MaterialRequest.jsx': '+ Add Material Request',
  'PickList.jsx': '+ Add Pick List',
  'Warehouse.jsx': '+ Add Warehouse',
  'Item.jsx': '+ Add Item',
  'ItemGroup.jsx': '+ Add Item Group',
  'UnitOfMeasure.jsx': '+ Add UOM',
  'SerialNo.jsx': '+ Add Serial No',
  'Batch.jsx': '+ Add Batch',
  'QualityInspection.jsx': '+ Add Inspection'
}

titles = {
  'StockEntry.jsx': 'Stock Entry',
  'PurchaseReceipt.jsx': 'Purchase Receipt',
  'DeliveryNote.jsx': 'Delivery Note',
  'MaterialRequest.jsx': 'Material Request',
  'PickList.jsx': 'Pick List',
  'Warehouse.jsx': 'Warehouse',
  'Item.jsx': 'Item',
  'ItemGroup.jsx': 'Item Group',
  'UnitOfMeasure.jsx': 'Unit of Measure',
  'SerialNo.jsx': 'Serial No',
  'Batch.jsx': 'Batch',
  'QualityInspection.jsx': 'Quality Inspection'
}

for rel_path in files:
    path = os.path.join(base_dir, rel_path)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(rel_path)
    button_text = labels[filename]
    title_text = titles[filename]

    def repl_import(m):
        inner = m.group(1)
        inner = re.sub(r'\bList\b', 'LayoutList', inner)
        if 'LayoutList' not in inner:
            inner += ', LayoutList'
        return 'import {' + inner + "} from 'lucide-react';"

    content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];', repl_import, content)

    header_toolbar_pattern = r"(<div style=\{\{\s*display:\s*'flex',\s*justifyContent:\s*'space-between',\s*alignItems:\s*'center',\s*marginBottom:\s*'24px'\s*\}\}>.*?)(<div style=\{\{\s*backgroundColor:\s*'var\(--card-bg,\s*#ffffff\)',\s*border:\s*'1px solid var\(--border-color,\s*#e5e7eb\)',\s*borderRadius:\s*'8px',\s*overflow:\s*'hidden'\s*\}\}>)"
    
    replacement = f"""<div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}}}>
        <h1 style={{{{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}}}>{title_text}</h1>
        <button 
          onClick={{() => setShowModal(true)}}
          style={{{{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '7px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}}}
          onMouseOver={{(e) => e.currentTarget.style.background = '#1a1a1a'}}
          onMouseOut={{(e) => e.currentTarget.style.background = '#000000'}}
        >
          <Plus size={{14}} color="#ffffff" /> {button_text}
        </button>
      </div>

      <div style={{{{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}}}>
        <button style={{{{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}}}>
          <LayoutList size={{13}} color="#6b7280" /> List View
        </button>
        <button style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}}}>
          <MoreHorizontal size={{13}} color="#6b7280" />
        </button>
        
        <div style={{{{ display: 'flex', gap: '8px', marginLeft: 'auto' }}}}>
          <button style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}}}>
            <RefreshCw size={{13}} color="#6b7280" />
          </button>
          <button style={{{{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}}}>
            <Filter size={{13}} /> Filter
          </button>
          <button style={{{{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}}}>
            <ArrowUpDown size={{13}} /> Sort
          </button>
          <button style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}}}>
            <Columns size={{13}} color="#6b7280" />
          </button>
          <button style={{{{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}}}>
            <MoreHorizontal size={{13}} color="#6b7280" />
          </button>
        </div>
      </div>

      \\2"""

    new_content = re.sub(header_toolbar_pattern, replacement, content, flags=re.DOTALL)
    
    new_content = new_content.replace('isModalOpen', 'showModal')
    new_content = new_content.replace('setIsModalOpen', 'setShowModal')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'Processed {{filename}}')
