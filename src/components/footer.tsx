// import { useContext } from "react"
// import bootstrap from 'bootstrap'
// import { Link } from "react-router-dom"
// import { AuthContext } from "../context/authContextProvider"
// import Login from "./login"
// import LogoutBtn from "./logoutBtn"

const Footer: React.FC = () => {
	// const { auth } = useContext(AuthContext)

	return (
		<footer className="d-flex fixed-bottom flex-wrap justify-content-between align-items-center">
			<div className="container">
				<div className="d-flex align-items-center justify-content-center">
					<p className="text-secondary">
						⌨️ with ❤️ by Niklas Buhl |{" "}
						<a
							className="text-dark text-decoration-none"
							target="_blank"
							rel="noreferrer"
							href="https://github.com/niklasbuhl">
							GitHub
						</a>{" "}
						|{" "}
						<a
							className="text-dark text-decoration-none"
							target="_blank"
							rel="noreferrer"
							href="https://www.linkedin.com/in/niklasbuhl/">
							LinkedIn
						</a>{" "}
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
