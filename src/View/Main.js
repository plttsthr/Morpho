import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from '../Icons/Aurora-Logo.png';
import '../Style/App.css'; 
import backgroundImage from '../Icons/Background.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import About from './About';
import Home from './Home';
import Services from './Services';
import Products from './Products';
import Contact from './Contact';
import Login from './Login';
import SignUp from './SignUp';

const Main = () => {

      const history = useNavigate();
      const [section, setSection] = useState("Home");

      const navigateToSignUp = () => {
        history('/signup');
      };

      const navigateToLogin = () => {
        history('/login');
      };

      const navigateToMain = () => {
        history('/');
      };

      const handleSectionChange = (newSection) => {
        setSection(newSection);
      };

      const RenderSection = () => {
        switch (section) {
          case "About":
            return (
             
                <About />
            );
      
      
          case "Products":
                return (
                    <Products />
    
            );

            case "Contact":
                return (
                    <Contact />
    
            );
            case "Login":
                return (
                    <Login />
    
            );

            case "Signup":
                return (
                    <SignUp />
    
            );

          default:
            return (
            
                <Home />
            );
        }
      };
      

    return (
        <div className="App">
            <div className="App-header">
                <img onClick={navigateToMain} className="Header-Title" src={Logo}/>
                <div className="Headerhome-Center">
                    <h1 onClick={() => handleSectionChange('Home')} >Home</h1>
                    <h1 onClick={() => handleSectionChange('About')}>About Us</h1>
                    <h1 onClick={() => handleSectionChange('Products')}>Products</h1>
                    <h1 onClick={() => handleSectionChange('Contact')}>Contact Us</h1>
                    
                </div>
                <div className="Headerhome-Right">
                    <button className="Login-Icon" onClick={() => handleSectionChange('Login')}>
                        <FontAwesomeIcon icon={faUser}/>
                        <h1>Login</h1>
                    </button>
                    
                    <button onClick={() => handleSectionChange('Signup')}> Sign Up</button>
                </div>
            </div>
            {/* <div className="HomeBodyBanner"> 
                <p>The billions upon billions of items of plastic waste choking our oceans,
                    lakes, and rivers and piling up on land is more than unsightly and harmful to plants and wildlife.</p>
            </div> */}
            <div className="HomeBody">
            {RenderSection()}
                
                
            </div>
            <footer>
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    <p>Email: info@morphoprinthub.com</p>
                    <p>Phone: (506) 8972-1671</p>
                    <p>Montes de oca, San José Costa Rica</p>
                    <p>© 2024 Design by Paulette</p>
                </div>
            </footer>
        </div>
    );
};

export default Main;
