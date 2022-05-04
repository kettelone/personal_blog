const menu = document.querySelectorAll('.dropbtn')
menu[0].addEventListener('click', (e) => {
  const dropDownMenu = document.querySelectorAll('.dropdown-content')
  const arrow = document.querySelectorAll('.fa')
  const clicked = document.querySelectorAll('.menu-clicked')
  if (clicked.length === 0) {
    dropDownMenu[0].classList.add('menu-clicked')
    arrow[0].classList.remove('fa-caret-down')
    arrow[0].classList.add('fa-caret-up')
  } else {
    dropDownMenu[0].classList.remove('menu-clicked')
    arrow[0].classList.remove('fa-caret-up')
    arrow[0].classList.add('fa-caret-down')
  }
})
