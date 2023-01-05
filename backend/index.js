const { start } = require('./src/server')

async function startServer() {
  try {
    start(process.env.PORT || 5005)
  } catch (e) {
    console.log('Error in starting server: ', e.message)
    throw new Error(e)
  }
}

startServer();