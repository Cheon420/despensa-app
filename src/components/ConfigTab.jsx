import { useState } from 'react'
import { COLOR_MAP, COLOR_OPTIONS } from '../colors'
import styles from './Tab.module.css'

export default function ConfigTab({ stores, onAddStore, onDeleteStore }) {
  const [name, setName]   = useState('')
  const [icon, setIcon]   = useState('')
  const [color, setColor] = useState('blue')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const id = name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    onAddStore({ id, label: name.trim(), icon: icon.trim() || '🏪', color })
    setName(''); setIcon(''); setColor('blue')
  }

  return (
    <div className={styles.panel}>
      <p className={styles.sectionLabel}>Tiendas activas</p>
      <div className={styles.chipsWrap}>
        {Object.entries(stores).map(([key, s]) => {
          const c = COLOR_MAP[s.color] || COLOR_MAP.blue
          return (
            <span key={key} className={styles.chip} style={{ background: c.bg, color: c.text }}>
              {s.icon} {s.label}
              <button
                className={styles.chipDel}
                onClick={() => onDeleteStore(key)}
                aria-label={`Eliminar ${s.label}`}
                style={{ color: c.text }}
              >×</button>
            </span>
          )
        })}
      </div>

      <p className={styles.sectionLabel} style={{ marginTop: 20 }}>Añadir tienda</p>
      <form className={styles.form} onSubmit={submit}>
        <input
          type="text"
          placeholder="Nombre de la tienda"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className={styles.row2}>
          <input
            type="text"
            placeholder="Emoji (ej: 🛒)"
            value={icon}
            onChange={e => setIcon(e.target.value)}
            style={{ maxWidth: 100 }}
          />
          <select value={color} onChange={e => setColor(e.target.value)}>
            {COLOR_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.primary}>Crear tienda</button>
      </form>
    </div>
  )
}
