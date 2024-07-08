

import React, { useState, useContext } from "react";
import axios from 'axios';
import './EditAdminProfile.css'; 
import { AdminContext } from '../contexts/AdminContext';   

function EditAdminProfile() {

    const AdminData = useContext(AdminContext);

    let id = null;

    if (AdminData) {
        id = AdminData.id;
    }

    console.log("Frontend : ",id);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [disabled, setDisabled] = useState(false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        
        formData.append('image', image);
        formData.append('firstName', fname);
        formData.append('lastName', lname);
        formData.append('email', email);
        formData.append('phone', phone);


        try {
            await axios.post('http://localhost:3001/EditAdminProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error uploading profile:', error);
            alert('Error uploading profile. Please try again.');
        }

        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        // setDisabled(true);
        setImage(null);
        setPreviewImage(null);

        document.getElementById('file-input').value = null;
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        const imageUrl = URL.createObjectURL(selectedImage);
        setPreviewImage(imageUrl);
    };

    return (
        <section className="admin-profile">
            <h1>Welcome, {fname + ' ' + lname}</h1>

            <main>
                <form onSubmit={handleSubmit} className="ap-form">
                    <div className="ap-names">
                        <div>
                            <label>First Name</label>
                            <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required></input>
                        </div>
                    </div>

                    <div className="em-ph">
                        <div>
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Phone no</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} required></input>
                        </div>
                    </div>

                    <div className="e-img-fields">
                        {previewImage && <img src={previewImage} alt="Preview" />}
                        <input
                            type="file"
                            id="file-input"
                            onChange={handleImageChange}
                            accept="image/*"
                            
                            required
                        />
                    </div>

                    <div className="ap-btn">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </main>
        </section>
    );
}

export default EditAdminProfile;




// import React, { useState } from "react";
// import axios from 'axios';
// import './EditAdminProfile.css';    


// function EditAdminProfile() {

//     const [fname, setFname] = useState('');
//     const [lname, setLname] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [disabled, setDisabled] = useState(false);
//     const [image, setImage] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         setFname('');
//         setLname('');
//         setEmail('');
//         setPhone('');
//         setDisabled(true);
//         setImage(null);
//         setPreviewImage(null);

//         document.getElementById('file-input').value = null;
//     }

//     const handleImageChange = (e) => {
//         const selectedImage = e.target.files[0];
//         setImage(selectedImage);

//         const imageUrl = URL.createObjectURL(selectedImage);
//         setPreviewImage(imageUrl);
//     };

//     return (
//         <section className="admin-profile">
//             <h1>Welcome, {fname + ' ' + lname}</h1>

//             <main >
//                 <form onSubmit={handleSubmit} className="ap-form">
//                     <div className="ap-names">
//                         <div>
//                             <label>First Name</label>
//                             <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} disabled={disabled} required></input>
//                         </div>
//                         <div>
//                             <label>Last Name</label>
//                             <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} disabled={disabled} required></input>
//                         </div>
//                     </div>

//                     <div className="em-ph">
//                         <div>
//                             <label>Email</label>
//                             <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} disabled={disabled} required></input>
//                         </div>
//                         <div>
//                             <label>Phone no</label>
//                             <input type="tel" value={phone} onChange={(e)=> setPhone(e.target.value)} maxLength={10} disabled={disabled} required></input>
//                         </div>
//                     </div>

//                     <div className="img-fields">
//                         {previewImage && <img src={previewImage} alt="Preview" />}
//                         {/* {previewImage ? <img src={previewImage} alt="Preview" /> : null} */}
//                             <input
//                                 type="file"
//                                 id="file-input"
//                                 onChange={handleImageChange}
//                                 accept="image/*"
//                                 disabled={disabled}
//                                 required
//                             />
//                         </div>

//                     <div className="ap-btn">
//                         <button>Save</button>
//                     </div>
//                 </form>
//             </main>
//         </section>
//     );
// }

// export default EditAdminProfile;