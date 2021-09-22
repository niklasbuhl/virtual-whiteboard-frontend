import axios from "axios"
import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"
import Role from "../enum/role"

function LogoutBtn() {
	const { getLoggedIn, setRole } = useContext(AuthContext)

	const history = useHistory()

	async function logOut() {
		// await axios.get("http://localhost:5000/auth/logout");
		await axios.get(process.env.REACT_APP_BACKEND_URL + "/logout")
		await getLoggedIn()
		setRole(Role.Unknown)
		history.push("/")
	}

	return (
		<div>
			<button className="btn btn-primary" onClick={logOut}>
				Logout
			</button>
		</div>
	)
}

export default LogoutBtn
