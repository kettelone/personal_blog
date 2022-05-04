const form = document.querySelector('form')
const emailError = document.querySelector('.email')
const passwordError = document.querySelector('.password')
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  //reset errors
  emailError.textContent = ''
  passwordError.textContent = ''

  // get values
  const email = form.email.value
  const password = form.password.value
  const nickname = form.nickname.value

  try {
    const res = await fetch('/signup', {
      method: 'post',
      mode: 'cors', // this cannot be 'no-cors'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nickname }),
    })
    const data = await res.json()
    console.log(data)
    if (data.errors) {
      console.log(emailError, passwordError)
      emailError.textContent = data.errors.email
      passwordError.textContent = data.errors.password
    }

    if (data.user) {
      location.assign('/')
    }
  } catch (err) {
    console.log(err)
  }
})
