const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    min: 0,
    required: [true, 'Debe guardar un valor 0 o superior']
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema);