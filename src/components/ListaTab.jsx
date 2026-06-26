import styles from './Tab.module.css'
import listaStyles from './ListaTab.module.css'

export default function ListaTab({ items, stores, onToggle, boughtIds, setBoughtIds }) {

  const needed = items.filter(i => !i.have || boughtIds.has(i.id))

  if (needed.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.emptyBig}>
          <i className="ti ti-circle-check" style={{ fontSize: 40, color: 'var(--green)', display: 'block', marginBottom: 10 }} aria-hidden="true" />
          Todo en casa, no falta nada
        </div>
      </div>
    )
  }

  const byStore = {}
  needed.forEach(i => {
    if (!byStore[i.storeId]) byStore[i.storeId] = []
    byStore[i.storeId].push(i)
  })

  const handleComprado = (item) => {
    if (!boughtIds.has(item.id)) {
      setBoughtIds(prev => new Set([...prev, item.id]))
      onToggle(item.id, item.have)
    }
  }

  const handleVaciar = () => {
    setBoughtIds(new Set())
  }

  const boughtCount = needed.filter(i => boughtIds.has(i.id)).length
  const pendingCount = needed.length - boughtCount

  return (
    <div className={styles.panel}>
      <div className={listaStyles.topRow}>
        <p className={styles.summary} style={{ margin: 0 }}>
          <strong>{pendingCount}</strong> pendientes · <strong style={{ color: 'var(--green)' }}>{boughtCount}</strong> comprados
        </p>
        {boughtCount > 0 && (
          <button className={listaStyles.vaciarBtn} onClick={handleVaciar}>
            <i className="ti ti-trash" aria-hidden="true" /> Vaciar lista
          </button>
        )}
      </div>

      {Object.entries(byStore).map(([key, sitems]) => {
        const store = stores[key]
        return (
          <div key={key} className={styles.listaGroup}>
            <div className={styles.listaGroupTitle}>
              {store ? `${store.icon} ${store.label}` : key}
            </div>
            {sitems.map(item => {
              const comprado = boughtIds.has(item.id)
              return (
                <div key={item.id} className={`${styles.listaItem} ${comprado ? listaStyles.compradoRow : ''}`}>
                  <span className={`${styles.listaName} ${comprado ? listaStyles.compradoName : ''}`}>
                    {item.name}
                  </span>
                  <button
                    className={comprado ? listaStyles.btnVerde : listaStyles.btnRojo}
                    onClick={() => handleComprado(item)}
                    disabled={comprado}
                  >
                    <i className={`ti ${comprado ? 'ti-circle-check' : 'ti-circle-x'}`} aria-hidden="true" />
                    {comprado ? 'Comprado' : 'Comprado'}
                  </button>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
