import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "../src/main.scss"
// require("dotenv").config({ path: __dirname + "/.env" })
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)

// reportWebVitals()
