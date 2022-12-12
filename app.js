const bodyParser = require('body-parser')
const cors = require('cors')

const statusCode = require('./utils/statusCode')
const messages = require('./utils/response')

const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const UserRoutes = require('./app/user/routes')

app.use('/api/user', UserRoutes)

// default route
app.all('*', (req, res, next) => {
  return res.status(statusCode.Forbidden).json({
    status: statusCode.Forbidden,
    message: messages.invalidPath
  })
})

module.exports = app
