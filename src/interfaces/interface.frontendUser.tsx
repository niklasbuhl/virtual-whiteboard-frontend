import Role from "../enum/role"

interface IFrontendUser {
	_id: string
	username: string
	role: Role
}

export default IFrontendUser
