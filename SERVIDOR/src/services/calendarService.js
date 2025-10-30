import { google } from "googleapis";

// --- AUTENTICACIÓN DESDE VARIABLE BASE64 ---
const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

if (!credentialsBase64) {
  throw new Error("ERROR: La variable GOOGLE_APPLICATION_CREDENTIALS_BASE64 no está definida.");
}

let credentials;
try {
  const credentialsJsonString = Buffer.from(credentialsBase64, "base64").toString("utf8");
  credentials = JSON.parse(credentialsJsonString);
} catch (e) {
  console.error("Error al parsear el JSON decodificado:", e);
  throw new Error("Las credenciales decodificadas no son un JSON válido.");
}
// --- FIN AUTENTICACIÓN ---

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

// 🧠 FUNCIÓN PRINCIPAL PARA CREAR EVENTO
export async function crearEvento({ summary, description, start, end, attendees = [] }) {
  const event = {
    summary,
    description: description || "",
    start: {
      dateTime: start,
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: end,
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: attendees.map(email => ({ email })), // 📧 lista de invitados
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 120 }, // 🔔 recordatorio 2 horas antes
        { method: "email", minutes: 120 }, // 📩 también correo 2 horas antes
      ],
    },
  };

  // 🗓️ tu calendario (podés usar 'primary' si querés el principal)
  const calendarId = "efc91cd9a940bd35369263ab4151770f6c1a17d76989d3eddd0cb110cd424995@group.calendar.google.com";

  try {
    const res = await calendar.events.insert({
      calendarId,
      resource: event,
      sendUpdates: "all", // 👈 envía correos a los asistentes
    });

    return res.data;
  } catch (error) {
    console.error("Error creando evento:", error);
    throw new Error("No se pudo crear el evento");
  }
}
