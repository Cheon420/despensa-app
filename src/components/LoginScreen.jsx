import { useState } from 'react'
import styles from './LoginScreen.module.css'

const USUARIO = 'pamitomi'
const PASSWORD = '1010'

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.trim() === USUARIO && pass === PASSWORD) {
      localStorage.setItem('despensa_auth', '1')
      onLogin()
    } else {
      setError(true)
      setPass('')
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.logo}>🛒</span>
        <h1 className={styles.title}>Despensa</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={e => { setUser(e.target.value); setError(false) }}
            autoCapitalize="none"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(false) }}
          />
          {error && <p className={styles.error}>Usuario o contraseña incorrectos</p>}
          <button className={styles.btn} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}
