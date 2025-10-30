const { Router } = require("express");
const router = Router();
const { crearEvento } = require("../services/calendarService.js");

// POST /calendar/event
router.post("/event", async (req, res) => {
  const { summary, description, start, end, attendees } = req.body;

  if (!summary || !start || !end) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios (summary, start, end)" });
  }

  try {
    // 🧠 attendees puede ser un array de emails, ej: ["juan@gmail.com", "maria@gmail.com"]
    const evento = await crearEvento({
      summary,
      description,
      start,
      end,
      attendees,
    });

    res.status(201).json({
      message: "✅ Evento creado correctamente con alerta e invitaciones enviadas",
      event: evento,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "No se pudo crear el evento", details: err.message });
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