

import React, { useState } from "react";
import axios from 'axios';
import './AddNewEmployeePage.css';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


function AddNewEmployeePage() {

    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(values)
        // setValues({ name: '', phoneNo: '', email: '' })

        try{
            const response = await axios.post('http://localhost:3001/AddNewEmployeePage', {name, phoneNo, email});
            setMessage(response.data.message);
            setSubmitted(true)
            setTimeout(()=>
                navigate('/EmployeeDetails')
            , 1500)
        } catch(error){
            setMessage(error.response.data.error);
        }

        // setTimeout(() => setSubmitted(true), 2000);
    }

    // const saveValue = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value })
    // }


    return (
        <section className="mainBox1">
            <div>
                <h1>New Employee? Enter details.</h1>
            </div>
            <section className="form">
                {submitted ?
                    <div className="status">
                        <div>
                            <TiTick size="10vh" />
                        </div>
                        <div>
                            <h2>{message}</h2>
                        </div>
                    </div>
                    :
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="info">
                            <input type="text" placeholder="Name" className="fields" value={name} name="name" onChange={(e) => setName(e.target.value)} required></input>
                            <input type="text" placeholder="Phone No" className="fields" value={phoneNo} name="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} required></input>
                            <input type="text" placeholder="Email" className="fields" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                            <div>
                                <label htmlFor="fileInput">Upload Resume: </label>
                                <input type="file" id="fileInput" name="fileInput"></input>
                            </div>
                        </div>

                        <div className="btn-sub">
                            <button>Upload</button>
                        </div>
                    </form>}
            </section>
        </section>
    );
}

export default AddNewEmployeePage;