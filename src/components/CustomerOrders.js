import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './CustomerOrders.css';
import { EmailContext } from './contexts/EmailContext';

function YourOrders() {
    const [aolist, setAolist] = useState([]);
    const { email } = useContext(EmailContext);

    const getAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/YourOrders?email=${email}`);
            setAolist(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (email) {
            getAllOrders();
        }
    }, [email]);

    const obfuscateEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const obfuscatedLocalPart = localPart.slice(0, 3) + '***';
        return `${obfuscatedLocalPart}@${domain}`;
    };

    return (
        <section className="completed">
            {!email ? (
                <h1>LogIn first</h1>
            ) : (
                <>
                    <h1>Your Orders</h1>
                    {/* <p>Logged in as: {obfuscateEmail(email)}</p> */}
                    <div className="separated"></div>
                    <header className="CO-header">
                        <div className="nav">
                            <div>Customer Email</div>
                            <div>Placed on</div>
                            <div>Items</div>
                            <div>Order Status</div>
                        </div>
                    </header>
                    <main>
                        <section className="done">
                            {!aolist.length ? (
                                <h1>No Orders. Place some orders and get benefits</h1>
                            ) : (
                                aolist.map((order) =>
                                    order.orders.map((subOrder) => (
                                        <div className="eachWork" key={subOrder._id}>
                                            <div className="email-wrap">{obfuscateEmail(order.email)}</div>
                                            <div>{new Date(subOrder.createdAt).toLocaleDateString()}</div>
                                            <div className="eachWork-order">
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
                                )
                            )}
                        </section>
                    </main>
                </>
            )}
        </section>
    );
}

export default YourOrders;








// import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
// import './CustomerOrders.css';
// import { EmailContext } from './contexts/EmailContext';

// function YourOrders() {
//     const [aolist, setAolist] = useState([]);
//     const { email } = useContext(EmailContext);

//     console.log("your orders ", email)

//     const getAllOrders = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/YourOrders');
//             setAolist(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         if (email) {
//             getAllOrders();
//         }
//     }, [email]);

//     return (
//         <section className="completed">
//             {!email ? (
//                 <h1>LogIn first</h1>
//             ) : (
//                 <>
//                     <h1>Your Orders</h1>
//                     <div className="separated"></div>
//                     <header className="CO-header">
//                         <div className="nav">
//                             <div>Customer Email</div>
//                             <div>Placed on</div>
//                             <div>Items</div>
//                             <div>Order Status</div>
//                         </div>
//                     </header>
//                     <main>
//                         <section className="done">
//                             {!aolist.length ? (
//                                 <h1>No Orders. Place some orders and get benefits</h1>
//                             ) : (
//                                 aolist.map((order) =>
//                                     order.orders.map((subOrder) => (
//                                         <div className="eachWork" key={subOrder._id}>
//                                             <div className="email-wrap">{order.email}</div>
//                                             <div>{new Date(subOrder.createdAt).toLocaleDateString()}</div>
//                                             <div>
//                                                 <ul>
//                                                     {subOrder.items.map((item, index) => (
//                                                         <li key={index}>{item.title}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                             <div className="sta">
//                                                 <div>{subOrder.orderStatus}</div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )
//                             )}
//                         </section>
//                     </main>
//                 </>
//             )}
//         </section>
//     );
// }

// export default YourOrders;







// import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
// import './CustomerOrders.css';
// import { EmailContext } from './contexts/EmailContext';



// function YourOrders() {
//     const [aolist, setAolist] = useState([]);
//     const { email } = useContext(EmailContext);

//     const getAllOrders = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/YourOrders');
//             setAolist(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         getAllOrders();
//     }, []);

//     return (
//         <section className="completed">

//             {!email ?
//                 <h1>LogIn first</h1>
//                 :
//                 <>
//                     <h1>Your Orders</h1>

//                     <div className="separated"></div>

//                     <header className="CO-header">
//                         <div className="nav">
//                             <div>Customer Email</div>
//                             <div>Placed on</div>
//                             <div>Items</div>
//                             <div>Order Status</div>
//                         </div>
//                     </header>

//                     <main>
//                         <section className="done">
//                             {!aolist.length ?
//                                 <h1>No Orders. Place some orders and get benefits</h1>
//                                 : aolist.map((order) =>
//                                     order.orders.map((subOrder) => (
//                                         <div className="eachWork" key={subOrder._id}>
//                                             <div className="email-wrap">{order.email}</div>
//                                             <div>{new Date(subOrder.createdAt).toLocaleDateString()}</div>
//                                             <div>
//                                                 <ul>
//                                                     {subOrder.items.map((item, index) => (
//                                                         <li key={index}>{item.title}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                             <div className="sta">
//                                                 <div>{subOrder.orderStatus}</div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                         </section>

//                     </main>
//                 </>
//             }

//         </section>
//     );
// }

// export default YourOrders;



