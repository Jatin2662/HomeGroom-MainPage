




const userOrder = require('../models/WorkPending');

const fetchCompletedOrders = async (req, res, next) => {
  try {
    const completedOrders = await userOrder.find({ 'orders.orderStatus': 'Completed' });
    res.status(200).json(completedOrders);
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ message: 'Failed to fetch completed orders. Please try again.' });
  }
}

exports.fetchCompletedOrders = fetchCompletedOrders;
