




const userOrder = require('../models/WorkPending');

const fetchAllOrders = async (req, res, next) => {
  try {
    const allOrders = await userOrder.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ message: 'Failed to fetch completed orders. Please try again.' });
  }
}

exports.fetchAllOrders = fetchAllOrders;
