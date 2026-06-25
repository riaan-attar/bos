import os
import re

base = r"c:\Users\arpita\.gemini\antigravity-ide\scratch\bos\client\src\modules\stock"

def patch_tools_page(rel, entity_var, context_key, cols, label):
    path = os.path.join(base, rel)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    old_render = "{mockData.map((row, i) => ("
    new_render = f"""{{loading ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {entity_var}.length === 0 ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {label} found.</td></tr>
            ) : {entity_var}.map((row, i) => ("""

    if old_render in content:
        content = content.replace(old_render, new_render)
        content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
        print(f"  [{rel}] table wired")

    # Fix field name mismatches
    if "QualityInspection" in rel:
        content = content.replace("{row.type}", "{row.inspectionType || row.type}")
        content = content.replace("{row.date}", "{row.inspectionDate || row.date}")
    if "Batch" in rel:
        content = content.replace("{row.expiry}", "{row.expiryDate || row.expiry}")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {rel} done")

patch_tools_page("tools/SerialNo.jsx",      "serialNos",          "serialNos",          5, "serial numbers")
patch_tools_page("tools/Batch.jsx",          "batches",            "batches",            6, "batches")
patch_tools_page("tools/QualityInspection.jsx", "qualityInspections","qualityInspections", 6, "quality inspections")

# Also wire reports pages: ItemPrices, StockBalance, StockLedger, WarehouseWiseStock
def patch_report_page(rel, entity_var, context_key, cols, label, map_var="row"):
    path = os.path.join(base, rel)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add import
    if "import { useStock }" not in content:
        content = content.replace(
            "import { MOCK_ITEMS",
            "import { useStock } from '../../context/StockContext';\n// import { MOCK_ITEMS"
        )
        content = content.replace(
            "import { MOCK_ITEMS } from '../stockData';",
            "import { useStock } from '../../context/StockContext';\n// import { MOCK_ITEMS } from '../stockData';"
        )

    # Add hook
    fn_name = rel.split("/")[-1].replace(".jsx", "")
    if f"const {{ {context_key}" not in content:
        content = content.replace(
            f"export default function {fn_name}() {{",
            f"export default function {fn_name}() {{\n  const {{ {context_key}, warehouses, items, loading, error }} = useStock();"
        )
        
    # Replace inline mockData arrays mapped to items
    content = re.sub(r"  const mockData = MOCK_ITEMS\.map\([^;]+;\n", "", content)
    content = re.sub(r"  const mockTableData = MOCK_ITEMS\.map\([^;]+;\n", "", content)
    
    # Replace mockData.map or mockTableData.map or items.map
    old_renders = [
        "{mockData.map((row, i) => (",
        "{mockTableData.map((row, i) => (",
        "{items.map((row, i) => ("
    ]
    
    for old_render in old_renders:
        if old_render in content:
            new_render = f"""{{loading ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {entity_var}.length === 0 ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {label} found.</td></tr>
            ) : {entity_var}.map(({map_var}, i) => ("""
            content = content.replace(old_render, new_render)
            content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
            print(f"  [{rel}] table wired")
            break

    # Fix chartData references to use real warehouses
    if "const chartData = MOCK_WAREHOUSES" in content:
       content = re.sub(r"const chartData = MOCK_WAREHOUSES[\s\S]*?\];", "const chartData = warehouses.map(w => ({ warehouse: w.name, value: parseFloat(w.stockValue) || 0 }));", content)

    # Fix total value references
    if "const totalValue = MOCK_WAREHOUSES" in content:
        content = re.sub(r"const totalValue = MOCK_WAREHOUSES.*?;", "const totalValue = warehouses.reduce((sum, w) => sum + (parseFloat(w.stockValue) || 0), 0);", content)

    # Remove Ledger specific mock loop
    if "StockLedger" in rel:
       content = re.sub(r"  const mockLedgerData = Array[\s\S]*?\];\n\n", "", content)
       # For ledger, use stockEntries as the source of truth for now
       content = content.replace("{mockLedgerData.map((row, i) => (", f"""{{loading ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#dc2626' }}}}>{{error}}</td></tr>
            ) : {entity_var}.length === 0 ? (
              <tr><td colSpan={{{cols}}} style={{{{ padding: '40px 16px', textAlign: 'center', color: '#9ca3af' }}}}>No {label} found.</td></tr>
            ) : {entity_var}.map(({map_var}, i) => (""")
       content = content.replace("            ))}\n          </tbody>", "            ))}\n            )}\n          </tbody>", 1)
       
       # Map ledger columns to stockEntries fields for basic viewing
       content = content.replace("{row.date}", "{row.postingDate}")
       content = content.replace("{row.item}", "{row.stockEntryType}") # use type as item for now
       content = content.replace("{row.voucherType}", "{'Stock Entry'}")
       content = content.replace("{row.voucherNo}", "{row.id}")
       content = content.replace("{row.inQty}", "{row.totalValue > 0 ? 1 : 0}")
       content = content.replace("{row.outQty}", "{0}")
       content = content.replace("{row.balanceQty}", "{0}")
       content = content.replace("{row.warehouse}", "{row.toWarehouse || row.fromWarehouse}")

    # Fix dropdowns in reports
    content = content.replace("{MOCK_ITEMS.map(", "{items.map(")
    content = content.replace("{MOCK_WAREHOUSES.map(", "{warehouses.map(")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {rel} done")

patch_report_page("reports/ItemPrices.jsx", "items", "items", 6, "items")
patch_report_page("reports/StockBalance.jsx", "items", "items", 7, "stock balances")
patch_report_page("reports/StockLedger.jsx", "stockEntries", "stockEntries", 8, "ledger entries")
patch_report_page("reports/WarehouseWiseStock.jsx", "items", "items", 7, "items")

print("\nAll tools and reports wired!")
