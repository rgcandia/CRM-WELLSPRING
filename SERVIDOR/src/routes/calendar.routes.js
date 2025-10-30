const { Router } = require("express");
const router = Router();
const { crearEvento } = require("../services/calendarService.js"); // solo importar crearEvento
const { Formulario } = require("../db.js");
const { emitEvent } = require("../services/socketService.js");
const { obtenerTodosFormularios } = require("../services/formularioService.js");

// POST /calendar/event
router.post("/event", async (req, res) => {
  const { formularioId, summary, description, start, end, attendees } = req.body;

  if (!formularioId || !summary || !start || !end) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios (formularioId, summary, start, end)" });
  }

  try {
    // 1️⃣ Crear evento en Google Calendar y enviar correos
    const evento = await crearEvento({ summary, description, start, end, attendees });

    // 2️⃣ Actualizar formulario en la base de datos
    const formulario = await Formulario.findByPk(formularioId);
    if (formulario) {
      await formulario.update({
        scheduled: true,
        scheduleDate: start.dateTime || start,
      });
    }

    // 3️⃣ Obtener todos los formularios actualizados
    const formularios = await obtenerTodosFormularios();

    // 4️⃣ Crear alerta con mismo formato que tu otro endpoint
    const alerta = {
      tipo: "success",
      mensaje: `Se agendó la reunión para el formulario ${formularioId}`,
    };

    // 5️⃣ Emitir evento 'formulario-alerta' con alerta y formularios
    emitEvent("formulario-alerta", { alerta, formularios });

    res.status(201).json({
      message: "✅ Evento creado, correo enviado, formulario actualizado y sockets emitidos",
      event: evento,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear el evento", details: err.message });
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