




import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CompletedWork.css';

function AllWork() {
    const [awlist, setAwlist] = useState([]);


    const getAllWork = async () => {
        try {
            const response = await axios.get('http://localhost:3001/AllWork');
            setAwlist(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllWork();
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
                    {!awlist.length? 
                    <h1>No work, Relax...</h1>
                    : awlist.map((order) =>
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

export default AllWork;



