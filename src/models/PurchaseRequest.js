import mongoose from "mongoose";

const purchaseRequestSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
        },
        send_date: {
            type: String,
            required: true,
        },
        volume: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        receipt_confirmation: {
            type: String,
            //required: true,
        },
        receipt_confirmation_date: {
            type: String,
           // required: true,
        },
        billing_date: {
            type: String,
            //required: true,
        },
        delivery_date: {
            type: String,
            //required: true,
        },
        shipping_company: {
            type: String,
           // required: true,
        },
        invoice_number: {
            type: String,
            //required: true,
        },
        received_volume: {
            type: String,
            //required: true,
        },
        observation: {
            //type: String,
        },
        status: {
            type: String,
            //required: true,
        },
        purchase_requester_name: {
            type: String,
            required: true,
        },
        receiver_name: {
            //type: String,
        },
        lecturer_name: {
           // type: String,
        },
        company: {
            type: String,
            //required: true
        }
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('PurchaseRequest', purchaseRequestSchema);