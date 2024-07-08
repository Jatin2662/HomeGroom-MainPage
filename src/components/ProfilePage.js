

import React from "react";
import profilePhoto from '../assets/Profile-Picture.jpg';
import './ProfilePage.css';
import { FaHistory } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";


const ProfilePage = ({ isOpen }) => {

    return (
        <section className={`profile ${isOpen ? 'open' : ''}`}>
            <div className="panel">
                <div>Your Profile</div>
                <div><MdOutlineEdit /></div>
            </div>

            <div className="separate"></div>

            <div className="photoContainer">
                <img src={profilePhoto} alt="Your Profile Picture" className="photo" />

                <div className="userDetails">
                    <div style={{ fontWeight: "500" }}>Your Name</div>
                    <div style={{ maxWidth: "100%", wordWrap : "break-word"}}>yourname6575@gmail.com</div>
                </div>
            </div>

            <div className="separate"></div>

            <div className="menu">
                <div className="menu-item">
                    <div><FaHistory /></div> <div>History</div>
                </div>
                <div className="menu-item">
                    <div><IoNotifications /></div> <div>Notifications</div>
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;


// import React from 'react';
// import './ProfilePage.css';

// const ProfilePanel = ({ isOpen, togglePanel }) => {
//   return (
//     <div className={`profile-panel ${isOpen ? 'open' : ''}`}>
//       <div className="profile-content">
//         {/* Profile page content goes here */}
//         <h2>Profile</h2>
//         <p>This is your profile page.</p>
//         {/* <button onClick={togglePanel}>Close</button> */}
//       </div>
//     </div>
//   );
// }

// export default ProfilePanel;