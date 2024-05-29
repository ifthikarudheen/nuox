import Shareholder from '../models/shareholder.js';
import Shares from '../models/shares.js';
import MonthlyPayments from '../models/monthlyPayments.js'
import Sequelize from 'sequelize';
const getAllShareHolders = async (req, res) => {
    try {
        const shareholders = await Shareholder.findAll({
            attributes: ['firstName'],
            include: [{
                model: Shares,
                attributes: ['total_amount', 'due_amount', 'paid_amount']
            }]
        });
        const result = shareholders.map(shareholder => {
            const summary = shareholder.Shares.reduce((total, share) => {
                const dueAmount = Number(share.due_amount ?? 0);
                const paidAmount = Number(share.paid_amount ?? 0);
                const totalAmount = Number(share.total_amount ?? 0);

                total.balance += dueAmount - paidAmount;
                total.total_amount += totalAmount;
                total.due_amount += dueAmount;
                total.paid_amount += paidAmount;

                return total;
            }, {
                balance: 0,
                total_amount: 0,
                due_amount: 0,
                paid_amount: 0,
            });

            return {
                firstName: shareholder.firstName,
                balance: summary.balance,
                total_amount: summary.total_amount,
                due_amount: summary.due_amount,
                paid_amount: summary.paid_amount,
            };
        });

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const addShareHolder = async (req, res) => {
    const { email, phone_number, country, firstName } = req.body;
    try {
        console.log(req.body)
        const newSahreHolder = await Shareholder.create({
            email,
            phone_number,
            country,
            firstName,
        });
        res.status(201).json(newSahreHolder);
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addShare = async (req, res) => {
    const { total_amount, duration, installment_type, start_date, due_amount, paid_amount, shareholder_id } = req.body;
    try {
        console.log(req.body)
        const newShare = await Shares.create({
            total_amount,
            duration,
            installment_type,
            start_date,
            due_amount,
            shareholder_id

        });

        let dueDate = new Date(start_date);

        const share_id = newShare.id

        const monthlyPayments = [];

        for (let i = 0; i < duration; i++) {
            const monthlyPayment = {
                due_amount,
                share_id,
                due_date: dueDate,
                balance_amount: due_amount
            };

            monthlyPayments.push(monthlyPayment);

            dueDate = new Date(dueDate.getTime() + installment_type * 24 * 60 * 60 * 1000); // Increment by interval days
        }

        await MonthlyPayments.bulkCreate(monthlyPayments);

        res.status(201).json({ message: 'Shares and monthly payments created successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getSharebyId = async (req, res) => {
    const id = req.params.id;

    try {
        const share = await Shareholder.findOne({
            attributes: ['firstName'],
            include: [{
                model: Shares,
                attributes: ['total_amount'],
                include: [{
                    model: MonthlyPayments,
                    attributes: ['due_amount', 'due_date', 'balance_amount'],
                }]
            }],
            where: { id }
        });
        if (share) {
            res.status(200).json(share);
        } else {
            res.status(404).json({ error: 'share not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Controller method to update a todo by ID
const addPayment = async (req, res) => {
    const id = req.params.id;
    const { amount, monthId } = req.body;
    try {
        const share = await Shares.findByPk(id);
        const monthShare = await MonthlyPayments.findByPk(monthId)
        if (share && monthShare) {
            share.paid_amount = amount;
            monthShare.balance_amount -= amount;
            await Promise.all([share.save(), monthShare.save()]);
            res.status(201).json(share);
        } else {
            res.status(404).json({ error: 'share' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const searchShareholder = async (req, res) => {
    const { query } = req.query;
    console.log(query)
    try {
        const shareholders = await Shareholder.findAll({
            where: {
                firstName: { [Sequelize.Op.like]: `%${query}%` }
            }
        });
        console.log(shareholders)
        res.status(200).json(shareholders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { getAllShareHolders, addShareHolder, addShare, getSharebyId, addPayment, searchShareholder };
