

import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './SignIn_SignUp.css';
import { GiBroom } from "react-icons/gi";
import { chooseUs } from './Data';
import { useNavigate } from 'react-router-dom';



function SignUp() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3001/SignUp', {fname, lname, email, password});
            setErrorMessage(response.data.message);

            navigate('/LogIn');
        } catch(error){
            setErrorMessage(error.response.data.error)
        }
    }

    return (
        <section className="background-page">
            <div className="side-content">
                <section className="side">
                    <h1>HomeGroom</h1>
                    <div className="content">
                        <article>
                            <div>We are ready to serve you</div>
                            <ul>
                                {chooseUs.map((item) => {
                                    const { id, image, title, description } = item;
                                    return (
                                        <li>{title}</li>
                                    );
                                })}
                            </ul>
                        </article>
                        <div className="broom-img">
                            <GiBroom size="80%" color="#fff200" />
                        </div>
                    </div>
                </section>
            </div>


            <section className="enter">
                    <div className="signup">
                        <h1>SignUp as Customer</h1>
                        <div className="switch">Already have an account? <Link to="/LogIn"><span className="change">Log in</span></Link></div>
                        <form className="user-detail" onSubmit={handleSubmit}>
                            <div className="info">
                                <input type="text" placeholder="first name" className="fields" value={fname} onChange={(e)=> setFname(e.target.value)} required></input>
                                <input type="text" placeholder="last name" className="fields" value={lname} onChange={(e)=> setLname(e.target.value)} required></input>
                                <input type="email" placeholder="email or phone number" className="fields" value={email} onChange={(e)=> setEmail(e.target.value)} required></input>
                                <input type="password" placeholder="password" className="fields" value={password} onChange={(e)=> setPassword(e.target.value)} required></input>
                            </div>
                            <div className="error-field">
                            {errorMessage && <p>{errorMessage}</p>}
                            </div>
                            <div className="btn1">
                                <button>Sign Up</button>
                            </div>
                            <div className="terms-conditions">By signing up you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a></div>
                        </form>
                    </div>
            </section>
            {/* <div><Link to="/Administrator/AdminMainPage">Admin</Link></div> */}
        </section>
    );
}

export default SignUp;