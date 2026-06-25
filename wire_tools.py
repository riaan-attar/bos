import os

base = r"c:\Users\arpita\.gemini\antigravity-ide\scratch\bos\client\src\modules\stock"

EMPTY_STATE = """            {{loading ? (
              <tr><td colSpan={{cols}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{cols}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {{entity}}.length === 0 ? (
              <tr><td colSpan={{cols}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {{label}} found.</td></tr>
            ) : {{entity}}.map(({{row}}) => ("""

def build_empty(cols, entity, label, row):
    return f"""            {{loading ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {entity}.length === 0 ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {label} found.</td></tr>
            ) : {entity}.map(({row}) => ("""

pages = [
    {
        "rel": "setup/ItemGroup.jsx",
        "import_add": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function ItemGroup() {",
        "hook_line": "  const { itemGroups, loading, error } = useStock();",
        "old_data": "  const mockGroups = [\n    { name: 'Construction Material', itemsCount: 45, desc: 'Cement, Bricks, Blocks, Sand, Aggregate' },\n    { name: 'Steel', itemsCount: 12, desc: 'TMT Bars, Structural Steel, Binding Wire' },\n    { name: 'Aggregates', itemsCount: 8, desc: 'Crushed Stone, River Sand, M-Sand' },\n    { name: 'Finishing', itemsCount: 120, desc: 'Tiles, Paint, Granite, Marble' },\n    { name: 'Plumbing', itemsCount: 85, desc: 'Pipes, Fittings, Fixtures, Pumps' },\n    { name: 'Electrical', itemsCount: 150, desc: 'Wires, Switches, Conduits, Lighting' },\n    { name: 'Wood & Timber', itemsCount: 30, desc: 'Plywood, Flush Doors, Teak Wood' },\n    { name: 'Other', itemsCount: 50, desc: 'Safety Gear, Tools, Consumables' },\n  ];\n",
        "new_data": "",
        "table_old": "{mockGroups.map((g) => (",
        "table_new": build_empty(4, "itemGroups", "item groups", "g"),
        "close": True,
        "row_old": "{g.name}",
        "row_new": "{g.name}",
    },
    {
        "rel": "setup/UnitOfMeasure.jsx",
        "import_add": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function UnitOfMeasure() {",
        "hook_line": "  const { uoms, loading, error } = useStock();",
        "old_data": "  const mockUOM = [\n    { name: 'Bag', abbr: 'Bag', desc: 'Cement Bag (50kg)' },\n    { name: 'Kilogram', abbr: 'KG', desc: 'Weight in Kilograms' },\n    { name: 'Numbers', abbr: 'Nos', desc: 'Quantity in Numbers' },\n    { name: 'Cubic Feet', abbr: 'CFT', desc: 'Volume in Cubic Feet' },\n    { name: 'Square Feet', abbr: 'SqFt', desc: 'Area in Square Feet' },\n    { name: 'Litre', abbr: 'Ltr', desc: 'Volume in Litres' },\n    { name: 'Metre', abbr: 'Mtr', desc: 'Length in Metres' },\n    { name: 'Sheet', abbr: 'Sht', desc: 'Quantity in Sheets' },\n    { name: 'Metric Ton', abbr: 'MT', desc: 'Weight in Metric Tons (1000 kg)' },\n    { name: 'Ton', abbr: 'Ton', desc: 'Weight in Tons' },\n  ];\n",
        "new_data": "",
        "table_old": "{mockUOM.map((u) => (",
        "table_new": build_empty(4, "uoms", "units of measure", "u"),
        "close": True,
    },
    {
        "rel": "tools/SerialNo.jsx",
        "import_add": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function SerialNo() {",
        "hook_line": "  const { serialNos, loading, error } = useStock();",
        "old_data": "",  # inline in this file, handled below
        "table_old": "{ id: 'SN-001', item: 'Electric Drill', status: 'Active', warehouse: 'Gangapur Site Store', purchaseDate: '10/01/2026' },\n    { id: 'SN-002', item: 'Concrete Mixer', status: 'In Transit', warehouse: 'Transit', purchaseDate: '15/02/2026' },\n    { id: 'SN-003', item: 'Welding Machine', status: 'Inactive', warehouse: 'Main Warehouse - BID', purchaseDate: '20/03/2025' },\n    { id: 'SN-004', item: 'Power Saw', status: 'Active', warehouse: 'Nashik Road Store', purchaseDate: '05/05/2026' },",
        "table_old_prefix": "  const mockData = [\n    ",
        "close": False,
    },
    {
        "rel": "tools/Batch.jsx",
        "import_add": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function Batch() {",
        "hook_line": "  const { batches, loading, error } = useStock();",
        "old_data": "",
        "table_old": "{ id: 'BATCH-2026-01', item: 'Portland Cement', qty: 500, mfgDate: '01/05/2026', expiry: '01/11/2026', status: 'Active' },",
        "close": False,
    },
    {
        "rel": "tools/QualityInspection.jsx",
        "import_add": "import { useStock } from '../../context/StockContext';",
        "hook_after": "export default function QualityInspection() {",
        "hook_line": "  const { qualityInspections, loading, error } = useStock();",
        "old_data": "",
        "table_old": "{ id: 'QI-2026-001', item: 'Portland Cement', type: 'Inward', inspector: 'Suresh Kumar', status: 'Accepted', date: '06/06/2026' },",
        "close": False,
    },
]

def patch_setup_page(rel, hook_after, hook_line, old_data, new_data, table_old, table_new, import_add, close=True, **kwargs):
    path = os.path.join(base, rel)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Add import line after last import
    if import_add not in content:
        last_import_end = content.rfind("\nimport ")
        insert_pos = content.find("\n", last_import_end + 1)
        content = content[:insert_pos] + "\n" + import_add + content[insert_pos:]
    
    # Add hook after function declaration
    if hook_line not in content:
        idx = content.find(hook_after)
        if idx >= 0:
            end_of_line = content.find("\n", idx)
            content = content[:end_of_line + 1] + hook_line + "\n" + content[end_of_line + 1:]
    
    # Remove old mock data array
    if old_data and old_data in content:
        content = content.replace(old_data, "")
    
    # Replace table data render
    if table_old in content:
        content = content.replace(table_old, table_new)
        # Add closing brace
        if close:
            content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
        print(f"  [{rel}] table wired")
    else:
        print(f"  [{rel}] WARNING: table_old not found")
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  [{rel}] done")

# ─── Patch ItemGroup ──────────────────────────────────────────────────────────
def patch_item_group():
    path = os.path.join(base, "setup/ItemGroup.jsx")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "import { useStock }" not in content:
        content = content.replace(
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';",
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';\nimport { useStock } from '../../context/StockContext';"
        )
    
    if "const { itemGroups" not in content:
        content = content.replace(
            "export default function ItemGroup() {\n  const [showModal, setShowModal] = useState(false);",
            "export default function ItemGroup() {\n  const { itemGroups, loading, error } = useStock();\n  const [showModal, setShowModal] = useState(false);"
        )
    
    # Remove mockGroups
    import re
    content = re.sub(r"  const mockGroups = \[[\s\S]*?\];\n\n", "", content)
    
    # Replace table render
    content = content.replace(
        "{mockGroups.map((g) => (",
        """{loading ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : itemGroups.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No item groups found.</td></tr>
            ) : itemGroups.map((g) => ("""
    )
    
    # Fix row fields: g.itemsCount doesn't exist in DB, use g.disabled
    content = content.replace("{g.itemsCount}", "{g.disabled ? 'Disabled' : 'Active'}")
    content = content.replace("{g.desc}", "{g.description || ''}")
    
    # Fix closing
    content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("OK setup/ItemGroup.jsx done")

def patch_uom():
    path = os.path.join(base, "setup/UnitOfMeasure.jsx")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "import { useStock }" not in content:
        content = content.replace(
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';",
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';\nimport { useStock } from '../../context/StockContext';"
        )
    
    if "const { uoms" not in content:
        content = content.replace(
            "export default function UnitOfMeasure() {\n  const [showModal, setShowModal] = useState(false);",
            "export default function UnitOfMeasure() {\n  const { uoms, loading, error } = useStock();\n  const [showModal, setShowModal] = useState(false);"
        )
    
    import re
    content = re.sub(r"  const mockUOM = \[[\s\S]*?\];\n\n", "", content)
    
    content = content.replace(
        "{mockUOM.map((u) => (",
        """{loading ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}>{error}</td></tr>
            ) : uoms.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}>No units of measure found.</td></tr>
            ) : uoms.map((u) => ("""
    )
    
    content = content.replace("{u.abbr}", "{u.symbol || u.abbr || ''}")
    content = content.replace("{u.desc}", "{u.description || ''}")
    content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("OK setup/UnitOfMeasure.jsx done")

def patch_tools_page(rel, entity_var, context_key, cols, label, row_var):
    path = os.path.join(base, rel)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    import re
    
    # Add import
    if "import { useStock }" not in content:
        content = content.replace(
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';",
            "import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';\nimport { useStock } from '../../context/StockContext';"
        )
    
    # Add hook
    fn_name = rel.split("/")[-1].replace(".jsx", "")
    if f"const {{ {context_key}" not in content:
        content = content.replace(
            f"export default function {fn_name}() {{\n  const [showModal, setShowModal] = useState(false);",
            f"export default function {fn_name}() {{\n  const {{ {context_key}, loading, error }} = useStock();\n  const [showModal, setShowModal] = useState(false);"
        )
    
    # Remove inline mockData array
    content = re.sub(r"  const mockData = \[[\s\S]*?\];\n\n", "", content)
    
    # Replace table render
    old_render = f"{{mockData.map(({row_var}) => ("
    new_render = f"""{{loading ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {entity_var}.length === 0 ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {label} found.</td></tr>
            ) : {entity_var}.map(({row_var}) => ("""
    
    if old_render in content:
        content = content.replace(old_render, new_render)
        content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
        print(f"  [{rel}] table wired")
    else:
        print(f"  [{rel}] WARNING: '{old_render}' not found")
    
    # Fix field name mismatches for QualityInspection
    if "QualityInspection" in rel:
        content = content.replace("{entry.type}", "{entry.inspectionType || entry.type}")
        content = content.replace("{entry.date}", "{entry.inspectionDate || entry.date}")
    # Fix for Batch: expiry -> expiryDate
    if "Batch" in rel:
        content = content.replace("{entry.expiry}", "{entry.expiryDate || entry.expiry}")
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {rel} done")

patch_item_group()
patch_uom()
patch_tools_page("tools/SerialNo.jsx",      "serialNos",          "serialNos",          5, "serial numbers", "entry")
patch_tools_page("tools/Batch.jsx",          "batches",            "batches",            6, "batches",         "entry")
patch_tools_page("tools/QualityInspection.jsx", "qualityInspections","qualityInspections", 6, "quality inspections", "entry")

print("\nAll remaining pages wired!")
