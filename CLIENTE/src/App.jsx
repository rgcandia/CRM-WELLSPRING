import { useState, useEffect } from 'react';
import Nav from './componentes/Nav/Nav';
import Sidebar from './componentes/Sidebar/Sidebar';
import styles from './App.module.css';
import { startSocket } from './socket.js';  // Importa la función para iniciar el socket

function App() {
  const [vistaActual, setVistaActual] = useState('dashboard');

  // Este useEffect ejecutará startSocket cuando el componente se monte
  useEffect(() => {
    // Ejecutamos startSocket para establecer la conexión al servidor
    startSocket();

    // Opcional: Aquí puedes agregar lógica para desconectar el socket cuando el componente se desmonte.
    return () => {
      // socket.disconnect(); // Si necesitas desconectar el socket
      console.log('Socket desconectado');
    };
  }, []);  // El array vacío asegura que solo se ejecute una vez, cuando el componente se monta

  const renderVista = () => {
    // Lógica para renderizar las vistas internas
    return <div>Vista del dashboard</div>;  // Ejemplo
  };

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
  );
}

export default App;
