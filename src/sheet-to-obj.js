export default function sheetToObj(arr, config){
	let keys = arr.shift()
	arr = arr.map((data, id) => {
		let obj = {}
		data.forEach((val, key) => {
			key = keys[key]
			obj[key] = val
		})
		if(!obj.id){
			obj.id = id
		}
		return obj
	})
	return arr
}