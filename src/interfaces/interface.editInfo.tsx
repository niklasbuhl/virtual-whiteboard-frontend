import IUser from "./interface.user"

type IEditInfo = {
	createdAt: Date
	edited: boolean
	lastEditedAt: Date | undefined
	editedBy: IUser | undefined
}

export default IEditInfo
