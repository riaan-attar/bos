import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { socket } from '../utils/socket';
import {
  stockEntriesApi, purchaseReceiptsApi, deliveryNotesApi,
  materialRequestsApi, pickListsApi, warehousesApi, itemsApi,
  itemGroupsApi, uomsApi, serialNosApi, batchesApi, qualityInspectionsApi,
} from '../services/stockApi';

const StockContext = createContext(null);

export function StockProvider({ children }) {
  // ─── State ────────────────────────────────────────────────────────────────
  const [stockEntries,       setStockEntries]       = useState([]);
  const [purchaseReceipts,   setPurchaseReceipts]   = useState([]);
  const [deliveryNotes,      setDeliveryNotes]      = useState([]);
  const [materialRequests,   setMaterialRequests]   = useState([]);
  const [pickLists,          setPickLists]          = useState([]);
  const [warehouses,         setWarehouses]         = useState([]);
  const [items,              setItems]              = useState([]);
  const [itemGroups,         setItemGroups]         = useState([]);
  const [uoms,               setUoms]               = useState([]);
  const [serialNos,          setSerialNos]          = useState([]);
  const [batches,            setBatches]            = useState([]);
  const [qualityInspections, setQualityInspections] = useState([]);
  const [loading,            setLoading]            = useState(true);
  const [error,              setError]              = useState(null);

  // ─── Map model names to state setters ─────────────────────────────────────
  const setterMap = {
    ste:   setStockEntries,
    prc:   setPurchaseReceipts,
    dn:    setDeliveryNotes,
    mr:    setMaterialRequests,
    pl:    setPickLists,
    wh:    setWarehouses,
    item:  setItems,
    ig:    setItemGroups,
    uom:   setUoms,
    sn:    setSerialNos,
    batch: setBatches,
    qi:    setQualityInspections,
  };

  // ─── Initial fetch ─────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled([
        stockEntriesApi.getAll(),
        purchaseReceiptsApi.getAll(),
        deliveryNotesApi.getAll(),
        materialRequestsApi.getAll(),
        pickListsApi.getAll(),
        warehousesApi.getAll(),
        itemsApi.getAll(),
        itemGroupsApi.getAll(),
        uomsApi.getAll(),
        serialNosApi.getAll(),
        batchesApi.getAll(),
        qualityInspectionsApi.getAll(),
      ]);

      const [
        steRes, prcRes, dnRes, mrRes, plRes,
        whRes, itemRes, igRes, uomRes, snRes, batchRes, qiRes,
      ] = results;

      setStockEntries(      steRes.status   === 'fulfilled' ? steRes.value.data   : []);
      setPurchaseReceipts(  prcRes.status   === 'fulfilled' ? prcRes.value.data   : []);
      setDeliveryNotes(     dnRes.status    === 'fulfilled' ? dnRes.value.data    : []);
      setMaterialRequests(  mrRes.status    === 'fulfilled' ? mrRes.value.data    : []);
      setPickLists(         plRes.status    === 'fulfilled' ? plRes.value.data    : []);
      setWarehouses(        whRes.status    === 'fulfilled' ? whRes.value.data    : []);
      setItems(             itemRes.status  === 'fulfilled' ? itemRes.value.data  : []);
      setItemGroups(        igRes.status    === 'fulfilled' ? igRes.value.data    : []);
      setUoms(              uomRes.status   === 'fulfilled' ? uomRes.value.data   : []);
      setSerialNos(         snRes.status    === 'fulfilled' ? snRes.value.data    : []);
      setBatches(           batchRes.status === 'fulfilled' ? batchRes.value.data : []);
      setQualityInspections(qiRes.status    === 'fulfilled' ? qiRes.value.data    : []);
    } catch (err) {
      console.error('StockContext: fetchAll error', err);
      setError('Failed to load stock data. Please check the server connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ─── Socket: stock:update ─────────────────────────────────────────────────
  useEffect(() => {
    const handleStockUpdate = (update) => {
      const setter = setterMap[update.model];
      if (!setter) return;

      setter((prev) => {
        switch (update.action) {
          case 'create':
            if (prev.some((item) => item.id === update.data.id)) return prev;
            return [update.data, ...prev];
          case 'update':
            return prev.map((item) => (item.id === update.data.id ? update.data : item));
          case 'delete':
            return prev.filter((item) => item.id !== update.data.id);
          default:
            return prev;
        }
      });
    };

    socket.on('stock:update', handleStockUpdate);
    return () => socket.off('stock:update', handleStockUpdate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── CRUD action factories ─────────────────────────────────────────────────
  const makeActions = (apiModule, setter) => ({
    add: async (data) => {
      const res = await apiModule.create(data);
      setter((prev) => {
        if (prev.some((r) => r.id === res.data.id)) return prev;
        return [res.data, ...prev];
      });
      return res.data;
    },
    update: async (id, data) => {
      const res = await apiModule.update(id, data);
      setter((prev) => prev.map((r) => (r.id === id ? res.data : r)));
      return res.data;
    },
    remove: async (id) => {
      await apiModule.remove(id);
      setter((prev) => prev.filter((r) => r.id !== id));
    },
  });

  const stockEntryActions      = makeActions(stockEntriesApi,       setStockEntries);
  const purchaseReceiptActions = makeActions(purchaseReceiptsApi,    setPurchaseReceipts);
  const deliveryNoteActions    = makeActions(deliveryNotesApi,       setDeliveryNotes);
  const materialRequestActions = makeActions(materialRequestsApi,    setMaterialRequests);
  const pickListActions        = makeActions(pickListsApi,           setPickLists);
  const warehouseActions       = makeActions(warehousesApi,          setWarehouses);
  const itemActions            = makeActions(itemsApi,               setItems);
  const itemGroupActions       = makeActions(itemGroupsApi,          setItemGroups);
  const uomActions             = makeActions(uomsApi,                setUoms);
  const serialNoActions        = makeActions(serialNosApi,           setSerialNos);
  const batchActions           = makeActions(batchesApi,             setBatches);
  const qualityInspectionActions = makeActions(qualityInspectionsApi, setQualityInspections);

  // ─── Computed dashboard values ─────────────────────────────────────────────
  const totalStockValue = warehouses.reduce(
    (sum, w) => sum + (parseFloat(w.stockValue) || 0), 0
  );
  const warehouseChartData = warehouses.map((w) => ({
    warehouse: w.name,
    value: parseFloat(w.stockValue) || 0,
  }));

  return (
    <StockContext.Provider value={{
      // Data
      stockEntries, purchaseReceipts, deliveryNotes, materialRequests, pickLists,
      warehouses, items, itemGroups, uoms, serialNos, batches, qualityInspections,
      // Status
      loading, error,
      // Dashboard computed
      totalStockValue, warehouseChartData,
      // Refresh
      refresh: fetchAll,
      // Actions
      stockEntryActions, purchaseReceiptActions, deliveryNoteActions,
      materialRequestActions, pickListActions, warehouseActions, itemActions,
      itemGroupActions, uomActions, serialNoActions, batchActions,
      qualityInspectionActions,
    }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => useContext(StockContext);
