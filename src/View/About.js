import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 
import '../Style/App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { SignOutUser, grab_user_info, downloadProfilePicture } from '../Functions/userFunctions';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Logo from '../Icons/Aurora-Logo.png';
import carlos from '../Icons/carlos.jpeg';
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
        <div class="landing-page">
            
            <div class="header-home-products">Our story</div>

            <div className="About-flex">

                    <div className="product-card">
                        <img src={carlos} />
                    </div>

                    
                    <p>Morpho Print Hub, established in 1994 as Costa Rican Drafting Services by Carlos Vargas, embodies the spirit of entrepreneurship in the vibrant city of San José. Carlos, a resilient entrepreneur, initiated the business when he faced the possibility of losing his job as a draftsman and office administrator at a local engineering firm due to industry changes and economic challenges in San José. Rather than accepting the fate of unemployment, he proposed transforming into a contractor, offering his expertise to other firms in need. 

        Encountering delays in obtaining color photocopies for reports fueled Carlos' entrepreneurial spirit. Despite suggesting that the engineering firm lease a photocopier, they showed no interest. Undeterred, Carlos decided to take a bold step and leased the photocopier himself. This marked the birth of Costa Rican Color Copies.

        Throughout the years, Morpho Print Hub evolved and expanded its services. In 2008, it incorporated traditional commercial on-demand print operations, followed by the addition of large format and signage printing services in 2012. Presently, Morpho Print Hub stands as a 100% e-commerce solution, catering to the printing needs of both brands and individuals. All their products are conveniently accessible through their user-friendly e-commerce website, developed in-house. Remarkably, 99% of the orders processed on their website are printed and fulfilled within their modern 8,000 square foot print manufacturing facility in the heart of San José.

        While the company has experienced significant growth since its inception, one core principle remains unwavering: Morpho Print Hub takes immense pride in delivering exceptional service to its clients and is honored to contribute to the thriving community of San José.</p>
                </div>

        </div>
    );
};

export default Home;
