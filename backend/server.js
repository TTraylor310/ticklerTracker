const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const colors = require('colors')
const PORT = process.env.PORT

const { errorHandler } = require('./src/middleware/errorMiddleware')
const connectDB = require('./src/config/db')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
connectDB()

app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/tickets', require('./src/routes/ticketRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  res.status(200).json({ message: 'Welcome to Tray Ticker Page' })
}

app.use(errorHandler)

app.listen(PORT, () => console.log('Server Up and running on port: ', PORT))
