// TODO Problem when objects are almost as large as the bounding box...

const checkViewportBoundaries = (
	canvas: fabric.Canvas,
	object: fabric.Object
) => {
	const boundaries = canvas.calcViewportBoundaries()

	// console.log(boundaries)

	const minX = boundaries.bl.x
	const maxX = boundaries.br.x
	const minY = boundaries.tl.y
	const maxY = boundaries.bl.y

	const tlr = 0.2

	if (object.width && object.height) {
		const w = object.width
		const h = object.height
		const objectCoords = object.getCoords()
		// console.log(objectCoords)
		// Check all corners

		var cornersOutside = 0

		for (var corner of objectCoords) {
			// console.log(corner)

			const x = corner.x
			const y = corner.y

			// Check if it is outside
			if (x < minX || x > maxX || y < minY || y > maxY) {
				// console.log(`Corner is outside: ${corner}`)
				++cornersOutside
				continue
			}

			if (
				x < minX + w * tlr ||
				x > maxX - w * tlr ||
				y < minY + h * tlr ||
				y > maxY - h * tlr
			) {
				// console.log(`Corner is outside tolerance: ${corner}`)
				++cornersOutside
				continue
			}
		}

		// console.log(`Corners Outside: ${cornersOutside}`)

		if (cornersOutside >= 4) object.center()
	}
}

export default checkViewportBoundaries
