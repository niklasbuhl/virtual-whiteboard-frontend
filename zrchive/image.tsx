import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import testImageURL from "../../functions/testImageURL"
import IBackendImage from "../../interfaces/interface.backendImage"
import ICoords from "../../interfaces/interface.coords"
import Coords from "../../interfaces/interface.coords"

export const getAllImages = async (canvas: fabric.Canvas) => {
	console.log("Adding all images...")

	const url = process.env.REACT_APP_BACKEND_URL + "/image/getAll"

	console.log(url)

	const res = await axios.get(url)

	const images = res.data

	for (const image of images) {
		console.log(image)

		addImageURL(
			canvas,
			image.url,
			(image.pos.x, image.pos.y),
			(image.scale.x, image.scale.y),
			image._id,
			true
		)
	}
}

export const deleteImage = async (
	canvas: fabric.Canvas,
	image: fabric.Object
) => {
	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/image/"

		const response = await axios.delete(url, {
			data: {
				// @ts-expect-error
				id: image.vwb_id,
			},
		})

		if (response.status === 200) throw new Error("No response.")

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
	_id?: string | undefined,
	fromBackend?: boolean
) => {
	// Check URL
	console.log(imageUrl)

	try {
		await testImageURL(imageUrl)

		fabric.Image.fromURL(
			imageUrl,
			async (img) => {
				// Scale Image to fit inside the canvas
				if (fromBackend) {
					console.log("Image from backend.")

					img._set("scaleX", scale.x)
					img._set("scaleY", scale.y)
				} else {
					img.scale(0.5)
				}

				// Add id
				img._set("vwb_id", _id)

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

				// Moved
				img.on("moved", async () => {
					checkViewportBoundaries(canvas, img)

					const x = img.left
					const y = img.top

					console.log(`Image move pX: ${x}, pY: ${y}`)

					try {
						const url = process.env.REACT_APP_BACKEND_URL + "/image/"

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
						img._set("left", t.vwb_currentPosition.x)

						// @ts-expect-error
						img._set("top", t.vwb_currentPosition.y)

						canvas.add(img)
					}
				})

				// Scaled
				img.on("scaled", async () => {
					checkViewportBoundaries(canvas, img)

					var scaleX = img.scaleX
					var scaleY = img.scaleY
					console.log(`Image scale sX: ${scaleX}, sY: ${scaleY}`)

					try {
						const url = process.env.REACT_APP_BACKEND_URL + "/image/"

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
						img._set("scaleX", t.vwb_currentScale.x)

						// @ts-expect-error
						img._set("scaleY", t.vwb_currentScale.y)

						canvas.add(img)
					}
				})

				if (!fromBackend) {
					console.log("Save new text to Backend...")
					// Receive confirmation and _id

					try {
						const url = process.env.REACT_APP_BACKEND_URL + "/image/"

						var newImage: IBackendImage = {
							url: imageUrl,
							posX: position.x,
							posY: position.y,
							scaleX: 0.5,
							scaleY: 0.5,
						}

						const response = await axios.post(url, newImage)

						if (response.data.id) {
							img._set("vwb_id", response.data.id)
						}

						console.log("Success saving image.")
					} catch (err) {
						return
					}
				}

				// console.log(img)

				// Add to canvas
				canvas.add(img)
			},
			{
				// Options
				left: position.x,
				top: position.y,
			}
		)
	} catch (err) {
		console.log("Image error")
	}
}

export default addImageURL
