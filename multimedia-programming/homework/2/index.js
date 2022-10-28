const DAYS_ID = "#days"
const HOURS_ID = "#hours"
const MINUTES_ID = "#minutes"
const SECONDS_ID = "#seconds"

const SECONDS_IN_DAY = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60

const TIME_TO_REACH = new Date(`${new Date().getFullYear() + 1}-01-01`)

const getElement = (query) => document.querySelector(query)
function setValue(input, query) {
	const element = getElement(query)
	if (element.innerHTML !== input.toString()) {
		if (element.innerHTML !== "")element.style.animation="roll 0.2s 1 ease-in-out"
		element.innerHTML = input
	}
}
const setDays = (input) => setValue(input, DAYS_ID)
const setHours = (input) => setValue(input, HOURS_ID)
const setMinutes = (input) => setValue(input, MINUTES_ID)
const setSeconds = (input) => setValue(input, SECONDS_ID)
const setAnimationEndListener = (query) => getElement(query).addEventListener("animationend", animationEnd)


function init() {
	for (const id of [DAYS_ID, HOURS_ID, MINUTES_ID, SECONDS_ID]) {
		setAnimationEndListener(id)
	}

	frame()
}

function frame() {
	let seconds = (TIME_TO_REACH - new Date()) / 1000

	const days = Math.floor(seconds / SECONDS_IN_DAY)
	seconds -= days * SECONDS_IN_DAY

	const hours = Math.floor(seconds / SECONDS_IN_HOUR)
	seconds -= hours * SECONDS_IN_HOUR

	const minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
	seconds -= minutes * SECONDS_IN_MINUTE


	setDays(days)
	setHours(hours)
	setMinutes(minutes)
	setSeconds(Math.floor(seconds))
	requestAnimationFrame(frame);
}

function animationEnd(event) {
	event.target.style.animation = undefined
}

window.onload = init
