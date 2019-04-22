export const normalizeImgs = obj => {
	let res = []

	for(let key in obj) {
		res.push( Object.assign({}, { key }, { val: obj[key] } ))
	}

	return res
}