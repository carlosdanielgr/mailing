const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Create transporter using Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // Use true if using 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const register = `
<body style="text-align: center; max-width: 700px; margin: 20px auto; font-size: 16px">
  <div
    style="
      font-size: 20px;
      background-color: #aec59333;
      color: #999f86;
      padding: 20px;
      border-radius: 20px;
    "
  >
    <h1>¡Gracias por registrarte a nuestra Master Class de Yoga!</h1>
  </div>
  <p style="margin-top: 30px">¡Hola!</p>
  <p>
    Gracias por unirte a nuestra comunidad y registrarte en la Master Class de
    Yoga integral a la que podrás acceder de forma gratuita. Estoy muy
    emocionada de compartir esta experiencia contigo. No necesitas experiencia
    previa, solo tus ganas de disfrutar y conectar con tu cuerpo. Imagina cómo
    te sentirás al liberar el estrés, ganar flexibilidad y reconectar contigo
    misma en solo unos minutos al día. ¡Esto es más que ejercicio, es una
    transformación!
  </p>
  <p>
    Prepárate para disfrutar de una sesión especial diseñada para brindarte
    paz, bienestar y autoconfianza. Además, después de la clase, podrás
    inscribirte en nuestros programas online, que puedes seguir desde la
    comodidad de tu casa.
  </p>
  <a
    href="#"
    role="button"
    target="_blank"
    style="
      display: block;
      border-radius: 50px;
      text-decoration: none;
      max-width: fit-content;
      padding: 10px 20px;
      margin: 20px auto;
      color: #3d422e;
      background-color: #f3d573;
      cursor: pointer;
  "
  >
    CLICK PARA RESERVAR TU CLASE
  </a>
  <a
    href="#"
    role="button"
    target="_blank"
    style="
      display: block;
      border-radius: 50px;
      text-decoration: none;
      max-width: fit-content;
      padding: 10px 20px;
      margin: 20px auto;
      color: #3d422e;
      background-color: #aec593;
      cursor: pointer;
  "
  >
    CONOCE AQUÍ NUESTROS CURSOS
  </a>
  <p style="margin-top: 40px">Nos vemos pronto en el mat.</p>
  <span style="display: block">Con Amor,</span>
  <span style="display: block">Mirella Jaramillo </span>
  <span style="display: block">Yoga Integral & Bienestar</span>
</body>
`;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Puedes especificar un dominio en lugar de '*'
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route to send emails
app.post("/send-email", async (req, res) => {
  const { to, subject, type } = req.body;
  try {
    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      html: register, // HTML body (optional)
    };
    // Send email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Email sent: ${info.messageId}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
