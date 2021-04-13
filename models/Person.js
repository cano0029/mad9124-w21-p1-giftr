import mongoose from 'mongoose'
import Gift from '../models/Gift.js'

const schema = new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 254, required: true},
    birthDate: { type: Date , trim: true , required: true},
    owner: { type: String},
    gifts: [ Gift ],
    imageURL: { type: String , maxlength:1024},
},
{
    timestamps: true
})


const Model = mongoose.model('Person', schema)

export default Model
