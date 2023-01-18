const PLAY_AREA_ID = "#play-area"
const VOLUME_ID = "#volume"
const PITCH_ID = "#pitch"

const audioApi = new AudioApi()

const getElement = query => document.querySelector(query)
const getPlayArea = () => getElement(PLAY_AREA_ID)
const getPitchElement = () => getElement(PITCH_ID)
const getVolumeElement = () => getElement(VOLUME_ID)

function init() {
	getPlayArea().addEventListener("mousedown", () => audioApi.play())
	getPlayArea().addEventListener("mouseup", () => audioApi.stop())

	getVolumeElement().addEventListener("input", e => audioApi.setBaseVolume(e.target.value))
	getPitchElement().addEventListener("input", e => audioApi.setBaseFrequency(e.target.value))

	getVolumeElement().value = audioApi.baseVolume
	getPitchElement().value = audioApi.baseFrequency

	getPlayArea().addEventListener("mousemove", e => {
		audioApi.setVolume(Math.round(100 - e.offsetY * 100 / e.target.clientHeight) / 100)
		audioApi.setFrequency(Math.round(100 - e.offsetX * 100 / e.target.clientWidth) / 100)
	})
}

window.onload = init
