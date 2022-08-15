// HAMBURGER
const hamburger = document.querySelector('.hamburger-image')
const topNav = document.querySelector('.top-nav')
const body = document.querySelector('body')

const shade = document.createElement("div")
shade.classList.add("shade")

const changeState = () => {
  const hamburgerState = hamburger.getAttribute("src")
  if (hamburgerState == "images/icon-hamburger.svg") {
    hamburger.setAttribute("src", "images/icon-close.svg")
    topNav.style.visibility = "visible"
    body.appendChild(shade)
  }
  else {
    hamburger.setAttribute("src", "images/icon-hamburger.svg")
    topNav.style.visibility = "hidden"
    shade.remove()
  }
}

hamburger.addEventListener('click', changeState)


// SLIDER
const slider = document.querySelector('.slide-container')
const slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false;
let startPos = 0;
let currentX = (document.documentElement.clientWidth) / 4;
let prevX = (document.documentElement.clientWidth) / 2;
let animationID = 0;
let currentIndex = 1;

const mobileSize = window.matchMedia('(max-width: 870px)')

const animation = () => {
  slider.style.transform = `translateX(${currentX}px)`

  if (isDragging) {
    requestAnimationFrame(animation)
  }
}

const setPositionByIndex = () => {
  if (mobileSize.matches) {
    currentX = -(currentIndex * document.documentElement.clientWidth) + (document.documentElement.clientWidth * 1.5);
  }
  else {
    currentX = -(currentIndex * document.documentElement.clientWidth * 0.396) + (document.documentElement.clientWidth * 0.594);
  }

  prevX = currentX;
  slider.style.transform = `translateX(${currentX}px)`
}

const setCount = (index) => {
  const allCounts = document.querySelectorAll('.slide-counter > div')
  const currCount = document.querySelector(`.slide-count-${index}`)

  allCounts.forEach(el => {
    el.style.background = "transparent";
  })

  currCount.style.backgroundColor = "hsl(12, 88%, 59%)";
}

const touchStart = index => {
  return e => {
    isDragging = true;
    currentIndex = index;
    startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

    animationID = requestAnimationFrame(animation)

    slider.classList.add('grabbing')
  }
}

const touchEnd = () => {
  isDragging = false;
  cancelAnimationFrame(animationID)
  slider.classList.remove('grabbing')

  const movedBy = currentX - prevX

  if (movedBy < -((document.documentElement.clientWidth / 4)) && currentIndex < slides.length - 1) {
    currentIndex += 1;
    setCount(currentIndex)
  }

  if (movedBy > ((document.documentElement.clientWidth / 4)) && currentIndex > 0) {
    currentIndex -= 1
    setCount(currentIndex)
  }

  setPositionByIndex()
}

const touchMove = (e) => {
  if (isDragging) {
    const currentPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

    currentX = prevX + currentPos - startPos;
  }
}

slides.forEach((slide, index) => {
  const slideImg = slide.querySelector('img')
  slideImg.addEventListener('dragstart', e => e.preventDefault())

  // Touch Events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse Events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slider.addEventListener('mouseleave', touchEnd) // off screen
  slide.addEventListener('mousemove', touchMove)
})

// Slide Counter
const slideCount = document.querySelector('.slide-counter')

const currentCount = document.createElement("div")
currentCount.textContent = "test";

for (let i = 0; i < slides.length; i++) {
  const currentCount = document.createElement("div")
  currentCount.classList.add(`slide-count-${i}`)
  currentCount.classList.add("slide-count")
  slideCount.appendChild(currentCount)
}

setCount(1)


// FORM ERROR
const validateMail = (e) => {
  e.preventDefault()

  const mailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  const formError = document.querySelector(".form-error")
  const userInput = document.querySelector(".form-input")

  if (!userInput.value.match(mailRegex)) {
    formError.style.visibility = "visible"
    
    setTimeout(() => {
      formError.style.visibility = "hidden"
    }, 3500)
  }

  userInput.value = ""
}

document.querySelector(".input-container").addEventListener("submit", validateMail)