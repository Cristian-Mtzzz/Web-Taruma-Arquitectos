/**
 * Comprueba que las credenciales de Gmail funcionan, sin pasar por el sitio.
 *
 *   npm run verificar-correo
 *
 * Primero conecta al SMTP para validar usuario y contraseña, y solo después
 * envía un correo de prueba al destinatario configurado.
 */

import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;

const falta = [];
if (!GMAIL_USER) falta.push("GMAIL_USER");
if (!GMAIL_APP_PASSWORD) falta.push("GMAIL_APP_PASSWORD");

if (falta.length) {
  console.error(`\n✗ Faltan variables en .env.local: ${falta.join(", ")}`);
  console.error("  Copie .env.example como .env.local y rellénelas.\n");
  process.exit(1);
}

if (/\s/.test(GMAIL_APP_PASSWORD)) {
  console.error(
    "\n✗ GMAIL_APP_PASSWORD tiene espacios. Google la muestra en grupos de 4,"
  );
  console.error("  pero debe pegarse como 16 caracteres seguidos.\n");
  process.exit(1);
}

const destino = CONTACT_TO || GMAIL_USER;

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

try {
  process.stdout.write("Conectando a smtp.gmail.com… ");
  await transport.verify();
  console.log("correcto.");

  process.stdout.write(`Enviando prueba a ${destino}… `);
  const info = await transport.sendMail({
    from: `"Taruma Arquitectos — sitio web" <${GMAIL_USER}>`,
    to: destino,
    subject: "Prueba de configuración del formulario",
    text:
      "Si recibió este correo, los formularios del sitio ya pueden enviar.\n" +
      "Puede borrar este mensaje.",
  });
  console.log("enviado.");
  console.log(`\n✓ Listo. Id del mensaje: ${info.messageId}`);
  console.log(`  Revise la bandeja de ${destino} (mire también Spam).\n`);
} catch (error) {
  console.log("falló.\n");
  console.error(`✗ ${error.message}\n`);
  if (String(error.message).includes("Username and Password not accepted")) {
    console.error("  Google rechazó las credenciales. Normalmente es porque:");
    console.error("   · la contraseña no es de aplicación, sino la normal;");
    console.error("   · la verificación en dos pasos no está activada;");
    console.error("   · la contraseña se pegó con espacios.\n");
  }
  process.exit(1);
}
