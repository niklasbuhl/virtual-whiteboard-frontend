import { useContext } from "react"
// import bootstrap from 'bootstrap'
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"
import Role from "../enum/role"
import Login from "./login"
import LogoutBtn from "./logoutBtn"

const Navbar: React.FC = () => {
	const { auth, loggedIn } = useContext(AuthContext)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<div className="d-flex align-items-center">
					<div className="d-flex flex-row">
						<Link className="navbar-brand" to="/">
							Virtual Whiteboard
						</Link>
						{loggedIn === true && (
							<Link className="nav-link" to="/user/">
								User
							</Link>
						)}
						{(auth.role === Role.Moderator || auth.role === Role.Admin) && (
							<Link className="nav-link" to="/moderator/">
								Moderator
							</Link>
						)}
					</div>
				</div>
				<div className="d-flex align-items-center">
					<div className="d-flex flex-row">
						{loggedIn === false && <Login />}
						{loggedIn === false && (
							<Link className="nav-link" to="/register">
								Register
							</Link>
						)}
						{loggedIn === true && <LogoutBtn />}
						{/* <Register /> */}
						{/* <a class="navbar-brand" href="#">Navbar</a> */}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
