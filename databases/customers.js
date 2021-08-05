const mongoose = require('mongoose');

const customersschema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerAge: {
        type: Number,
        required: true,
    },
    customerOccupation: {
        type: String,
        required: true,
    },
    customerSex: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: Number,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
        unique: true,
    },
    customerPassword: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
});

const customers = mongoose.model('Customers', customersschema);

module.exports = { customersschema, customers };
