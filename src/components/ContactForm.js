import React from "react";
import { useState } from "react";
import './ContactForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function ContactForm() {

    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const queries = ["Time", "Place", "Work here"];
    const [query, setQuery] = useState(queries[0]);
    
    const updateQuery = (e) => {
        setQuery(e.target.value);
    }
    
    const sendQuery = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/ContactForm', { firstName, lastName, email, query });
            setMessage(response.data.message);
            setFirstName('');
            setLastName('');
            setEmail('');
            setQuery('');
        } catch (error) {
            setMessage(error.response.data.error)
        }
    }

    const navigate = useNavigate();

    const GoToHome = ()=>{
        navigate('/', { replace: true });
    }

   
    
    return (
        <section className="contact-form">
            <header className="CFHeader">
                <div className="head" onClick={GoToHome}>
                    <div className="head-a">
                        <span className="big">HG</span>
                        <span className="divider"></span>
                        <span>Client Services</span>
                        </div>
                    <div className="container" onClick={GoToHome}>
                        HomeGroom
                    </div>
                </div>
            </header>

            <main className="cf-main">
                <div>
                    <h1>Contact Form</h1>
                    <p>Fill out the form with your inquiry and we'll be in touch shortly!</p>
                </div>

                <article className="CF">
                    <form onSubmit={sendQuery}>
                        <h1>Step 1 : Personal Details</h1>
                        <div className="step1">
                            <div className="name">
                                <div>
                                    <label>First Name: <span className="red">*</span></label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
                                </div>

                                <div>
                                    <label>Last Name: <span className="red">*</span></label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className="email">
                                <label>Email: <span className="red">*</span></label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            </div>
                        </div>

                        <h1>Step 2 : What information are you looking for?</h1>
                        <div className="step2">
                            <div>
                                <label htmlFor="query">Select your query from dropdown menu below : <span className="red">*</span></label>
                                <select id="query" name="qu" value={query} onChange={updateQuery} required>
                                    {queries.map((qu) => {
                                        return (
                                            <option key={qu}>{qu}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <footer>
                            <div className="CFmessage">{message}</div>
                            <button type="submit">Submit</button>
                        </footer>
                    </form>
                </article>
            </main>
        </section>
    );
}

export default ContactForm;
