import React, { useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import profilePhoto from '../assets/Profile-Picture.jpg';
import ProfilePage from './ProfilePage';
import MenuArea from './MenuArea';
import { IoReorderThreeOutline } from "react-icons/io5";
import YourOrders from './CustomerOrders';

function CustomerArea({ isOpen }){

    const navigate = useNavigate();

    const GoToYourOrder = ()=>{
        navigate('/YourOrders');
    }

    const GoToYourProfile = ()=>{
        navigate('/YourProfile');
    }

    return(
        <div className={`customer-nav-area ${isOpen? 'cao' : ''}`}>
            <div onClick={GoToYourProfile}>Your Profile</div>
            <div onClick={GoToYourOrder}>Your Orders</div>
            <div>Log Out</div>
        </div>
    );
}


function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCaOpen, setIsCaOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleCustomer = () => {
        setIsCaOpen(!isCaOpen);
    }

    const handleScroll = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            navigate(sectionId, { replace: true });  // Replace the current history entry
        }
    }

    return (
        <header>
            <nav>
                <div className="move">
                    <div className="three-lines" onClick={toggleMenu}>
                        <IoReorderThreeOutline size="25px" />
                    </div>
                    <div>
                        <div onClick={() => handleScroll('#services')} style={{cursor : "pointer"}}>Services</div>
                    </div>
                    <div>
                        <div onClick={() => handleScroll('#about')} style={{cursor : "pointer"}}>About</div>
                    </div>
                </div>
                <div className="logo">HomeGroom</div>
                <div className="pb">
                    <div>
                        <img className="profile-photo" src={profilePhoto} alt="Profile" onClick={toggleCustomer}/>
                    </div>
                    <CustomerArea isOpen={isCaOpen} />
                    <div>
                        <button className="btn">
                            <Link className="btn-link" to="/LogIn">Sign In</Link>
                        </button>
                    </div>
                </div>
            </nav>
            <MenuArea isOpen={isMenuOpen} />
            
        </header>
    );
}

export default NavBar;




// import './NavBar.css'
// import { Link } from "react-router-dom";
// import profilePhoto from '../assets/Profile-Picture.jpg';
// import ProfilePage from './ProfilePage';
// import MenuArea from './MenuArea';
// import { useState } from 'react';
// import { IoReorderThreeOutline } from "react-icons/io5";

// function NavBar() {

//     // const [isProfileOpen, setIsProfileOpen] = useState(false);

//     // const toggleProfile = () => {
//     //     setIsProfileOpen(!isProfileOpen)
//     // }

//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = ()=>{
//         setIsMenuOpen(!isMenuOpen);
//     }

//     return (
//         <header>
//             <nav>
                
//                 <div className="move">
//                    {/* <li>
//                          <Link to="/ProfilePage">
//                             <img className="profile-photo" src={profilePhoto} alt="Profile" />
//                         </Link> 
//                     </li>*/}
                    
//                     <div className="three-lines" onClick={toggleMenu}><IoReorderThreeOutline size="25px" /></div>
//                     <div><a href="#services">Services</a></div>
//                     <div><a href="#about">About</a></div>
//                 </div>
//                 <div className="logo">HomeGroom</div>
//                 <div className="pb">
//                      <div > {/* onClick={toggleProfile} */}
//                         <img className="profile-photo" src={profilePhoto} alt="Profile" />
//                     </div>
//                     <div>
//                         <button className="btn"><Link className="btn-link" to="/LogIn">Sign In</Link></button>
//                     </div>
//                 </div>
//             </nav>
//             {/* <ProfilePage isOpen={isProfileOpen} /> */}
//             <MenuArea isOpen={isMenuOpen} />
//         </header>
//     );
// }


// export default NavBar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import ProfilePanel from './ProfilePage';
// import './NavBar.css';

// const NavBar = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const toggleProfilePanel = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   return (
//     <header>
//       <nav>
//         <div className="logo">HomeGroom</div>
//         <ul>
//           <li>
//             <button className="profile-btn" onClick={toggleProfilePanel}>Profile</button>
//           </li>
//           <li>Services</li>
//           <li>About</li>
//           <li>
//             <button className="btn"><Link className="btn-link" to="/SignIn_SignUp">Sign In</Link></button>
//           </li>
//         </ul>
//       </nav>
//       <ProfilePanel isOpen={isProfileOpen} togglePanel={toggleProfilePanel} />
//     </header>
//   );
// }

// export default NavBar;