import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            required: true
        },
        depositorName: {
            type: String,
            required: true
        },
        depositCompany: {
            type: String,
            required: true
        },
        depositDate: {
            type: String,
            required: true
        },
        depositConfirmationDate: {
            type: String
        },
        status: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('Deposit', depositSchema);  