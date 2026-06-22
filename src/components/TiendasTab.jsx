import ItemRow from './ItemRow'
import { COLOR_MAP } from '../colors'
import styles from './Tab.module.css'

export default function TiendasTab({ items, stores, onToggle, onDelete }) {
  return (
    <div className={styles.panel}>
      {Object.entries(stores).map(([key, store]) => {
        const storeItems = items.filter(i => i.storeId === key)
        const c = COLOR_MAP[store.color] || COLOR_MAP.blue
        return (
          <div key={key} className={styles.storeSection}>
            <div className={styles.storeHeader} style={{ background: c.bg + '40' }}>
              <span className={styles.storeIcon}>{store.icon}</span>
              <div>
                <div className={styles.storeName}>{store.label}</div>
                <div className={styles.storeSub}>
                  {storeItems.length} artículos · {storeItems.filter(i => !i.have).length} faltan
                </div>
              </div>
            </div>
            <div className={styles.storeItems}>
              {storeItems.length === 0 ? (
                <p className={styles.empty}>Sin artículos</p>
              ) : storeItems.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  store={store}
                  showBadge={false}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
