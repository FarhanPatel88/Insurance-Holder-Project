const mongoose = require('mongoose');

const policiesschema = new mongoose.Schema({
    custId: {
        type: String,
        required: true,
    },
    custAnnualIncome: {
        type: Number,
        required: true,
    },
    custNetWorth: {
        type: Number,
        required: true,
    },
    custHeight: {
        type: Number,
        required: true,
    },
    custWeight: {
        type: Number,
        required: true,
    },
    custDOB: {
        type: Date,
        required: true,
    },
    custSmokingStyle: {
        type: String,
        default: 'off',
    },
    custDrinkingStyle: {
        type: String,
        default: 'off',
    },
    custExerciseStyle: {
        type: String,
        default: 'off',
    },
    custBankName: {
        type: String,
        required: true,
    },
    custAccountNumber: {
        type: Number,
        required: true,
    },
    custIFSC: {
        type: String,
        required: true,
    },
    custBeneficiaryName: {
        type: String,
        required: true,
    },
    custBeneficiaryAge: {
        type: Number,
        required: true,
    },
    custBeneficiaryRelation: {
        type: String,
        required: true,
    },
});

mongoose.model('Policies', policiesschema);
