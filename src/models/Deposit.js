import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            required: true
        },
        depositorName: {
            type: String
        },
        depositCompany: {
            type: String
        },
        depositDate: {
            type: String,
            required: true
        },
        depositConfirmationDate: {
            type: String
        },
        status: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('Deposit', depositSchema);  