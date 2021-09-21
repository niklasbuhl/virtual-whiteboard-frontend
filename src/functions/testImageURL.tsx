// https://stackoverflow.com/questions/9714525/javascript-image-url-verify
// https://jsfiddle.net/jfriend00/vhtzghkd/

function testImageURL(url: string, timeoutT?: any) {
	return new Promise(function (resolve, reject) {
		var timeout = timeoutT || 5000
		var timer: any
		var img = new Image()

		img.onerror = img.onabort = function () {
			clearTimeout(timer)
			reject("error")
		}
		img.onload = function () {
			clearTimeout(timer)
			resolve("success")
		}
		timer = setTimeout(function () {
			// reset .src to invalid URL so it stops previous
			// loading, but doesn't trigger new load
			img.src = "//!!!!/noExist.jpg"
			reject("timeout")
		}, timeout)
		img.src = url
	})
}

export default testImageURL
