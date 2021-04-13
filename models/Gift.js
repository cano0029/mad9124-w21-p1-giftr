import mongoose from 'mongoose'

const GiftSchema = new mongoose.Schema({
  name: { type: String, minlength: 4, maxlength: 64, required: true },
  price: { type: Number, set: setPrice,  min: setPrice(100), default: setPrice(1000) },
  imageURL: { type: String , maxlength: 1024},
  store: { 
    name: { type: String , maxlength: 254},
    productURL: { type: String, maxlength: 1024 } 
  }
})

function setPrice(number){
  return (number/100).toFixed(2)
}

const Gift= mongoose.model('Gift', GiftSchema)

export { Gift, GiftSchema }
