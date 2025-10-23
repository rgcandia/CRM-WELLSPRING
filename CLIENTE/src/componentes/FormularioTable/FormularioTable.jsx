import { useSelector, useDispatch } from 'react-redux'; // Importamos useDispatch
import { selectFormulario } from '../slices/formularioSlice'; // Importamos la acción
import styles from './FormularioTable.module.css'; // Importamos el módulo CSS

const FormularioTable = () => {
  // Accedemos al array de formularios en el estado global
  const formularios = useSelector((state) => state.data.formularios);
  const dispatch = useDispatch(); // Accedemos al dispatch

  // Si no hay formularios, mostramos un mensaje
  if (formularios.length === 0) {
    return <p className={styles.noFormsMessage}>No hay formularios disponibles.</p>;
  }

  // Función para manejar la selección de un formulario
  const handleSelectFormulario = (id) => {
    dispatch(selectFormulario(id)); // Despachamos la acción con el id seleccionado
    console.log(`Formulario seleccionado: ${id}`);
  };

  return (
    <div className={styles.tableContainer}>
      <h2> Formularios</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha de Creación</th>
            <th>Leidos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((formulario) => (
            <tr key={formulario.id}>
              <td>{formulario.id}</td> 
              <td>{new Date(formulario.createdAt).toLocaleString()}</td>
              <td>
                {formulario.read ? (
                  <span style={{ color: 'green' }}> Leído</span>
                ) : (
                  <span style={{ color: 'red' }}> No leído</span>
                )}
              </td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSelectFormulario(formulario.id_numerico)}
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

export default FormularioTable;
