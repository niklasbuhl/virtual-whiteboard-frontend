import axios from "axios"
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../context/authContextProvider"
import { useHistory } from "react-router-dom"

export const EditUser: React.FC = () => {
	const { auth, getLoggedIn } = useContext(AuthContext)

	const [initDelete, setInitDelete] = useState(false)
	const [password, setPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [deletePassword, setDeletePassword] = useState("")
	const [newEmail, setNewEmail] = useState("")
	const [email, setEmail] = useState("")
	const [newUsername, setNewUsername] = useState(auth.username)

	const history = useHistory()

	const putNewUsername = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log("Request Update Username.")

		try {
			const url: string =
				(process.env.REACT_APP_BACKEND_URL as string) + "/user"

			const response = await axios.put(url, {
				newUsername: newUsername,
				password: password,
			})

			if (!response) throw new Error("Error.")

			getLoggedIn()
			setNewUsername("")
			setPassword("")
		} catch (err) {
			console.log(err)
			setNewUsername("")
			setPassword("")
		}
	}

	const putNewEmail = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log("Request Update Email.")

		try {
			const url: string =
				(process.env.REACT_APP_BACKEND_URL as string) + "/user"

			const response = await axios.put(url, {
				newEmail: newEmail,
				email: email,
				password: password,
			})

			if (!response) throw new Error("Error.")

			getLoggedIn()
			setEmail("")
			setNewEmail("")
			setPassword("")
		} catch (err) {
			console.log(err)
			setEmail("")
			setNewEmail("")
			setPassword("")
		}
	}

	const putNewPassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log("Request Update Password.")

		try {
			const url: string =
				(process.env.REACT_APP_BACKEND_URL as string) + "/user"

			const response = await axios.put(url, {
				newPassword: newPassword,
				password: password,
			})

			if (!response) throw new Error("Error.")

			getLoggedIn()
			setNewPassword("")
			setPassword("")
		} catch (err) {
			console.log(err)
			setNewPassword("")
			setPassword("")
		}
	}

	const deleteUser = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log("Request Delete User.")

		try {
			const url: string =
				(process.env.REACT_APP_BACKEND_URL as string) + "/user"

			const response = await axios.delete(url, {
				data: {
					password: deletePassword,
				},
			})

			if (!response) throw new Error("Error.")

			getLoggedIn()
			setDeletePassword("")
			history.push("/")
		} catch (err) {
			console.log(err)
			setDeletePassword("")
		}
	}

	return (
		<div className="d-flex flex-column col-12">
			<h1>
				<span className="text-secondary">Edit User</span> {auth.username}
			</h1>

			<div className="d-flex flex-column align-items-center col-12">
				<div className="d-flex col-8">
					<h2 className="mt-4">Change Username</h2>
				</div>
				<form className="d-flex flex-column col-8" onSubmit={putNewUsername}>
					<input
						className="form-control mb-2"
						placeholder="New Username"
						onChange={(e) => setNewUsername(e.target.value)}
						value={newUsername}
					/>

					<input
						className="form-control mb-2"
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<button className="from-control btn btn-primary" type="submit">
						Set New Username
					</button>
				</form>

				<div className="d-flex col-8">
					<h2 className="mt-4">Change Email</h2>
				</div>

				<form
					className="d-flex flex-column justify-content-center col-8"
					onSubmit={putNewEmail}>
					<input
						className="form-control mb-2"
						type="email"
						placeholder="Previous Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>

					<input
						className="form-control mb-2"
						type="email"
						placeholder="New Email"
						onChange={(e) => setNewEmail(e.target.value)}
						value={newEmail}
					/>

					<input
						className="form-control mb-2"
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<button className="from-control btn btn-primary" type="submit">
						Set New Email
					</button>
				</form>

				<div className="d-flex col-8">
					<h2 className="mt-4">Change Password</h2>
				</div>

				<form className="d-flex flex-column col-8" onSubmit={putNewPassword}>
					<input
						className="form-control mb-2"
						type="password"
						placeholder="Current Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<input
						className="form-control mb-2"
						placeholder="New Password"
						onChange={(e) => setNewPassword(e.target.value)}
						value={newPassword}
					/>

					<button className="from-control btn btn-danger" type="submit">
						Update Password
					</button>
				</form>

				<div className="d-flex col-8">
					<h2 className="mt-4">Delete User</h2>
				</div>

				<button
					className="btn btn-danger m-2 col-8"
					onClick={() => setInitDelete(!initDelete)}>
					Delete User
				</button>
				{initDelete && (
					<form onSubmit={deleteUser} className="col-8 mb-4">
						<input
							className="form-control mb-2"
							type="password"
							placeholder="Please Enter Password"
							onChange={(e) => setDeletePassword(e.target.value)}
							value={deletePassword}
						/>
						<button className="form-control btn btn-danger" type="submit">
							Confirm Delete User
						</button>
						<div className="col-8" style={{ height: "200px" }}></div>
					</form>
				)}
			</div>
		</div>
	)
}

export default EditUser
