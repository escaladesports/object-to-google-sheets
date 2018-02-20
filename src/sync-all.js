import sheetToObj from './sheet-to-obj'

export default function syncAll(){
	return new Promise((resolve, reject) => {
		this.api.getData((err, res) => {
			if (err) return reject(err)
			this.schema = res[0]
			res = sheetToObj(res)
			resolve(res)
		})
	})
}