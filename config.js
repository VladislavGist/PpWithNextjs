const config = {
	payPetsApiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://pay-pets.ru'
}

module.exports = config