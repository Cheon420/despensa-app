import { useState } from 'react'
import ItemRow from './ItemRow'
import { COLOR_OPTIONS } from '../colors'
import styles from './Tab.module.css'

export default function DespensaTab({ items, stores, onToggle, onAdd, onDelete }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [storeId, setStoreId] = useState(Object.keys(stores)[0] || '')
  const [have, setHave] = useState('true')

  const ok  = items.filter(i => i.have).length
  const out = items.filter(i => !i.have).length

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), storeId, have: have === 'true' })
    setName('')
    setOpen(false)
  }

  return (
    <div className={styles.panel}>
      <div className={styles.stats}>
        <div className={styles.stat}><span className={styles.num}>{ok}</span><span className={styles.lbl}>disponibles</span></div>
        <div className={styles.stat}><span className={styles.num}>{out}</span><span className={styles.lbl}>faltan</span></div>
        <div className={styles.stat}><span className={styles.num}>{items.length}</span><span className={styles.lbl}>total</span></div>
      </div>

      {items.map(item => (
        <ItemRow
          key={item.id}
          item={item}
          store={stores[item.storeId]}
          showBadge
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}

      {open ? (
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.formTitle}>Nuevo artículo</p>
          <input
            type="text"
            placeholder="Nombre del artículo"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <div className={styles.row2}>
            <select value={storeId} onChange={e => setStoreId(e.target.value)}>
              {Object.entries(stores).map(([k, s]) => (
                <option key={k} value={k}>{s.icon} {s.label}</option>
              ))}
            </select>
            <select value={have} onChange={e => setHave(e.target.value)}>
              <option value="true">Tengo</option>
              <option value="false">Falta</option>
            </select>
          </div>
          <div className={styles.row2}>
            <button type="submit" className={styles.primary}>Añadir</button>
            <button type="button" className={styles.secondary} onClick={() => setOpen(false)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <button className={styles.addBtn} onClick={() => setOpen(true)}>
          <i className="ti ti-plus" aria-hidden="true" /> Añadir artículo
        </button>
      )}
    </div>
  )
}
