const playButtons = document.querySelectorAll('.audio-cotrol-btn')
playButtons.forEach((item) => {
  item.addEventListener('click', (e) => {
    const audioUrl = e.target.dataset.url
    fetch(`/get-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioUrl }),
    })
      .then((data) => (window.location.href = '/audio-player'))
      .catch((err) => console.log(err))
  })
})

function play_aud(audioName) {
  const player = document.getElementById(audioName)
  const pauseButton = document.getElementById(`pause-${audioName}`)
  const playButton = document.getElementById(`play-${audioName}`)

  if (pauseButton.classList.contains('button-pressed')) {
    pauseButton.classList.remove('button-pressed')
  }
  playButton.classList.add('button-pressed')
  player.play()
  //some comment
}
function pause_aud(audioName) {
  const player = document.getElementById(audioName)
  const pauseButton = document.getElementById(`pause-${audioName}`)
  const playButton = document.getElementById(`play-${audioName}`)
  if (playButton.classList.contains('button-pressed')) {
    playButton.classList.remove('button-pressed')
  }
  pauseButton.classList.add('button-pressed')
  player.pause()
}
function stop_aud(audioName) {
  const player = document.getElementById(audioName)
  const pauseButton = document.getElementById(`pause-${audioName}`)
  const playButton = document.getElementById(`play-${audioName}`)
  playButton.classList.remove('button-pressed')
  pauseButton.classList.remove('button-pressed')

  player.pause()
  player.currentTime = 0
}
