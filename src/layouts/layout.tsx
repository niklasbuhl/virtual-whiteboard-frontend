import React, { ReactNode } from "react"
import { useContext } from "react"
import Footer from "../components/footer"
// import { Link } from "react-router-dom"
// import { addEmitHelper } from "typescript";
// import Login from "../components/login"
// import LogoutBtn from "../components/logoutBtn"
import Navbar from "../components/navbar"
import { AuthContext } from "../context/authContextProvider"

export interface ILayoutProps {
	children: ReactNode | JSX.Element | string
}

export const Layout: React.FC<ILayoutProps> = (props) => {
	const { auth, loggedIn } = useContext(AuthContext)
	// const [, set] = useState();
	// useEffect(() => {}, [])
	console.log("auth.loggedIn: " + loggedIn)

	return (
		<div className="d-flex flex-column">
			<Navbar />
			<div className="d-flex container flex-grow">{props.children}</div>
			<Footer />
			{/* <footer>Made by Niklas Buhl</footer> */}
		</div>
	)
}

export default Layout
