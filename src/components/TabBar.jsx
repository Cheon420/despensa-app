import styles from './TabBar.module.css'

const TABS = [
  { id: 'despensa', label: 'Despensa',  icon: 'ti-box'          },
  { id: 'tiendas',  label: 'Por tienda',icon: 'ti-building-store'},
  { id: 'lista',    label: 'Lista',     icon: 'ti-shopping-cart' },
  { id: 'config',   label: 'Config',    icon: 'ti-settings'      },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className={styles.bar}>
      {TABS.map(t => (
        <button
          key={t.id}
          className={`${styles.tab} ${active === t.id ? styles.active : ''}`}
          onClick={() => onChange(t.id)}
        >
          <i className={`ti ${t.icon} ${styles.icon}`} aria-hidden="true" />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
