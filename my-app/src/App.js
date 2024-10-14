import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Company from './components/Company/Company';
import EventForm from './components/EventForm/EventForm';
import HomeCompany from './components/HomeCompany/HomeCompany';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormDisplay from './components/FormDisplay/FormDisplay';
import ResponseDisplay from './components/ResponseDisplay/ResponseDisplay';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company" element={<Company />} />
        <Route path="/eventform" element={<EventForm />} />
        <Route path="/me" element={<HomeCompany />} />
        <Route path="/formbuilder/:eventid" element={<FormBuilder />} />
        <Route path="/forms/:id" element={<FormDisplay/>} />
        <Route path="/responses/:eventId" element={<ResponseDisplay/>} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
