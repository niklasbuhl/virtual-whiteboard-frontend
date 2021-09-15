// import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import UserPage from "./pages/userPage"
import RegisterPage from "./pages/registerPage"
import VirtualWhiteboard from "./pages/virtualWhiteboardPage"
import ModeratorPage from "./pages/moderatorPage"

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<VirtualWhiteboard />
				</Route>
				<Route path="/register/">
					<RegisterPage />
				</Route>
				<Route path="/user/">
					<UserPage />
				</Route>
				<Route path="/moderator/">
					<ModeratorPage />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Router
