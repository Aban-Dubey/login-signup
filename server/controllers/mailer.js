import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, //generated ethereal email
        pass: process.env.EMAIL_PASS // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js"
    }
})

export const registerMail = async (req, res)=>{
    const { username, userEmail, text, subject } = req.body;

    //body of the email
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to our web application! Excited to have you onboard.",
            outro: "Need help, or have questions? Just reply to this Email."
        }
    }

    var emailBody = mailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    //send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg: "You should receive and email from us."})
    })
    .catch(error => res.status(500).send({error: "Cannot send register email!"}))
};