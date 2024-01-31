import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Login from './Login';
import Logo from '../Icons/Aurora-Logo.png';
import '../Style/App.css'; 
import backgroundImage from '../Icons/Background.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const LoginPage = () => {

    const history = useNavigate();

    const navigateToSignUp = () => {
        history('/signup');
    };

    const navigateToLogin = () => {
        history('/login');
    };

    const navigateToMain = () => {
        history('/');
      };


    return (
        <div className="App">
            <div className="App-header-Registration">
            <img onClick={navigateToMain} className="Header-Title" src={Logo}/>
                <div className="Headerhome-Center">
                    <h1 onClick={navigateToMain} >Home</h1>
                    <h1>About Us</h1>
                    <h1>Services</h1>
                    <h1>Products</h1>
                    <h1>Contact Us</h1>
                    
                </div>
                
                <div className="Headerhome-Right">
                
                    <button className="Login-Icon" onClick={navigateToLogin}>
                    <FontAwesomeIcon icon={faUser}/>
                    <h1>Login</h1>
                    </button>
                    
                    <button onClick={navigateToSignUp}> Sign Up</button>
                    
                </div>
            </div>
            
            <div className="HomeBodyRegistration">
               
                <div className="SignUp-InContainer">
                   
                    <div className="RightSection">
                      
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
