import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
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
        permission: {   
            type: String,
            required: true
        } //admin, supervisor geral, gestao de estoque, gestao financeira, user
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('User', userSchema);  