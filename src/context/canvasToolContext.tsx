import { createContext, useContext, useState } from "react"

enum Tool {
	text = "Text",
	selectText = "SelectText",
	// Draw = "Draw",
}

type ToolContextType = {
	tool: Tool
	setTool: (Tool: Tool) => void
}

const ToolContext = createContext<ToolContextType>({
	tool: Tool.text,
	setTool: (tool) => {},
})

const CanvasToolProvider: React.FC = (props) => {
	const [tool, setTool] = useState<Tool>(Tool.text)

	// useEffect(() => {

	// }, [])

	return (
		<ToolContext.Provider value={{ tool, setTool }}>
			{props.children}
		</ToolContext.Provider>
	)
}

export const useTool = () => useContext(ToolContext)

export default CanvasToolProvider
