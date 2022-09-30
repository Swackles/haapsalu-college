const START_ID = 1
const END_ID = 183
const BASE_URL = "https://tigu.hk.tlu.ee/~andrus.rinde/media/photos/tallinn600x450/tln_{{id}}.JPG"
const IMAGES_TO_ADD = 2
const IMAGE_ID = "photo{{id}}"
const OPACITY_VISIBLE = "1"
const OPACITY_INVISIBLE = "0"
let count = 0

const generateRandomImageId = () => Math.round(Math.random() * (END_ID - START_ID) + START_ID)
const getImageWithId = (id) => document.getElementById(IMAGE_ID.replace("{{id}}", id))
const generateUrl = () => BASE_URL.replace("{{id}}", generateRandomImageId())


window.onload = () => {
	const container = document.getElementById("gallery")

	for (let i = 0; i < IMAGES_TO_ADD; i++) {
		let element = document.createElement("img")
		element.src = generateUrl()
		element.alt = "Tallinna vaade"
		element.id = IMAGE_ID.replace("{{id}}", i)
		element.style.opacity = i === 0 ? OPACITY_VISIBLE : OPACITY_INVISIBLE

		container.appendChild(element)
	}

	document.addEventListener("click", switchImage)
}

function setImage(id) {
	getImageWithId(id).src = generateUrl()
}

function switchImage() {
	const lastImageId = count
	++count
	if (count >= IMAGES_TO_ADD) count = 0
	const nextImageId = count

	toggleOpacity(lastImageId)
	toggleOpacity(nextImageId)
	setImage(lastImageId)
}

function toggleOpacity(id) {
	const element = getImageWithId(id)
	element.style.opacity = element.style.opacity === OPACITY_INVISIBLE ? OPACITY_VISIBLE : OPACITY_INVISIBLE
}
