const deleteImgButton = document.querySelectorAll('.delete-img')
deleteImgButton.forEach((item) => {
  item.addEventListener('click', (e) => {
    const imgID = e.target.dataset.id
    fetch(`/delete-image/${imgID}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err))
  })
})
