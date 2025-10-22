import { useSelector } from 'react-redux'; // Para acceder al estado de Redux
import styles from './FormularioTable.module.css';  // Importamos el módulo CSS

const FormularioTable = () => {
  // Accedemos al array de formularios en el estado global
  const formularios = useSelector((state) => state.data.formularios);

  // Si no hay formularios, mostramos un mensaje
  if (formularios.length === 0) {
    return <p className={styles.noFormsMessage}>No hay formularios disponibles.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <h2> Formularios</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((formulario) => (
            <tr key={formulario.id}>
              <td>{formulario.id}</td> 
              <td>{new Date(formulario.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSelectFormulario(formulario.id)}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Función de ejemplo para manejar la selección de un formulario
const handleSelectFormulario = (id) => {
  console.log(`Formulario seleccionado: ${id}`);
  // Aquí podrías despachar una acción o hacer algo más con el ID
};

export default FormularioTable;
