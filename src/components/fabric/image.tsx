import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import testImageURL from "../../functions/testImageURL"
import Coords from "../../interfaces/interface.coords"

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
	url: string,
	position: Coords,
	_id?: string | undefined,
	fromBackend?: boolean
) => {
	// Check URL
	console.log(url)

	try {
		await testImageURL(url)

		fabric.Image.fromURL(
			url,
			(img) => {
				// Scale Image to fit inside the canvas
				img.scale(0.5)

				// Add id
				// @ts-expect-error
				img.vwb_id = _id

				// Add Functions

				// Moved
				img.on("moved", () => {
					checkViewportBoundaries(canvas, img)

					const x = img.left
					const y = img.top

					console.log(`Image move pX: ${x}, pY: ${y}`)
					console.log("TODO Send update to backend...")
				})

				// Scaled
				img.on("scaled", () => {
					var scaleX = img.scaleX
					var scaleY = img.scaleY
					console.log(`Image scale sX: ${scaleX}, sY: ${scaleY}`)
					console.log("TODO Send update to backend...")
				})

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
