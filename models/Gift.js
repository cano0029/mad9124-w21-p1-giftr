import mongoose from 'mongoose'

export const GiftSchema = new mongoose.Schema({
    name: { type: String, minlength: 4, maxlength: 64, required: true },
    price: {
        type: Number,
        min: 100,
        default: 1000,
        set: (value) => Math.ceil(value * 100),
    },
    imageURL: { type: String, maxlength: 1024 },
    store: {
        name: { type: String, maxlength: 254 },
        productURL: { type: String, maxlength: 1024 },
    },
})

const Gift = mongoose.model('Gift', GiftSchema)

export default Gift
