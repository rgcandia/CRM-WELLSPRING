import { google } from "googleapis";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const auth = new google.auth.GoogleAuth({
  credentials,
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
