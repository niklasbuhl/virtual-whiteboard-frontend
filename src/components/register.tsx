import axios from "axios"
import { useContext, useState, FormEvent } from "react"
// import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"

export type RegisterProps = {}
export const Register: React.FC<RegisterProps> = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordVerify, setPasswordVerify] = useState("")
	const [message, setMessage] = useState("")
	const [messageCSS, setMessageCSS] = useState("text-success")

	const { getLoggedIn } = useContext(AuthContext)
	// const history = useHistory()

	async function register(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		try {
			const registerData = {
				username,
				email,
				password,
				passwordVerify,
			}

			const url = process.env.REACT_APP_BACKEND_URL + "/user"

			const registerRes = await axios.post(url, registerData)

			setMessage(registerRes.data.message)
			setMessageCSS("text-success")

			console.log(registerRes)

			await getLoggedIn()
		} catch (err: any) {
			if (err.response !== undefined) {
				setMessage(err.response.data.errorMessage)
				setMessageCSS("text-danger")
			}
			console.log(err)
			console.log("Probably not connected to the backend.")
		}
	}

	// React.useEffect(() => {}, [])
	return (
		<div className="d-flex flex-column justify-content-center col-6">
			<form className="d-flex flex-column col-12" onSubmit={register}>
				<input
					className="form-control mb-2"
					type="text"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>

				<input
					className="form-control mb-2"
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					className="form-control mb-2"
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<input
					className="form-control mb-2"
					type="password"
					placeholder="Verify your password"
					onChange={(e) => setPasswordVerify(e.target.value)}
					value={passwordVerify}
				/>
				<button className="form-control btn btn-primary mb-2" type="submit">
					Register
				</button>
			</form>

			<div className="d-flex justify-content-center">
				<code className={messageCSS}>{message}</code>
			</div>
		</div>
	)
}

export default Register
