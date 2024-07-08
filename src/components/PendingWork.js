


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CompletedWork.css';

function PendingWork() {
    const [pwlist, setPwlist] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const toggleCompletion = (orderId) => {
        if (completedOrders.includes(orderId)) {
            setCompletedOrders(completedOrders.filter(id => id !== orderId));
        } else {
            setCompletedOrders([...completedOrders, orderId]);
        }
    };

    const update = async () => {
        try {
            await axios.put('http://localhost:3001/PendingWork', { completedOrders });
            window.location.reload();
        } catch (error) {
            console.error('Error updating orders:', error);
        }
    };

    const getPendingWork = async () => {
        try {
            const response = await axios.get('http://localhost:3001/PendingWork');
            setPwlist(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getPendingWork();
    }, []);

    return (
        <section className="completed">

            <h1>Pending Work</h1>

            <div className="separated"></div>

            <header>
                <div className="nav">
                    <div>Customer Email</div>
                    <div>Date</div>
                    <div>Items</div>
                    <div>Order Status</div>
                </div>
            </header>

            <main>
                <section className="done">
                    {!pwlist.length? 
                    <h1>No Pending work. Great Keep it Up.</h1>
                    : pwlist.map((order) =>
                        order.orders.map((subOrder) => (
                            <div className="eachWork" key={subOrder._id}>
                                <div className="email-wrap">{order.email}</div>
                                <div>{new Date(subOrder.createdAt).toLocaleDateString()}</div>
                                <div>
                                    <ul>
                                        {subOrder.items.map((item, index) => (
                                            <li key={index}>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="sta">
                                    <div>{subOrder.orderStatus}</div>
                                    <div className="checkbox-container">
                                        <label htmlFor="co">Completed?</label>
                                        <input type="checkbox" onChange={() => toggleCompletion(subOrder._id)}></input>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>

            </main>
            <div className="upload">
                <button onClick={update}>Update</button>
            </div>
        </section>
    );
}

export default PendingWork;




// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './CompletedWork.css';
// // import { WorkInfo } from './Data';

// // customer name, employee name, work, date   --> I will create a panel showing this content and below this we will display details


// function PendingWork() {

//     const [pwlist, setPwlist] = useState([]);

//     const getEmployees = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/PendingWork');
//             setPwlist(response.data);
//             console.log(setPwlist);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         getEmployees();
//     },[]);

//     return (
//         <section className="completed">

//             <h1>Pending Work</h1>

//             <div className="separated"></div>

//             <header>
//                 <div className="nav">
//                     <div>Customer Name</div>
//                     <div>Employee Name</div>
//                     <div>Job</div>
//                     <div>Date</div>
//                     <div>Status</div>
//                 </div>
//             </header>

//             <main>
//                 <section className="done">
//                     {pwlist.map((work) => {

//                         const { id, email, job, createdAt } = work;

//                         return (
//                             <div className="eachWork" key={id}>
//                                 <div>{customerName}</div>
//                                 <div>{employeeName}</div>
//                                 <div>{job}</div>
//                                 <div>{date}</div>
//                             </div>
//                         );
//                     })}
//                 </section>
//             </main>
//         </section>
//     );
// }

// export default PendingWork;