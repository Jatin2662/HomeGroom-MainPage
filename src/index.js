import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { func } from './components/FirstSection';
import SignIn_SignUp from './components/SignIn_SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Select from './components/BookNow';
import ProfilePage from './components/ProfilePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import ContactForm from './components/ContactForm';
import Experience from './components/Experience';
import CustomerSatisfactionSurvey from './components/CustomerSatisfactionSurvey';
import YourOrders from './components/CustomerOrders';
import CustomerProfile from './components/CustomerProfile';

import { EmailProvider } from './components/contexts/EmailContext';

// import{BookNow, Select} from './BookNow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/SignIn_SignUp" element={<SignIn_SignUp />} /> */}
          <Route path="/BookNow" element={<Select />} />
          <Route path="/Experience" element={<Experience />}/>
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ContactForm" element={<ContactForm/>} />
          <Route path="/CustomerSatisfactionSurvey" element={<CustomerSatisfactionSurvey/>} />
          <Route path="/YourOrders" element={<YourOrders/>} />
          <Route path="/YourProfile" element={<CustomerProfile/>} />
        </Routes>
      </BrowserRouter>
    </EmailProvider>
  </React.StrictMode>
);

function App() {

  return (
    <>
      <NavBar />
      <func.FirstSection />
    </>
  );
}

function App2() {

  return (
    <Select />
  );
}