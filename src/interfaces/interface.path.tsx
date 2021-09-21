import ICoords from "./interface.coords"
import IEditInfo from "./interface.editInfo"
import IUser from "./interface.user"

type IPath = {
	_id: string
	pathStr: string
	pos: ICoords
	editInfo: IEditInfo
	author: IUser
}

export default IPath
