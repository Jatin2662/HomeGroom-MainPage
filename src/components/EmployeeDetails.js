


import React, { useState, useEffect } from "react";
import axios from 'axios';
import './EmployeeDetails.css';
import { Link } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
// import { v4 as uuidv4 } from "uuid";
// import { employeesInfo } from './Data';

function EmployeeDetails() {

    const [empList, setEmpList] = useState([]);
    // const [deleteId, setDeleteId] = useState('');


    const getEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/EmployeeDetails');
            setEmpList(response.data);
            console.log(empList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const deleteEmployee = async (_id, email) => {


        let value = prompt(`Confirm delete? \n Enter the email address ${email}`);

        if(value === email){
            try {
                // setDeleteId(_id);
                // console.log(deleteId);
                await axios.delete(`http://localhost:3001/EmployeeDetails/${_id}`);
                alert("Deletion Complete...")
                window.location.reload();

                // setEmpList(empList.filter((emp) => emp.id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
        else{
            alert("Something went wrong!!!")
        }

        
    };

    return (
        <section className="employeeDetails">
            <h1>Your Employees</h1>
            {/* <div>Add another employee  <IoMdAdd /> </div> */}
            <section className="employees">

                {/* <div className="headings">
                    <div>Sr.No</div>
                    <div>Name</div>
                    <div>Phone</div>
                    <div>Email</div>
                </div> */}
                

                <div className="employeesBox">
                    {!empList.length ?
                        <div className="empty">
                            {/* And Add a Bale Bale GIF  */}
                            <h2>No Employees left!!! Hire some</h2>
                            <div className="zoom">
                                <GrUserWorker size="50%" className="zoom-color" />
                            </div>
                        </div> :
                        empList.map((det, index) => {

                            const { _id, name, phoneNo, email } = det;
                            // const uniqueId = uuidv4();


                            return (
                                <div className="single-employee" key={_id}>
                                    <div className="index">{index + 1}</div>
                                    {/* <div className="index">{uniqueId}</div> */}
                                    <div className="name tl">{name}</div>
                                    <div className="phoneNo tl">{phoneNo}</div>
                                    <div className="email tl">{email}</div>
                                    <div className="delete" onClick={() => deleteEmployee(_id, email)}><MdDelete /></div>
                                    {/* delete lkarne par ek prompt bnaye ge kga type employee uniqueid or email to delete employee permanently */}
                                </div>
                            );
                        })
                    }
                </div>
                <div className="addEmployee"><Link to="/AddNewEmployeePage"><IoMdAdd size="30px" color="black" /></Link></div>
                {/* <Link to="/AddNewEmployeePage"><IoMdAdd size="30px" color="black" /></Link> */}
                {/* <IoMdAdd size="30px" color="black" /> */}
            </section>
        </section>
    );
}

export default EmployeeDetails;