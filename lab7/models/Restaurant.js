const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
city: {type: String,require: true},
cuisine: {type: String},
name: {type: String, require:true},
active: {type: Boolean, default: true}

})

module.exports = mongoose.model('Restaurant', restaurantSchema)