import os, re

base = r"c:\Users\arpita\.gemini\antigravity-ide\scratch\bos\client\src\modules\stock"

patches = {
    "DeliveryNote.jsx": {
        "import_old": "import { MOCK_DELIVERY_NOTES, MOCK_WAREHOUSES } from './stockData';",
        "import_new": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function DeliveryNote() {",
        "hook_line": "  const { deliveryNotes, warehouses, loading, error } = useStock();",
        "data_old": "{MOCK_DELIVERY_NOTES.map((note) => (",
        "data_new": """{loading ? (
              <tr><td colSpan={7} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading\u2026</td></tr>
            ) : error ? (
              <tr><td colSpan={7} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : deliveryNotes.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No delivery notes found.</td></tr>
            ) : deliveryNotes.map((note) => (""",
        "close_old": "            ))}\n          </tbody>",
        "close_new": "            ))}\n            )}\n          </tbody>",
        "wh_old": "{MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
        "wh_new": "{warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
    },
    "MaterialRequest.jsx": {
        "import_old": "import { MOCK_MATERIAL_REQUESTS, MOCK_WAREHOUSES, MOCK_ITEMS } from './stockData';",
        "import_new": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function MaterialRequest() {",
        "hook_line": "  const { materialRequests, warehouses, items, loading, error } = useStock();",
        "data_old": "{MOCK_MATERIAL_REQUESTS.map((req) => (",
        "data_new": """{loading ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading\u2026</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : materialRequests.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No material requests found.</td></tr>
            ) : materialRequests.map((req) => (""",
        "close_old": "            ))}\n          </tbody>",
        "close_new": "            ))}\n            )}\n          </tbody>",
        "wh_old": "{MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
        "wh_new": "{warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
    },
    "PickList.jsx": {
        "import_old": "import { MOCK_PICK_LISTS, MOCK_WAREHOUSES, MOCK_ITEMS } from './stockData';",
        "import_new": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function PickList() {",
        "hook_line": "  const { pickLists, warehouses, items, loading, error } = useStock();",
        "data_old": "{MOCK_PICK_LISTS.map((list) => (",
        "data_new": """{loading ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading\u2026</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : pickLists.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No pick lists found.</td></tr>
            ) : pickLists.map((list) => (""",
        "close_old": "            ))}\n          </tbody>",
        "close_new": "            ))}\n            )}\n          </tbody>",
        "wh_old": "{MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
        "wh_new": "{warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
    },
    "setup/Warehouse.jsx": {
        "import_old": "import { MOCK_WAREHOUSES } from '../stockData';",
        "import_new": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function Warehouse() {",
        "hook_line": "  const { warehouses, loading, error } = useStock();",
        "data_old": "{MOCK_WAREHOUSES.map((wh) => (",
        "data_new": """{loading ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading\u2026</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : warehouses.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No warehouses found.</td></tr>
            ) : warehouses.map((wh) => (""",
        "close_old": "            ))}\n          </tbody>",
        "close_new": "            ))}\n            )}\n          </tbody>",
        "wh_old": "{MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
        "wh_new": "{warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
    },
    "setup/Item.jsx": {
        "import_old": "import { MOCK_ITEMS, MOCK_WAREHOUSES } from '../stockData';",
        "import_new": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function Item() {",
        "hook_line": "  const { items, warehouses, loading, error } = useStock();",
        "data_old": "{MOCK_ITEMS.map((item) => (",
        "data_new": """{loading ? (
              <tr><td colSpan={9} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading\u2026</td></tr>
            ) : error ? (
              <tr><td colSpan={9} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={9} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No items found.</td></tr>
            ) : items.map((item) => (""",
        "close_old": "            ))}\n          </tbody>",
        "close_new": "            ))}\n            )}\n          </tbody>",
        "wh_old": "{MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
        "wh_new": "{warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}",
    },
}

# Also fix item.group -> item.itemGroup in Item.jsx table row
item_fix = {
    "setup/Item.jsx": {
        "{item.group}": "{item.itemGroup || item.group}",
    }
}

for rel, patch in patches.items():
    path = os.path.join(base, rel)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace import
    if patch["import_old"] in content:
        content = content.replace(patch["import_old"], patch["import_new"])
        print(f"  [{rel}] import replaced")
    else:
        print(f"  [{rel}] WARNING: import_old not found")

    # Add hook line
    if patch["hook_after"] in content and patch["hook_line"] not in content:
        content = content.replace(patch["hook_after"], patch["hook_after"] + "\n" + patch["hook_line"])
        print(f"  [{rel}] hook added")

    # Replace data render
    if patch["data_old"] in content:
        content = content.replace(patch["data_old"], patch["data_new"])
        print(f"  [{rel}] data render replaced")
    else:
        print(f"  [{rel}] WARNING: data_old not found: {patch['data_old'][:60]}")

    # Fix closing bracket
    if patch["close_old"] in content:
        content = content.replace(patch["close_old"], patch["close_new"], 1)

    # Replace warehouse dropdown (may appear 0, 1, or 2 times)
    if patch["wh_old"] and patch["wh_old"] in content:
        content = content.replace(patch["wh_old"], patch["wh_new"])
        print(f"  [{rel}] warehouses dropdown replaced")

    # Fix item.group for Item.jsx
    if rel in item_fix:
        for old, new in item_fix[rel].items():
            content = content.replace(old, new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {rel} done")

print("\nAll main pages wired!")
