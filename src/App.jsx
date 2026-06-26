import { useState } from 'react'
import TabBar from './components/TabBar'
import DespensaTab from './components/DespensaTab'
import TiendasTab from './components/TiendasTab'
import ListaTab from './components/ListaTab'
import ConfigTab from './components/ConfigTab'
import LoginScreen from './components/LoginScreen'
import { useData } from './hooks/useData'
import styles from './App.module.css'

export default function App() {
  const [tab, setTab] = useState('despensa')
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('despensa_auth') === '1')
  const { items, stores, loading, toggleItem, addItem, deleteItem, addStore, deleteStore } = useData()

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <i className="ti ti-loader-2" style={{ fontSize: 32, animation: 'spin 1s linear infinite' }} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.logo}>🛒</span>
        <h1 className={styles.title}>Despensa</h1>
        {items.filter(i => !i.have).length > 0 && (
          <span className={styles.badge}>{items.filter(i => !i.have).length}</span>
        )}
      </header>

      <main className={styles.main}>
        {tab === 'despensa' && (
          <DespensaTab
            items={items}
            stores={stores}
            onToggle={toggleItem}
            onAdd={addItem}
            onDelete={deleteItem}
          />
        )}
        {tab === 'tiendas' && (
          <TiendasTab
            items={items}
            stores={stores}
            onToggle={toggleItem}
            onDelete={deleteItem}
          />
        )}
        {tab === 'lista' && (
          <ListaTab
            items={items}
            stores={stores}
            onToggle={toggleItem}
          />
        )}
        {tab === 'config' && (
          <ConfigTab
            stores={stores}
            onAddStore={addStore}
            onDeleteStore={deleteStore}
          />
        )}
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
