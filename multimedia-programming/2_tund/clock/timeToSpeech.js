const SPEAKER_ID = "#speaker"
const BASE_URL = "https://tigu.hk.tlu.ee/~andrus.rinde/media/sounds/kellaheli/{{KEY}}.mp3"

const getTimeIsSoundUrl = () => getSoundUrl("kellon")
const getAndSoundUrl = () => getSoundUrl("ja")
const getZeroSoundUrl = () => getSoundUrl("0")
const getSoundUrl = (key) => BASE_URL.replace("{{KEY}}", key)
const getSpeaker = () => document.querySelector(SPEAKER_ID)

function playCurrentTime() {
	const timeNow = new Date()
	const sayList = [
		...numberToSpeech(timeNow.getHours()),
		getAndSoundUrl(),
		...numberToSpeech(timeNow.getMinutes())
	]

	const speaker = getSpeaker()
	speaker.src = getTimeIsSoundUrl()
	speaker.addEventListener("ended", () => {
		console.log(sayList)
		const say = sayList.shift()
		if (!say) return
		console.log(say)

		getSpeaker().src = say
		getSpeaker().play()
	})

	speaker.play()
}

function numberToSpeech(number) {
	if (number > 99 || number < 0) throw new Error("Invalid number")
	if (number < 10) return [
		getZeroSoundUrl(),
		getSoundUrl(number)
	]

	if (number > 10 && number < 20) return [
		getSoundUrl(number - 10),
		getSoundUrl("teist")
	]

	const [firstNumber, secondNumber] = number.toString().split("")

	return [
		getSoundUrl(firstNumber),
		getSoundUrl("kymmend"),
		getSoundUrl(secondNumber)
	]
}
