import { google } from "googleapis";

// --- SECCIÓN DE AUTENTICACIÓN CORREGIDA ---
// 1. Obtener la cadena Base64 de la variable de entorno
const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

if (!credentialsBase64) {
    throw new Error("ERROR: La variable GOOGLE_APPLICATION_CREDENTIALS_BASE64 no está definida.");
}

// 2. Decodificar la cadena Base64 a una cadena JSON (Buffer se encarga de los saltos de línea)
const credentialsJsonString = Buffer.from(credentialsBase64, 'base64').toString('utf8');

// 3. Parsear la cadena JSON en un objeto de credenciales
let credentials;
try {
    credentials = JSON.parse(credentialsJsonString);
} catch (e) {
    console.error("Error al parsear el JSON decodificado:", e);
    throw new Error("Las credenciales decodificadas no son un JSON válido.");
}
// --- FIN SECCIÓN DE AUTENTICACIÓN ---


const auth = new google.auth.GoogleAuth({
  credentials, // Objeto de credenciales listo para usar
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export async function crearEvento(data) {
  const event = {
    summary: data.summary,
    description: data.description || "",
    start: { dateTime: data.start, timeZone: "America/Argentina/Buenos_Aires" },
    end: { dateTime: data.end, timeZone: "America/Argentina/Buenos_Aires" },
  };

  const calendarId = "efc91cd9a940bd35369263ab4151770f6c1a17d76989d3eddd0cb110cd424995@group.calendar.google.com";

  try {
    const res = await calendar.events.insert({ calendarId, resource: event });
    return res.data;
  } catch (error) {
    console.error("Error creando evento:", error);
    throw new Error("No se pudo crear el evento");
  }
}