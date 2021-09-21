import { IAuth } from "../context/authContextProvider"
import Role from "../enum/role"

export const lockCanvas = (canvas: fabric.Canvas) => {
	console.log("Lock Canvas.")
	if (canvas)
		canvas.forEachObject((object) => {
			object._set("selectable", false)
			object._set("editable", false)
			// object.selectable = false
			// object.lockMovementY = true
			console.log(object)
		})
}

export const unlockCanvas = (canvas: fabric.Canvas) => {
	// unlockUserObjects(canvas)

	if (canvas) {
		console.log("Unlock Canvas.")
		canvas.forEachObject((object) => {
			// @ts-expect-error
			if (object.vwb_author._id === auth.userId) {
				object._set("selectable", true)
				object._set("editable", true)
			}
			// console.log(object)
		})
	}
}

export const unlockUserObjects = (canvas: fabric.Canvas, auth: IAuth) => {
	if (canvas) {
		console.log("Unlock Logged In Objects.")

		// If the current user is logged in as Moderator or Admin, unlock all.
		if (auth.role === Role.Moderator || auth.role === Role.Admin) {
			unlockCanvas(canvas)
			return
		}

		canvas.forEachObject((object) => {
			// @ts-expect-error
			console.log(object.vwb_author)

			console.log(
				// @ts-expect-error
				`Object Author ID: ${object.vwb_author._id}, id: ${auth.userId}`
			)

			// @ts-expect-error
			if (object.vwb_author._id === auth.userId) {
				object._set("selectable", true)
				object._set("editable", true)
			} else {
				object._set("selectable", false)
				object._set("editable", false)
			}

			console.log(object)
		})

		// setCanvas(canvas)
	}
}

export default lockCanvas
