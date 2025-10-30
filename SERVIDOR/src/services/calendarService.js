import { google } from "googleapis";
import nodemailer from "nodemailer";

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

// --- AUTENTICACIÓN CON GOOGLE CALENDAR ---
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

// --- CONFIGURACIÓN DE NODEMAILER ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 👉 tu correo Gmail
    pass: process.env.EMAIL_PASS, // 👉 tu contraseña o app password
  },
});

// 🧠 FUNCIÓN PRINCIPAL PARA CREAR EVENTO + ENVIAR CORREO
export async function crearEvento({ summary, description, start, end, attendees = [] }) {
  // 🔹 Normalizar los correos de asistentes
  const validEmails = attendees
    .map(a => (typeof a === "string" ? a.trim() : a.email))
    .filter(email => email && email.includes("@"));

  // 📅 Crear evento en Google Calendar (sin invitaciones)
  const event = {
    summary,
    description: description || "",
    start: {
      dateTime: start.dateTime || start,
      timeZone: start.timeZone || "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: end.dateTime || end,
      timeZone: end.timeZone || "America/Argentina/Buenos_Aires",
    },
  };

  const calendarId =
    "efc91cd9a940bd35369263ab4151770f6c1a17d76989d3eddd0cb110cd424995@group.calendar.google.com";

  let eventoCreado;
  try {
    const res = await calendar.events.insert({
      calendarId,
      resource: event,
      sendUpdates: "none", // ❌ no intenta enviar invitaciones
    });
    eventoCreado = res.data;
    console.log("✅ Evento creado en el calendario:", eventoCreado.htmlLink);
  } catch (error) {
    console.error("Error creando evento:", error.response?.data || error.message);
    throw new Error(error.message || "No se pudo crear el evento");
  }

  // ✉️ Enviar correos informativos a los asistentes
  try {
    const subject = `Invitación a reunión: ${summary}`;
    const formattedStart = new Date(start.dateTime || start).toLocaleString("es-AR", {
      dateStyle: "full",
      timeStyle: "short",
    });
    const formattedEnd = new Date(end.dateTime || end).toLocaleString("es-AR", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const htmlBody = `
      <h2>📅 Invitación a reunión</h2>
      <p><b>Tema:</b> ${summary}</p>
      <p><b>Descripción:</b> ${description || "Sin descripción"}</p>
      <p><b>Inicio:</b> ${formattedStart}</p>
      <p><b>Fin:</b> ${formattedEnd}</p>
      <p><a href="${eventoCreado.htmlLink}" target="_blank">Ver evento en Google Calendar</a></p>
    `;

    if (validEmails.length > 0) {
      await transporter.sendMail({
        from: `"Agenda BOT" <${process.env.EMAIL_USER}>`,
        to: validEmails.join(","),
        subject,
        html: htmlBody,
      });

      console.log("✅ Correos informativos enviados a:", validEmails.join(", "));
    }
  } catch (error) {
    console.error("❌ Error enviando correos:", error.message);
  }

  return eventoCreado;
}
