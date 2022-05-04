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

  try {
    const res = await fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.errors) {
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
