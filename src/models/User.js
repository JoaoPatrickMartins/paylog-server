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
        }
        //inserir as demais informaçoes de usuarios name, job_position, company
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('User', userSchema);  