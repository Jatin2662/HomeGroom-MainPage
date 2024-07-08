


import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './MenuArea.css';


const MenuArea = ({ isOpen }) => {

    const navigate = useNavigate();

    const handleScroll = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            navigate(sectionId, { replace: true });  // Replace the current history entry
        }
    }

    return (
        <div className={`menu-area ${isOpen ? 'open1' : ''}`}>

            <div onClick={() => handleScroll('#services')} style={{cursor : "pointer"}}>Services</div>
            <div onClick={() => handleScroll('#about')} style={{cursor : "pointer"}}>About</div>

        </div>
    );
}

export default MenuArea;