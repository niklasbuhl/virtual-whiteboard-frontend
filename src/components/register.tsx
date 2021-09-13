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

			console.log(registerRes)

			await getLoggedIn()
		} catch (err: any) {
			setMessage(err.response.data.errorMessage)

			console.log(err)
		}
	}

	// React.useEffect(() => {}, [])
	return (
		<div>
			<form onSubmit={register}>
				<span>{message}</span>

				<input
					type="text"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>

				<input
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<input
					type="password"
					placeholder="Verify your password"
					onChange={(e) => setPasswordVerify(e.target.value)}
					value={passwordVerify}
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}

export default Register
