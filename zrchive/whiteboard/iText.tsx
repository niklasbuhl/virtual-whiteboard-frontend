import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import Coords from "../../interfaces/interface.coords"
import IFrontendUser from "../../interfaces/interface.frontendUser"

export const getAllTexts = async (canvas: fabric.Canvas) => {
	console.log("Get all texts.")

	const url = process.env.REACT_APP_BACKEND_URL + "/text/getAll"

	const res = await axios.get(url)

	const texts = res.data

	// console.log("All Texts")
	// console.log(texts)

	for (const text of texts) {
		// console.log(text)

		addIText(canvas, text.text, text.pos, text._id, true, text.author)
	}
}

const addIText = (
	canvas: fabric.Canvas,
	text: string,
	position: Coords,
	_id: string | undefined,
	fromBackend: boolean,
	author: IFrontendUser
) => {
	const t = new fabric.IText(text, {
		left: position.x,
		top: position.y,
		lockUniScaling: true,
		// editable: true, // for when someone else did it
		// selectable: true, // for when someone else did it
		// fontFamily:
		// fontSize:
		lockRotation: true,
		lockScalingX: true,
		lockScalingY: true,
		lockSkewingX: true,
		lockSkewingY: true,
		hasControls: false,
	})

	// Add the ID

	// @ts-expect-error
	t.vwb_id = _id

	// Add the author

	// @ts-expect-error
	t.vwb_author = author

	// Selected Event
	// t.on("selected", () => {
	// 	console.log("selected")
	// })

	t.on("mousedown", () => {
		const xy: Coords = {
			x: t.left as number,
			y: t.top as number,
		}

		// @ts-expect-error
		t.vwb_currentPosition = xy

		// console.log(
		// 	`mousedown x: ${options.target.left}, y: ${options.target.top}`
		// )
	})

	t.on("moved", () => {
		// console.log("moved")
		// // @ts-expect-error
		// t.vwb_moved = true

		checkViewportBoundaries(canvas, t)

		const pX = t.left
		const pY = t.top

		console.log(`Text Moved2 - pX: ${pX}, pY: ${pY}`)
		console.log("TODO Send new position to backend...")
	})

	t.on("editing:entered", () => {
		// console.log("Editing Entered.")

		// @ts-expect-error
		t.vwb_currentContent = t.text
	})

	t.on("editing:exited", () => {
		// console.log("Editing exited.")

		// @ts-expect-error
		if (t.vwb_currentContent !== t.text) {
			console.log(`Text New Content: ${t.text}`)
			console.log("TODO Send new content to backend...")
		}
	})

	/*
	t.on("mouseup", (options) => {
		if (
			// @ts-expect-error
			t.vwb_moved &&
			options.target &&
			// @ts-expect-error
			options.transform.actionPerformed !== null
		) {
			// console.log("Action Performed.")
			console.log(
				`Text Moved pX: ${options.target.left}, pY: ${options.target.top}`
			)
			
			// console.log(options)

			// console.log(t.vwb_id)
		}

		// @ts-expect-error
		t.vwb_moved = false
	})
	*/

	// iText.on("event: changed", (options) => {
	// 	console.log("event: changed.")
	// })

	// iText.on("selection: changed", (options) => {
	// 	console.log("selection: changed.")
	// })

	if (!fromBackend) {
		console.log("TODO Save new text to Backend...")
		// Receive confirmation and _id

		// Add _id to the text object
	}

	canvas.add(t)
}

export default addIText
