import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import sloth from '../Icons/sloth.png';
import sticker from '../Icons/sticker.jpeg';
import businesscard from '../Icons/businesscard.jpeg';
import postcard from '../Icons/postcard.jpeg';
import flyer from '../Icons/flyers.jpeg';
import brochures from '../Icons/brochure.jpeg';
import envelopes from '../Icons/envelope.jpeg';
import '../Style/App.css'; 
import { useNavigate } from 'react-router-dom'; // Import useHistory
import profilePictureIcon from '../Icons/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { SignOutUser, grab_user_info, downloadProfilePicture } from '../Functions/userFunctions';


const Home = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const history = useNavigate();
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
        SignOutUser()
          .then(() => {
            history('/'); // Corrected usage of history.push()
          })
          .catch((error) => {
            console.log('Sign-out error:', error.message);
          });
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

    const products = [
        { id: 1, name: 'Business Cards', price: 19.99, image: businesscard },
        { id: 2, name: 'Custom Die Cut Stickers', price: 29.99, image: sticker },
        { id: 3, name: 'Postcards', price: 39.99, image: postcard },
        { id: 4, name: 'Flyers', price: 39.99, image: flyer },
        { id: 5, name: 'Brochures', price: 39.99, image: brochures },
        { id: 6, name: 'Envelopes', price: 39.99, image: envelopes },
        // Add more products as needed
      ];
      

   
    return (
        <div class="landing-page">
            <div class="header-home">One morpho print, swiftly delivered within a single day.</div>
            <div class="subheader">Explore the elegance of a single morpho print, crafted with precision and care for your enjoyment.</div>
            <a  class="cta-button">Request a quote</a>

            <div class="header-home-two">Our most popular printing products</div>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        
                        <h1>{product.name}</h1>
                    </div>
                ))}
            </div>
            <div class="header-home-two">We assist numerous brands, businesses, artists, individuals, and companies every month.</div>
        </div>
    );
};

export default Home;
