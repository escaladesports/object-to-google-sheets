function setDataPromise(api, arr){
	return new Promise((resolve, reject) => {
		api.setData([ arr ], (err, res) => {
			if(err) return reject(err)
			resolve(res)
		})
	})
}

async function add(obj) {
	await this.sync()
	let arr = []
	this.schema.forEach((name, key) => {
		if (obj[name] !== undefined) {
			arr[key] = obj[name]
		}
		else {
			arr[key] = ''
		}
	})
	await setDataPromise(this.api, arr)
}

export default add