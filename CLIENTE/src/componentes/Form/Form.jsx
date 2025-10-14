import { useState } from 'react';
import PostulanteForm from './PostulanteForm.jsx';
import styles from './Form.module.css'
export default function Form() {
  const [email, setEmail] = useState('');
  const [ciclo, setCiclo] = useState('');

  const [postulantes, setPostulantes] = useState([]);
  const [adding, setAdding] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const handleAddPostulante = (data) => {
    setPostulantes(prev => [...prev, data]);
    setAdding(false);
  };

  const handleUpdatePostulante = (index, updatedData) => {
    const nuevos = [...postulantes];
    nuevos[index] = updatedData;
    setPostulantes(nuevos);
    setEditingIndex(null);
    setEditingData(null);
  };

  // Condición para habilitar el botón Enviar
  const puedeEnviar = postulantes.length > 0 && email.trim() !== '' && ciclo !== '';



  return (
    <div className={styles.container}>
      <div>
        <img src='/large_interno_wellspring.png' alt='logo del colegio wellspring'/>
      </div>
      <h1 className={styles.h1}>Formulario de Admision</h1>
      <p>Muchas gracias por su contacto. Por favor completá los datos solicitados. Nos comunicaremos a la brevedad.</p>

      <h2 className={styles.h2}>Información general</h2>

      <label className={styles.label}>
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="ejemplo@mail.com"
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Ciclo lectivo:
        <select
          value={ciclo}
          onChange={(e) => setCiclo(e.target.value)}
          required
          className={styles.input} // usá input para estilos de select también, o agregá otro className si querés
        >
          <option value="">Selecciona</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </label>

      <h2 className={styles.h2}>Postulantes</h2>

      {postulantes.length > 0 && (
        <ul className={styles.ul}>
          {postulantes.map((p, i) => (
            <li key={i} className={styles.li}>
              <strong>Postulante #{i + 1}</strong> {p.nombreApellido} – {p.nivel} – {p.salaInicial || p.gradoPrimaria || p.anioSecundaria}
              <button
                className={styles.editButton}
                onClick={() => {
                  setEditingIndex(i);
                  setEditingData(p);
                }}
                style={{ marginLeft: '1rem' }} // opcional: mejor hacer con clase
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      {!adding && editingIndex === null && (
        <button className={styles.addButton} onClick={() => setAdding(true)}>
          + Agregar postulante
        </button>
      )}

      {adding && (
        <PostulanteForm
          postulanteNumber={postulantes.length + 1}
          onCancel={() => setAdding(false)}
          onNext={handleAddPostulante}
        />
      )}

      {editingIndex !== null && editingData && (
        <PostulanteForm
          postulanteNumber={editingIndex + 1}
          initialData={editingData}
          onCancel={() => {
            setEditingIndex(null);
            setEditingData(null);
          }}
          onNext={(updated) => handleUpdatePostulante(editingIndex, updated)}
        />
      )}

      {/* Botón Enviar */}
     <div className={styles.submitContainer}>
  <button
    type="button"
    disabled={!puedeEnviar}
    onClick={() => {
      console.log('Enviar formulario:', { email, ciclo, postulantes });
      alert('Formulario enviado correctamente.');
    }}
    className={styles.button}
  >
    Enviar
  </button>
</div>

    </div>
  );
}
