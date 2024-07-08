

const userOrder = require('../models/WorkPending');

const fetchPendingOrders = async (req, res, next) => {
  try {
    const pendingOrders = await userOrder.find({ 'orders.orderStatus': 'Pending' });
    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({ message: 'Failed to fetch pending orders. Please try again later.' });
  }
}

const updateComplete = async (req, res, next)=>{

    const { completedOrders } = req.body;

    try {
        await Promise.all(completedOrders.map(async (orderId) => {
            await userOrder.updateOne(
                { "orders._id": orderId },
                { $set: { "orders.$.orderStatus": "Completed" } }
            );
        }));

        res.status(200).json({ message: 'Orders updated successfully' });
    } catch (error) {
        console.error('Error updating orders:', error);
        res.status(500).json({ message: 'Failed to update orders' });
    }
}


exports.fetchPendingOrders = fetchPendingOrders;
exports.updateComplete = updateComplete;