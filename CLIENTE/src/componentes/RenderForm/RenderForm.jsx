import React, { useState } from 'react';
import styles from './RenderForm.module.css';

const RenderForm = ({ formulario, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...formulario });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name in prevData.data) {
        return {
          ...prevData,
          data: {
            ...prevData.data,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handlePostulanteChange = (e, index, key) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedPostulantes = [...prevData.data.postulantes];
      updatedPostulantes[index] = {
        ...updatedPostulantes[index],
        [key]: value,
      };

      return {
        ...prevData,
        data: {
          ...prevData.data,
          postulantes: updatedPostulantes,
        },
      };
    });
  };

  const handleSliderChange = (e) => {
    setIsEditing(e.target.checked);
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const formatLabel = (key) => {
    const map = {
      nombreApellido: "Nombre y Apellido",
      nivel: "Nivel",
      gradoPrimaria: "Grado Primaria",
      anioSecundaria: "Año Secundaria",
      salaInicial: "Sala Inicial",
      colegioActual: "Colegio Actual",
      fechaNacimiento: "Fecha de Nacimiento",
      nombreProgenitor1: "Nombre Progenitor 1",
      celularProgenitor1: "Celular Progenitor 1",
      nombreProgenitor2: "Nombre Progenitor 2",
      celularProgenitor2: "Celular Progenitor 2",
    };
    return map[key] || key;
  };

  const ordenCampos = [
    "nombreApellido",
    "fechaNacimiento",
    "nivel",
    "gradoPrimaria",
    "anioSecundaria",
    "salaInicial",
    "colegioActual",
    "nombreProgenitor1",
    "celularProgenitor1",
    "nombreProgenitor2",
    "celularProgenitor2"
  ];

  const camposCondicionales = ["anioSecundaria", "gradoPrimaria", "salaInicial"];

  return (
    <div className={`${styles.formDetailsContainer} ${isEditing ? styles.editing : ''}`}>
      <div className={styles.buttonWrapper}>
        <button onClick={onClose} className={styles.buttonCloseTop}>✖</button>
      </div>

      <h3 className={styles.formTitle}>Detalles del Formulario</h3>

      {/* 🔹 Sección: Datos Generales */}
      <div className={styles.card}>
        <h4 className={styles.sectionTitle}>Datos Generales</h4>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label>ID:</label>
            <input type="text" value={formData.id_numerico} disabled className={styles.formInput} />
          </div>

          <div className={styles.formField}>
            <label>Fecha de Creación:</label>
            <input
              type="text"
              value={new Date(formData.createdAt).toLocaleString()}
              disabled
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label>Ciclo:</label>
            <input
              type="text"
              name="ciclo"
              value={formData.data.ciclo}
              disabled={!isEditing}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      {/* 🔹 Sección: Postulantes */}
      <div className={styles.card}>
        <h4 className={styles.sectionTitle}>Postulantes</h4>
        <div className={styles.contenedorPostulantes}>
          {formData.data.postulantes.map((postulante, index) => (
            <div key={index} className={styles.postulanteCard}>
              <h5>Postulante {index + 1}</h5>
              <div className={styles.formGrid}>
                {ordenCampos.map((key) => {
                  const value = postulante[key];
                  if (camposCondicionales.includes(key) && value === null) return null;
                  return (
                    <div key={key} className={styles.formField}>
                      <label>{formatLabel(key)}:</label>
                  {key === "fechaNacimiento" ? (
  isEditing ? (
    // Cuando estás editando, usás el selector de fecha (type="date")
    <input
      type="date"
      value={value ? value.split("/").reverse().join("-") : ""} 
      onChange={(e) => handlePostulanteChange(e, index, key)}
      disabled={!isEditing}
      className={styles.formInput}
    />
  ) : (
    // Cuando no estás editando, mostrás la fecha formateada legiblemente
    <input
      type="text"
      value={value ? new Date(value).toLocaleDateString("es-AR") : ""}
      disabled
      className={styles.formInput}
    />
  )
) : (
  <input
    type="text"
    value={value ?? ""}
    onChange={(e) => handlePostulanteChange(e, index, key)}
    disabled={!isEditing}
    className={styles.formInput}
  />
)}

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* 🔹 Sección: Notas */}
      <div className={styles.card}>
        <h4 className={styles.sectionTitle}>Notas</h4>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={styles.textArea}
              placeholder="Escribe aquí tus observaciones o comentarios..."
            />
          </div>
        </div>
      </div>



      {/* 🔹 Sección: Estado y edición */}
      <div className={styles.card}>
        <h4 className={styles.sectionTitle}>Estado y Edición</h4>
        <div className={styles.estado}>
             <div className={styles.sliderContainer}>
            <label htmlFor="editSlider" className={styles.sliderLabel}>Habilitar Edición:</label>
            <input
              type="checkbox"
              id="editSlider"
              className={styles.slider}
              checked={isEditing}
              onChange={handleSliderChange}
            />
          </div>
          <div className={styles.formCheckboxWrapper}>
            <input
              type="checkbox"
              name="read"
              checked={formData.read}
              onChange={(e) =>
                handleChange({ target: { name: 'read', value: e.target.checked } })
              }
              disabled={!isEditing}
              className={styles.formCheckbox}
            />
            <label htmlFor="read">Leído</label>
          </div>

       
        </div>

        <div className={styles.actions}>
          <button onClick={handleSave} disabled={!isEditing} className={styles.buttonSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderForm;
