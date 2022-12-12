require('dotenv').config()

const ENV = process.env.NODE_ENV
console.log(ENV)

const dev = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || 'localhost:27017'
}

const prod = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || 'localhost:27017'
}

module.exports = ENV === 'prod' ? prod : dev
