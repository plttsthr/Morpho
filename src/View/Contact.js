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


      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
      };
    
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
    setChecked(!isChecked);
    };

    return (
        <div class="landing-page-contact">
            
            <section className="contact-section">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />

                    <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    ></textarea>

                    <button type="submit">Send Message</button>
                </form>
                </section>
            

        </div>
             
    );
};

export default Home;
