"use server";

import nodemailer from "nodemailer";
import { site } from "@/data/site";

/* =========================================================
   Envío de los formularios por SMTP de Gmail.
   Requiere en .env.local:
     GMAIL_USER            la cuenta de Gmail que envía
     GMAIL_APP_PASSWORD    contraseña de aplicación de 16 dígitos
     CONTACT_TO            destinatario (por defecto, GMAIL_USER)
   ========================================================= */

export type SendResult = { ok: true } | { ok: false; error: string };

const MAX = {
  short: 120,
  medium: 400,
  long: 4000,
};

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** Evita que un valor del formulario rompa el HTML del correo. */
const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

type Row = { label: string; value: string };

async function deliver(
  subject: string,
  rows: Row[],
  replyTo: string
): Promise<SendResult> {
  const transport = getTransport();

  if (!transport) {
    return {
      ok: false,
      error:
        "El envío de correo no está configurado todavía. Escríbanos directamente a " +
        site.email,
    };
  }

  const filled = rows.filter((r) => r.value);

  const text = filled.map((r) => `${r.label}: ${r.value}`).join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#3a3f41">
      <h2 style="color:#0b2b3c;margin:0 0 16px">${esc(subject)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${filled
          .map(
            (r) => `
          <tr>
            <td style="padding:7px 18px 7px 0;border-bottom:1px solid #e2e4e0;color:#5d6467;vertical-align:top;white-space:nowrap">
              ${esc(r.label)}
            </td>
            <td style="padding:7px 0;border-bottom:1px solid #e2e4e0;color:#0b2b3c;font-weight:bold">
              ${esc(r.value).replace(/\n/g, "<br>")}
            </td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#717874;font-size:12px">
        Enviado desde el formulario del sitio de ${esc(site.name)}.
      </p>
    </div>`;

  try {
    await transport.sendMail({
      from: `"${site.name} — sitio web" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[email] fallo al enviar:", error);
    return {
      ok: false,
      error:
        "No pudimos enviar el mensaje en este momento. Intente de nuevo o escríbanos a " +
        site.email,
    };
  }
}

/* ---------------- Formulario de contacto ---------------- */

export async function sendContact(form: {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  motivo: string;
  mensaje: string;
  trampa?: string;
}): Promise<SendResult> {
  // Campo señuelo: si viene lleno, es un bot
  if (clean(form.trampa, MAX.short)) return { ok: true };

  const nombre = clean(form.nombre, MAX.short);
  const apellido = clean(form.apellido, MAX.short);
  const correo = clean(form.correo, MAX.short);
  const mensaje = clean(form.mensaje, MAX.long);

  if (!nombre || !apellido || !mensaje) {
    return { ok: false, error: "Faltan datos obligatorios del formulario." };
  }
  if (!isEmail(correo)) {
    return { ok: false, error: "El correo electrónico no es válido." };
  }

  return deliver(
    `Consulta web: ${clean(form.motivo, MAX.short) || "Contacto"}`,
    [
      { label: "Nombre", value: `${nombre} ${apellido}` },
      { label: "Correo", value: correo },
      { label: "Teléfono", value: clean(form.telefono, MAX.short) },
      { label: "Motivo", value: clean(form.motivo, MAX.short) },
      { label: "Mensaje", value: mensaje },
    ],
    correo
  );
}

/* ---------------- Solicitud de cotización ---------------- */

export async function sendQuote(form: {
  tipos: string[];
  servicio: string;
  ubicacion: string;
  area: string;
  niveles: string;
  presupuesto: string;
  plazo: string;
  extras: string[];
  descripcion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fuente: string;
  disponibilidad: string;
  trampa?: string;
}): Promise<SendResult> {
  if (clean(form.trampa, MAX.short)) return { ok: true };

  const nombre = clean(form.nombre, MAX.short);
  const apellido = clean(form.apellido, MAX.short);
  const correo = clean(form.correo, MAX.short);
  const telefono = clean(form.telefono, MAX.short);

  if (!nombre || !apellido || !telefono) {
    return { ok: false, error: "Faltan datos obligatorios del formulario." };
  }
  if (!isEmail(correo)) {
    return { ok: false, error: "El correo electrónico no es válido." };
  }

  const list = (value: unknown) =>
    Array.isArray(value)
      ? value.map((v) => clean(v, MAX.short)).filter(Boolean).join(", ")
      : "";

  const tipos = list(form.tipos);

  return deliver(
    `Solicitud de cotización: ${tipos || "Proyecto"}`,
    [
      { label: "Nombre", value: `${nombre} ${apellido}` },
      { label: "Correo", value: correo },
      { label: "Teléfono", value: telefono },
      { label: "Tipo de proyecto", value: tipos },
      { label: "Servicio", value: clean(form.servicio, MAX.medium) },
      { label: "Ubicación", value: clean(form.ubicacion, MAX.short) },
      { label: "Área aproximada", value: clean(form.area, MAX.short) },
      { label: "Niveles", value: clean(form.niveles, MAX.short) },
      { label: "Presupuesto", value: clean(form.presupuesto, MAX.short) },
      { label: "Plazo", value: clean(form.plazo, MAX.short) },
      { label: "Servicios adicionales", value: list(form.extras) },
      { label: "Disponibilidad", value: clean(form.disponibilidad, MAX.medium) },
      { label: "Nos conoció por", value: clean(form.fuente, MAX.short) },
      { label: "Descripción", value: clean(form.descripcion, MAX.long) },
    ],
    correo
  );
}
