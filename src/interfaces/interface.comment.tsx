import IEditInfo from "./interface.editInfo"
import IUser from "./interface.user"

interface IComment {
	_id: string
	comment: string
	author: IUser
	editInfo: IEditInfo
}

export default IComment
