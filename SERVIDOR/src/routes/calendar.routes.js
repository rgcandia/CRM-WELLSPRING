const { Router } = require("express");
const router = Router();
const { crearEvento, editarEvento } = require("../services/calendarService.js");
const { Formulario } = require("../db.js");
const { emitEvent } = require("../services/socketService.js");
const { obtenerTodosFormularios } = require("../services/formularioService.js");

// POST /calendar/event → crea o edita según exista id_calendario
router.post("/event", async (req, res) => {
  const { formularioId, summary, description, start, end, attendees } = req.body;

  if (!formularioId || !summary || !start || !end) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios (formularioId, summary, start, end)" });
  }

  try {
    // 1️⃣ Buscar el formulario
    const formulario = await Formulario.findByPk(formularioId);
    if (!formulario) return res.status(404).json({ error: "Formulario no encontrado" });

    let evento;
    const esEdicion = formulario.data?.id_calendario; // si existe id_calendario → editamos
    if (esEdicion) {
      // 2️⃣ Editar evento existente
      evento = await editarEvento({
        eventId: formulario.data.id_calendario,
        summary,
        description,
        start,
        end,
        attendees,
      });
    } else {
      // 2️⃣ Crear nuevo evento
      evento = await crearEvento({ summary, description, start, end, attendees });
    }

    // 3️⃣ Actualizar formulario con id_calendario y fecha
    await formulario.update({
      scheduled: true,
      scheduleDate: start.dateTime || start,
      data: {
        ...formulario.data,
        id_calendario: evento.id, // guarda el id del evento
      },
    });

    // 4️⃣ Obtener todos los formularios actualizados
    const formularios = await obtenerTodosFormularios();

    // 5️⃣ Emitir alerta vía socket
    const alerta = {
      tipo: "success",
      mensaje: esEdicion
        ? `Se actualizó la reunión del formulario ${formularioId}`
        : `Se agendó la reunión para el formulario ${formularioId}`,
    };
    emitEvent("formulario-alerta", { alerta, formularios });

    res.status(201).json({ message: "✅ Evento procesado correctamente", event: evento });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo procesar el evento", details: err.message });
  }
});

module.exports = router;




/**
 
  {
  "summary": "Reunión con cliente nuevo",
  "description": "Revisión de propuesta comercial",
  "start": "2025-10-30T15:00:00-03:00",
  "end": "2025-10-30T16:00:00-03:00",
  "attendees": ["cliente@gmail.com", "otro@gmail.com"]
}
 
 */