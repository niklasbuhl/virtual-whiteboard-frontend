import React, { ReactNode } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
// import { addEmitHelper } from "typescript";
import Login from "../components/login"
import LogoutBtn from "../components/logoutBtn"
import { AuthContext } from "../context/authContextProvider"

export interface ILayoutProps {
	children: ReactNode | JSX.Element | string
}

export const Layout: React.FC<ILayoutProps> = (props) => {
	const { auth } = useContext(AuthContext)
	// const [, set] = useState();
	// useEffect(() => {}, [])
	console.log("auth.loggedIn: " + auth.loggedIn)

	return (
		<>
			<header>
				<Link to="/">Home</Link>
				{auth.loggedIn === false && <Login />}
				{auth.loggedIn === false && <Link to="/register">Register</Link>}
				{auth.loggedIn === true && <LogoutBtn />}
				{/* <Register /> */}
			</header>
			<main>{props.children}</main>
			<footer>Made by Niklas Buhl</footer>
		</>
	)
}

export default Layout
