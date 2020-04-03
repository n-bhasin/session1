const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String, require: true},
    item: {type: String, require: true},
    customer_name: {type: String, require: true}
})

module.exports = mongoose.model('Order', orderSchema);