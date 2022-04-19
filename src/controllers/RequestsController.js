import User from "../models/User";
import Request from "../models/Request";

class RequestsController {
    async index(req, res){
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const requests = await Request.find({
                //aplicar excessão de acesso total ao admin
                userId: user_id
            });

            return res.json(requests);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async show(req, res){
        try {
            const { user_id, id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

           const request = await Request.findOne({
                userId: user_id,
                _id: id
            });

            if (!request) {
                return res.status(404).json();
            }

            return res.json(request);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params;
            const {
                title,
                value,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
                requester_name,
                job_position,
                company,
                status,
                approver_name
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const newRequest = await Request.create({
                title,
                value,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
                requester_name, //pegar direto do user quando estiver implementado
                job_position,   //pegar direto do user quando estiver implementado
                company,        //pegar direto do user quando estiver implementado
                status,
                approver_name,   //pegar direto do user_admin quando estiver implementado
                userId: user_id
            });
            
            return res.status(201).json(newRequest);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { user_id, id } = req.params;
            const {
                title,
                value,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
                requester_name,
                job_position,
                company,
                status,
                approver_name
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const request = await Request.findOne({
                userId: user_id,
                _id: id
            });

            if (!request) {
                return res.status(404).json();
            }

            await request.updateOne({
                title,
                value,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
                requester_name,
                job_position,
                company,
                status,
                approver_name
            });
            
            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    //erro no destroy, sempre deletando o primeiro
    async destroy(req, res) {
         try {
             const { user_id, id } = req.params;

             const user = await User.findById(user_id);

             if(!user) {
                 return res.status(404).json();
             }

             const request = await Request.findOne({
                 userId: user_id,
                 _id: id
             });

             if (!request) {
                 return res.status(404).json();
             }

             await request.deleteOne();

             return res.status(200).json();
         } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
         }
    }
}

export default new RequestsController();