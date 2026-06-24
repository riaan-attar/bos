// ─── Shared Mock Data for Stock Module ───────────────────────────────────────
export const MOCK_ITEMS = [
  { id: 'ITEM-001', name: 'Portland Cement', group: 'Construction Material', uom: 'Bag', rate: 380, openingStock: 500, currentStock: 180, reorderLevel: 100, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-002', name: 'Steel TMT Bars 12mm', group: 'Steel', uom: 'KG', rate: 65, openingStock: 5000, currentStock: 2200, reorderLevel: 1000, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-003', name: 'Red Clay Bricks', group: 'Construction Material', uom: 'Nos', rate: 8, openingStock: 50000, currentStock: 18000, reorderLevel: 10000, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-004', name: 'River Sand', group: 'Aggregates', uom: 'CFT', rate: 45, openingStock: 2000, currentStock: 750, reorderLevel: 500, warehouse: 'Satpur Site Store' },
  { id: 'ITEM-005', name: 'Ceramic Floor Tiles', group: 'Finishing', uom: 'SqFt', rate: 55, openingStock: 8000, currentStock: 3200, reorderLevel: 1000, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-006', name: 'PVC Pipes 4 inch', group: 'Plumbing', uom: 'Nos', rate: 320, openingStock: 200, currentStock: 45, reorderLevel: 50, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-007', name: 'Electrical Wire 4mm', group: 'Electrical', uom: 'Mtr', rate: 28, openingStock: 5000, currentStock: 1800, reorderLevel: 500, warehouse: 'Main Warehouse - BID' },
  { id: 'ITEM-008', name: 'Granite Slabs', group: 'Finishing', uom: 'SqFt', rate: 120, openingStock: 3000, currentStock: 1100, reorderLevel: 500, warehouse: 'Main Warehouse - BID' },
  { id: 'ITEM-009', name: 'Paint - Exterior', group: 'Finishing', uom: 'Litre', rate: 180, openingStock: 1000, currentStock: 320, reorderLevel: 200, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-010', name: 'Plywood 19mm', group: 'Wood & Timber', uom: 'Sheet', rate: 1800, openingStock: 300, currentStock: 95, reorderLevel: 50, warehouse: 'Main Warehouse - BID' },
];

export const MOCK_WAREHOUSES = [
  { id: 'WH-001', name: 'Main Warehouse - BID', type: 'Stores', city: 'Nashik', stockValue: 2150000 },
  { id: 'WH-002', name: 'Gangapur Site Store', type: 'Work In Progress', city: 'Nashik', stockValue: 980000 },
  { id: 'WH-003', name: 'Nashik Road Store', type: 'Stores', city: 'Nashik', stockValue: 620000 },
  { id: 'WH-004', name: 'Satpur Site Store', type: 'Work In Progress', city: 'Nashik', stockValue: 340000 },
  { id: 'WH-005', name: 'Finished Goods - BID', type: 'Finished Goods', city: 'Nashik', stockValue: 460000 },
];

export const MOCK_STOCK_ENTRIES = [
  { id: 'STE-2026-00001', type: 'Material Transfer', fromWarehouse: 'Main Warehouse - BID', toWarehouse: 'Gangapur Site Store', totalValue: 85000, date: '10/06/2026', status: 'Submitted' },
  { id: 'STE-2026-00002', type: 'Material Issue', fromWarehouse: 'Gangapur Site Store', toWarehouse: '—', totalValue: 42000, date: '12/06/2026', status: 'Submitted' },
  { id: 'STE-2026-00003', type: 'Material Receipt', fromWarehouse: '—', toWarehouse: 'Main Warehouse - BID', totalValue: 156000, date: '14/06/2026', status: 'Submitted' },
  { id: 'STE-2026-00004', type: 'Material Transfer', fromWarehouse: 'Main Warehouse - BID', toWarehouse: 'Nashik Road Store', totalValue: 63000, date: '15/06/2026', status: 'Submitted' },
  { id: 'STE-2026-00005', type: 'Stock Reconciliation', fromWarehouse: '—', toWarehouse: 'Satpur Site Store', totalValue: 28000, date: '16/06/2026', status: 'Draft' },
  { id: 'STE-2026-00006', type: 'Material Issue', fromWarehouse: 'Nashik Road Store', toWarehouse: '—', totalValue: 18500, date: '17/06/2026', status: 'Draft' },
  { id: 'STE-2026-00007', type: 'Material Transfer', fromWarehouse: 'Gangapur Site Store', toWarehouse: 'Main Warehouse - BID', totalValue: 12000, date: '18/06/2026', status: 'Submitted' },
  { id: 'STE-2026-00008', type: 'Material Receipt', fromWarehouse: '—', toWarehouse: 'Gangapur Site Store', totalValue: 95000, date: '19/06/2026', status: 'Draft' },
];

export const MOCK_PURCHASE_RECEIPTS = [
  { id: 'PRC-2026-00001', supplier: 'Shree Cement Ltd', items: 'Portland Cement x 200 Bags', totalQty: 200, totalAmount: 76000, date: '05/06/2026', status: 'Submitted' },
  { id: 'PRC-2026-00002', supplier: 'Tata Steel', items: 'TMT Bars 12mm x 2000 KG', totalQty: 2000, totalAmount: 130000, date: '07/06/2026', status: 'Submitted' },
  { id: 'PRC-2026-00003', supplier: 'Kajaria Ceramics', items: 'Floor Tiles x 2000 SqFt', totalQty: 2000, totalAmount: 110000, date: '09/06/2026', status: 'Submitted' },
  { id: 'PRC-2026-00004', supplier: 'Local Sand Supplier', items: 'River Sand x 500 CFT', totalQty: 500, totalAmount: 22500, date: '11/06/2026', status: 'Submitted' },
  { id: 'PRC-2026-00005', supplier: 'Asian Paints', items: 'Exterior Paint x 200 Litres', totalQty: 200, totalAmount: 36000, date: '14/06/2026', status: 'Draft' },
  { id: 'PRC-2026-00006', supplier: 'Finolex Cables', items: 'Electrical Wire 4mm x 1000 Mtr', totalQty: 1000, totalAmount: 28000, date: '16/06/2026', status: 'Draft' },
];

export const MOCK_DELIVERY_NOTES = [
  { id: 'DN-2026-00001', customer: 'Mohan Kulkarni', items: 'Ceramic Tiles x 500 SqFt', fromWarehouse: 'Main Warehouse - BID', totalAmount: 27500, date: '08/06/2026', status: 'Submitted' },
  { id: 'DN-2026-00002', customer: 'Vikram Industries', items: 'Plywood 19mm x 20 Sheets', fromWarehouse: 'Main Warehouse - BID', totalAmount: 36000, date: '10/06/2026', status: 'Submitted' },
  { id: 'DN-2026-00003', customer: 'Sunita Bhosale', items: 'Granite Slabs x 300 SqFt', fromWarehouse: 'Nashik Road Store', totalAmount: 36000, date: '12/06/2026', status: 'Submitted' },
  { id: 'DN-2026-00004', customer: 'Rajesh Sharma', items: 'PVC Pipes x 10 Nos', fromWarehouse: 'Gangapur Site Store', totalAmount: 3200, date: '15/06/2026', status: 'Draft' },
  { id: 'DN-2026-00005', customer: 'Anita Desai', items: 'Exterior Paint x 50 Litres', fromWarehouse: 'Nashik Road Store', totalAmount: 9000, date: '18/06/2026', status: 'Draft' },
];

export const MOCK_MATERIAL_REQUESTS = [
  { id: 'MR-2026-00001', purpose: 'Purchase', requestedBy: 'Amit Kulkarni', requiredDate: '25/06/2026', status: 'Pending', totalItems: 3 },
  { id: 'MR-2026-00002', purpose: 'Transfer', requestedBy: 'Rahul Desai', requiredDate: '22/06/2026', status: 'Transferred', totalItems: 2 },
  { id: 'MR-2026-00003', purpose: 'Purchase', requestedBy: 'Sneha Patil', requiredDate: '28/06/2026', status: 'Draft', totalItems: 5 },
  { id: 'MR-2026-00004', purpose: 'Issue', requestedBy: 'Amit Kulkarni', requiredDate: '20/06/2026', status: 'Issued', totalItems: 1 },
  { id: 'MR-2026-00005', purpose: 'Purchase', requestedBy: 'Rahul Desai', requiredDate: '30/06/2026', status: 'Ordered', totalItems: 4 },
  { id: 'MR-2026-00006', purpose: 'Transfer', requestedBy: 'Sneha Patil', requiredDate: '24/06/2026', status: 'Pending', totalItems: 2 },
];

export const MOCK_PICK_LISTS = [
  { id: 'PL-2026-00001', purpose: 'Delivery', warehouse: 'Main Warehouse - BID', picker: 'Rahul Desai', date: '15/06/2026', status: 'Open' },
  { id: 'PL-2026-00002', purpose: 'Material Transfer', warehouse: 'Gangapur Site Store', picker: 'Amit Kulkarni', date: '16/06/2026', status: 'Completed' },
  { id: 'PL-2026-00003', purpose: 'Delivery', warehouse: 'Nashik Road Store', picker: 'Sneha Patil', date: '18/06/2026', status: 'Open' },
  { id: 'PL-2026-00004', purpose: 'Material Transfer', warehouse: 'Main Warehouse - BID', picker: 'Rahul Desai', date: '19/06/2026', status: 'Draft' },
];
