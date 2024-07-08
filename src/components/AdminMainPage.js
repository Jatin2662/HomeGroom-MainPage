

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './AdminMainPage.css';
import AdminNavBar from './AdminNavBar';
import { BsThreeDotsVertical } from "react-icons/bs";
import EmployeeDetails from './EmployeeDetails';
import CompletedWork from './CompletedWork';
import AddNewEmployeePage from './AddNewEmployeePage';
import Services from './Services';
import PendingWork from './PendingWork';
import AllWork from './AllWork';
import Orders from './Orders';
import YourCustomers from './YourCustomers';
import Queries from './Queries';
import EditAdminProfile from './EditAdminProfile';
import ViewAdminProfile from './ViewAdminProfile';
import { AdminProvider } from '../contexts/AdminContext';

function SelectedPanel() {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <AdminProvider>
            <BrowserRouter>
                <div className="mainBox">
                    <div className="circle" onClick={toggleNav}><BsThreeDotsVertical /></div>
                    <div className="content">
                        <section className="left-side">
                            <div className="circle" onClick={toggleNav}><BsThreeDotsVertical /></div>
                        </section>
                        <section className="right-side">
                            <Routes>
                                <Route path="/" element={<ViewAdminProfile />} />
                                <Route path="/EditAdminProfile" element={<EditAdminProfile />} />
                                <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
                                {/* <Route path="/AllWork" element={<AllWork />} /> */}
                                {/* <Route path="/CompletedWork" element={<CompletedWork />} /> */}
                                {/* <Route path="/PendingWork" element={<PendingWork />} /> */}
                                <Route path="/Orders/*" element={<Orders />} />  {/* means that it will contain nested routes */}
                                <Route path="/AddNewEmployeePage" element={<AddNewEmployeePage />} />
                                <Route path="/Services" element={<Services />} />
                                <Route path="/YourCustomers" element={<YourCustomers />} />
                                <Route path="/Queries" element={<Queries />} />
                            </Routes>
                        </section>
                    </div>
                    <AdminNavBar isOpen={isNavOpen} />
                </div>
            </BrowserRouter>
        </AdminProvider>
    );
}

export default SelectedPanel;




// Maine likha niche vala

// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './AdminMainPage.css';
// import AdminNavBar from './AdminNavBar';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import EmployeeDetails from './EmployeeDetails';
// import CompletedWork from './CompletedWork';
// import AddNewEmployeePage from'./AddNewEmployeePage';


// function SelectedPanel() {

//     const [isNavOpen, setIsNavOpen] = useState(true);

//     const toggleNav = () => {
//         setIsNavOpen(!isNavOpen);
//     }

//     return (
//         <BrowserRouter>
//             <section className="mainBox">
//                 <section className="left-side">
//                     <div className="circle" onClick={toggleNav}><BsThreeDotsVertical /></div>
//                 </section>
//                 <section className="right-side">
//                     <Routes>
//                         <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
//                         <Route path="/CompletedWork" element={<CompletedWork />} />
//                         <Route path="/AddNewEmployeePage" element={<AddNewEmployeePage />}/>
//                     </Routes>

//                 </section>
//                 <AdminNavBar isOpen={isNavOpen} />   {/* toggleOpen={toggleNav} */}
//             </section>
//         </BrowserRouter>
//     );
// }

// export default SelectedPanel;