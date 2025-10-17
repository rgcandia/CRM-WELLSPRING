import styles from './Sidebar.module.css'

const Sidebar = ({ onSelect }) => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li onClick={() => onSelect('dashboard')}>Dashboard</li>
        <li onClick={() => onSelect('formularios')}>Formularios</li>
        <li onClick={() => onSelect('configuracion')}>Configuración</li>
      </ul>
    </aside>
  )
}

export default Sidebar
