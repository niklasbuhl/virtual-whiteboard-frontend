// import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import UserPage from "./pages/userPage"
import RegisterPage from "./pages/registerPage"
import VirtualWhiteboard from "./pages/virtualWhiteboardPage"
import ModeratorPage from "./pages/moderatorPage"
import { AuthContext } from "./context/authContextProvider"
import { useContext } from "react"
import Role from "./enum/role"

function Router() {
	const { loggedIn, role } = useContext(AuthContext)

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<VirtualWhiteboard />
				</Route>

				<Route path="/register/">
					<RegisterPage />
				</Route>

				{loggedIn === true && (
					<Route path="/user/">
						<UserPage />
					</Route>
				)}

				{(role === Role.Admin || role === Role.Moderator) && (
					<Route path="/moderator/">
						<ModeratorPage />
					</Route>
				)}
			</Switch>
		</BrowserRouter>
	)
}

export default Router
