import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, minlength: 4, maxlength: 64, required: true },
  price: { type: Number, get: getPrice, set: setPrice, min: 100, default: 1000 },
  imageURL: { type: String , maxlength: 1024},
  store: { 
    name: { type: String , maxlength: 254},
    productURL: { type: String, maxlength: 1024 } 
  }
})

function getPrice(number){
  return (number/100).toFixed(2)
}

function setPrice(number){
  return number*100
}

const Model = mongoose.model('Gift', schema)

export default Model