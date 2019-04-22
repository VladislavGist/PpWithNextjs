export const validateInputs = {
	phoneNumber: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
	textArea: /^.{10,800}$/,
	password: /^.{6,200}$/,
	name: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я ]+[a-zA-Zа-яА-Я]?$/u,
	title: /^.{10,57}$/,
	address: /^.{10,100}$/,
	lastName: /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я ]+[a-zA-Zа-яА-Я]?$/u,
	email: /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
	price: /^[0-9]{2,6}$/
}

export const normilizeNumber = values => values.replace(/[^\d]/g, '')

export const normilizeText = values => values.replace(/[^\D]/g, '')