import { useSelector, useDispatch } from 'react-redux';
import { selectFormulario } from '../../redux/slice.js';
import styles from './FormularioTable.module.css';
import RenderForm from '../RenderForm/RenderForm.jsx';

const FormularioTable = () => {
  const formularios = useSelector((state) => state.data.formularios);
  const selectedFormulario = useSelector((state) => state.data.selectedFormulario);
  const dispatch = useDispatch();

  // 🧠 Lógica para guardar cambios en el formulario
  const handleSaveFormulario = async (updatedForm) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/formulario/${updatedForm.id_numerico}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedForm),
      });

      if (!response.ok) throw new Error('Error al actualizar el formulario');

      const data = await response.json();
      console.log('✅ Formulario actualizado:', data);

      // Cerramos el detalle del formulario al guardar
      dispatch(selectFormulario(null));
    } catch (error) {
      console.error('❌ Error al guardar el formulario:', error);
      alert('No se pudo guardar el formulario');
    }
  };

  const handleSelectFormulario = (form) => {
    dispatch(selectFormulario(form));
    console.log('📄 Formulario seleccionado:', form);
  };

  if (formularios.length === 0) {
    return <p className={styles.noFormsMessage}>No hay formularios disponibles.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      {selectedFormulario ? (
        <RenderForm
          formulario={selectedFormulario}
          onClose={() => dispatch(selectFormulario(null))}
          onSave={handleSaveFormulario}
        />
      ) : (
        <div className={styles.list}>
          <h2 className={styles.title}>Formularios</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Fecha de Creación</th>
                <th>Fecha de Reunión</th>
                <th>Leídos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formularios.map((formulario) => (
                <tr key={formulario.id_numerico}>
                  <td>{formulario.id_numerico}</td>
                  <td>{formulario.email}</td>
                  <td>{new Date(formulario.createdAt).toLocaleString()}</td>
                  <td>
                    {formulario.scheduleDate
                      ? new Date(formulario.scheduleDate).toLocaleString()
                      : 'No concretada'}
                  </td>
                  <td>
                    {formulario.read ? (
                      <span style={{ color: 'green' }}>Leído</span>
                    ) : (
                      <span style={{ color: 'red' }}>No leído</span>
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
