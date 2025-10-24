import React, { useState } from 'react';
import styles from './RenderForm.module.css'; // Importamos el archivo CSS Module

const RenderForm = ({ formulario, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);  
  const [formData, setFormData] = useState({ ...formulario });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(formData);  
    setIsEditing(false); 
  };

  return (
    <div className={styles.formDetailsContainer}>
      <h3 className={styles.formTitle}>Detalles del Formulario</h3>
      <div className={styles.formDetails}>
        <div className={styles.formField}>
          <label>ID:</label>
          <input
            type="text"
            name="id_numerico"
            value={formData.id_numerico}
            disabled
            className={styles.formInput}
          />
        </div>
        <div className={styles.formField}>
          <label>Email:</label>
          <input
            type="email"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={!isEditing}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formField}>
          <label>Fecha de Creación:</label>
          <input
            type="text"
            name="createdAt"
            value={new Date(formData.createdAt).toLocaleString()}
            disabled
            className={styles.formInput}
          />
        </div>
     <div className={styles.formField}>
 
  <div className={styles.formCheckboxWrapper}> {/* Contenedor para checkbox y label */}
    <input
      type="checkbox"
      name="read"
      checked={formData.read}
      onChange={(e) => handleChange({ target: { name: 'read', value: e.target.checked } })}
      disabled={!isEditing}
      className={styles.formCheckbox}
    />
    <label htmlFor="read" className={styles.checkboxLabel}>Leído</label> {/* Aquí puedes ajustar el texto si lo deseas */}
  </div>
</div>

      </div>
      <div className={styles.actions}>
        <button onClick={handleEdit} disabled={isEditing} className={styles.buttonEdit}>
          Editar
        </button>
        <button onClick={handleSave} disabled={!isEditing} className={styles.buttonSave}>
          Guardar
        </button>
        <button onClick={onClose} className={styles.buttonClose}>
          × Cerrar
        </button>
      </div>
    </div>
  );
};

export default RenderForm;
