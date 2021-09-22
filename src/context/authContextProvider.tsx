import axios from "axios"
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react"
import Role from "../enum/role"
// import axios from 'axios'
// import JWTDecode from 'jwt-decode'
// import Cookies from 'js-cookie'

export interface IAuth {
	userId: string
	username: string
	role: Role
}

type AuthContextType = {
	auth: IAuth
	loggedIn: boolean
	role: Role
	authReady: boolean
	isLoggedIn: () => Boolean
	getLoggedIn: () => void
}

// export const AuthContext = createContext<AuthContextType>(null)

export const AuthContext = createContext<AuthContextType>({
	auth: { userId: "", username: "", role: Role.User },
	loggedIn: false,
	role: Role.User,
	authReady: false,
	isLoggedIn: () => {
		return true
	},
	getLoggedIn: () => {},
})

// Component
interface IAuthContextProviderProps {
	children: JSX.Element | ReactNode
}

export const AuthContextProvider: React.FC<IAuthContextProviderProps> = (
	props
) => {
	const [auth, setAuth] = useState<IAuth>({
		userId: "",
		username: "",
		role: Role.User,
	})
	const [loggedIn, setLoggedIn] = useState(false)
	// const [userId, setUserId] = useState("")

	const [authReady, setAuthReady] = useState(false)

	const [role, setRole] = useState(Role.User)

	const isLoggedIn = () => {
		return loggedIn
	}

	async function getLoggedIn() {
		console.log("Getting logged in boolean.")

		try {
			const getLoggedInRes = await axios.get(
				process.env.REACT_APP_BACKEND_URL + "/loggedIn"
			)

			console.log(getLoggedInRes)

			// Cookies.set('foo', 'bar')
			// const tokens = Cookies.get()
			// console.log("Token: " + tokens)

			if (getLoggedInRes.data) {
				const getLoggedInUserRes = await axios.get(
					process.env.REACT_APP_BACKEND_URL + "/loggedInUser"
				)

				if (getLoggedInUserRes) {
					setAuth({
						userId: getLoggedInUserRes.data._id,
						username: getLoggedInUserRes.data.username,
						role: getLoggedInUserRes.data.role,
					})

					setRole(getLoggedInUserRes.data.role)
				}
			}

			setLoggedIn(getLoggedInRes.data)
			setAuthReady(true)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getLoggedIn()
	}, [])

	return (
		<AuthContext.Provider
			value={{ auth, loggedIn, authReady, isLoggedIn, getLoggedIn, role }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthContextProvider

/*




function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    // const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
    const loggedInRes = await axios.get(
      "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
    );
    setLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

*/
