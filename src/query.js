import deepEql from 'deep-eql'

async function query(query, options){
	options = {
		sortBy: {
			id: 'descending'
		},
		limit: false,
		offset: false,
		single: false,
		...options
	}
	await this.sync()

	// Find matches to query
	let res = []
	for (let i = 0; i < this.data.length; i++) {
		let obj = this.data[i]
		if (!deepEql(query, obj)) continue
		if(options.single) return obj
		if(options.offset){
			options.offset--
			continue
		}
		res.push(obj)
		if(options.limit && res.length === options.limit){
			break
		}
	}

	return res
}

export default query