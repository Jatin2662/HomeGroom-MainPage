


const userSignup = require('../models/customers');

const fetchCustomers = async (req, res, next)=>{

    try{
        const customers = await userSignup.find();
        res.status(200).json(customers)
    } catch(err){
        res.status(500).json({message : "Unable to get Customers"})
    }
}

exports.fetchCustomers = fetchCustomers;