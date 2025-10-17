import Nav from './componentes/Nav/Nav'
import Sidebar from './componentes/Sidebar/Sidebar'
import styles from './App.module.css'
import { useState } from 'react'

// Importá tus vistas internas


function App() {
  const [vistaActual, setVistaActual] = useState('dashboard')

  const renderVista = () => {
   
  }

  return (
    <>
      <Nav />
      <div className={styles.layout}>
        <Sidebar onSelect={setVistaActual} />
        <main className={styles.content}>
          {renderVista()}
        </main>
      </div>
    </>
  )
}

export default App
