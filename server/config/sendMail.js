const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "anhle7543@gmail.com",
            pass: "ggowrkjqfrdekqak"
        }
    });

    await transporter.sendMail({
        from: "abc@gmail.com",
        to,
        subject,
        html
    });
};

module.exports = sendMail;