import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import '../Style/App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { SignOutUser, grab_user_info, downloadProfilePicture } from '../Functions/userFunctions';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Logo from '../Icons/Aurora-Logo.png';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const Home = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [uploadChecked, setUploadChecked] = useState(false);
    const [info, setInfo] = useState('');
    const [img, setImg] = useState(null);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [section, setSection] = useState("Budgeting");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


    async function grabInfo() {
        const item = await grab_user_info(["name"]);
        return item;
    }
    
    async function grabImg() {
        const picture = await downloadProfilePicture("profilePicture");
        return picture;
    }

    const handleSignOut = () => {
        // SignOutUser()
        //   .then(() => {
            history('/'); // Corrected usage of history.push()
        //   })
        //   .catch((error) => {
        //     console.log('Sign-out error:', error.message);
        //   });
      };
    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };


    useEffect(() => {
        // Define an async function inside useEffect to be able to use await
        const fetchData = async () => {
            const items = await grabInfo();
            const picture = await grabImg();
            
            setInfo(items);
            setImg(picture);
        };
        fetchData();

    }, []);


    const history = useNavigate();

    const navigateToSignUp = () => {
        history('/signup');
    };

    const navigateToLogin = () => {
        history('/login');
    };

    const navigateToMain = () => {
        history('/dashboard');
      };


    
      const uploadFile = () => {
        // Handle file upload logic here
        alert("File uploaded!");
      };
    
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
    setChecked(!isChecked);
    };

    return (
        <div className="App">  
            <div className="App-header-Registration">
                <img onClick={navigateToMain} className="Header-Title" src={Logo}/>
                <div className="Headerhome-Center-Dashboard">
                    <h1 onClick={navigateToMain} >Buy</h1>
                    <h1>My Account</h1>
                </div>
                <div className="Headerhome-Right-Dashboard">
                    <button className="Cart-Icon">
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </button>
                    <button onClick={handleSignOut} className="LogOut-Icon">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span class="text">Log Out</span>
                    </button>
                </div>
            </div>

            <div className="Dashboard-body">
                <div className="Dashboard-Left">
                    <h2>Products</h2>
                </div>
                <div className="Dashboard-Right">
                    <h2>Order Details</h2>
                    <form>
                        <div className="div">
                            <input placeholder=" "type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                            <label for="vehicle1"> Make me a design</label>
                        </div>
                        <div className="div">
                            <input placeholder=" "type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                            <label for="vehicle1"> Use my previous design</label>
                        </div>
                        <div className="div">
                        <input
                            placeholder=" "
                            type="checkbox"
                            id="uploadNewDesign"
                            name="designType"
                            value="UploadNewDesign"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                                                />
                            <label htmlFor="uploadNewDesign">Upload a new design</label>
                        </div>
                        <div className="div">
                            <input type="file" id="fileInput" name="fileInput" disabled={!isChecked} />
                        </div>
                        <div className="bottom">
                            <button className="Check-Out-Button">
                                Add to Cart
                            </button>
                            <button className="Check-Out-Button">
                                Check Out
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    );
};

export default Home;
