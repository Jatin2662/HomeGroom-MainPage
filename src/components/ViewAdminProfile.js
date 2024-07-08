import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ViewAdminProfile.css';
import { AdminContext } from '../contexts/AdminContext';


function ViewAdminProfile() {
    const AdminData = useContext(AdminContext);

    // const [id, setId] = useState('');
    // const [fname, setFname] = useState('');
    // const [lname, setLname] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [previewImage, setPreviewImage] = useState(null);

    // const fetchUserName = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001');
    //         console.log("Fetched data:", response.data);

    //         if (Array.isArray(response.data) && response.data.length > 0) {
    //             const fetchedData = response.data[0];
    //             setFname(fetchedData.firstName || '');
    //             setLname(fetchedData.lastName || '');
    //             setEmail(fetchedData.email || '');
    //             setPhone(fetchedData.phone || '');
    //             if (fetchedData.image) {
    //                 setPreviewImage(`data:image/jpeg;base64,${fetchedData.image}`);
    //             } else {
    //                 setPreviewImage(null);
    //             }

    //             // Log states after setting them
    //             console.log("States after setting:");
    //             console.log({ 
    //                 fname: fetchedData.firstName || '', 
    //                 lname: fetchedData.lastName || '', 
    //                 email: fetchedData.email || '', 
    //                 phone: fetchedData.phone || '', 
    //                 previewImage: fetchedData.image ? `data:image/jpeg;base64,${fetchedData.image}` : null 
    //             });
    //         } else {
    //             console.error("Fetched data is not an array or is empty");
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user name:', error);
    //     }
    // };
    
    // useEffect(() => {
    //     fetchUserName();
    // }, []);

    // useEffect(() => {
    //     console.log("State updated:");
    //     console.log({ fname, lname, email, phone, previewImage });
    // }, [fname, lname, email, phone, previewImage]);

    return (
        <section className="view-admin-profile">
            {!AdminData?
            <>
            <h1>Welcome, </h1>
            <main>
                <div className="view-ap-details">
                    <div className="view-em-ph">
                        <div>
                            <label className="l">Email</label>
                            <p></p>
                        </div>
                        <div>
                            <label className="l">Phone no</label>
                            <p></p>
                        </div>
                    </div>

                    <div className="view-img-fields">
                    Profile Photo
                    </div>
                </div>
                
            </main>
            </>
            :
            <>
            <h1>Welcome, {AdminData.firstName + ' ' + AdminData.lastName}</h1>
            <main>
                <div className="view-ap-details">
                    
                    <div className="view-em-ph">
                        <div>
                            <label className="l">Email</label>
                            <p>{AdminData.email}</p>
                        </div>
                        <div>
                            <label className="l">Phone no</label>
                            <p>{AdminData.phone}</p>
                        </div>
                    </div>

                    <div className="view-img-fields">
                        {AdminData.image && <img src={`data:image/jpeg;base64,${AdminData.image}`} alt="Profile" />}
                    </div>
                </div>
                
            </main>
            </>
            }
           
        </section>
    );
}

export default ViewAdminProfile;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ViewAdminProfile.css';

// function ViewAdminProfile() {
//     const [id, setId] = useState('');
//     const [fname, setFname] = useState('');
//     const [lname, setLname] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [previewImage, setPreviewImage] = useState(null);

//     const fetchUserName = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001');
//             console.log(response.data);

//             const fetchedData = response.data;
//             setFname(fetchedData.firstName);
//             setLname(fetchedData.lastName);
//             setEmail(fetchedData.email);
//             setPhone(fetchedData.phone);
//             setPreviewImage(`data:image/jpeg;base64,${fetchedData.image}`);
//         } catch (error) {
//             console.error('Error fetching user name:', error);
//         }
//     };
    
//     useEffect(()=>{
//         fetchUserName();
//     },[]);
    

//     return (
//         <section className="view-admin-profile">
//             <h1>Welcome, {fname} {lname}</h1>
//             <main>
//                 <div className="view-ap-details">
//                     <div className="view-ap-names">
//                         <div>
//                             <label className="l">First Name</label>
//                             <p>{fname}</p>
//                         </div>
//                         <div>
//                             <label className="l">Last Name</label>
//                             <p>{lname}</p>
//                         </div>
//                     </div>

//                     <div className="view-em-ph">
//                         <div>
//                             <label className="l">Email</label>
//                             <p>{email}</p>
//                         </div>
//                         <div>
//                             <label className="l">Phone no</label>
//                             <p>{phone}</p>
//                         </div>
//                     </div>

//                     <div className="view-img-fields">
//                         {previewImage && <img src={previewImage} alt="Profile" />}
//                     </div>
//                 </div>
                
//             </main>
//         </section>
//     );
// }

// export default ViewAdminProfile;
