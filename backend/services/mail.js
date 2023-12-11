const nodemailer = require("nodemailer");
var config = require('config');
const mailUser = process.env.SMTPUSERID || ''
const mailPassword = process.env.SMPTUSERPASSWORD || ''
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPassword
    }
});

let sendmail = (toid,sub,text,html)=>{
    return transporter.sendMail({
        from: '"geekahmed"<geekahmed1@gmail.com>',
        to: toid,
        subject: sub,
        text: text,
        html: html || null
    });
}

module.exports = {sendmail}