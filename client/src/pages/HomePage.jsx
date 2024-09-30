import React from 'react';
import Header from './Header';
//import './Home.css'; 

const HomePage = () => {
  return (
    <>
        <Header/>
        <div className="home-container">
        <h1>Welcome to the Inventory Management App</h1>
        <p>Please log in or register to continue.</p>
        </div>
    </>
  );
};

export default HomePage;
