import axios from "axios"
import { fabric } from "fabric"
import { useContext } from "react"
import { AuthContext } from "../../context/authContextProvider"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import ICoords from "../../interfaces/interface.coords"
import IFrontendText from "../../interfaces/interface.backendText"

export const getAllTexts = async (canvas: fabric.Canvas) => {
	const url = process.env.REACT_APP_BACKEND_URL + "/text/getAll"

	const res = await axios.get(url)

	const texts = res.data

	for (const text of texts) {
		// console.log(text)

		addIText(canvas, text.text, text.pos, text._id, true)
	}
}

export const deleteText = async (
	canvas: fabric.Canvas,
	text: fabric.Object
) => {
	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/text/"

		const response = await axios.delete(url, {
			data: {
				// @ts-expect-error
				id: text.vwb_id,
			},
		})

		if (!response) throw new Error("No response.")

		canvas.remove(text)
	} catch (err) {
		console.log(err)
	}
}

const addIText = async (
	canvas: fabric.Canvas,
	text: string,
	position: ICoords,
	_id: string | undefined,
	fromBackend: boolean
	// loggedIn: boolean
) => {
	const t = new fabric.IText(text, {
		left: position.x,
		top: position.y,
		lockUniScaling: true,
		editable: true, // for when someone else did it
		selectable: true, // for when someone else did it
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
	t._set("vwb_id", _id)

	// Selected Event
	t.on("selected", () => {
		// console.log("selected")
		// console.log(loggedIn)
	})

	t.on("mousedown", () => {
		const xy: ICoords = {
			x: t.left as number,
			y: t.top as number,
		}

		t._set("vwb_currentPosition", xy)

		// console.log(
		// 	`mousedown x: ${options.target.left}, y: ${options.target.top}`
		// )
	})

	t.on("moved", async () => {
		// console.log("moved")
		// // @ts-expect-error
		// t.vwb_moved = true

		checkViewportBoundaries(canvas, t)

		const pX = t.left
		const pY = t.top

		// // @ts-expect-error
		// console.log(`Text ${t.vwb_id} - pX: ${pX}, pY: ${pY}`)

		try {
			const url = process.env.REACT_APP_BACKEND_URL + "/text/"

			const response = await axios.put(url, {
				// @ts-expect-error
				id: t.vwb_id,
				x: pX,
				y: pY,
			})

			if (!response.data) {
			}
		} catch (err) {
			// @ts-expect-error
			t._set("left", t.vwb_currentPosition.x)

			// @ts-expect-error
			t._set("top", t.vwb_currentPosition.y)

			canvas.add(t)
		}

		// console.log(response.data)
	})

	t.on("editing:entered", () => {
		// console.log("Editing Entered.")
		t._set("vwb_currentContent", t.text)
	})

	t.on("editing:exited", async () => {
		// console.log("Editing exited.")

		// @ts-expect-error
		if (t.vwb_currentContent !== t.text) {
			try {
				const url = process.env.REACT_APP_BACKEND_URL + "/text/"

				const response = await axios.put(url, {
					// @ts-expect-error
					id: t.vwb_id,
					text: t.text,
				})

				if (!response.data) {
				}
			} catch (err) {
				// @ts-expect-error
				t._set("text", t.vwb_currentContent)

				canvas.add(t)
			}
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
		// console.log("TODO Save new text to Backend...")
		// Receive confirmation and _id

		try {
			const url = process.env.REACT_APP_BACKEND_URL + "/text/"

			var newText: IFrontendText = {
				text: text,
				x: position.x,
				y: position.y,
			}

			const response = await axios.post(url, newText)

			if (response.data.id) {
				t._set("vwb_id", response.data.id)
			}

			console.log("Success saving text.")
		} catch (err) {
			return
		}
	}

	canvas.add(t)
}

export default addIText
