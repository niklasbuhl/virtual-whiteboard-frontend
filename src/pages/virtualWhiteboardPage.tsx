// import React from "react"

import Canvas from "../components/whiteboard/canvas"
import CanvasToolProvider from "../context/canvasToolContext"
import Layout from "../layouts/layout"

function VirtualWhiteboard() {
	return (
		<Layout>
			<h1>Virtual White Board</h1>
			<CanvasToolProvider>
				<Canvas />
			</CanvasToolProvider>
		</Layout>
	)
}

export default VirtualWhiteboard
