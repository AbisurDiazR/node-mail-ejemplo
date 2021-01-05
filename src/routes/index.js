const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

//creamos la ruta que recibe los datos
router.post('/send-email',async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', //este es el servidor de correo de outlook
        port: 587, //el puerto del servicio SMTP
        secure: false, //normas de seguridad puestas en false
        auth: {
            user: 'fakedir@hotmail.com', //aqui va la cuenta de correo asociada a outlook
            pass: '***********' //la contraseña de dicha cuenta
        }
    });

    const info = await transporter.sendMail({
        from: "'Localhost test' <fakedir@hotmail.com>", // de donde sale
        to: 'nevog48413@aomrock.com', //a donde se envia
        subject: 'Website Contact Form', //el asunto del mensaje
        text: 'Esto es un texto plano',
        html: contentHTML //en caso de que quieras darle un formato html
    });

    console.log('Message Sent', info.messageId) //el message lo devuelve solo si logro enviar el mensaje

    //en este caso redireccionamos al archivo html que tienes en public
    res.redirect('/succes.html');
});

module.exports = router;