

import React, { useState, useEffect, useContext } from "react";
import './FirstSection.css'
import axios from 'axios';
import { chooseUs } from './Data.js';
import { Link, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { imagesHai } from './Data.js';
import {faqs} from './Data.js';
import { useLocation } from 'react-router-dom';
import { EmailContext } from './contexts/EmailContext';
import { PiMailboxBold } from "react-icons/pi";
import { MdCall } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import Experience from './Experience.js';


// import { featureImages } from './Data.js'

import { AiFillSafetyCertificate } from "react-icons/ai";
{/* <AiFillSafetyCertificate /> */ }


// function Card() {

//     return (
//         <div className="serviceImages">
//             {featureImages.map((img) => {
//                 const { id, image, title } = img;

//                 return (
//                     <div className="card" key={id}>
//                         <img src={image}></img>
//                         <h2>{title}</h2>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }




function Card() {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);  // will see
    const [error, setError] = useState(null);  // will see

    useEffect(() => {
        // Fetch images from the server
        // axios.get(`${process.env.REACT_APP_API_URL}/BookNow`)  // will see
        axios.get('http://localhost:3001/BookNow')
            .then(response => {
                const imagesData = response.data;
                setImages(imagesData);
                // console.log(imagesData);
                setLoading(false);  // will see
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setError('Error fetching images');  // will see
                setLoading(false);  // will see
            });
    }, []);

    if (loading) return <p>Loading...</p>;  // will see
    if (error) return <p>{error}</p>;  // will see

    return (
        <Slider {...settings}>
            {images.map((img) => {
                const { id, image, title } = img;

                return (
                    <div className="card" key={id}>
                        <div className="center-content">
                            <img src={`data:image/jpeg;base64,${image}`} alt={title} />
                            <h2 >{title}</h2>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}


function FAQ() {
    return (
        <section id="faq">
            <h1>Frequently Asked Questions</h1>
            <div className="faq-items">
                {faqs.map(({ id, question, answer }) => (
                    <div className="faq-item" key={id}>
                        <h2>{question}</h2>
                        <p>{answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}


// function Testimonials(){

//     const satisfied = [
//         {
//         id : 1,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Ethan fails"
//         },
//         {
//         id : 2,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Alice "
//         },
//         {
//         id : 3,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Terrius "
//         },
//         {
//         id : 4,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Ethan fails"
//         },
//         {
//         id : 5,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Alice "
//         },
//         {
//         id : 6,
//         answer : "Good and the best service, provide skilled workers who can work relentessly and flawlessly.",
//         user : "Terrius "
//         }
//     ]

//     return(
//         <section className="testimonials">
//             <h1>Our Customers</h1>
//             <article>
//             {satisfied.map((sat)=>{
//                 const {id, answer, user} = sat;

//                 return(
//                     <div className="single-testimony" key={id}>
//                         <img alt="image"></img>
//                         <p>{answer}</p>
//                         <div>{user}</div>
//                     </div>
//                 );
//             })}
//             </article>
//         </section>
//     );
// }

function Testimonials() {
    const satisfied = [
        {
            id: 1,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Ethan Fails"
        },
        {
            id: 2,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Alice"
        },
        {
            id: 3,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Terrius"
        },
        {
            id: 4,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Ethan Fails"
        },
        {
            id: 5,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Alice"
        },
        {
            id: 6,
            answer: "Good and the best service, provide skilled workers who can work relentlessly and flawlessly.",
            user: "Terrius"
        }
    ];

    return (
        <section className="testimonials">
            <h1>Our Customers</h1>
            <div className="testimonials-container">
                {satisfied.map((sat) => {
                    const { id, answer, user } = sat;

                    return (
                        <div className="single-testimony" key={id}>
                            <img alt="image" />
                            <p>{answer}</p>
                            <div>{user}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Testimonials;



function FirstSection() {

    const { email } = useContext(EmailContext);
    const { message } = useContext(EmailContext);

    console.log(email + " at root");

    const showPanel = ()=>{
        const element = document.querySelector('.no-click');
        // console.log(element);
        if (element) {
            element.classList.remove('exp-show');
        }
    }

    useEffect(() => {
        if (message) {
            const element = document.querySelector('.fsm');

            setTimeout(() => {
                element.classList.add('fsm-hide');
            }, 3000);
        }
    }, [message]);

    const navigate = useNavigate();

    const handleScroll = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            navigate(sectionId, { replace: true });  // Replace the current history entry
        }
    }

    return (
        <>
            <section id="about" className="first">
                
                <div className="intro">
                    <h1>Customer's Choice HomeGroom</h1>
                    <p>Hire your personal helper and get your work done within hours. Experienced workers are available here. Highly skilled</p>
                    <button className="btn"> <Link className="btn-link" to="/BookNow">Book Now</Link> </button>
                </div>

                <div className="images">
                    {imagesHai.map((img) => {

                        const { id, image } = img;
                        return (
                            <div key={id}>
                                <img src={image}></img>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="services" className="second">
                <h1>Featured Services Offered</h1>
                <p>We offer best services by providing professional workers</p>
                <div className="carousel">
                    <Card />
                </div>
            </section>

            <section className="third">
                <h1>Why to choose us</h1>
                <div className="blue-images">
                    {chooseUs.map((img) => {
                        const { id, image, title, description } = img;

                        return (
                            <div className="blue-card" key={id}>
                                <div>{image}</div>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Testimonials />

            <FAQ />

            <section className="fourth">
                <article className="home">
                    <h1>HomeGroom</h1>
                    <p>We work for your comfort and provide the best service.</p>
                </article>

                <article className="contact-us">
                    <h1>Contact us</h1>

                    <ul>
                        <li><span className="icons"><PiMailboxBold /></span>&nbsp;<a href="/ContactForm" target="_blank">Email HomeGroom</a>
                        </li>
                        <li><span className="icons"><MdCall /></span>&nbsp;<a href="tel:9087654321">9087654321</a></li>
                        <li><span className="icons"><BsFillQuestionSquareFill /></span>&nbsp;<span onClick={() => handleScroll('#faq')} style={{cursor : "pointer"}}>View Frequently Asked Questions</span></li>

                    </ul>

                </article>

                <article className="connect">
                    <h1>Connect with us</h1>

                    <ul>
                        <li><a href="https://www.facebook.com"><span className="icons" target="_blank"><FaSquareFacebook /></span>&nbsp;Follow us on Facebook</a></li>
                        <li><a href="https://www.instagram.com"><span className="icons" target="_blank"><FaInstagram /></span>&nbsp;Follow us on Instagram</a></li>
                        <li><a href="https://www.linkedin.com"><span className="icons" target="_blank"><IoLogoLinkedin /></span>&nbsp;Connect on LinkedIn</a></li>
                    </ul>

                </article>
            </section>

            <Experience />

            {/* <div className="sye" onClick={showPanel}>Share your Experience</div> */}
            <div className="sye" onClick={showPanel}>Reach Us</div>

            {/* <Link to="/Experience" target="_blank"><div className="sye">Share your Experience</div></Link> */}

            {message && <div className="fsm">{message}</div>}
        </>
    );
}


export const func = {
    Card,
    FirstSection
}