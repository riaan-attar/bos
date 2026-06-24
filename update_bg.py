import os

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
    
    content = content.replace("background: '#000000'", "background: '#111111'")
    content = content.replace("e.currentTarget.style.background = '#000000'", "e.currentTarget.style.background = '#111111'")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated backgrounds!')
