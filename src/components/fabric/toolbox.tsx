import { ToolContext, Tool } from "../../context/toolContext"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContextProvider"

export type Props = {}

export const ToolBox: React.FC<Props> = () => {
	const { tool, setTool } = useContext(ToolContext)
	const { loggedIn } = useContext(AuthContext)
	const [drawBtnCSS, setDrawBtnCSS] = useState("btn m-2")
	const [editBtnCSS, setEditBtnCSS] = useState("btn m-2")

	useEffect(() => {
		if (tool === Tool.Draw) setDrawBtnCSS("btn btn-secondary m-2")
		else setDrawBtnCSS("btn m-2")
	}, [tool])

	useEffect(() => {
		if (tool === Tool.Edit) setEditBtnCSS("btn btn-secondary m-2")
		else setEditBtnCSS("btn m-2")
	}, [tool])

	return (
		<div className="d-flex">
			<button
				disabled={loggedIn === false}
				type="button"
				className="btn m-2"
				onClick={() => setTool(Tool.NewText)}>
				New Text
			</button>
			<button
				disabled={loggedIn === false}
				type="button"
				className="btn m-2"
				onClick={() => setTool(Tool.NewImage)}>
				New Image from URL
			</button>

			<button
				className={drawBtnCSS}
				type="button"
				disabled={tool === Tool.Draw || loggedIn === false}
				onClick={() => setTool(Tool.Draw)}>
				Draw
			</button>
			<button
				className={editBtnCSS}
				type="button"
				disabled={tool === Tool.Edit}
				onClick={() => setTool(Tool.Edit)}>
				Edit
			</button>
			<button
				className="btn text-danger m-2"
				type="button"
				disabled={tool === Tool.Delete || loggedIn === false}
				onClick={() => setTool(Tool.Delete)}>
				Delete
			</button>
			<button
				className="btn m-2"
				type="button"
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
