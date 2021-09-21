import { ToolContext, Tool } from "../../context/toolContext"
import { useContext } from "react"
import { AuthContext } from "../../context/authContextProvider"

export type Props = {}

export const ToolBox: React.FC<Props> = () => {
	const { tool, setTool } = useContext(ToolContext)
	const { auth, loggedIn } = useContext(AuthContext)

	return (
		<div className="d-flex">
			<button
				disabled={loggedIn === false}
				className="btn button-primary"
				onClick={() => setTool(Tool.NewText)}>
				New Text
			</button>
			<button
				disabled={loggedIn === false}
				className="btn button-primary"
				onClick={() => setTool(Tool.NewImage)}>
				New Image from URL
			</button>

			<button
				className="btn button-primary"
				disabled={tool === Tool.Draw || loggedIn === false}
				onClick={() => setTool(Tool.Draw)}>
				Draw
			</button>
			<button
				className="btn button-primary"
				disabled={tool === Tool.Edit}
				onClick={() => setTool(Tool.Edit)}>
				Edit
			</button>
			<button
				className="btn button-primary"
				disabled={tool === Tool.Delete || loggedIn === false}
				onClick={() => setTool(Tool.Delete)}>
				Delete
			</button>
			<button
				className="btn button-primary"
				onClick={() => setTool(Tool.Refresh)}>
				Refresh
			</button>
			{/* <button
				className="btn button-primary"
				onClick={() => setTool(Tool.SendToBack)}>
				Send to Back
			</button> */}
		</div>
	)
}

export default ToolBox
