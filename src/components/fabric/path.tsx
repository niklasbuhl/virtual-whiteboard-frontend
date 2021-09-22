import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"
import IBackendPath from "../../interfaces/interface.backendPath"
import ICoords from "../../interfaces/interface.coords"

export const getAllPaths = async (canvas: fabric.Canvas) => {
	const url = process.env.REACT_APP_BACKEND_URL + "/path/getAll"

	// console.log(url)

	const res = await axios.get(url)

	const paths = res.data

	for (const path of paths) {
		addPathFromBackend(
			canvas,
			path._id,
			path.path,
			{
				x: path.pos.x,
				y: path.pos.y,
			},
			{
				x: path.originPos.x,
				y: path.originPos.y,
			}
		)
	}
}

export const deletePath = async (
	canvas: fabric.Canvas,
	path: fabric.Object
) => {
	try {
		const url = process.env.REACT_APP_BACKEND_URL + "/path/"

		const response = await axios.delete(url, {
			data: {
				// @ts-expect-error
				id: path.vwb_id,
			},
		})

		if (!response) throw new Error("No response.")

		canvas.remove(path)
	} catch (err) {
		console.log(err)
	}
}

interface IPathInfo {
	pathStr: string
	pX: number
	pY: number
}

export const getPathInfo = (path: fabric.Path): IPathInfo => {
	const pathInfo = {
		pathStr: pathArrayToString(path.path),
		pX: path.left as number,
		pY: path.top as number,
	}

	return pathInfo
}

// @ts-expect-error
export const pathArrayToString = (pathArray: fabric.Path.path): string => {
	var str: string = JSON.stringify(pathArray)

	// console.log(str)

	var regex = /\[/g

	str = str.replace(regex, "")

	regex = /\]/g

	str = str.replace(regex, "")

	regex = /",/g

	str = str.replace(regex, "")

	regex = /"/g

	str = str.replace(regex, "")

	// console.log(str)

	return str
}

const editPath = (canvas: fabric.Canvas, path: fabric.Path) => {
	// Edit Appearance

	path._set("hasControls", false)
	path._set("stroke", "#000000")
	path._set("strokeWidth", 4)
	path._set("strokeLineCap", "square")
	path._set("perPixelTargetFind", true)

	/*
  opt.path.strokeDashArray = [10, 5]
  opt.path.strokeDashOffset = 2
  opt.path.cornerStyle = "rect"
  opt.path.cornerSize = 10
  opt.path.strokeUniform = true		
  */

	// ID

	path.on("mousedown", () => {
		const xy: ICoords = {
			x: path.left as number,
			y: path.top as number,
		}

		path._set("vwb_currentPosition", xy)
	})

	// Moved
	path.on("moved", async () => {
		// console.log("Path is moved...")
		checkViewportBoundaries(canvas, path)

		const pathInfo = getPathInfo(path)

		// console.log(`Moved Path - pX: ${pathInfo.pX}, pY: ${pathInfo.pY}.`)
		// console.log(`Moved Path - path: ${pathInfo.pathStr}`)

		// console.log("TODO Upload changes to backend.")

		try {
			const url = process.env.REACT_APP_BACKEND_URL + "/path/"

			const response = await axios.put(url, {
				// @ts-expect-error
				id: path.vwb_id,
				x: pathInfo.pX,
				y: pathInfo.pY,
			})

			if (!response.data) {
			}
		} catch (err) {
			console.log(err)

			// @ts-expect-error
			path._set("left", path.vwb_currentPosition.x)

			// @ts-expect-error
			path._set("top", path.vwb_currentPosition.y)

			canvas.add(path)
		}
	})
}

export const addPathFromBackend = async (
	canvas: fabric.Canvas,
	id: string,
	pathStr: string,
	pos: ICoords,
	originPos: ICoords
) => {
	// console.log(`Path String: ${pathStr}`)

	const newPath = new fabric.Path(pathStr, {
		fill: undefined,
	})

	newPath._set("vwb_id", id)

	editPath(canvas, newPath)

	const x = originPos.x + (pos.x - originPos.x)
	const y = originPos.y + (pos.y - originPos.y)

	newPath.set({ left: x, top: y })

	// console.log(newPath)

	canvas.add(newPath)
}

export const uploadPath = async (path: fabric.Path) => {
	// console.log("Save new text to Backend...")

	try {
		const pathInfo = getPathInfo(path)

		// Receive confirmation and _id

		var newPath: IBackendPath = {
			pathStr: pathInfo.pathStr as string,
			x: pathInfo.pX,
			y: pathInfo.pY,
		}

		const url = process.env.REACT_APP_BACKEND_URL + "/path/"

		const response = await axios.post(url, newPath)

		// console.log(response.data)

		if (response.data.id) {
			path._set("vwb_id", response.data.id)
		}

		// console.log("Success saving path.")
	} catch (err) {
		console.log(err)
	}
}

export default editPath
