import styles from './Tab.module.css'

export default function ListaTab({ items, stores, onToggle }) {
  const needed = items.filter(i => !i.have)

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

  return (
    <div className={styles.panel}>
      <p className={styles.summary}>
        Faltan <strong>{needed.length} artículos</strong> de {Object.keys(byStore).length} {Object.keys(byStore).length === 1 ? 'tienda' : 'tiendas'}
      </p>
      {Object.entries(byStore).map(([key, sitems]) => {
        const store = stores[key]
        return (
          <div key={key} className={styles.listaGroup}>
            <div className={styles.listaGroupTitle}>
              {store ? `${store.icon} ${store.label}` : key}
            </div>
            {sitems.map(item => (
              <div key={item.id} className={styles.listaItem}>
                <span className={styles.listaName}>{item.name}</span>
                <button
                  className={styles.compradoBtn}
                  onClick={() => onToggle(item.id, item.have)}
                >
                  <i className="ti ti-check" aria-hidden="true" /> Comprado
                </button>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
