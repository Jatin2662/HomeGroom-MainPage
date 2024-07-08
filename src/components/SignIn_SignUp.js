

import React, { useState } from 'react';
import './SignIn_SignUp.css';
import { GiBroom } from "react-icons/gi";
import { chooseUs } from './Data';



// var change = true;

// const switcher = ()=>{
//     change = !change;
//     // let span =document.getElementById('change1').style.color= "green";
//     // console.log(span)

//     console.log("Aaya")
// }


function SignIn_SignUp() {

    const [change, setChange] = useState(true);

    const switcher = () => {
        setChange(!change);
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
                {change ?
                    <div className="signup">
                        <h1>SignUp as Customer</h1>
                        <div className="switch">Already have an account? <span className="change" onClick={switcher}>Log in</span></div>
                        <form className="user-detail">
                            <div className="info">
                                <input type="text" placeholder="first name" className="fields"></input>
                                <input type="text" placeholder="last name" className="fields"></input>
                                <input placeholder="email or phone number" className="fields"></input>
                                <input type="text" placeholder="password" className="fields"></input>
                            </div>
                            <div className="error-field"></div>
                            <div className="btn1">
                                <button>Sign Up</button>
                            </div>
                            <div className="terms-conditions">By signing up you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a></div>
                        </form>
                    </div>
                    :
                    <div className="signup">
                        <h1>login as Customer</h1>
                        <div className="switch">Don't have an account? <span className="change" onClick={switcher}>Sign up</span></div>
                        <form className="user-detail">
                            <div className="info">
                                <input type="text" placeholder="email" className="fields"></input>
                                <input type="text" placeholder="password" className="fields"></input>

                            </div>
                            <div className="error-field"></div>
                            <div className="btn2">
                                <button>Forgot Password?</button>
                                <button>Login</button>
                            </div>

                        </form>
                    </div>}
            </section>
            {/* <div><Link to="/Administrator/AdminMainPage">Admin</Link></div> */}
        </section>
    );
}

export default SignIn_SignUp;



{/* <section className="enter">
                {change ?
                    <div className="signup">
                        <h1>SignUp as Customer</h1>
                        <div className="switch">Already have an account? <span className="change" onClick={switcher}>Log in</span></div>
                        <form className="user-detail">
                            <div className="info">
                                <input type="text" placeholder="first name" className="fields"></input>
                                <input type="text" placeholder="last name" className="fields"></input>
                                <input placeholder="email or phone number" className="fields"></input>
                                <input type="text" placeholder="password" className="fields"></input>
                            </div>
                            <div className="error-field"></div>
                            <div className="btn1">
                                <button>Sign Up</button>
                            </div>
                            <div className="terms-conditions">By signing up you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a></div>
                        </form>
                    </div>
                    :
                    <div className="signup">
                        <h1>login as Customer</h1>
                        <div className="switch">Don't have an account? <span className="change" onClick={switcher}>Sign up</span></div>
                        <form className="user-detail">
                            <div className="info">
                                <input type="text" placeholder="email" className="fields"></input>
                                <input type="text" placeholder="password" className="fields"></input>

                            </div>
                            <div className="error-field"></div>
                            <div className="btn2">
                                <button>Forgot Password?</button>
                                <button>Login</button>
                            </div>

                        </form>
                    </div>}
            </section> */}



// function SignUp(){



//     return(
//     <div className="signup">
//     <h1>SignUp as Customer</h1>
//     <div className="switch">Already have an account? <span className="change" onClick={switcher}>Log in</span></div>
//     <form className="user-detail">
//         <div className="info">
//         <input type="text" placeholder="first name" className="fields"></input>
//         <input type="text" placeholder="last name" className="fields"></input>
//         <input placeholder="email or phone number" className="fields"></input>
//         <input type="text" placeholder="password" className="fields"></input>
//         </div>
//         <div className="error-field"></div>
//         <div className="btn1">
//             <button>Sign Up</button>
//         </div>
//         <div className="terms-conditions">By signing up you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a></div>
//     </form>
// </div>
//     );
// }

// function Login(){


//     return(
//         <div className="Login">
//             <h1>Log in</h1>
//             <div className="switch">Don't have an account? <span className="change2" onClick={switcher}>Sign up</span></div>
//             <form className="user-detail">
//                 <div className="info">
//                 <input type="text" placeholder="email" className="fields"></input>
//                 <input type="text" placeholder="password" className="fields"></input>
//                 </div>
//                 <div className="error-field"></div>
//                 <div className="btn2">
//                     <button>Forgot Password?</button>
//                     <button>Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export {Login}
// export default SignUp;

