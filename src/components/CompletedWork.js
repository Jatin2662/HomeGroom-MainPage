




import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CompletedWork.css';

function CompletedWork() {
    const [cwlist, setCwlist] = useState([]);


    const getCompletedWork = async () => {
        try {
            const response = await axios.get('http://localhost:3001/CompletedWork');
            setCwlist(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getCompletedWork();
    }, []);

    return (
        <section className="completed">

            <h1>Completed Work</h1>

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
                    {!cwlist.length? 
                    <h1>Nothing Completed. Work hard</h1>
                    : cwlist.map((order) =>
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
                                </div>
                            </div>
                        ))
                    )}
                </section>

            </main>
            
        </section>
    );
}

export default CompletedWork;






// import React from "react";
// import './CompletedWork.css';
// import { WorkInfo } from './Data';

// // customer name, employee name, work, date   --> I will create a panel showing this content and below this we will display details


// function CompletedWork() {

//     return (
//         <section className="completed">

//             <h1>Work Successfully Completed</h1>

//             <div className="separated"></div>

//             <header>
//                 <div className="nav">
//                     <div>Customer Name</div>
//                     <div>Employee Name</div>
//                     <div>Job</div>
//                     <div>Date</div>
//                 </div>
//             </header>

//             <main>
//                 <section className="done">
//                     {WorkInfo.map((work) => {

//                         const { id, customerName, employeeName, job, date } = work;

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

// export default CompletedWork;