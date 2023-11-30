const startButton = document.querySelector('.startButton')
const resetButton = document.querySelector('.resetButton')
const displayCount = document.getElementById('counter')
const numberBreak = document.querySelector('.breakNumber')
const numberSession = document.querySelector('.sessionNumber')
const subBreak = document.querySelector('.breakSub')
const sumBreak = document.querySelector('.breakSum')
const subSession = document.querySelector('.sessionSub')
const sumSession = document.querySelector('.sessionSum')
const buttons = document.querySelector('.buttons')
const pauseButton = document.querySelector('.pauseButton')
const title = document.querySelector('p')

startButton.addEventListener('click', runOrPauseCount)
resetButton.addEventListener('click', reset)
sumBreak.addEventListener('click', addBreak)
subBreak.addEventListener('click', lessBreak)
sumSession.addEventListener('click', addSession)
subSession.addEventListener('click', lessSession)

let isContinue = false
let minute = Number(numberSession.innerText);
let sessionNumber = 0;
let seconds = 0;
let timer = null
let itsOver = false

let countBreak = numberBreak.innerText
let countSession = numberSession.innerText

function runOrPauseCount() {
    if (isContinue) {
        return pause()
    }

    sumSession.disabled = true
    subSession.disabled = true
    subSession.style.cursor = "not-allowed"
    sumSession.style.cursor = "not-allowed"
    sumBreak.disabled = true
    subBreak.disabled = true
    sumBreak.style.cursor = "not-allowed"
    subBreak.style.cursor = "not-allowed"

    timer = setInterval(() => {
        if (minute === 0 && seconds === 0) {
            isContinue = false

            sumSession.disabled = false
            subSession.disabled = false
            subSession.style.cursor = "pointer"
            sumSession.style.cursor = "pointer"
            sumBreak.disabled = false
            subBreak.disabled = false
            sumBreak.style.cursor = "pointer"
            subBreak.style.cursor = "pointer"

            if (itsOver) {
                title.innerHTML = 'SESSION'
                itsOver = false
                minute = Number(numberSession.innerText);
                startButton.innerHTML = 'Start'
                const printSession = `${String(minute).padStart(2, '0')}:00`
                displayCount.innerHTML = printSession
            } else {
                title.innerHTML = 'BREAK'
                minute = Number(numberBreak.innerText)
                itsOver = true
                startButton.innerHTML = 'Start'
                const printSession = `${String(minute).padStart(2, '0')}:00`
                displayCount.innerHTML = printSession

            }

            clearInterval(timer)
            return
        }

        if (!seconds) {
            minute--
            seconds = 59
            displayCount.textContent = (`${String(minute).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
            return
        }
        seconds--
        displayCount.textContent = (`${String(minute).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

    }, 1000)

    startButton.innerHTML = 'Pause'
    isContinue = true

}

function toContinue() {
    start(true)
}

function reset() {
    clearInterval(timer)
    const printSession = `${String(countSession).padStart(2, '0')}:00`
    minute = countSession
    seconds = 0
    displayCount.innerHTML = printSession
    sumSession.disabled = false
    subSession.disabled = false
    subSession.style.cursor = "pointer"
    sumSession.style.cursor = "pointer"
    sumBreak.disabled = false
    subBreak.disabled = false
    sumBreak.style.cursor = "pointer"
    subBreak.style.cursor = "pointer"

    startButton.innerHTML = 'Start'
    isContinue = false
    itsOver = false
}

function pause() {
    clearInterval(timer)
    startButton.innerHTML = 'Start'
    isContinue = false
}

let sec = 0

function counter() {
    sec++
    document.getElementById('counter').innerText = sec
}

function addBreak() {
    countBreak++
    if (itsOver) {
        minute = countBreak
        const printSession = `${String(minute).padStart(2, '0')}:00`

        displayCount.innerHTML = printSession
    }

    numberBreak.innerHTML = countBreak
}

function lessBreak() {
    countBreak--

    if (countBreak < 5) {
        countBreak++
    }
    if (countBreak < 0) {
        return reset()
    }

    if (itsOver) {
        minute = countBreak
        const printSession = `${String(minute).padStart(2, '0')}:00`

        displayCount.innerHTML = printSession
    }

    numberBreak.innerHTML = countBreak
    numberBreak.innerHTML = countBreak

}

function addSession() {
    if (countSession) {
        countSession++
        numberSession.innerHTML = countSession
        minute = countSession

        const printSession = `${String(minute).padStart(2, '0')}:00`

        displayCount.innerHTML = printSession
    }
}

function lessSession() {
    countSession--

    if (countSession < 15) {
        countSession++
    }

    if (countSession < 0) {
        return reset()
    }
    numberSession.innerHTML = countSession
    minute = countSession

    const printSession = `${String(minute).padStart(2, '0')}:00`
    displayCount.innerHTML = printSession
}