import React, { useRef, useEffect } from "react"
import useWindowSize from "../../hooks/useWindowSize"

type Coordinates = {
	x: number
	y: number
}

type Path = {
	start: Coordinates
	end: Coordinates
}

const Canvas: React.FC<{}> = () => {
	let canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
		null
	)
	// let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

	const { width, height } = useWindowSize()

	useEffect(() => {
		let mouseDown: boolean = false
		let start: Coordinates = { x: 0, y: 0 }
		let end: Coordinates = { x: 0, y: 0 }
		let canvasOffsetLeft: number = 0
		let canvasOffsetTop: number = 0
		// let canvasOffsetSet: boolean = false
		let pathArray: Path[] = []

		function handleMouseDown(event: MouseEvent) {
			mouseDown = true
			// anotherVariable = true

			start = {
				y: event.clientY - canvasOffsetTop,
				x: event.clientX - canvasOffsetLeft,
			}

			end = {
				x: event.clientX - canvasOffsetLeft,
				y: event.clientY - canvasOffsetTop,
			}

			console.log("Start: " + start.x + ", " + start.y)
			console.log("End: " + end.x + ", " + end.y)
		}

		function handleMouseUp(event: MouseEvent) {
			mouseDown = false

			// Print array
			// console.log(pathArray)

			for (const e of pathArray) {
				console.log(
					`sX: ${e.start.x}, sY: ${e.start.y}, eX: ${e.end.x}, eY: ${e.end.y}`
				)
			}

			// Save array

			// Clear array
			pathArray.length = 0
		}

		// Draw
		function handleMouseMove(evt: MouseEvent) {
			if (mouseDown && context) {
				start = {
					x: end.x,
					y: end.y,
				}

				end = {
					x: evt.clientX - canvasOffsetLeft,
					y: evt.clientY - canvasOffsetTop,
				}

				// Draw our path
				context.beginPath()
				context.moveTo(start.x, start.y)
				context.lineTo(end.x, end.y)
				context.strokeStyle = "#00f"
				context.lineWidth = 3
				context.stroke()
				context.closePath()

				// Append Coordinates to Array
				var newPath: Path = {
					start: {
						x: start.x,
						y: start.y,
					},
					end: {
						x: end.x,
						y: end.y,
					},
				}

				// console.log(newPath)
				pathArray.push(newPath)
			}
		}
		// Initialize
		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext("2d")

			canvasRef.current.width = width
			canvasRef.current.height = height

			canvasOffsetLeft = canvasRef.current.offsetLeft
			canvasOffsetTop = canvasRef.current.offsetTop

			if (renderCtx) {
				// Add event listeners
				canvasRef.current.addEventListener("mousedown", handleMouseDown)
				canvasRef.current.addEventListener("mouseup", handleMouseUp)
				canvasRef.current.addEventListener("mousemove", handleMouseMove)

				setContext(renderCtx)
			}
		}

		return function cleanup() {
			if (canvasRef.current) {
				canvasRef.current.removeEventListener("mousedown", handleMouseDown)
				canvasRef.current.removeEventListener("mouseup", handleMouseUp)
				canvasRef.current.removeEventListener("mousemove", handleMouseMove)
			}
		}
	}, [context, height, width])

	return <canvas ref={canvasRef}></canvas>
}

export default Canvas
