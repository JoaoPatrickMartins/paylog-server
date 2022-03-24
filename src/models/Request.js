import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true
        },
        origin_id: {
            type: Object,
            required: true
        },
        request_date: {
            type: String,
            required: true
        },
        due_date: {
            type: String,
            required: true
        },
        class_dre: {
            type: String,
            required: true
        },
        subclass_dre: {
            type: String,
            required: true
        },
        request_observation: {
            type: String,
            required: true
        },
        requester_name: {
            type: String,
            required: true
        },
        job_position: {
            type: String,
            required: true
        },
        company: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        approver_name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('Request', requestSchema);  