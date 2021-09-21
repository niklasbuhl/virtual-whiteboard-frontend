// Frontage

// import React from "react"

// import Canvas from "../components/whiteboard/canvas"
// import CanvasToolProvider from "../context/canvasToolContext"
import Canvas from "../components/fabric/canvas"
import ToolBox from "../components/fabric/toolbox"
import ToolContextProvider from "../context/toolContext"
import Layout from "../layouts/layout"

function VirtualWhiteboard() {
	return (
		<Layout>
			<div className="d-flex flex-column">
				<ToolContextProvider>
					<div className="d-flex container flex-column">
						<ToolBox />
						<Canvas />
					</div>
				</ToolContextProvider>
			</div>
		</Layout>
	)
}

export default VirtualWhiteboard
