import User from "../models/User";
import Deposit from "../models/Deposit";

class DepositController {

    async index(req, res){
        try {
            const {  user_id, company } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let deposit;

            if(((user.permission) == "admin") ){
                deposit = await Deposit.find();
            }else{
                deposit = await Deposit.find({
                    company: company
                });
            }

            return res.json(deposit);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res){
        try {
            const { user_id } = req.params;

            const {
                value,
                depositDate
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const depositorName = `${user.first_name} ${user.last_name}`;

            const newDeposit = await Deposit.create({
                value,
                depositorName: depositorName,
                depositCompany: user.company,
                depositDate,
                status: "Pendente"
            });

            return res.status(201).json(newDeposit);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { user_id, id } = req.params;
            const {
                value,
                depositDate,
                depositConfirmationDate,
                status
            } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const deposit = await Deposit.findOne({
                userId: user_id,
                _id: id
            });

            if (!deposit) {
                return res.status(404).json();
            }

            await deposit.updateOne({
                value,
                depositDate,
                depositConfirmationDate,
                status
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

            const deposit = await Deposit.findOne({
                userId: user_id,
                _id: id
            });

            if (!deposit) {
                return res.status(404).json();
            }

            await deposit.deleteOne();

            return res.status(200).json();
        } catch (err) {
           console.error(err);
           return res.status(500).json({ error: "Internal server error." });
        }
   }


}

export default new DepositController();