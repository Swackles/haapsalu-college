const CANVAS_ID = "#canvas"
const CONTAINER_ID = "html"
const RADIUS_RATIO = 0.7

const SECOND_HANDLE_LENGTH = 0.7
const SECOND_HANDLE_WIDTH = 1.5
const SECOND_HANDLE_COLOR = "#FF0000"

const MINUTE_HANDLE_LENGTH = 0.55
const MINUTE_HANDLE_WIDTH = 4
const MINUTE_HANDLE_COLOR = "#61afff"

const HOUR_HANDLE_LENGTH = 0.4
const HOUR_HANDLE_WIDTH = 7
const HOUR_HANDLE_COLOR = "#61afff"

const CLOCK_BACKGROUND_COLOR = "#2d2d2d"
const CLOCK_BORDER_COLOR = "#000000"
const CLOCK_TEXT_COLOR = "#1df52f"
const CLOCK_HANDLE_CAP_COLOR = "#4d4b63"

const getCanvas = () => document.querySelector(CANVAS_ID)
const getCanvasContext = () => getCanvas().getContext("2d")
const getScreenHeight = () => document.querySelector(CONTAINER_ID).clientHeight
const getScreenWidth = () => document.querySelector(CONTAINER_ID).clientWidth
const getScreenCenter = () => ({ x: getScreenWidth() / 2, y: getScreenHeight() / 2 })
const getClockRadius = () => Math.min(getScreenWidth(), getScreenHeight()) / 2 * RADIUS_RATIO
const getTextSize = () => getClockRadius() * 0.14
const hasScreenResized = () => getCanvas().width !== getScreenWidth() || getCanvas().height !== getScreenHeight()

function init() {
	requestAnimationFrame(frame)
}

function frame() {
	if (hasScreenResized()) setCanvasSize()
	clearCanvas()
	drawStaticClock()
	const date = new Date()
	drawHandle(date.getSeconds(), 60, SECOND_HANDLE_LENGTH, SECOND_HANDLE_WIDTH, SECOND_HANDLE_COLOR)
	drawHandle(date.getMinutes(), 60, MINUTE_HANDLE_LENGTH, MINUTE_HANDLE_WIDTH, MINUTE_HANDLE_COLOR)
	drawHandle(date.getHours() + date.getMinutes() / 60, 12, HOUR_HANDLE_LENGTH, HOUR_HANDLE_WIDTH, HOUR_HANDLE_COLOR)

	drawHandleCap()

	requestAnimationFrame(frame)
}

function setCanvasSize() {
	const canvas = getCanvas()
	canvas.width = getScreenWidth()
	canvas.height = getScreenHeight()
}

function clearCanvas() {
	ctx = getCanvasContext()

	ctx.clearRect(0, 0, getScreenWidth(), getScreenHeight())
	ctx.fillStyle = CLOCK_HANDLE_CAP_COLOR
	ctx.fillRect(0, 0, getScreenWidth(), getScreenHeight());

}

function drawStaticClock() {
	const { x, y } = getScreenCenter()
	let ctx = getCanvasContext()

	ctx.beginPath()
	ctx.arc(x, y, getClockRadius(), 0, 2 * Math.PI);
	ctx.fillStyle = CLOCK_BACKGROUND_COLOR
	ctx.fill()

	ctx.beginPath()
	ctx.arc(x, y, getClockRadius(), 0, 2 * Math.PI);
	ctx.lineWidth = 8
	ctx.filter = 'blur(1.5px)'
	ctx.strokeStyle = CLOCK_BORDER_COLOR;
	ctx.stroke();

	ctx.filter = 'none'

	const labels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	let degree = 180

	for (const label of labels ) {
		ctx.beginPath()
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		ctx.fillStyle = CLOCK_TEXT_COLOR
		ctx.font = `500 ${getTextSize()}px Arial`

		ctx.fillText(label,
			getClockRadius() * 0.85 * Math.sin(Math.PI * 2 * degree / 360) + x,
			getClockRadius() * 0.85 * Math.cos(Math.PI * 2 * degree / 360) + y
		)

		degree -= 360 / labels.length
	}
}

function drawHandle(value, maxValue, length, width, color) {
	const degree = 180 - value / maxValue * 360
	const ctx = getCanvasContext();
	const {x,y} = getScreenCenter()
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineWidth = width
	ctx.strokeStyle = color
	ctx.lineCap = 'round'

	ctx.lineTo(
		getClockRadius() * length * Math.sin(Math.PI * 2 * degree / 360) + x,
		getClockRadius() * length * Math.cos(Math.PI * 2 * degree / 360) + y
	);
	ctx.stroke();
}

function drawHandleCap() {
	const { x, y } = getScreenCenter()
	let ctx = getCanvasContext()

	ctx.beginPath()
	ctx.arc(x, y, getClockRadius() * 0.04, 0, 2 * Math.PI);
	ctx.fillStyle = CLOCK_HANDLE_CAP_COLOR
	ctx.fill()
}

window.onload = init
