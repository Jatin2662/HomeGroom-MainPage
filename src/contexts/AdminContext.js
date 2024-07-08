
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('http://localhost:3001');
                setAdminData(response.data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        console.log(adminData)

        fetchAdminData();
    }, []);

    return (
        <AdminContext.Provider value={adminData}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContext, AdminProvider };
