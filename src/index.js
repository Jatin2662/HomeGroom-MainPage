import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMainPage from './components/AdminMainPage';
import EmployeeDetails from './components/EmployeeDetails';
import CompletedWork from './components/CompletedWork';
import AddNewEmployeePage from'./components/AddNewEmployeePage';



// import{BookNow, Select} from './BookNow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminMainPage />
  </React.StrictMode>
);
