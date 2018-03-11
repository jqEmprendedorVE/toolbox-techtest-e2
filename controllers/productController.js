const productController = ((req,res) => {
  const Product = require('../models/Product')

  return {
    getProducts: async (req, res) => {
      // Consulta todos los productos y los retorna en modo json
      const products = await Product.find()
      res.json(products)
    },
    updateQuantityProduct: async (req, res, sum) => {
      const id = req.params.id
      let product = await Product.findOne({ _id: id })
      const oldQty = product.quantity
      
      if(sum){
        var newQty = ++product.quantity
        console.log(`Suma un punto a un producto ${id}`)
        console.log(`De cantidad: ${oldQty} pasa a: ${newQty}`)
        res.json({sum: 'Se suma una unidad', product})
      }else{
        if(oldQty===0)
          res.json({stop: 'La cantidad ya se encuentra en cero unidades'}) 

        var newQty = --product.quantity
        console.log(`Resta un punto a un producto ${id}`)
        console.log(`De cantidad: ${oldQty} pasa a: ${newQty}`)
        res.json({resta: 'Se resta una unidad', product})
      }

      product.quantity > -1 && product.save()
    }
  }
})()

module.exports = productController