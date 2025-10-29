// routes/calendar.js
const { Router } = require('express');
const router = Router();
const { crearEvento } = require('../services/calendarService.js');

// POST /calendar/event
router.post('/event', async (req, res) => {
  const { summary, description, start, end } = req.body;

  if (!summary || !start || !end) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (summary, start, end)' });
  }

  try {
    const evento = await crearEvento({ summary, description, start, end });
    res.status(201).json({
      message: 'Evento creado correctamente',
      event: evento,
    });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear el evento', details: err.message });
  }
});

module.exports = router;

