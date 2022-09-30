const BELL_SOUND = new Audio("./assets/kell.mp3")
const HOUR_HAND_ID = "#hourhand"
const MINUTE_HAND_ID = "#minutehand"
const SECOND_HAND_ID = "#secondhand"
const INPUT_ID = "#allowSound"
let bellCount = 0

const setTransform = (id, deg) => { document.querySelector(id).style.transform = "rotate(" + (deg) + "deg)" }

function init() {
	clockTicking()

	BELL_SOUND.addEventListener("ended", () => {
		console.log("bell sound")
		if (--bellCount !== 0) BELL_SOUND.play()
	})
}

function clockTicking() {
	const timeNow = new Date(1664528400000)
	const data = {
		seconds: timeNow.getSeconds(),
		minutes: timeNow.getMinutes(),
		hours: timeNow.getHours()
	}

	transformClock(data)
	playFullHourSound(data)

	requestAnimationFrame(clockTicking);
}

function playFullHourSound({hours, minutes, seconds}) {
	if (!document.querySelector(INPUT_ID).checked || minutes !== 0 || seconds !== 0) return

	if (hours > 12) hours -= 12
	if (hours === 0) hours = 12

	bellCount = hours
	BELL_SOUND.play()
}

function transformClock({hours, minutes, seconds}) {
	setTransform(SECOND_HAND_ID, seconds * 6)
	setTransform(MINUTE_HAND_ID, minutes * 6 + seconds * .1)
	setTransform(HOUR_HAND_ID, hours  * 30 + minutes / 2)
}

window.onload = init
