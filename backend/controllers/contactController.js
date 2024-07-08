


const Contact = require('../models/contact');

const fetchQuestions = async (req, res, next)=>{

    try{
        const questions = await Contact.find();
        res.status(200).json(questions);
    } catch(error){
        res.status(500).json({message : "Unable to fetch questions"});
    }
}

exports.fetchQuestions = fetchQuestions;