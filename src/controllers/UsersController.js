import User from "../models/User";

import { createPasswordHash } from "../services/auth"

class UsersController{
    async index(req, res){
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
    
    async show(req, res){
        try {
            const { id } = req.params;

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json();
            }

            return res.json(user)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    
    async create(req, res){
        try {
            const { email, password, first_name, last_name, job_position, company, permission } = req.body;

            const user = await User.findOne({ email });

            if(user) {
                return res.status(422).json({ message: `User ${email} already exists.` });
            }

            //encrypt password
            const encryptedPassword = await createPasswordHash(password);

            const newUSer = await User.create({ email, password: encryptedPassword, first_name, last_name, job_position, company, permission });

            return res.status(201).json(newUSer);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error. 1" });
        }
    }

    
    async update(req, res){
        try {
            const { id } = req.params;

            const { email, first_name, last_name, job_position, company, permission } = req.body;

            const user = await User.findById(id);
            
            if(!user){
                return res.status(404).json();
            }
            
            //encrypt password
            await user.updateOne({ email, first_name, last_name, job_position, company, permission });

            await user.updateOne({ email, first_name, last_name, job_position, company, permission });


            return res.status(200).json();    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });            
        }
        
    }

    async updatePassword(req, res){
        try {
            const { id } = req.params;

            const { password } = req.body;

            const user = await User.findById(id);
            
            if(!user){
                return res.status(404).json();
            }
            
            //encrypt password
            const encryptedPassword = await createPasswordHash(password);
            await user.updateOne({ password: encryptedPassword });

            return res.status(200).json();    
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });            
        }
        
    }

    
    async destroy(req, res){
        try {
            const { id } = req.params;

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json();
            }

            await user.deleteOne();

            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new UsersController();