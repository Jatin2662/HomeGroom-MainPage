


const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userLogin = require('../models/userLogin');
const userSignup = require('../models/userSignup');
const userOrder = require('../models/userOrder');
const CustomerProfile = require('../models/userAddress');
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js');


const login = async (req, res, next) => {
  // const error = validationResult(req);

  const { email, password } = req.body;
  // console.log("Aya");
  let existingUser;
  try {
    existingUser = await userSignup.findOne({ email: email });
    // console.log("Try block")
    if (!existingUser) {
      // console.log("Try block ->")
      return res.status(404).send({ error: "User nahi haiga" })
    }
  } catch (err) {
    // console.log("catch block")
    return res.status(201).send({ message: 'Hehehe, kuch toh Garbar hai!!' });
    // return next(new Error('Hehehe, kuch toh Garbar hai!!!'))
  }

  // if (existingUser.password !== password) {
  //   console.log("password");
  //   return res.status(401).send({ error: "Kuch toh galat hai" })
  // }
  // res.status(200).send({ message: "Done, Aage bado" })
  try {
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).send({ error: "Kuch toh galat hai" })
    }
    res.status(200).send({ message: "Done, Aage bado" })
  } catch (error) {
    res.status(401).send({ error: "LogIn nahi hua" })
  }
}


const signup = async (req, res, next) => {
  const error = validationResult(req);
  // if(!error.isEmpty()){
  //     return next(new Error('Invalid input, please check your details'));
  //   }
  const { fname, lname, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userSignup.findOne({ email: email });
  } catch (err) {
    return res.status(401).send({ message: "Sign Up failed!!!" })
  }
  if (existingUser) {
    return res.status(201).send({ message: "User hai!!! Login Karo" })
  }





  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSignup({
      firstname: fname,
      lastname: lname,
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send({ message: 'User is added' });
  } catch (err) {

    return res.status(401).send({ message: 'Signup failed, try again' });
  }
  // res.status(201).json({message: 'User is added'});
}



const getCustomBill = (email, selected, res) => {

  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD // Use app password here if 2FA is enabled
    }
  };

  let transporter = nodemailer.createTransport(config);

  const generateItemsHtml = (items) => {
    return items.map(item => {
      const { id, title } = item;
      return `<div key="${id}">${title}</div>`;
    }).join('');
  };

  const itemsHtml = generateItemsHtml(selected);

  // Your custom HTML content
  let customHtml = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f4f4f4;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            h3 {
                color: #555;
                font-size: 18px;
                margin-top: 20px;
            }
            .order-items {
                background-color: #fff;
                border-radius: 5px;
                padding: 10px;
                margin-top: 10px;
            }
            .order-items div {
                margin-bottom: 5px;
            }
            p {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <h1>Home Groom</h1>
        <p>Hello,</p>
        <p>This is a confirmation email for your order.</p>
        <h3>You requested for</h3>
        <div class="order-items">
            ${itemsHtml}
        </div>
        <p>Home Groom at your service</p>
        <p>If you want to cancel your order please email us at <a href="mailto:support@homegroom.com">support@homegroom.com</a></p>
    </body>
    </html>
`;


  let message = {
    from: EMAIL,
    to: email,
    subject: "Order Confirmation",
    html: customHtml
  };

  transporter.sendMail(message).then(() => {
    return res.status(201).json({ message: "Order placed successfully and email is sent to your registered mail id" });
  }).catch(error => {
    return res.status(500).json({ error });
  });
};



const placeOrder = async (req, res, next) => {
  const { email, selected } = req.body;

  try {
    // let order = await userOrder.findOne({ email });

    // if (!order) {
    //   order = new userOrder({
    //     email: email,
    //     orders: []
    //   });
    // }

    let order;
    order = new userOrder({
      email: email,
      orders: []
    });

    order.orders.push({
      items: selected,
      orderStatus: 'Pending'
    });

    await order.save();



    getCustomBill(email, selected, res); // Aah paya new cheez

    // res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order placement error:', error);
    return res.status(500).send({ message: 'Failed to place your order. Please try again later.' });
  }
}


const getUserOrders = async (req, res, next) => {
  const email = req.query.email;
  console.log("Backend customer", email);

  try {
    const completedOrders = await userOrder.find({ 'email': email });
    res.status(200).json(completedOrders);
  } catch (error) {
    console.error('Error fetching your orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders. Please try again.' });
  }
}

// const userDetails = async (req, res, next)=>{
//   const {firstName, lastName, selectedAddress, allAddresses} = req.body;

//   try{
//     const customerProfile = new CustomerProfile({
//       firstName : firstName,
//       lastName : lastName,
//       selectedAddress : selectedAddress,
//       allAddresses : allAddresses
//     });
//      await customerProfile.save();
//      res.status(201).json({message : "Your details are saved"});
//   } catch(error){
//       res.status(500).json({message : "Something went wrong"})
//   }
// }


// const userDetails = async (req, res, next) => {
//   const { firstName, lastName, selectedAddress, allAddresses, id } = req.body;

//   // Validate input data
//   if (!firstName || !lastName || !Array.isArray(allAddresses)) {
//     return res.status(400).json({ message: "Invalid input data" });
//   }

//   try {
//     let customerProfile;

//     if (id) {
//       // Update existing profile
//       customerProfile = await CustomerProfile.findByIdAndUpdate(
//         id,
//         { firstName, lastName, selectedAddress, allAddresses },
//         { new: true }
//       );

//       if (!customerProfile) {
//         return res.status(404).json({ message: "Customer profile not found" });
//       }

//       res.status(200).json({ message: "Your details are updated", customerProfile });
//     } else {
//       // Create new profile
//       customerProfile = new CustomerProfile({
//         firstName,
//         lastName,
//         selectedAddress,
//         allAddresses
//       });

//       await customerProfile.save();
//       res.status(201).json({ message: "Your details are saved", customerProfile });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };

// router.get('/customer-profile/:email', 
const getUserDetails = async (req, res) => {
  const { email } = req.params;

  console.log("Backend getUserDetails", email);
  try {
    const user = await userSignup.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

// Update user details
// router.put('/customer-profile/:email', 
const updateUserDetails = async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, selectedAddress, allAddresses } = req.body;

  try {
    const user = await userSignup.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        selectedAddress,
        allAddresses,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Your details are updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}




exports.login = login;
exports.signup = signup;
exports.placeOrder = placeOrder;
exports.getUserOrders = getUserOrders;
exports.getUserDetails = getUserDetails;
exports.updateUserDetails = updateUserDetails;
exports.getCustomBill = getCustomBill;