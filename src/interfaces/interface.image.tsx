import ICoords from "./interface.coords"
import IEditInfo from "./interface.editInfo"
import IUser from "./interface.user"

type IImage = {
	_id: string
	url: string
	pos: ICoords
	scale: {
		x: number
		y: number
	}
	editInfo: IEditInfo
	author: IUser
	comments: [Comment]
}

export default IImage
