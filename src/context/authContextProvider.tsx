import axios from "axios"
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react"
// import axios from 'axios'
// import JWTDecode from 'jwt-decode'
// import Cookies from 'js-cookie'

interface IAuth {
	userId: string
	loggedIn: boolean
}

type AuthContextType = {
	auth: IAuth
	getLoggedIn: () => void
}

// export const AuthContext = createContext<AuthContextType>(null)

export const AuthContext = createContext<AuthContextType>({
	auth: { userId: "", loggedIn: false },
	getLoggedIn: () => {},
})

// Component
interface IAuthContextProviderProps {
	children: JSX.Element | ReactNode
}

export const AuthContextProvider: React.FC<IAuthContextProviderProps> = (
	props
) => {
	const [auth, setAuth] = useState<IAuth>({ loggedIn: false, userId: "" })
	// const [userId, setUserId] = useState("")

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

			setAuth({ loggedIn: getLoggedInRes.data, userId: "" })

			// setLoggedIn(loggedInRes.data);
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getLoggedIn()
	}, [])

	return (
		<AuthContext.Provider value={{ auth, getLoggedIn }}>
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
