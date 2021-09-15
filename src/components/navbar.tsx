import { useContext } from "react"
// import bootstrap from 'bootstrap'
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"
import Login from "./login"
import LogoutBtn from "./logoutBtn"

const Navbar: React.FC = () => {
	const { auth } = useContext(AuthContext)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<div className="d-flex align-items-center">
					<div className="d-flex flex-row">
						<Link className="navbar-brand" to="/">
							Virtual Whiteboard
						</Link>
						{auth.loggedIn === false && (
							<Link className="nav-link" to="/user/">
								User
							</Link>
						)}
						<Link className="nav-link" to="/moderator/">
							Moderator
						</Link>
					</div>
				</div>
				<div className="d-flex align-items-center">
					<div className="d-flex flex-row">
						{auth.loggedIn === false && <Login />}
						{auth.loggedIn === false && (
							<Link className="nav-link" to="/register">
								Register
							</Link>
						)}
						{auth.loggedIn === true && <LogoutBtn />}
						{/* <Register /> */}
						{/* <a class="navbar-brand" href="#">Navbar</a> */}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
