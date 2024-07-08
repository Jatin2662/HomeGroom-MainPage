const Feedback = require('../models/feedback');

const sendFeedback = async (req, res, next) => {
    const { email, experience, features, customerService, satisfaction, recommendation, suggestions } = req.body;

    try {
        const feedback = new Feedback({
            email,
            experience,
            features,
            customerService,
            satisfaction,
            recommendation,
            suggestions
        });

        await feedback.save();
        res.status(201).json({ message: 'Thank you for your invaluable Feedback, it helps us to improve.' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback. Please try again later.', error });
    }
};

exports.sendFeedback = sendFeedback;








// const Feedback = require('../models/feedback');

// const sendFeedback = async (req, res, next) => {

//     const email = req.body.email;
//     const feedback = req.body.feedback;
//     console.log(email);
//     console.log(feedback);
//     try {
//         const feedback = new Feedback({
//             email: req.body.email,
//             experience: req.body.experience,
//             features: req.body.features,
//             customerService: req.body.customerService,
//             satisfaction: req.body.satisfaction,
//             recommendation: req.body.recommendation,
//             suggestions: req.body.suggestions
//         });

//         await feedback.save();
//         res.status(201).json({ message: 'Thankyou for your invaluable Feedback, it helps us to improve.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error submitting feedback. Please try again later.', error });
//     }
// };

// exports.sendFeedback = sendFeedback;