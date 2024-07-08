

import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AllWork from './AllWork';
import PendingWork from './PendingWork';
import CompletedWork from './CompletedWork';
import './Orders.css';

function Orders() {
    const location = useLocation();

    return (
        <section className="orders-page">
            <h1>My Orders</h1>
            <div className="order-btns">
                <Link className="o-btn-link" to="AllWork">
                    <div className={`o-menu-item ${location.pathname === '/Orders/AllWork' ? 'active' : ''}`}>All Orders</div>
                </Link>
                <Link className="o-btn-link" to="PendingWork">
                    <div className={`o-menu-item ${location.pathname === '/Orders/PendingWork' ? 'active' : ''}`}>Pending</div>
                </Link>
                <Link className="o-btn-link" to="CompletedWork">
                    <div className={`o-menu-item ${location.pathname === '/Orders/CompletedWork' ? 'active' : ''}`}>Completed</div>
                </Link>
            </div>

            <main className="orders-box">
                <Routes>
                    <Route path="AllWork" element={<AllWork />} />
                    <Route path="PendingWork" element={<PendingWork />} />
                    <Route path="CompletedWork" element={<CompletedWork />} />
                </Routes>
            </main>
        </section>
    );
}

export default Orders;




// import React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import AllWork from './AllWork';
// import PendingWork from './PendingWork';
// import CompletedWork from './CompletedWork';

// function Orders() {

//     return (
//             <section className="orders-page">
//                 <h1>My Orders</h1>
//                 <div className="order-btns">
//                     <Link to="AllWork"><div>All Orders</div></Link>  {/* here are the relative paths */}
//                     <Link to="PendingWork"><div>Pending</div></Link>
//                     <Link to="CompletedWork"><div>Completed</div></Link>
//                 </div>

//                 <main className="orders-box">
//                     <Routes>
//                         <Route path="AllWork" element={<AllWork />} />
//                         <Route path="PendingWork" element={<PendingWork />} />
//                         <Route path="CompletedWork" element={<CompletedWork />} />
//                     </Routes>
//                 </main>
//             </section>
//     );
// }

// export default Orders;