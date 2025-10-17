import React, { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import { CiUser, CiLogout } from 'react-icons/ci'

const Nav = () => {
  const [username, setUsername] = useState('Usuario')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUsername(user.nombre || user.username || 'Usuario')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'  // redirige al inicio después de cerrar sesión
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/large_interno_wellspring.png" alt="Logo" className={styles.logo} />
       
      </div>

      <div className={styles.userSection}>
        <span className={styles.userName}>
          <CiUser size={22} />
          {username}
        </span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <CiLogout size={20}  />
          Salir 
        </button>
      </div>
    </header>
  )
}

export default Nav
