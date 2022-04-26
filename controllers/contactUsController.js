const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
})

const contactUs = (req, res) => {
  const { name, message } = req.body

  const mailOptions = {
    from: 'bkrevsun@gmail.com',
    to: 'bkrevsun@gmail.com',
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
