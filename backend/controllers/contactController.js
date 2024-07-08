

const Contact = require('../models/contact');

const sendContactDetails = async (req, res, next)=>{
    const {firstName, lastName, email, query} = req.body;

    try{
        const userContact = new Contact({
            firstName : firstName,
            lastName : lastName,
            email : email,
            query : query
        });

        await userContact.save();

        res.status(201).send({message : "Your query is sent. We will contact you soon."})
    } catch(error){
        return res.status(401).send({message : "Unable to send your query, try again later!"})
    }
}

exports.sendContactDetails = sendContactDetails;