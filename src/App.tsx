// import React from 'react';
import axios from "axios"
import AuthContextProvider from "./context/authContextProvider"
import Router from "./Router"

function App() {

  axios.defaults.withCredentials = true

  const url : string = (process.env.REACT_APP_BACKEND_URL as string)

  console.log(url)

  console.log(process.env.NODE_ENV)

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App
