

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { check } = require('express-validator');
const userControllers = require('./controllers/userController');
const BookNowController = require('./controllers/BookNowController');
const ContactController = require('./controllers/contactController');
const feedbackController = require('./controllers/feedbackController');

const app = express();
const cors = require('cors');
const port = 3001;
// const port = process.env.PORT || 3001;

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://creativejatin111:DK5akG7hlB8whwxr@cluster0.czfpipa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connnected")
}).catch(err => {
    console.log(err)
})

app.post('/SignUp', [check('email').isEmail(), check('password').isLength({ min: 8 })], userControllers.signup);
app.post('/LogIn', userControllers.login);

app.get('/BookNow', BookNowController.fetchAllImages );
app.post('/BookNow', userControllers.placeOrder);

app.post('/ContactForm', ContactController.sendContactDetails);

app.post('/CustomerSatisfactionSurvey', feedbackController.sendFeedback);

app.get('/YourOrders', userControllers.getUserOrders);

app.get('/CustomerProfile/:email', userControllers.getUserDetails);
app.put('/CustomerProfile/:email', userControllers.updateUserDetails);


app.listen(port, () => {
    console.log(`Working on port : ${port}`)
})      