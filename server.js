const express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./routes')

/*
Sección de configuración de la BD
 */

mongoose.connect('mongodb://heroku_ckn2xh2d:8nuev1ngsle0nc78sct5bp7nu4@ds153958.mlab.com:53958/heroku_ckn2xh2d')
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


app.listen(3000, () => console.log('Example app listening on port 3000!'))