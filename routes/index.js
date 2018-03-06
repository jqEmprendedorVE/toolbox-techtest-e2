var express = require('express')
var router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers.js')
var Product = require('../controllers/productController.js')

// Un middleware para tomar un log
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/*
  Para efectos de la prueba las rutas serán declaradas todas en este archivos
 */

// Ruta de bienvenida
router.get('/', (req, res) => res.json({welcome: 'Bienvenido a esta API REST'}))

// Rutas definidas para el API
router.get('/products', catchErrors(Product.getProducts))
router.post('/products/sum/:id', catchErrors((req, res) => Product.updateQuantityProduct(req, res, true)))
router.post('/products/substract/:id', catchErrors((req, res) => Product.updateQuantityProduct(req, res, false)))

module.exports = router