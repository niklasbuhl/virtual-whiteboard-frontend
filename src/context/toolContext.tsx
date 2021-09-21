import React, { createContext, ReactNode, useState } from "react"

export enum Tool {
	NewText = "NewText",
	NewImage = "NewImage",
	Draw = "Draw",
	Edit = "Edit",
	Delete = "Delete",
	Refresh = "Refresh",
	SendToBack = "SendToBack",
}

type ToolContextType = {
	tool: Tool
	setTool: (Tool: Tool) => void
}

export const ToolContext = createContext<ToolContextType>({
	tool: Tool.Edit,
	setTool: () => {},
})

interface IToolContextProviderProps {
	children: JSX.Element | ReactNode
}

// Tool Selector Context Provider
const ToolContextProvider: React.FC<IToolContextProviderProps> = (props) => {
	const [tool, setTool] = useState<Tool>(Tool.Edit)

	// useEffect(() => {
	// 	console.log("Initialize Tool Context 2")
	// }, [])

	return (
		<ToolContext.Provider value={{ tool, setTool }}>
			{props.children}
		</ToolContext.Provider>
	)
}

export default ToolContextProvider
