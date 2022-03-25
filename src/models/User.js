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
        }
        //inserir as demais informaçoes de usuarios name, job_position, company
    },
    {
        timestamps: true
    }
);

export default new mongoose.model('User', userSchema);  