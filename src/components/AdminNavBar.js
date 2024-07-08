

import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import '../ProfilePage.css';
import './AdminNavBar.css';
import { ImProfile } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { FaUserNinja } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import profilePhoto from '../assets/model-photo.jpg';
import profile from '../assets/Profile-Picture.jpg';
import { GiHumanTarget } from "react-icons/gi";
import { AdminContext } from '../contexts/AdminContext';

const AdminNavBar = ({ isOpen, toggleOpen }) => {
    const location = useLocation();
    const AdminData = useContext(AdminContext);

    let id = null;

    if (AdminData) {
        id = AdminData.id;
    }

    return (
        <div className={`Anb ${isOpen ? 'open' : ''}`}>
            <div className="together">
                <div className="panel">
                    {/* <div onClick={toggleOpen}><IoCloseSharp /></div> */}
                    <div>AdminPanel</div>
                    <div><Link to="/EditAdminProfile"><MdOutlineEdit color="black" /></Link></div>
                </div>

                <div className="separate1"></div>

                <div className="photoContainer">
                    {/* <img src={profilePhoto} alt="Your Profile Picture" className="photo" /> */}
                    {/* <img src={profile} alt="Your Profile Picture" className="photo" /> */}
                    {!AdminData ? <img src={<GiHumanTarget />} alt="Your Profile Picture" className="photo" /> : <img src={`data:image/jpeg;base64,${AdminData.image}`} alt="Your Profile Picture" className="photo" />}
                    {!AdminData ?
                        <div className="userDetails">
                            <div style={{ fontWeight: "500" }}>Your Name</div>
                            <div style={{ maxWidth: "100%", wordWrap: "break-word", wordBreak: "break-all", whiteSpace: "normal" }}>yourname354@gmail.com</div>
                        </div>
                        :
                        <div className="userDetails">
                            <div style={{ fontWeight: "500" }}>{AdminData.firstName + ' ' + AdminData.lastName}</div>
                            <div style={{ maxWidth: "100%", wordWrap: "break-word", wordBreak: "break-all", whiteSpace: "normal" }}>{AdminData.email}</div>
                        </div>
                    }
                </div>
            </div>

            <div className="separate2"></div>

            <div className="menu">
                <Link className="btn-link" to="/EmployeeDetails">
                    <div className={`menu-item ${location.pathname === '/EmployeeDetails' ? 'active' : ''}`}> {/*ispar onclick par resume open karenge */}
                        <div><ImProfile /></div> <div>Employee Details</div>
                    </div>
                </Link>
                {/* <Link className="btn-link" to="/CompletedWork">
                    <div className={`menu-item ${location.pathname === '/CompletedWork' ? 'active' : ''}`}>
                        <div><TiTick /></div> <div>Completed Work</div>
                    </div>
                </Link> */}
                {/* <Link className="btn-link" to="/PendingWork">
                    <div className={`menu-item ${location.pathname === '/PendingWork' ? 'active' : ''}`}>
                        <div><MdPendingActions /></div> <div>Pending Work</div>
                    </div>
                </Link> */}
                {/* <Link className="btn-link" to="/Orders">
                    <div className={`menu-item ${location.pathname === '/Orders' ? 'active' : ''}`}>
                        <div><MdPendingActions /></div> <div>Orders</div>
                    </div>
                </Link> */}
                 <Link className="btn-link" to="/Orders">
                    <div className={`menu-item ${location.pathname.startsWith('/Orders') ? 'active' : ''}`}>
                        <div><MdPendingActions /></div>
                        <div>Orders</div>
                    </div>
                </Link>
                <Link className="btn-link" to="/Services">
                    <div className={`menu-item ${location.pathname === '/Services' ? 'active' : ''}`}>
                        <div><GrServices /></div> <div>Services</div>
                    </div>
                </Link>
                <Link className="btn-link" to="/YourCustomers">
                    <div className={`menu-item ${location.pathname === '/YourCustomers' ? 'active' : ''}`}>
                        <div><FaUserNinja /></div> <div>Customers</div>
                    </div>
                </Link>
                <Link className="btn-link" to="/Queries">
                    <div className={`menu-item ${location.pathname === '/Queries' ? 'active' : ''}`}>
                        <div><FaQuestion /></div> <div>Resolve</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AdminNavBar;



// <div className="menu-item">
//     <div><ImProfile /></div> <div><Link className="btn-link" to="/EmployeeDetails">Employee Details</Link></div>
// </div>
// <div className="menu-item">
//     <div><TiTick /></div> <div><Link className="btn-link" to="/CompletedWork">Completed Work</Link></div>
// </div>
// <div className="menu-item">
//     <div><MdPendingActions /></div> <div>Pending Work</div>
// </div>

// <div className="menu-item">
//     <div><GrServices /></div> <div>Services</div>
// </div>