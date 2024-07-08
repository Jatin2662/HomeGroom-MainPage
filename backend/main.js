



const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeDetailsController = require('./controllers/employeeDetailsController');
const employeeNewController = require('./controllers/employeeNewController');
const Service = require('./controllers/serviceController');
const Pending = require('./controllers/pendingWorkController');
const Completed = require('./controllers/completedWorkController');
const All = require('./controllers/allWorkController');
const Customers = require('./controllers/customerController');
const Contact = require('./controllers/contactController');
const Admin = require('./controllers/adminProfileController');
const { check } = require('express-validator');
// const EmployeeDetails = require('./models/employeeDetails');
// const { check } = require('express-validator');

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


app.get('/EmployeeDetails', employeeDetailsController.getEmployee);

app.post('/AddNewEmployeePage', [check('email').isEmail(), check('phoneNo').isLength({ min: 10, max:10 })], employeeNewController.addEmployee);

app.post('/Services', Service.handleImageUpload)

app.get('/PendingWork', Pending.fetchPendingOrders);

app.put('/PendingWork', Pending.updateComplete);

app.get('/AllWork', All.fetchAllOrders);

app.get('/CompletedWork', Completed.fetchCompletedOrders);

app.get('/YourCustomers', Customers.fetchCustomers);

app.get('/Queries', Contact.fetchQuestions);

app.post('/EditAdminProfile', Admin.handleImageUpload);

// app.post('/EditAdminProfile', Admin.updateDetails);

app.get('/', Admin.fetchAllImages);

// app.put('/EditAdminProfile', Admin.updateUserDetails);


// yeh add karna hai function, pehle id layenge frontend se 
// delete karne ke baad page bhi refresh karna hai taaki updated employee ki details aa jay
app.delete('/EmployeeDetails/:id', employeeDetailsController.deleteEmployee);



app.listen(port, () => {
    console.log(`Working on port : ${port}`)
})