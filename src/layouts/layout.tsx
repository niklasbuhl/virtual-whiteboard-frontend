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
	const { auth } = useContext(AuthContext)
	// const [, set] = useState();
	// useEffect(() => {}, [])
	console.log("auth.loggedIn: " + auth.loggedIn)

	return (
		<>
			<Navbar />
			<div className="d-flex container flex-grow">{props.children}</div>
			<Footer />
			{/* <footer>Made by Niklas Buhl</footer> */}
		</>
	)
}

export default Layout
