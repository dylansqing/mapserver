const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    types: [{ type: String }],
    roleName: { type: String, unique: true },
    tips: { type: String },
    location: [{ type: String }],
    company: [{ type: String }],
    device: [{ type: String }],
    pic: [{ type: Object }]
})
module.exports = mongoose.model('Roles', roleSchema)