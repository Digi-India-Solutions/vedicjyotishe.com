const nodemailer = require("nodemailer")

const transporte = nodemailer.createTransport({
    service:process.env.MAIL_SERVICE,
    auth:{
        user:process.env.SEND_MAIL_ID,
        pass:process.env.MAIL_PASSWORD
    }
})

module.exports = transporte