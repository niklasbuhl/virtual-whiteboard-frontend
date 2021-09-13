// export type Props = { :  }

import axios from "axios"
import { useState, useContext, FormEvent } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/authContextProvider"

export const Login: React.FC = () => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const {getLoggedIn} = useContext(AuthContext)
    const history = useHistory()

    async function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const loginData = {
                email, password
            }

            console.log(loginData)
            const url : string = (process.env.REACT_APP_BACKEND_URL as string) + "/login"
            // const url : string = "http://localhost:4000/api/"
            // console.log("Post URL: " + url)
            console.log("Logging in...")

            const loginRes = await axios.post(url, loginData)

            console.log(loginRes)

            await getLoggedIn()
            
            history.push("/")
        

        } catch(err) {
            console.log(err.response.data.errorMessage)
        }
    }
    
    // console.log({  })
    // const [, set] = React.useState();
    // React.useEffect(() => {}, [])
    return (
        <div>
            <form onSubmit={login}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                <button type="submit">Log in</button>
            </form>
        </div>
        )
}


export default Login