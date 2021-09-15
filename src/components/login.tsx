// export type Props = { :  }

import axios from "axios"
import { useState, useContext, FormEvent } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"

export const Login: React.FC = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { getLoggedIn } = useContext(AuthContext)
	const history = useHistory()

	async function login(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		try {
			const loginData = {
				email,
				password,
			}

			console.log(loginData)
			const url: string =
				(process.env.REACT_APP_BACKEND_URL as string) + "/login"
			// const url : string = "http://localhost:4000/api/"
			// console.log("Post URL: " + url)
			console.log("Logging in...")

			const loginRes = await axios.post(url, loginData)

			console.log(loginRes)

			await getLoggedIn()

			history.push("/")
		} catch (err: any) {
			if (err.response !== undefined)
				console.log(err.response.data.errorMessage)
			else console.log("Probably no response from server.")
		}
	}

	// console.log({  })
	// const [, set] = React.useState();
	// React.useEffect(() => {}, [])
	return (
		<div>
			<form className="d-flex flex-row" onSubmit={login}>
				<input
					className="form-control me-2"
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>

				<input
					className="form-control me-2"
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button className="btn btn-primary" type="submit">
					Login
				</button>
			</form>
		</div>
	)
}

export default Login
