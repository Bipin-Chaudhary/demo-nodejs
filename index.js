const config = require('./config')
const mongoose = require('mongoose')

const app = require('./app')

// db connect
mongoose.set('strictQuery', true)

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  readPreference: 'secondary',
  maxPoolSize: 50
}
).then(() => console.log('MongoDB connected!!', config.DB_URL))
  .catch((err) => console.log('Failed to connect to MongoDB', err))

mongoose.syncIndexes().then().catch()

app.listen({ port: config.PORT }, () => console.log('Server started at : http://localhost:' + config.PORT))
