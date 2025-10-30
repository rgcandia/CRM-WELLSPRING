import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CalendarScheduler.module.css";

export default function CalendarScheduler({ onClose }) {
  const calendarSrc =
    "https://calendar.google.com/calendar/embed?src=efc91cd9a940bd35369263ab4151770f6c1a17d76989d3eddd0cb110cd424995%40group.calendar.google.com&ctz=America%2FArgentina%2FCordoba";

  const selectedFormulario = useSelector((state) => state.data.selectedFormulario);
  const mainEmail = selectedFormulario?.email || "";
  const formularioId = selectedFormulario?.id_numerico;

  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    start: "",
    end: "",
    extraAttendees: "",
  });

  const [loading, setLoading] = useState(false);

  // Resetea formData cuando cambia selectedFormulario
  useEffect(() => {
    setFormData({
      summary: "",
      description: "",
      start: "",
      end: "",
      extraAttendees: "",
    });
  }, [selectedFormulario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return "";
    return datetime.endsWith(":00") ? datetime + "-03:00" : datetime + ":00-03:00";
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formularioId) {
    alert("❌ No se seleccionó ningún formulario");
    return;
  }

  setLoading(true);

  const allAttendees = [
    mainEmail,
    ...formData.extraAttendees
      .split(",")
      .map((email) => email.trim())
      .filter((e) => e && e !== mainEmail),
  ].map((email) => ({ email }));

  const evento = {
    formularioId,
    summary: formData.summary.trim(),
    description: formData.description.trim(),
    start: {
      dateTime: formatDateTime(formData.start),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: formatDateTime(formData.end),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: allAttendees,
    // ✅ Enviar id_calendario si ya existe en data, sino null
    id_calendario: selectedFormulario?.data?.id_calendario || null,
  };

  try {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4001";
    const apiUrl = `${apiBase}/calendar/event`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP ${res.status}`);

    onClose();
  } catch (error) {
    console.error("Error creando o actualizando evento:", error);
    alert("❌ No se pudo procesar la reunión: " + error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>📅 Agendar reunión</h3>
          <button onClick={onClose} className={styles.closeButton} disabled={loading}>
            ✖
          </button>
        </div>

        <iframe
          src={calendarSrc}
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="summary"
            placeholder="Título de la reunión"
            value={formData.summary}
            onChange={handleChange}
            required
            className={styles.formInput}
            disabled={loading}
          />

          <textarea
            name="description"
            placeholder="Descripción (opcional)"
            value={formData.description}
            onChange={handleChange}
            className={styles.textArea}
            disabled={loading}
          />

          <div className={styles.row}>
            <div>
              <label>Inicio:</label>
              <input
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
                className={styles.formInput}
                disabled={loading}
              />
            </div>
            <div>
              <label>Fin:</label>
              <input
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleChange}
                required
                className={styles.formInput}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.attendeesSection}>
            <label>Invitados:</label>
            <input
              type="email"
              value={mainEmail}
              disabled
              className={`${styles.formInput} ${styles.disabledInput}`}
            />
            <input
              type="text"
              name="extraAttendees"
              placeholder="Otros correos separados por coma (opcional)"
              value={formData.extraAttendees}
              onChange={handleChange}
              className={styles.formInput}
              disabled={loading}
            />
          </div>

         <button
  type="submit"
  className={styles.submitButton}
  disabled={loading}
>
  {loading ? (
    <div className={styles.spinner}></div>
  ) : (
    "Agendar reunión 📆"
  )}
</button>

        </form>
      </div>
    </div>
  );
}
