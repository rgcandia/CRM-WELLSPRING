import React, { useState } from 'react';

const RenderForm = ({ formulario, onClose, onSave }) => {
  // Usamos el estado local para gestionar los cambios en los inputs
  const [isEditing, setIsEditing] = useState(false);  // Para saber si estamos en modo edición
  const [formData, setFormData] = useState({ ...formulario });

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para habilitar el modo edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Función para guardar los cambios
  const handleSave = () => {
    onSave(formData);  // Llamamos al callback de guardar, pasando los datos actualizados
    setIsEditing(false); // Deshabilitamos el modo edición
  };

  return (
    <div className="formDetailsContainer">
      <h3>Detalles del Formulario</h3>
      <div className="formDetails">
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            disabled
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Fecha de Creación:</label>
          <input
            type="text"
            name="createdAt"
            value={new Date(formData.createdAt).toLocaleString()}
            disabled
          />
        </div>
        <div>
          <label>Leído:</label>
          <input
            type="checkbox"
            name="read"
            checked={formData.read}
            onChange={(e) => handleChange({ target: { name: 'read', value: e.target.checked } })}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="actions">
        <button onClick={handleEdit} disabled={isEditing}>
          Editar
        </button>
        <button onClick={handleSave} disabled={!isEditing}>
          Guardar
        </button>
        <button onClick={onClose}>
          × Cerrar
        </button>
      </div>
    </div>
  );
};

export default RenderForm;
