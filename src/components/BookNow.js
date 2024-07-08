import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './BookNow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {func} from './FirstSection';
import bike from '../assets/bike.svg';
import { GiDutchBike } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import CustomerSatisfactionSurvey from './CustomerSatisfactionSurvey';

import { useLocation } from 'react-router-dom';

import { EmailContext } from './contexts/EmailContext';

function Select() {

    const { email } = useContext(EmailContext);

//     const location = useLocation();
//   const email = location.state?.email;

    const [selected, setSelected] = useState([]);
    const [itemsSent, setItemsSent] = useState(false);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState('');
    

    console.log(email + " at BookNow");

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get('http://localhost:3001/BookNow');
                const availabilityData = response.data;
    
                const fetchedData = await Promise.all(
                    availabilityData.map(async (item) => {
                        const { id, title, image } = item;
                        const imageUrl = `data:image/jpeg;base64,${image}`;
                        return { id, title, imageUrl };
                    })
                );
    
                setAvailability(fetchedData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching availability');
                setLoading(false);
            }
        };
    
        fetchAvailability();
    }, []);
    

    // useEffect(() => {
    //     const fetchAvailability = async () => {
    //         try {
    //             console.log("Aaya1");
    //             const response = await axios.get('http://localhost:3001/BookNow');
    //             console.log("Aaya2");
    //             const availabilityData = response.data;

    //             // Fetch images for each item by title
    //             const fetchedImages = await Promise.all(
    //                 availabilityData.map(async (item) => {
    //                     const imageData = await fetchImage(item.title);
    //                     return { ...item, ...imageData };
    //                 })
    //             );

    //             setAvailability(fetchedImages);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Error fetching availability');
    //             setLoading(false);
    //         }
    //     };

    //     fetchAvailability();
    // }, []);
    

    // useEffect(() => {
    //     // Fetch availability data from the server
    //     axios.get('http://localhost:3001/BookNow')
    //         .then(response => {
    //             setAvailability(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching availability:', error);
    //         });
    // }, []);

    // const fetchImage = async (title) => {
    //     try {
    //         const response = await axios.get(`http://localhost:3001/BookNow`, {
    //             responseType: 'blob'
    //         });

    //         const contentType = response.headers['content-type'];
    //         const fetchedTitle = response.headers['title'];
    //         const imageBlob = new Blob([response.data], { type: contentType });
    //         const imageUrl = URL.createObjectURL(imageBlob);

    //         return { title: fetchedTitle, imageUrl };
    //     } catch (error) {
    //         console.error('Error fetching image:', error);
    //         return null;
    //     }
    // };

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         const fetchedImages = await Promise.all(
    //             availability.map(async (item) => {
    //                 const imageData = await fetchImage(item.title);
    //                 return { ...item, ...imageData };
    //             })
    //         );
    //         setAvailability(fetchedImages);
    //     };

    //     fetchImages();
    // }, [availability]);

    // const add = (title) => {
    //     if (!selected.some(item => item.id === title.id)) {
    //         setSelected([...selected, title]);
    //     }
    // };

    const navigate = useNavigate();

    const add = (id, title) => {
        if (!selected.some(item => item.id === id)) {
            setSelected([...selected, { id, title }]);
        }
    };

    const remove = (id) => {
        setSelected(selected.filter(item => item.id !== id));
    };

    const sendOrder = async () => {
        try {
            const response = await axios.post('http://localhost:3001/BookNow', { email, selected});
            setOrderPlaced(response.data.message + ' Order Placed... Stay connected');
            setSelected([]);

            setTimeout(()=>{
                
                navigate('/CustomerSatisfactionSurvey');
            }, 1500);
            
        } catch (error) {
            setOrderPlaced(error.response.data.error);
        }

        setItemsSent(true);
    } 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <section className="full-page">
            <section className="visualise">
                <h1>Available Services</h1>
                <div className="carousel">
                    {/* {availability.map((item) => {
                        const { id, title, imageUrl } = item;
                        

                        return (
                            <div className="item" key={id}>
                                {imageUrl && <img src={imageUrl} alt={title} />}
                                <div>{title}</div>
                            </div>
                        );
                    })} */}
                    <func.Card/>
                </div>
            </section>

            <div className="divider">
            <GiDutchBike size="50px"/>
                <div className="bike">Your Order <img src={bike} alt="Bike" /></div>
            </div>

            <section className="select">
                <div className="options">
                    {availability.map((item) => {
                        const { id, title } = item;
                        const isAdded = selected.some(selectedItem => selectedItem.id === id);

                        return (
                            <div className="item" key={id}>
                                <div>{title}</div>
                                <div className="buttons">
                                    {!isAdded ? (
                                        <button onClick={() => add(id, title)} disabled={itemsSent}>Add</button>
                                    ) : (
                                        <button onClick={() => remove(id)} disabled={itemsSent}>Remove</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="user-req">
                    <h1>Your necessities</h1>
                    <div className="list">
                        {!selected.length ? (
                            <div>
                                <h1>Add your requirements</h1>
                                <div>{orderPlaced}</div>
                            </div>
                        ) : (
                            selected.map((item) => {
                                const { id, title } = item;
                                return <div key={id}>{title}</div>;
                            })
                        )}
                    </div>
                    <div id="send-req">
                        <button onClick={() => sendOrder(email, selected)} disabled={itemsSent} >Send</button>
                        <button onClick={() => setItemsSent(false)}>Edit</button>
                    </div>
                </div>
            </section>

            <section className="jk"></section>
        </section>
    );
}

export default Select;





//**************************


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import './BookNow.css';
// import { func } from './FirstSection.js';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// // import { featureImages } from './Data.js';
// // import { availability } from './Data.js';

// // yeh comment hee rehne dena

// // function BookNow() {

// //     return (
// //         <section className="visualise">
// //             <h1>Available Services</h1>
// //             <div className="availabilty">
// //                 {featureImages.map((img) => {
// //                     const { id, image, title } = img;

// //                     return (
// //                         <div className="image" key={id}>
// //                             <img src={image}></img>
// //                         </div>
// //                     );
// //                 })}
// //             </div>
// //         </section>
// //     );
// // }


// function Select() {
//     const [selected, setSelected] = useState([]);
//     const [itemsSent, setItemsSent] = useState(false);
//     const [availability, setAvailability] = useState([]);


//         useEffect(() => {
//       // Fetch images for each item by title
//       availability.forEach(item => {
//         axios.get(`http://localhost:3001/BookNow`)
//           .then(response => {
//             const { id, title, image } = response.data;
//             const imageUrl =`data:image/jpeg;base64,${image}`
//             ;
//             setAvailability(prevImages => ({ ...prevImages, [item.id]: { id, title, url: imageUrl } }));
//           })
//           .catch(error => {
//             console.error(`Error fetching image for ${item.imageTitle}:`, error);
//           });
//       });
//     }, []);

//     // useEffect(() => {
//     //     // Fetch availability data from the server
//     //     axios.get('http://localhost:3000/BookNow')
//     //         .then(response => {
//     //             setAvailability(response.data);
//     //         })
//     //         .catch(error => {
//     //             console.error('Error fetching availability:', error);
//     //         });
//     // }, []);

//     const add = (service) => {
//         if (!selected.some(item => item.id === service.id)) {
//             setSelected([...selected, service]);
//         }
//     };

//     const remove = (id) => {
//         setSelected(selected.filter(item => item.id !== id));
//     };

//     // const postItems = async () => {
//     //     try {
//     //         const response = await axios.post('http://localhost:3001/BookNow', { email, selected });
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     return (
//         <section className="full-page">
//             <section className="visualise">
//                 <h1>Available Services</h1>
//                 <div className="carousel">
//                 <func.Card />
//                 </div>
//             </section>

//             <section className="select">
//                 <div className="options">
//                     {availability.map((item) => {
//                         const { id, title } = item;
//                         const isAdded = selected.some(selectedItem => selectedItem.id === id);

//                         return (
//                             <div className="item" key={id}>
//                                 <div>{title}</div>
//                                 <div className="buttons">
//                                     {!isAdded ? <button onClick={() => add(item)} disabled={itemsSent}>Add</button> :
//                                         <button onClick={() => remove(id)} disabled={itemsSent}>Remove</button>}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="user-req">
//                     <h1>Your necessities</h1>
//                     <div className="list">
//                         {!selected.length ?
//                             <h1>Add your requirements</h1> :
//                             selected.map((item) => {
//                                 const { id, service } = item;
//                                 return <div key={id}>{service}</div>;
//                             })
//                         }
//                     </div>
//                     <div id="send-req">
//                         {/* <button onClick={() => postItems()} disabled={itemsSent}>Send</button> */}
//                         <button  disabled={itemsSent}>Send</button> 
//                         <button onClick={() => setItemsSent(false)}>Edit</button>
//                     </div>
//                 </div>
//             </section>

//             <section className="jk"></section>
//         </section>
//     );
// }

// export default Select;


// **************************


// yeh wala comment hee rehne dena

// function Select() {
//     const [selected, setSelected] = useState([]);
//     const [itemsSent, setItemsSent] = useState(false);
//     const [images, setImages] = useState({});

//     let availability;

//     useEffect(() => {
//       // Fetch images for each item by title
//       availability.forEach(item => {
//         axios.get(`http://localhost:3000/image/title/${item.imageTitle}`)
//           .then(response => {
//             const { id, title, image } = response.data;
//             const imageUrl = `data:image/jpeg;base64,${image}`;
//             setImages(prevImages => ({ ...prevImages, [item.id]: { id, title, url: imageUrl } }));
//           })
//           .catch(error => {
//             console.error(`Error fetching image for ${item.imageTitle}:`, error);
//           });
//       });
//     }, []);

   

//     const add = (service) => {
//         if (!selected.some(item => item.id === service.id)) {
//             setSelected([...selected, service]);
//         }
//     };

//     const remove = (id) => {
//         setSelected(selected.filter(item => item.id !== id));
//     };

//     // const sendItems = (list) => {
//     //     // bina parameter ke bhi chal rha hai
//     //     console.log(list)
//     //     setItemsSent(true)
//     // }

//     // const postItems = async ()=>{
//     //     try{
//     //         const response = await axios.post('http://localhost:3001/BookNow', {email, selected})
//     //     } catch(error){
//     //         console.log(error);
//     //     }
//     // }


//     return (
//         <section className="full-page">
//             <section className="visualise">
//                 <h1>Available Services</h1>
//                 <div className="carousel">
//                     <func.Card />
//                 </div>
//             </section>

//             <section className="select">
//                 <div className="options">
//                     {availability.map((item) => {
//                         const { id, title } = item;
//                         const isAdded = selected.some(selectedItem => selectedItem.id === id);

//                         return (
//                             <div className="item" key={id}>
//                                 <div>{title}</div>
//                                 <div className="buttons">
//                                     {!isAdded ? <button onClick={() => add(item)} disabled={itemsSent}>Add</button> :
//                                         <button onClick={() => remove(id)} disabled={itemsSent}>Remove</button>}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="user-req">
//                     <h1>Your necessities</h1>
//                     <div className="list">
//                         {!selected.length ?
//                             <h1>Add your requirements</h1> :
//                             selected.map((item) => {
//                                 const { id, service } = item;
//                                 return <div key={id}>{service}</div>;
//                             })
//                         }
//                     </div>
//                     <div id="send-req">
//                         {/* <button onClick={() => postItems()} disabled={itemsSent}>Send</button>  */}  {/* yeh karna hai*/}
//                         <button  disabled={itemsSent}>Send</button> 
//                         <button onClick={() => setItemsSent(false)}>Edit</button>
//                     </div>
//                 </div>
//             </section>

//             <section className="jk"></section>
//         </section>
//     );
// }

// export default Select;




// ["Home Cleaner","Car Washer","Gardner","Baby sitter"]

// Maine likha

// function Select() {

//     const [selected, setSelected] = useState(availability);

//     const add = (service, id) => {
//         console.log("service is ", service);

//         if (selected.includes(service)) {
//             console.log("Aaya!!!!")
//             let btnid = "_" + id;
//             let mybtn = document.getElementById(btnid);
//             console.log(mybtn)
//             // mybtn.style.background = "grey";
//             mybtn.disabled = true;
//         }
//         else {
//             selected.push(service) // yahan integer return ho reha hai woh dekhna hai
//             console.log(selected);
//             setSelected(selected);
//             // {
//             //     id: selected.length + 1,
//             //     service: service
//             // }
//         }

//     }

//     const remove = (id) => {

//         if (!selected.length) {  // if selected is empty then disable the remove button
//             console.log("Empty")
//             console.log(selected);
//         }
//         else {
//             const items = selected.filter((i) => i.id != id);
//             setSelected(items);
//             let btnid = "_" + id;
//             let mybtn = document.getElementById(btnid);
//             console.log(mybtn)
//             // mybtn.style.background = "grey";
//             mybtn.disabled = false;

//         }

//         // console.log(items)
//         // console.log(selected)
//     }

//     return (
//         <section className="select">
//             <div className="options">

//                 {availability.map((item) => {
//                     const { id, service } = item;

//                     return (

//                         <div className="item" key={id}>
//                             <div>{service}</div>
//                             <div className="buttons">
//                                 <button id={"_" + id} onClick={() => add(service, id)} >Add</button>
//                                 <button id={service} onClick={() => remove(id)}>Remove</button>
//                             </div>
//                         </div>

//                     );
//                 })}

//             </div>
//             <div className="user-req">
//                 <h1>Your necessities</h1>
//                 <div className="list">
//                     {!selected.length ?

//                         <h1>Add your requirements</h1> :

//                         selected.map((item) => {

//                             const { id, service } = item;

//                             return (
//                                 <div key={id}>{service}</div>
//                             );
//                         })
//                     }
//                 </div>
//                 <div id="send-req">
//                     <button >Send</button>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Select;


// I loved it!!!

// function Select(){

//     return(
//         <section className="select">
//             <div className="options">
//                 <ul>
//                 {availability.map((item)=>{
//                     const {id, service} = item;

//                     return(
//                         <li key={id}>
//                             <input type="checkbox" id={service + id} name={service + id} value={service}></input>
//                             <label for={service + id}>{service}</label>
//                         </li>
//                     );
//                 })}
//                 </ul>
//             </div>
//             <div className="list"></div>
//         </section>
//     );
// }
