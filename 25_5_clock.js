

// Declared variables
const sessionDefault = 1500000
const breakDefault = 300000
const min  = 60000
const sec = 1000
let sessionTime = 1500000
let breakTime = 300000
let count = 0
let cycle = 1
let timer = ['Session', sessionTime, 'Session']

// Functions
MinConverter = (time) => {
    return Math.floor(time / 60000)
}
TimeConverter = (time) => {
    secs = ((time % 60000)/1000).toFixed(0)
    return (MinConverter(time) + ':' + secs.padStart(2, '0'))
}

// Page elements
// Break section elements
let breakLabel = document.getElementById('break-label').innerHTML = '<h3>Break Length</h3>'
let breakLength = document.getElementById('break-length')
let breakIncrement = document.getElementById('break-increment')
let breakDecrement = document.getElementById('break-decrement')
// Session section elements
let sessionLabel = document.getElementById('session-label').innerHTML = '<h3>Session Length</h3>'
let sessionLength = document.getElementById('session-length')
let sessionIncrement = document.getElementById('session-increment')
let sessionDecrement = document.getElementById('session-decrement')
// Timer section elements
let timerLabel = document.getElementById('timer-label')
let timeLeft = document.getElementById('time-left')
let startStop = document.getElementById('start_stop')
let reset = document.getElementById('reset')

// Audio Elements
let beepAlert = new Audio('./assests/media/Radio Interruption-SoundBible.com-1434341263.mp3')
let finishedAlert = new Audio('./assests/media/Door Bell-SoundBible.com-1986366504.mp3')

// Page display
Update_Display = (timeMS, elementLength) => {
    timeMin = MinConverter(timeMS)
    elementLength.innerHTML = `<h3>${timeMin} mins</h3>`
}

Update_Timer_Display = () => {
    MMss = TimeConverter(timer[1])
    timerLabel.innerHTML = `<h3>${timer[0]} Cycle ${cycle}</h3>`
    timeLeft.innerHTML = `<h3>${MMss}</h3>`
}

// Timer Logic
setIntervals = () => {
    countdown = window.setInterval(() => {
        if (cycle == 5) {
            clearInterval(countdown)
            timer = ['Time Up', 0, 'Session']
            finishedAlert.play()
            Update_Timer_Display()
        }
        else if (timer[1] > 0) {
            Update_Timer_Display()
            timer[1] -= sec
        }
        else {
            beepAlert.play();
            Update_Timer_Display()
            if (timer[0] == 'Session') {
                timer = ['Break', breakTime, 'Break']
            }
            else {
                cycle ++
                timer = ['Session', sessionTime, 'Break']
            }
        }
    }, sec)
}

// Initializes or resets the page.
ResetVar = () => {
    sessionTime = sessionDefault
    breakTime = breakDefault
    count = 0
    cycle = 1
    timer = ['Session', sessionTime, 'Session']
    Update_Display(breakTime, breakLength)
    Update_Display(sessionTime, sessionLength)
    Update_Timer_Display()
}
// Increases the break time
breakIncrement.addEventListener('click', () =>{
    if (breakTime < 60 * min) {
        breakTime += min
        Update_Display(breakTime, breakLength)
    }
})

// Decreases the break time
breakDecrement.addEventListener('click', () =>{
    if (breakTime > 0) {
        breakTime -= min
        Update_Display(breakTime, breakLength)
    }
})

// Increases the session time
sessionIncrement.addEventListener('click', () =>{
    if (sessionTime < 60 * min) {
        sessionTime += min
        timer[1] = sessionTime
        Update_Display(sessionTime, sessionLength)
        Update_Timer_Display()
    }
})

// Decreases the session time
sessionDecrement.addEventListener('click', () =>{
    if (sessionTime > 0) {
        sessionTime -= min
        timer[1] = sessionTime
        Update_Display(sessionTime, sessionLength)
        Update_Timer_Display()
    }
})

startStop.addEventListener('click', () => {
    count += 1
    if (count%2 != 0) { 
        timer[0] = timer[2]
        setIntervals()   
            }         
    else if (count%2 == 0) {    
        clearInterval(countdown)
        timer = ['Paused', timer[1], timer[0]]
        Update_Timer_Display()
    }
})

// Reset button resets break-length to 5 and session length to 25
reset.addEventListener('click', () => {
    clearInterval(countdown)
    ResetVar() 
})

// Timer/Page Initialization
ResetVar()