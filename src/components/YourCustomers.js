


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './YourCustomers.css';

function YourCustomers() {

    const [customers, setCustomers] = useState([]);

    const getCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/YourCustomers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <section className="customers">
            <h1>Your Customers</h1>

            <div className="separated"></div>

            <header>
                <div className="nav">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Joining Date</div>
                </div>
            </header>

            <main className="customerBox">

                {!customers.length ?
                    <div>No Customers</div>
                    :
                    customers.map((cus) => {
                        const { _id, firstname, lastname, email, createdAt } = cus;

                        return (
                            <div className="single-customer" key={_id}>
                                <div>{firstname + ' ' + lastname}</div>
                                <div>{email}</div>
                                <div>{new Date(createdAt).toLocaleDateString()}</div>
                            </div>
                        );
                    })}
            </main>
        </section>
    );
}

export default YourCustomers;