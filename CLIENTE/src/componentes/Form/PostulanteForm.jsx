import { useState } from 'react';
import style from './PostulanteForm.module.css';

export default function PostulanteForm({ postulanteNumber, onCancel, onNext, initialData = {} }) {
  const [nivel, setNivel] = useState(initialData.nivel || '');
  const [salaInicial, setSalaInicial] = useState(initialData.salaInicial || '');
  const [gradoPrimaria, setGradoPrimaria] = useState(initialData.gradoPrimaria || '');
  const [anioSecundaria, setAnioSecundaria] = useState(initialData.anioSecundaria || '');

  const [nombreApellido, setNombreApellido] = useState(initialData.nombreApellido || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(initialData.fechaNacimiento || '');
  const [colegioActual, setColegioActual] = useState(initialData.colegioActual || '');
  const [nombreProgenitor1, setNombreProgenitor1] = useState(initialData.nombreProgenitor1 || '');
  const [celularProgenitor1, setCelularProgenitor1] = useState(initialData.celularProgenitor1 || '');
  const [nombreProgenitor2, setNombreProgenitor2] = useState(initialData.nombreProgenitor2 || '');
  const [celularProgenitor2, setCelularProgenitor2] = useState(initialData.celularProgenitor2 || '');

  const canContinue = () => {
    if (!nivel) return false;
    if (nivel === 'INICIAL' && !salaInicial) return false;
    if (nivel === 'PRIMARIA' && !gradoPrimaria) return false;
    if (nivel === 'SECUNDARIA' && !anioSecundaria) return false;
    if (
      !nombreApellido ||
      !fechaNacimiento ||
      !colegioActual ||
      !nombreProgenitor1 ||
      !celularProgenitor1 ||
      !nombreProgenitor2 ||
      !celularProgenitor2
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canContinue()) {
      const data = {
        nivel,
        salaInicial: nivel === 'INICIAL' ? salaInicial : null,
        gradoPrimaria: nivel === 'PRIMARIA' ? gradoPrimaria : null,
        anioSecundaria: nivel === 'SECUNDARIA' ? anioSecundaria : null,
        nombreApellido,
        fechaNacimiento,
        colegioActual,
        nombreProgenitor1,
        celularProgenitor1,
        nombreProgenitor2,
        celularProgenitor2
      };
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h3 className={style.titulo}>POSTULANTE #{postulanteNumber} </h3>

      <label className={style.label}>
        Nivel:
        <select
          value={nivel}
          onChange={(e) => {
            setNivel(e.target.value);
            setSalaInicial('');
            setGradoPrimaria('');
            setAnioSecundaria('');
          }}
          required
          className={style.select}
        >
          <option value="">Selecciona</option>
          <option value="INICIAL">Inicial</option>
          <option value="PRIMARIA">Primaria</option>
          <option value="SECUNDARIA">Secundaria</option>
        </select>
      </label>

      {nivel === 'INICIAL' && (
        <label className={style.label}>
          A qué sala ingresa?:
          <select
            value={salaInicial}
            onChange={(e) => setSalaInicial(e.target.value)}
            required
            className={style.select}
          >
            <option value="">Selecciona</option>
            <option value="K1">K1</option>
            <option value="K2">K2</option>
            <option value="K3">K3</option>
            <option value="K4">K4</option>
            <option value="K5">K5</option>
          </select>
        </label>
      )}

      {nivel === 'PRIMARIA' && (
        <label className={style.label}>
          A qué grado ingresa?:
          <select
            value={gradoPrimaria}
            onChange={(e) => setGradoPrimaria(e.target.value)}
            required
            className={style.select}
          >
            <option value="">Selecciona</option>
            <option value="1EP">1EP</option>
            <option value="2EP">2EP</option>
            <option value="3EP">3EP</option>
            <option value="4EP">4EP</option>
            <option value="5EP">5EP</option>
            <option value="6EP">6EP</option>
          </select>
        </label>
      )}

      {nivel === 'SECUNDARIA' && (
        <label className={style.label}>
          A qué año ingresa?:
          <select
            value={anioSecundaria}
            onChange={(e) => setAnioSecundaria(e.target.value)}
            required
            className={style.select}
          >
            <option value="">Selecciona</option>
            <option value="1ES">1ES</option>
            <option value="2ES">2ES</option>
            <option value="3ES">3ES</option>
            <option value="4ES">4ES</option>
            <option value="5ES">5ES</option>
            <option value="6ES">6ES</option>
          </select>
        </label>
      )}

      <h4 className={style.subtitulo}>Datos personales del postulante</h4>

      <label className={style.label}>
        Nombre y Apellido:
        <input
          type="text"
          value={nombreApellido}
          onChange={(e) => setNombreApellido(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Fecha de Nacimiento:
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Jardín/Colegio al que asiste:
        <input
          type="text"
          value={colegioActual}
          onChange={(e) => setColegioActual(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <h4 className={style.subtitulo}>Datos de contacto de los progenitores</h4>

      <label className={style.label}>
        Nombre y Apellido progenitor/a 1:
        <input
          type="text"
          value={nombreProgenitor1}
          onChange={(e) => setNombreProgenitor1(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Celular de contacto:
        <input
          type="tel"
          value={celularProgenitor1}
          onChange={(e) => setCelularProgenitor1(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Nombre y Apellido progenitor/a 2:
        <input
          type="text"
          value={nombreProgenitor2}
          onChange={(e) => setNombreProgenitor2(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <label className={style.label}>
        Celular de contacto:
        <input
          type="tel"
          value={celularProgenitor2}
          onChange={(e) => setCelularProgenitor2(e.target.value)}
          required
          className={style.input}
        />
      </label>

      <div className={style.botones}>
        <button
          type="submit"
          className={style.botonGuardar}
          disabled={!canContinue()}
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={style.botonCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
