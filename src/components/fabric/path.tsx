import axios from "axios"
import { fabric } from "fabric"
import checkViewportBoundaries from "../../functions/checkViewportBoundaries"

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
	pathStr: string | undefined
	pX: number | undefined
	pY: number | undefined
}

export const getPathInfo = (path: fabric.Path): IPathInfo => {
	const pathInfo = {
		pathStr: pathArrayToString(path.path),
		pX: path.left,
		pY: path.top,
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
	path.hasControls = false
	path.stroke = "#000000"
	path.strokeWidth = 4
	path.strokeLineCap = "square"
	path.perPixelTargetFind = true

	/*
  opt.path.strokeDashArray = [10, 5]
  opt.path.strokeDashOffset = 2
  opt.path.cornerStyle = "rect"
  opt.path.cornerSize = 10
  opt.path.strokeUniform = true		
  */

	// Moved
	path.on("moved", () => {
		// console.log("Path is moved...")

		checkViewportBoundaries(canvas, path)

		const pathInfo = getPathInfo(path)

		console.log(`Moved Path - pX: ${pathInfo.pX}, pY: ${pathInfo.pY}.`)
		console.log(`Moved Path - path: ${pathInfo.pathStr}`)

		console.log("TODO Upload changes to backend.")
	})

	// Mousedown
	/*
	path.on("mousedown", (obj) => {
		if (obj) {
			// @ts-expect-error
			const pathInfo = getPathInfo(obj.target)

			console.log(`Mousedown - pX: ${pathInfo.pX}, pY: ${pathInfo.pY}.`)
			console.log(`Mousedown - path: ${pathInfo.pathStr}`)
		}
	})
	*/

	// Mouseup
	/*
	path.on("mouseup", (obj) => {
		if (obj) {
			// @ts-expect-error
			const pathInfo = getPathInfo(obj.target)

			console.log(`Mouseup - pX: ${pathInfo.pX}, pY: ${pathInfo.pY}.`)
			console.log(`Mouseup - path: ${pathInfo.pathStr}`)
		}
	})
	*/
}

export const addPath = (canvas: fabric.Canvas, pathStr: string, id: string) => {
	console.log("What do I need...")

	var path = new fabric.Path(pathStr, {
		// @ts-expect-error
		fill: false,
	})

	path._set("vwb_id", id)

	editPath(canvas, path)

	canvas.add(path)
}

// REST API
export const postPath = (path: fabric.Path) => {
	const pathInfo = getPathInfo(path)

	console.log("New Path: " + pathInfo.pathStr)
	console.log(`pX: ${pathInfo.pX}, pY: ${pathInfo.pY}`)
	console.log("TODO Save new path to backend...")
}

export const putPath = (path: fabric.Path | IPathInfo) => {}

export const getPath = () => {}

export default editPath
