import User from "../models/User";
import Deposit from "../models/Deposit";

class DepositController {

    async index(req, res){
        try {
            const { user_id } = req.params;
            const { company, start_date, end_date, status } = req.query;


            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let deposit;

            if(((user.permission) == "admin") || ((user.permission) == "supervisor")){
                deposit = await Deposit.find();
            }else{
                deposit = await Deposit.find({
                    userId: user_id
                });
            }

            deposit = company ? ( deposit.filter(result => {
                return result.depositCompany === company;
            })) : deposit;

            deposit = (start_date && end_date) ? ( deposit.filter(result => {
                return result.depositDate >= start_date && result.depositDate <= end_date;
            })) : deposit;

            deposit = status ? ( deposit.filter(result => {
                return result.status === status;
            })) : deposit;

            

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
                status: "Pendente",
                userId: user_id
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