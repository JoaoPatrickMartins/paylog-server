import User from "../models/User";
import PurchaseRequest from "../models/PurchaseRequest";

class PurchaseRequestsController {

    async index(req, res){
        try {
            const { user_id, company } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let purchaseRequests;

            if(((user.permission) == "admin") || ((user.permission) == "gestaoEstoque") ){
                purchaseRequests = await PurchaseRequest.find();
            }else{
                purchaseRequests = await PurchaseRequest.find({
                    company: company
                });
            }

            return res.json(purchaseRequests);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res){
        try {
            const { user_id } = req.params;

            const {
                provider,
                send_date,
                volume,
                value,
                company,
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const purchaseRequesterName = `${user.first_name} ${user.last_name}`;

            const newPurchaseRequest = await PurchaseRequest.create({
                provider,
                send_date,
                volume,
                value,
                company,
                purchase_requester_name: purchaseRequesterName,
            });

            return res.status(201).json(newPurchaseRequest);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

}

export default new PurchaseRequestsController();