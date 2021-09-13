// import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import RegisterPage from "./pages/registerPage"
import VirtualWhiteboard from "./pages/virtualWhiteboardPage"

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
			</Switch>
		</BrowserRouter>
	)
}

export default Router
