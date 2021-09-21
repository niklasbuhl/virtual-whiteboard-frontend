import ICoords from "./interface.coords"
import IEditInfo from "./interface.editInfo"
import IUser from "./interface.user"

type IText = {
	_id: string
	text: string
	pos: ICoords
	editInfo: IEditInfo
	author: IUser
	comments: [Comment]
}

export default IText
