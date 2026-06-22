import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const DEFAULT_STORES = {
  mercadona: { label: 'Mercadona', color: 'blue',  icon: '🛒', order: 0 },
  lidl:      { label: 'Lidl',      color: 'amber', icon: '🏪', order: 1 },
  dia:       { label: 'Dia',       color: 'red',   icon: '🏬', order: 2 },
  chino:     { label: 'Chino/Alim',color: 'green', icon: '🥦', order: 3 },
}

const DEMO_ITEMS = [
  { name: 'Leche entera',      storeId: 'mercadona', have: true  },
  { name: 'Pan de molde',       storeId: 'mercadona', have: true  },
  { name: 'Yogures naturales',  storeId: 'mercadona', have: false },
  { name: 'Aceite de oliva',    storeId: 'mercadona', have: true  },
  { name: 'Pasta (espaguetis)', storeId: 'mercadona', have: false },
  { name: 'Queso en lonchas',   storeId: 'lidl',      have: true  },
  { name: 'Jamón cocido',       storeId: 'lidl',      have: false },
  { name: 'Cereales',           storeId: 'lidl',      have: true  },
  { name: 'Galletas',           storeId: 'dia',       have: false },
  { name: 'Refresco cola 2L',   storeId: 'dia',       have: true  },
  { name: 'Papel higiénico',    storeId: 'dia',       have: false },
  { name: 'Tomates',            storeId: 'chino',     have: true  },
  { name: 'Plátanos',           storeId: 'chino',     have: false },
  { name: 'Cebolla',            storeId: 'chino',     have: true  },
]

export function useData() {
  const [items, setItems] = useState([])
  const [stores, setStores] = useState(DEFAULT_STORES)
  const [loading, setLoading] = useState(true)
  const [firebaseOk, setFirebaseOk] = useState(false)

  useEffect(() => {
    let unsubItems, unsubStores
    try {
      unsubStores = onSnapshot(collection(db, 'stores'), snap => {
        if (snap.empty) {
          Object.entries(DEFAULT_STORES).forEach(([id, data]) =>
            setDoc(doc(db, 'stores', id), data)
          )
        } else {
          const s = {}
          snap.forEach(d => { s[d.id] = d.data() })
          setStores(s)
        }
        setFirebaseOk(true)
      }, () => setFirebaseOk(false))

      unsubItems = onSnapshot(collection(db, 'items'), snap => {
        if (snap.empty && firebaseOk) {
          DEMO_ITEMS.forEach(item => addDoc(collection(db, 'items'), item))
        } else {
          const arr = []
          snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
          setItems(arr)
        }
        setLoading(false)
      }, () => setLoading(false))
    } catch {
      setFirebaseOk(false)
      setLoading(false)
    }
    return () => { unsubItems?.(); unsubStores?.() }
  }, [])

  const toggleItem = async (id, current) => {
    if (firebaseOk) {
      await updateDoc(doc(db, 'items', id), { have: !current })
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, have: !i.have } : i))
    }
  }

  const addItem = async ({ name, storeId, have }) => {
    const item = { name, storeId, have }
    if (firebaseOk) {
      await addDoc(collection(db, 'items'), item)
    } else {
      setItems(prev => [...prev, { id: Date.now().toString(), ...item }])
    }
  }

  const deleteItem = async (id) => {
    if (firebaseOk) {
      await deleteDoc(doc(db, 'items', id))
    } else {
      setItems(prev => prev.filter(i => i.id !== id))
    }
  }

  const addStore = async ({ id, label, color, icon }) => {
    const data = { label, color, icon, order: Object.keys(stores).length }
    if (firebaseOk) {
      await setDoc(doc(db, 'stores', id), data)
    } else {
      setStores(prev => ({ ...prev, [id]: data }))
    }
  }

  const deleteStore = async (id) => {
    if (firebaseOk) {
      await deleteDoc(doc(db, 'stores', id))
      const toDelete = items.filter(i => i.storeId === id)
      await Promise.all(toDelete.map(i => deleteDoc(doc(db, 'items', i.id))))
    } else {
      setStores(prev => { const s = { ...prev }; delete s[id]; return s })
      setItems(prev => prev.filter(i => i.storeId !== id))
    }
  }

  return { items, stores, loading, firebaseOk, toggleItem, addItem, deleteItem, addStore, deleteStore }
}
