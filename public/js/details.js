//delete blog button handler
const trashcan = document.querySelector('a.delete')
trashcan.addEventListener('click', (e) => {
  const endpoint = `/blogs/${trashcan.dataset.doc}`
  fetch(endpoint, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect))
    .catch((err) => console.log(err))
})

//delete comment button handler
const trashcan_comment = document.querySelectorAll('a.delete-comment')
trashcan_comment.forEach((item) => {
  item.addEventListener('click', (e) => {
    const endpoint = `/blogs/${item.dataset.blog}/${item.dataset.comment}/comments`
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err))
  })
})

// sort comments
const sortButton = document.querySelector('.sort-by')
let notClicked = true
const sortArrow = document.querySelectorAll('.sort-by .fa')
sortButton.addEventListener('click', (e) => {
  let commentsDiv = document.getElementsByClassName('comments-container')[0]
  if (notClicked) {
    commentsDiv.style.setProperty('flex-direction', 'column-reverse')
    sortArrow[0].classList.remove('fa-caret-down')
    sortArrow[0].classList.add('fa-caret-up')
    notClicked = false
  } else {
    commentsDiv.style.setProperty('flex-direction', 'column')
    sortArrow[0].classList.remove('fa-caret-up')
    sortArrow[0].classList.add('fa-caret-down')
    notClicked = true
  }
})
