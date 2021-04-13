import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'

const jwtSecretKey = 'superSecretKey' 
const saltRounds = 14 

const schema = new mongoose.Schema({
  firstName: { type: String, trim: true, maxlength: 64, required: true },
  lastName: { type: String, trim: true, maxlength: 64, required: true },
  email: { 
    type: String, 
    trim: true, 
    maxlength: 512, 
    required: true, 
    unique: true, 
    validate: {
      validator: (value) => {validator.isEmail(value)}, //returns boolean
      message: (props) => {`${props.value} is not a valid email address.`}
    }
  }, 
  password: { type: String, trim: true, maxlength: 70, required: true } // BUT we have to encrypt the password
})

schema.methods.generateAuthToken = function () { 
  const payload = { uid: this._id } 
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h', algorithm: 'HS256' }) 
}

schema.methods.toJSON = function () {
  const obj = this.toObject() 
  delete obj.password
  delete obj.__v 
  return obj 
}


schema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email: email }) 

  const badHash = `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
  const hashedPassword = user ? user.password : badHash
  const passwordDidMatch = await bcrypt.compare(password, hashedPassword) 
  
  return passwordDidMatch ? user : null
}

// password update/change
schema.pre('save', async function (next) {
  if(this.isModified('password')) return next() // returns boolean if password has changed - if it has not changed, just call next
  this.password = await bcrypt.hash(this.password, saltRounds) // this references to newUser mongoose model instance
  next() // if password has been change, save it and then call next
})

schema.plugin(uniqueValidator, {
  message: (props) => {
    if (props.path === 'email') { 
      return `The email address ${props.value} is already registered.`
    } else {
      return `The ${props.path} must be unique. '${props.value}' is already in use` 
    }
  }
})

const Model = mongoose.model('User', schema) 

export default Model 