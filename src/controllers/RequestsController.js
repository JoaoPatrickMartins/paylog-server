import User from "../models/User";
import Request from "../models/Request";

class RequestsController {
    
    async index(req, res){
        try {
            const { user_id } = req.params;
            const { company, origin_id, start_date, end_date, class_dre, subclass_dre, status } = req.query;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let requests;

            if(((user.permission) == "admin") || ((user.permission) == "supervisor")){
                requests = await Request.find();
            }else{
                requests = await Request.find({
                    userId: user_id
                });
            }

            requests = company ? ( requests.filter(result => {
                return result.company === company;
            })) : requests;

            requests = origin_id ? ( requests.filter(result => {
                return result.origin_id === origin_id;
            })) : requests;

            requests = (start_date && end_date) ? ( requests.filter(result => {
                return result.due_date >= start_date && result.due_date <= end_date;
            })) : requests;

            requests = class_dre ? ( requests.filter(result => {
                return result.class_dre === class_dre;
            })) : requests;

            requests = subclass_dre ? ( requests.filter(result => {
                return result.subclass_dre === subclass_dre;
            })) : requests;

            requests = status ? ( requests.filter(result => {
                return result.status === status;
            })) : requests;

            return res.json(requests);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async showPending(req, res){
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let requests;

            if((user.permission) == "admin"){
                requests = await Request.find({
                    status: "Pendente"
                });
            }else{
                requests = await Request.find({
                    userId: user_id,
                    status: "Pendente"
                });
            }

            return res.json(requests);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async showSupervisor(req, res){
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let requests;
            let requestsChecked;
            let requestsSupervisor;

            requestsSupervisor = await Request.find({
                checked: true,
            });

            requestsChecked = await Request.find({
                forward_to_supervisor: true,
            });

            requests = requestsSupervisor.concat(requestsChecked);

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
                company,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const requesterName = `${user.first_name} ${user.last_name}`;

            const newRequest = await Request.create({
                title,
                value,
                origin_id,
                request_date,
                due_date,
                class_dre,
                subclass_dre,
                request_observation,
                requester_name: requesterName, 
                job_position: user.job_position,  
                company: company,
                status: "Pendente",
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
                approver_name,
                checked,
                forward_to_supervisor
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
                approver_name,
                checked,
                forward_to_supervisor
            });
            
            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

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