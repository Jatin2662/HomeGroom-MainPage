


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Queries.css';

function Queries() {

    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState('');

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Queries');
            setQuestions(response.data);
            console.log(questions);
        } catch (error) {
            setMessage("Error fetching queries " + error.response.data.error);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <section className="questions">
            <h1>Answer these Queries</h1>
            {message && <p className="error-message">{message}</p>}
            <header className="q-h">
                <ul>
                    <li className="name-col">Name</li>
                    <li className="email-col">Email</li>
                    <li className="query-col">Query</li>
                    <li className="date-col">Date</li>
                </ul>
            </header>

            <main className="question-box">
                {!questions.length ?
                    <h1 className="error-message">No Queries</h1> :
                    <ul>
                        {questions.map((q) => {
                            const { _id, firstName, lastName, email, query, date } = q;
                            return (
                                <li key={_id} className="single-question">
                                    <div className="name-col">{firstName + ' ' + lastName}</div>
                                    <div className="email-col">{email}</div>
                                    <div className="query-col">{query}</div>
                                    <div className="date-col">{new Date(date).toLocaleDateString()}</div>
                                </li>
                            );
                        })}
                    </ul>
                }
            </main>
        </section>
    );
}

export default Queries;




// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './Queries.css';


// function Queries() {

//     const [questions, setQuestions] = useState([]);
//     const [message, setMessage] = useState('');

//     const getQuestions = async ()=>{
//         try{
//             const response = await axios.get('http://localhost:3001/Queries');
//             setQuestions(response.data);
//             console.log(questions);
//         } catch(error){
//             setMessage("Error fetching queries" + error.response.data.error);
//         }
//     }

//     useEffect(()=>{
//         getQuestions();
//     }, []);

//     return (
//         <section className="questions">
//             <h1>Answer these queries</h1>

//             <header className="q-h">
//                 <ul>
//                     <li>Name</li>
//                     <li>Email</li>
//                     <li>Query</li>
//                     <li>Date</li>
//                 </ul>
//             </header>

//             <main className="question-box">
//                 {!questions.length ?
//                     <h1>No queries</h1> :
//                     <ul>
//                         {questions.map((q)=>{

//                             const {_id, firstName, lastName, email, query, date} = q;

//                             return(
//                                 <li key={_id} className="single-question">
//                                     <div>{firstName + ' ' + lastName}</div>
//                                     <div>{email}</div>
//                                     <div>{query}</div>
//                                     <div>{new Date(date).toLocaleDateString()}</div>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 }
//             </main>
//         </section>
//     );
// }

// export default Queries;