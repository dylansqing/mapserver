const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    passWord: { type: String },
    tips: { type: String },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: 'Roles' },
})
module.exports = mongoose.model('Users', userSchema)