import mongoose from 'mongoose'
import { GiftSchema } from '../models/Gift.js'

const PersonSchema = new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 254, required: true},
    birthDate: { type: Date , trim: true , required: true},
    owner: { type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    gifts: [ GiftSchema ], 
    imageURL: { type: String , maxlength: 1024},
},
{
    timestamps: true
})

const Model = mongoose.model('Person', PersonSchema)

export default Model
