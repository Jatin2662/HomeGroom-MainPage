import React, { useState, useContext } from "react";
import { EmailContext } from './contexts/EmailContext';
import './CustomerSatisfactionSurvey.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerSatisfactionSurvey() {
    const { email } = useContext(EmailContext);
    console.log("At customer survey", email);
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [feedback, setFeedback] = useState({
        email: email,
        experience: '',
        features: '',
        customerService: '',
        satisfaction: '',
        recommendation: '',
        suggestions: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/CustomerSatisfactionSurvey', feedback);
            setMessage(response.data.message);
            setFeedback({
                email: email,
                experience: '',
                features: '',
                customerService: '',
                satisfaction: '',
                recommendation: '',
                suggestions: '',
            });
            setTimeout(()=>navigate('/', {replace : true}), 1500)
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    const handleFeedbackChoice = (choice) => {
        if (choice === 'yes') {
            setShowForm(true);
        } else {
            navigate('/', { replace: true });
        }
    };

    const radio_values = [
        { 
            id: 1,
            level: "very-bad", 
            write: "Very Bad" 
        },
        { 
            id: 2, 
            level: "bad", 
            write: "Bad" 
        },
        { 
            id: 3, 
            level: "average", 
            write: "Average" 
        },
        { 
            id: 4, 
            level: "good", 
            write: "Good" 
        },
        { 
            id: 5, 
            level: "excellent", 
            write: "Excellent" 
        }
    ];

    return (
        <section className={showForm ? 'CSS' : 'css'}>
            {!showForm ? (
                <div className="feedback-choice">
                    <p>Would you like to share your feedback?</p>
                    <button onClick={() => handleFeedbackChoice('yes')}>Yes</button>
                    <button onClick={() => handleFeedbackChoice('no')}>No</button>
                </div>
            ) : (
                <div>
                    <h1>Tell us about your experience</h1>
                    {message && <div className="feedback-message"><div>{message}</div></div>}
                    <form onSubmit={handleSubmit}>
                        <div className="text-input">
                            <label htmlFor="experience">Overall Experience:</label>
                            <textarea id="experience" name="experience" rows="4" cols="50" value={feedback.experience} onChange={handleChange} required></textarea>
                        </div>
                        <div className="text-input">
                            <label htmlFor="features">Specific Features or Benefits:</label>
                            <textarea id="features" name="features" rows="4" cols="50" value={feedback.features} onChange={handleChange} required></textarea>
                        </div>
                        <div className="text-input">
                            <label htmlFor="customerService">Customer Service:</label>
                            <textarea id="customerService" name="customerService" rows="4" cols="50" value={feedback.customerService} onChange={handleChange} required></textarea>
                        </div>
                        <div className="radio-input">
                            <label>Satisfaction Level:</label>
                            <div className="radio">
                                {radio_values.map((rv) => {
                                    const { id, level, write } = rv;
                                    return (
                                        <div key={id} className="single-radio">
                                            <input type="radio" id={level} name="satisfaction" value={write} checked={feedback.satisfaction === write} onChange={handleChange} />
                                            <label htmlFor={level}>{write}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="radio-input">
                            <label>Would you recommend us?</label>
                            <div className="radio">
                                <div className="single-radio">
                                    <input type="radio" id="recommend-yes" name="recommendation" value="yes" checked={feedback.recommendation === "yes"} onChange={handleChange} />
                                    <label htmlFor="recommend-yes">Yes</label>
                                </div>
                                <div className="single-radio">
                                    <input type="radio" id="recommend-no" name="recommendation" value="no" checked={feedback.recommendation === "no"} onChange={handleChange} />
                                    <label htmlFor="recommend-no">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="text-input">
                            <label htmlFor="suggestions">Improvement Suggestions:</label>
                            <textarea id="suggestions" name="suggestions" rows="4" cols="50" value={feedback.suggestions} onChange={handleChange}></textarea>
                        </div>
                        <div className="css-btn-div">
                            <button className="css-btn" type="submit">Submit Feedback</button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}

export default CustomerSatisfactionSurvey;







// import React, { useState, useEffect, useContext } from "react";
// import { EmailContext } from './contexts/EmailContext';
// import './CustomerSatisfactionSurvey.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function CustomerSatisfactionSurvey() {

//     const { email } = useContext(EmailContext);
//     console.log("At customer survey", email);
//     const navigate = useNavigate();

//     const [message, setMessage] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [feedback, setFeedback] = useState({
//         experience: '',
//         features: '',
//         customerService: '',
//         satisfaction: '',
//         recommendation: '',
//         suggestions: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFeedback({ ...feedback, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try{
//             const response = await axios.post('http://localhost:3001/CustomerSatisfactionSurvey', feedback);
//             // setMessage(response.data.message.message);
//         } catch(error){
//             console.log(error.response.data.error)
//         }
//         console.log(feedback);
//         setFeedback({
//             experience: '',
//             features: '',
//             customerService: '',
//             satisfaction: '',
//             recommendation: '',
//             suggestions: '',
//         })
//     };

//     const handleFeedbackChoice = (choice) => {
//         if (choice === 'yes') {
//             setShowForm(true);
//         } else {
//             // navigate(-1); // Navigate back to the previous page
//             navigate('/', { replace: true })
//         }
//     };

//     const radio_values = [
//         {
//             id: 1,
//             level: "very-bad",
//             write: "Very Bad"
//         },
//         {
//             id: 2,
//             level: "bad",
//             write: "Bad"
//         },
//         {
//             id: 3,
//             level: "average",
//             write: "Average"
//         },
//         {
//             id: 4,
//             level: "good",
//             write: "Good"
//         },
//         {
//             id: 5,
//             level: "excellent",
//             write: "Excellent"
//         }
//     ];

//     const myCSS = ["CSS", "css"]

//     return (
//         <section className={showForm ? 'CSS' : 'css'}>
//             {!showForm ? (
//                 <div className="feedback-choice">
//                     <p>Would you like to share your feedback?</p>
//                     <button onClick={() => handleFeedbackChoice('yes')}>Yes</button>
//                     <button onClick={() => handleFeedbackChoice('no')}>No</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Tell us about your experience</h1>
//                     {message && <div className="feedback-message">
//                         <div>{message}</div></div>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="text-input">
//                             <label htmlFor="experience">Overall Experience:</label>
//                             <textarea id="experience" name="experience" rows="4" cols="50" onChange={handleChange} required></textarea>
//                         </div>
//                         <div className="text-input">
//                             <label htmlFor="features">Specific Features or Benefits:</label>
//                             <textarea id="features" name="features" rows="4" cols="50" onChange={handleChange} required></textarea>
//                         </div>
//                         <div className="text-input">
//                             <label htmlFor="customerService">Customer Service:</label>
//                             <textarea id="customerService" name="customerService" rows="4" cols="50" onChange={handleChange} required></textarea>
//                         </div>
//                         {/* <div className="text-input">
//                     <label htmlFor="satisfaction">Satisfaction Level (1-10):</label>
//                     <input type="number" id="satisfaction" name="satisfaction" min="1" max="10" onChange={handleChange}/>
//                 </div> */}
//                         <div className="radio-input">
//                             <label>Satisfaction Level:</label>
//                             <div className="radio">
//                                 {radio_values.map((rv) => {
//                                     const { id, level, write } = rv;
//                                     return (
//                                         <div key={id} className="single-radio">
//                                             <input type="radio" id={level} name="satisfaction" value={write} onChange={handleChange} />
//                                             <label htmlFor={level}>{write}</label>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                         <div className="radio-input">
//                             <label>Would you recommend us?</label>
//                             <div className="radio">
//                                 <div className="single-radio">
//                                     <input type="radio" id="recommend-yes" name="recommendation" value="yes" onChange={handleChange} />
//                                     <label htmlFor="recommend-yes">Yes</label>
//                                 </div>
//                                 <div className="single-radio">
//                                     <input type="radio" id="recommend-no" name="recommendation" value="no" onChange={handleChange} />
//                                     <label htmlFor="recommend-no">No</label>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="text-input">
//                             <label htmlFor="suggestions">Improvement Suggestions:</label>
//                             <textarea id="suggestions" name="suggestions" rows="4" cols="50" onChange={handleChange}></textarea>
//                         </div>
//                         <div className="css-btn-div">
//                             <button className="css-btn" type="submit">Submit Feedback</button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default CustomerSatisfactionSurvey;




