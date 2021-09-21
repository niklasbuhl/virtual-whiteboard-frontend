import Role from "../enum/role"

interface IUser {
	_id: string
	username: string
	role: Role
	loggedIn: boolean
}

export default IUser
