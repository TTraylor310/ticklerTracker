const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

const PORT = process.env.PORT
const {errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDB()

app.get('/', (req, res) => {
  res.send('Tray Server Tickler Ticker App HOMEPAGE')
})

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

function start(PORT) {
  app.listen(PORT, () => console.log('Server Up and running on port: ', PORT))
}

module.exports= {app, start}