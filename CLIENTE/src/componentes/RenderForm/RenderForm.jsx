import React, { useState } from 'react';
import styles from './RenderForm.module.css'; // Importamos el archivo CSS Module

const RenderForm = ({ formulario, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);  
  const [formData, setFormData] = useState({ ...formulario });
  
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => {
    // Si el campo está dentro de data
    if (name in prevData.data) {
      return {
        ...prevData,
        data: {
          ...prevData.data,
          [name]: value,
        },
      };
    }

    // Si el campo está en el nivel raíz
    return {
      ...prevData,
      [name]: value,
    };
  });
};
const handlePostulanteChange = (e, index, key) => {
  const { value } = e.target;

  setFormData((prevData) => {
    // Creamos una copia del array de postulantes
    const updatedPostulantes = [...prevData.data.postulantes];

    // Actualizamos el valor del campo editado
    updatedPostulantes[index] = {
      ...updatedPostulantes[index],
      [key]: value,
    };

    // Retornamos el nuevo estado
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

  return (
    <div className={styles.formDetailsContainer}>
    <div className={styles.buttonWrapper}>  
      <button onClick={onClose} className={styles.buttonCloseTop}>
        X
      </button>
    </div>
      <h3 className={styles.formTitle}>Detalles del Formulario</h3>


      <div className={styles.formDetails}>
        
     <div className={styles.dosColumnas}>{/* clase fila agrupa dos input en dos filas */}
      {/*Detalles principales del formulario*/}
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
          <label>Fecha de Creación:</label>
          <input
            type="text"
            name="createdAt"
            value={new Date(formData.createdAt).toLocaleString()}
            disabled
            className={styles.formInput}
          />
      </div>
     </div>
     <div className={styles.dosColumnas}>
       <div className={styles.formField}>
          <label>Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={formData.data.ciclo}
            disabled={!isEditing}
            className={styles.formInput}
              onChange={handleChange}
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
     </div>
{/*Datos de los postulantes*/}
{/** contenedor de lospostulantes renderizados */}
<div className={styles.contenedorPostulantes}>
{formData.data.postulantes.map((postulante, index) => {
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

  // Definís el orden que querés visualizar
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

  // Filtramos los campos nulos según tu regla
  const camposCondicionales = ["anioSecundaria", "gradoPrimaria", "salaInicial"];

  return (
    <div key={index} className={styles.postulanteContainer}>
      <h5 className={styles.subTitle}>Postulante {index + 1}</h5>

      {ordenCampos.map((key) => {
        const value = postulante[key];
        if (camposCondicionales.includes(key) && value === null) return null;

        return (
          <div key={key} className={styles.formField}>
            <label>{formatLabel(key)}:</label>
            <input
              type="text"
              name={`postulantes.${index}.${key}`}
              value={value ?? ""}
              onChange={(e) => handlePostulanteChange(e, index, key)}
              disabled={!isEditing}
              className={styles.formInput}
              
            />
          </div>
        );
      })}
    </div>
  );
})}

</div>


{/** Se coloca separador un border,top */}
<div className={styles.separador}>
{/** Input de Leido */}

      <div className={styles.formField} style={{marginTop:'30px'}}>
          <div className={styles.formCheckboxWrapper}> 
            <input
              type="checkbox"
              name="read"
              checked={formData.read}
              onChange={(e) => handleChange({ target: { name: 'read', value: e.target.checked } })}
              disabled={!isEditing}
              className={styles.formCheckbox}
            />
            <label htmlFor="read" className={styles.checkboxLabel}>Leído</label>
          </div>
      </div>
      </div>
{/** Sector de edicion y guardado */}

    <div className={styles.dosColumnas}>
      
       {/* Slider para habilitar/deshabilitar la edición */}
 
       <div className={styles.sliderContainer}>
        <label htmlFor="editSlider" className={styles.sliderLabel}>
          Habilitar Edición:
        </label>
        <input
          type="checkbox"
          id="editSlider"
          className={styles.slider}
          checked={isEditing}
          onChange={handleSliderChange}
        />
      </div>


      <div className={styles.actions}>
        <button 
          onClick={handleSave} 
          disabled={!isEditing} 
          className={styles.buttonSave}>
          Guardar
        </button>
      
      </div>
    </div>

     
    </div>
     </div>
  );
};

export default RenderForm;
