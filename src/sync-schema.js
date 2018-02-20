import sheetToObj from './sheet-to-obj'

function syncSchema() {
	return new Promise((resolve, reject) => {
		this.api.getData({
			range: {
				startRow: 0,
				endRow: 1
			}
		}, (err, res) => {
			if (err) return reject(err)
			this.schema = res[0]
			resolve(this.schema)
		})
	})
}

export default syncSchema