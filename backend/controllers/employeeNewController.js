


const Employee = require('../models/employeeNew');

const addEmployee = async (req, res, next) => {
    // const error = validationResult(req);
    // if(!error.isEmpty()){
    //     return next(new Error('Invalid input, please check your details'));
    //   }
    const { name, phoneNo, email } = req.body;
  
    let existingEmployee;
    try {
        existingEmployee = await Employee.findOne({ email: email });
    } catch (err) {
      return res.status(401).send({error : "Shayad Employee ho skta hai. Try Again!!!"})
    }
    if (existingEmployee) {
      return res.status(201).send({message : "Employee hai"})
    }
  
    const newEmployee = new Employee({
      name: name,
      phoneNo : phoneNo,
      email: email,
    });
  
    try {
      await newEmployee.save();
      res.status(201).send({ message: 'Employee is added' });
    } catch (err) {
      return res.status(401).send({error : 'Unable to save Employee details, try again'});
    }
    // res.status(201).json({message: 'User is added'});
  }
  

exports.addEmployee = addEmployee;
