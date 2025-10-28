import { useSelector, useDispatch } from 'react-redux';
import { selectFormulario } from '../../redux/slice.js';
import styles from './FormularioTable.module.css';
import RenderForm from '../RenderForm/RenderForm.jsx';  // Asegúrate de importar el componente RenderForm

const FormularioTable = () => {
  // Accedemos al array de formularios en el estado global
  const formularios = useSelector((state) => state.data.formularios);
  const selectedFormulario = useSelector((state) => state.data.selectedFormulario);

  const dispatch = useDispatch();  // Accedemos al dispatch

  // Si no hay formularios, mostramos un mensaje
  if (formularios.length === 0) {
    return <p className={styles.noFormsMessage}>No hay formularios disponibles.</p>;
  }

  // Función para manejar la selección de un formulario
  const handleSelectFormulario = (form) => {
    dispatch(selectFormulario(form));  // Despachamos la acción con el id seleccionado
    console.log(`Formulario seleccionado: ${form}`);
  };

  return (
    <div className={styles.tableContainer}>
      {selectedFormulario ? (
        // Si hay un formulario seleccionado, lo mostramos
        <RenderForm
          formulario={selectedFormulario}
          onClose={() => dispatch(selectFormulario(null))} // Cerrar el formulario
          onSave={() => { /* Lógica para guardar los cambios */ }} 
        />
      ) : (
        <div className={styles.list}>
          <h2 className={styles.title}>   Formularios</h2>
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
                  <td>{formulario.email}</td>
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
                      onClick={() => handleSelectFormulario(formulario)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormularioTable;
