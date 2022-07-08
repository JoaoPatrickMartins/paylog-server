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
            type: String,
            required: true,
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
            //required: true
        },
        request_observation: {
            type: String
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
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        approver_name: {
            type: String
        },
        userId: {
            type: String,
            required: true
        },
        checked: {   
            type: Boolean,
        },
        forward_to_supervisor: {
            type: Boolean,
        }
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('Request', requestSchema);  