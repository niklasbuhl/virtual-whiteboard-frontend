import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import testImageURL from "../../functions/testImageURL"
import IBackendImage from "../../interfaces/interface.backendImage"
import ICoords from "../../interfaces/interface.coords"
import Coords from "../../interfaces/interface.coords"

export const getAllImages = async (canvas: fabric.Canvas) => {
	// console.log("Adding all images...")

	const url = process.env.REACT_APP_BACKEND_URL + "/image/getAll"

	// console.log(url)

	const res = await axios.get(url)

	const images = res.data

	for (const image of images) {
		// console.log(image)

		addImageURL(
			canvas,
			image.url,
			{ x: image.pos.x, y: image.pos.y },
			{ x: image.scale.x, y: image.scale.y },
			image._id,
			true
		)
	}
}

export const deleteImage = async (
	canvas: fabric.Canvas,
	image: fabric.Object
) => {
	// console.log("Delete image")

	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/image/"

		const response = await axios.delete(url, {
			data: {
				// @ts-expect-error
				id: image.vwb_id,
			},
		})

		if (response.status === 200) throw new Error("No response.")
		else console.log("Image deleted successfully")

		canvas.remove(image)
	} catch (err: any) {
		console.log(err)
	}
}

const addImageURL = async (
	canvas: fabric.Canvas,
	imageUrl: string,
	position: Coords,
	scale: {
		x: number
		y: number
	},
	_id: string | undefined,
	fromBackend: boolean
) => {
	try {
		// console.log("Testing URL.")
		// console.log(imageUrl)
		await testImageURL(imageUrl)

		const imgOptions: fabric.IImageOptions = {
			// srcFromAttribute: true,
			left: position.x,
			top: position.y,
			scaleX: scale.x,
			scaleY: scale.y,
			lockRotation: true,
			lockSkewingX: true,
			lockSkewingY: true,
			// editable: true, // for when someone else did it
			selectable: true, // for when someone else did it
		}

		const img = new fabric.Image(imageUrl, imgOptions)

		// console.log(`Image URL: ${imageUrl}`)
		img.setSrc(imageUrl)

		// Add id
		if (_id !== undefined) {
			// console.log(`Image ID: ${_id}`)
			img._set("vwb_id", _id)
		}

		// Add Functions

		// Mouse Down
		img.on("mousedown", () => {
			const xy: ICoords = {
				x: img.left as number,
				y: img.top as number,
			}

			img._set("vwb_currentPosition", xy)

			const scale = {
				x: img.scaleX,
				y: img.scaleY,
			}

			img._set("vwb_currentScale", scale)

			// console.log(
			// 	`mousedown x: ${options.target.left}, y: ${options.target.top}`
			// )
		})

		// URL
		const url = process.env.REACT_APP_BACKEND_URL + "/image/"

		// Moved
		img.on("moved", async () => {
			checkViewportBoundaries(canvas, img)

			const x = img.left
			const y = img.top

			// console.log(`Image move pX: ${x}, pY: ${y}`)

			try {
				// const url = process.env.REACT_APP_BACKEND_URL + "/image/"

				const response = await axios.put(url, {
					// @ts-expect-error
					id: img.vwb_id,
					posX: x,
					posY: y,
				})

				if (!response.data) {
				}
			} catch (err) {
				// @ts-expect-error
				img._set("left", img.vwb_currentPosition.x)

				// @ts-expect-error
				img._set("top", img.vwb_currentPosition.y)

				canvas.add(img)
			}
		})

		// Scaled
		img.on("scaled", async () => {
			checkViewportBoundaries(canvas, img)

			var scaleX = img.scaleX
			var scaleY = img.scaleY
			// console.log(`Image scale sX: ${scaleX}, sY: ${scaleY}`)

			try {
				// const url = process.env.REACT_APP_BACKEND_URL + "/image/"

				const response = await axios.put(url, {
					// @ts-expect-error
					id: img.vwb_id,
					scaleX: scaleX,
					scaleY: scaleY,
				})

				if (!response.data) {
				}
			} catch (err) {
				// @ts-expect-error
				img._set("scaleX", img.vwb_currentScale.x)

				// @ts-expect-error
				img._set("scaleY", img.vwb_currentScale.y)

				// @ts-expect-error
				img._set("left", img.vwb_currentPosition.x)

				// @ts-expect-error
				img._set("top", img.vwb_currentPosition.y)

				canvas.add(img)
			}
		})

		if (!fromBackend) {
			console.log("Save new text to Backend...")
			// Receive confirmation and _id

			var newImage: IBackendImage = {
				url: imageUrl,
				posX: position.x,
				posY: position.y,
				scaleX: scale.x,
				scaleY: scale.y,
			}

			const response = await axios.post(url, newImage)

			if (response.data.id) {
				img._set("vwb_id", response.data.id)
			}

			console.log("Success saving image.")
		}

		// For some reason loading images needs a small delay...
		setTimeout(function () {
			// console.log(img)
			canvas.add(img)
		}, 1)
	} catch (err) {
		console.log("Error saving image.")
		console.log(err)
		return
	}
}

export default addImageURL
