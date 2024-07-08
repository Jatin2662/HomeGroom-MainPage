import React, { useState, useContext } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { GiBroom } from "react-icons/gi";
import { chooseUs } from './Data';
import { useNavigate } from 'react-router-dom';
import { EmailContext } from './contexts/EmailContext';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { setEmail: setContextEmail } = useContext(EmailContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/LogIn', { email, password });
            console.log(response);

            setContextEmail(email);
            navigate('/');

            setErrorMessage(response.data.message);
        } catch (error) {
            setErrorMessage(error.response.data.error);
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
                                        <li key={id}>{title}</li>
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
                    <h1>Login as Customer</h1>
                    <div className="switch">Don't have an account? <Link to="/SignUp"><span className="change">Sign up</span></Link></div>
                    <form className="user-detail" onSubmit={handleSubmit}>
                        <div className="info">
                            <input type="email" placeholder="email" className="fields" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="password" className="fields" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="error-field">
                            {errorMessage && <p>{errorMessage}</p>}
                        </div>
                        <div className="btn2">
                            <button type="button">Forgot Password?</button>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    );
}

export default LogIn;




// import React, { useState, useContext  } from 'react';
// import axios from "axios";
// import { Link } from "react-router-dom";
// import './SignIn_SignUp.css';
// import { GiBroom } from "react-icons/gi";
// import { chooseUs } from './Data';
// import { useNavigate } from 'react-router-dom';

// import { EmailContext } from './contexts/EmailContext';

// function LogIn() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const { setEmail: setContextEmail } = useContext(EmailContext);

//     const navigate = useNavigate();

//     const handleSubmit = async (e)=>{
//         e.preventDefault();

//         try{
//             const response = await axios.post('http://localhost:3001/LogIn', {email, password});
//             console.log(response)
//             // navigate('/', { state: { email } });

//             setContextEmail(email);
//             navigate('/');

//             setErrorMessage(response.data.message);
//         } catch(error){
//             setErrorMessage(error.response.data.error)
//         }
//     }

//     return (
//         <section className="background-page">
//             <div className="side-content">
//                 <section className="side">
//                     <h1>HomeGroom</h1>
//                     <div className="content">
//                         <article>
//                             <div>We are ready to serve you</div>
//                             <ul>
//                                 {chooseUs.map((item) => {
//                                     const { id, image, title, description } = item;
//                                     return (
//                                         <li key={id}>{title}</li>
//                                     );
//                                 })}
//                             </ul>
//                         </article>
//                         <div className="broom-img">
//                             <GiBroom size="80%" color="#fff200" />
//                         </div>
//                     </div>
//                 </section>
//             </div>


//             <section className="enter">
//                     <div className="signup">
//                         <h1>login as Customer</h1>
//                         <div className="switch">Don't have an account? <Link to="/SignUp"><span className="change">Sign up</span></Link></div>
//                         <form className="user-detail" onSubmit={handleSubmit}>
//                             <div className="info">
//                                 <input type="email" placeholder="email" className="fields" value={email} onChange={(e)=> setEmail(e.target.value)} required></input>
//                                 <input type="password" placeholder="password" className="fields" value={password} onChange={(e)=> setPassword(e.target.value)} required></input>

//                             </div>
//                             <div className="error-field">
//                                 {errorMessage && <p>{errorMessage}</p>}
//                             </div>
//                             <div className="btn2">
//                                 <button type="button">Forgot Password?</button>
//                                 <button type="submit">Login</button>
//                             </div>

//                         </form>
//                     </div>
//             </section>
//             {/* <div><Link to="/Administrator/AdminMainPage">Admin</Link></div> */}
//         </section>
//     );
// }

// export default LogIn;
