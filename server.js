const express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./routes')

/*
Sección de configuración de la BD
 */

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', ()=> {
  console.error.bind(console, 'connection error:')
  app.exit()
})

/*
  Configuración de la app en express()
 */

app.use('/', routes)
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})


app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))