import { COLOR_MAP } from '../colors'
import styles from './ItemRow.module.css'

export default function ItemRow({ item, store, showBadge, onToggle, onDelete }) {
  const c = store ? COLOR_MAP[store.color] || COLOR_MAP.blue : null

  return (
    <div className={styles.row}>
      <button
        className={`${styles.check} ${item.have ? styles.ok : styles.out}`}
        onClick={() => onToggle(item.id, item.have)}
        aria-label={item.have ? 'Marcar como falta' : 'Marcar como disponible'}
      >
        <i className={`ti ${item.have ? 'ti-check' : 'ti-x'}`} aria-hidden="true" />
      </button>
      <span className={styles.name}>{item.name}</span>
      {showBadge && store && (
        <span
          className={styles.badge}
          style={{ background: c.bg, color: c.text }}
        >
          {store.icon} {store.label}
        </span>
      )}
      <button className={styles.del} onClick={() => onDelete(item.id)} aria-label="Eliminar">
        <i className="ti ti-trash" aria-hidden="true" />
      </button>
    </div>
  )
}
