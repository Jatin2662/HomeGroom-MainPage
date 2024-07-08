

import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { EmailContext } from './contexts/EmailContext';
import './Experience.css';
import { IoIosClose } from "react-icons/io";

function Experience() {

    // const [em, setEm] = useState('');
    const { email, setMessage } = useContext(EmailContext);

    const [btnDis, setBtnDis] = useState(true);
    const [feedback, setFeedback] = useState('');
    // const [message, setMessage] = useState('');

    // useEffect(() => {
    //     setEm(email);
    // }, [email]);

    const hidePanel = () => {
        const element = document.querySelector('.no-click');
        // console.log(element);
        if (element) {
            element.classList.add('exp-show');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001", { email, feedback });
            setMessage(response.data.message);

            setFeedback('');
            hidePanel();
        } catch (error) {
            setMessage(error.response.data.error);
        }
    }

    return (
        <div className="no-click exp-show">
            <section className="experience">
                <h1>Reach Us</h1>
                <div onClick={hidePanel} className="exp-div"><IoIosClose size="20px" /></div>
                {/* <div className="experience"> */}
                <div>
                    <p><span>Email:</span> support@homegroom.com</p>
                    <p><span>Phone:</span> 123-456-7890</p>
                    <p>Call us and stay Happy</p>
                </div>
            </section>
        </div>
    );
}

{/* <div className="no-click exp-show">
            <section className="experience">
            <h1>Share your Experience</h1>
            <div onClick={hidePanel} className="exp-div"><IoIosClose size="20px" /></div>
            <form onSubmit={handleSubmit}>
                <div className="text-input">
                    <label htmlFor="review">Tell us about our service :</label>
                    <textarea id="review" rows="4" cols="50" value={feedback} onChange={(e)=>{setFeedback(e.target.value); setBtnDis(false)}}>
                    </textarea>
                </div>
                <div className="exp-btn-div">
                    <button className="exp-btn" disabled={btnDis}>Share</button>
                </div>
            </form>
        </section>
        </div> */}

export default Experience;


