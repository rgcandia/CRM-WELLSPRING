import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';  // Importa useDispatch de Redux
import { uploadFormularios } from './redux/slice';  // Importa la acción de Redux para cargar los formularios
import Nav from './componentes/Nav/Nav';
import Sidebar from './componentes/Sidebar/Sidebar';
import styles from './App.module.css';
import { startSocket } from './socket.js';  // Importa la función para iniciar el socket
import { listenForFormsArray } from './socket.js';  // Importa la función para escuchar los formularios

function App() {
  const [vistaActual, setVistaActual] = useState('dashboard');
  const dispatch = useDispatch();  // Usamos useDispatch para despachar acciones a Redux

  // Este useEffect ejecutará startSocket cuando el componente se monte
  useEffect(() => {
    // Ejecutamos startSocket para establecer la conexión al servidor
    startSocket();

    // Escuchar el evento 'FormsArray' para cargar los formularios en el estado global
    listenForFormsArray((formulariosRecibidos) => {
      // Despachamos la acción de Redux para cargar los formularios
      dispatch(uploadFormularios(formulariosRecibidos));
    });

    // Opcional: Aquí puedes agregar lógica para desconectar el socket cuando el componente se desmonte
    return () => {
      // Si necesitas desconectar el socket, puedes hacerlo aquí
      console.log('Socket desconectado');
    };
  }, [dispatch]);  // Solo se ejecuta una vez, al montar el componente

  const renderVista = () => {
    return <div>Vista del dashboard</div>;  // Lógica para renderizar las vistas internas
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

