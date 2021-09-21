import IEditInfo from "./interface.editInfo"
import IUser from "./interface.user"

type IContent = {
	_id: string
	author: IUser
	editInfo: IEditInfo
}

export default IContent
