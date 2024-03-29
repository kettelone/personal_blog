const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MY_USERNAME,
    pass: process.env.MY_PASSWORD,
  },
})

const contactUs = (req, res) => {
  const { name, message } = req.body

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    name: name,
    text: message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      res.render('contact-us', { message: 'Your message has been sent' })
    }
  })
}

module.exports = { contactUs }
