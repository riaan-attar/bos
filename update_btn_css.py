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

for rel in files:
    path = os.path.join(base_dir, rel)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace the style block for the add button specifically
    # The current one looks like this:
    # style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '7px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
    # onMouseOver={(e) => e.currentTarget.style.background = '#1a1a1a'}
    # onMouseOut={(e) => e.currentTarget.style.background = '#111111'}
    # >
    #   <Plus size={14} color="#ffffff" />
    
    pattern = r"style=\{\{\s*background:\s*'#111111',\s*color:\s*'#ffffff',\s*border:\s*'none',\s*borderRadius:\s*'6px',\s*padding:\s*'7px 16px',\s*fontSize:\s*'13px',\s*fontWeight:\s*500,\s*cursor:\s*'pointer',\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'6px'\s*\}\}\s*onMouseOver=\{\(e\)\s*=>\s*e\.currentTarget\.style\.background\s*=\s*'#1a1a1a'\}\s*onMouseOut=\{\(e\)\s*=>\s*e\.currentTarget\.style\.background\s*=\s*'#111111'\}\s*>\s*<Plus\s*size=\{14\}\s*color=\"#ffffff\"\s*/>"
    
    replacement = r"""style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <Plus size={14} color="#111111" />"""
          
    content = re.sub(pattern, replacement, content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated button styles!')
