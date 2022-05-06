const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    idNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true }
)

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;