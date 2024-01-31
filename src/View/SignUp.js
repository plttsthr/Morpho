import React, { useState } from 'react';
import { auth, db } from "../firebase"; // Import Firestore along with Firebase authentication
import { createUserWithEmailAndPassword} from "firebase/auth"; // Import the signOut function
import profilePictureIcon from '../Icons/user.png';
import camera from '../Icons/camera.png';
import remove from '../Icons/remove.png';
import { uploadProfilePicture, updateProfileInfo} from '../Functions/userFunctions';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import PasswordStrength from './PasswordStrength';
import Logo from '../Icons/Aurora-Logo.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [showError, setShowError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showErrorInfo, setShowErrorInfo] = useState(false);
  const [strength, setStrength] = useState(0);

  // Object containg info after filling out form 
  // const payload = { 
  //   name: name,
  //   address: address,
  //   phone: phone
  // };

  const history = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // Registration successful
        const userEmail = userCredential.user.email;
        console.log('User registered:', userEmail);
        setIsRegistered(true);

      })
      .catch((error) => {
        // Registration failed
        console.log('Registration error:', error.message);
        setShowError(true); // Show the error message

      });
  };

  const handleSaveButtonClick = async () => {

    const user = auth.currentUser;

    const payload = { 
      name: name,
      address: address,
      phone: phone
    };
    try {
      
      
      // Upload profile picture if available
      let profilePictureUrl = '';
      if (profilePicture) {
        profilePictureUrl = await uploadProfilePicture(user, profilePicture);
      }

      // Update profile information
      await updateProfileInfo(user, payload);

      setShowErrorInfo(false); // Hide the error message
      history('/home');
    } catch (error) {
      console.log(name, address, phone);
      console.log('Error:', error.message);
      
      setShowErrorInfo(true); // Show the error message
      console.log('Full error:', error);
      console.log(user);
    }
  };



  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
  
      // Create a URL for previewing the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureUrl(imageUrl);
    }
  };
  
  const checkPasswordStrength = (value) => {
    // Minimum length is 8 characters
    if (value.length < 8) {
      return 1; // Weak
    }
  
    // Check for at least one symbol, one uppercase letter, and one number
    const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
  
    if (
      symbolRegex.test(value) &&
      uppercaseRegex.test(value) &&
      numberRegex.test(value) &&
      value.length == 8
    ) {
      return 3; // Very Strong
    }

    if (
      symbolRegex.test(value) &&
      uppercaseRegex.test(value) &&
      numberRegex.test(value) &&
      value.length > 8
    ) {
      return 4; // Very Strong
    }
  
    // If it doesn't meet all criteria but has a minimum length of 8 characters
    return 2; // Strong
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const newStrength = checkPasswordStrength(newPassword);
    setStrength(newStrength);
  };

  const navigateToLogin = () => {
    history('/login');
  };

  return (
    <div class="landing-page-contact">
            <section className="contact-section">
      {isRegistered ? (
        <>
             
          <h2>Complete your Info</h2>

          <div className={`error-container-info ${showErrorInfo ? 'visible' : ''}`}>
          <p className="error-message">
            Try again.</p>
          </div>

          <form>
              {profilePictureUrl ? (
              <div style={{ position: 'relative' }}>
                <label htmlFor="profilePicture" className="upload-button">
                <img
                  src={profilePictureUrl}
                  alt="Select File"
                />
                
              </label>
              <img
                  src={remove}
                  alt="Select File"
                  onClick={() => {
                    setProfilePicture(null);
                    setProfilePictureUrl('');
                  }}

                  className='remove-icon'
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <label htmlFor="profilePicture" className="upload-button">
                  <img
                    src={profilePictureIcon}
                    alt="Select File"
                  />
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureChange}
                />

                <img
                  src={camera}
                  alt="Select File"
                  onClick={() => document.getElementById('profilePicture').click()} // Trigger input click
                  className='camera-icon'
                />
              </div>
            )}
       


            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="button" onClick={handleSaveButtonClick}>Save</button>
          </form>
          {/* <button onClick={handleSignOut}>Sign Out</button> */}
        </>
        
      ) : (
        <>
        
          <h2>Sign Up</h2>
           
          <div className={`error-container ${showError ? 'visible' : ''}`}>
            <p className="error-message">Email already registered.
            <br />
            Try with another one.</p>
          </div>
          <form onSubmit={signUp}>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="username@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>

            <div className="password-strength">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="*********************"
                value={password}
                onChange={handlePasswordChange}
                required
              />
               <label>Passwords must be a minimum of 8 characters. Include one letter, and one number or symbol. </label>
              <div className="strength-meter">
                
                <div
                  
                  className={`strength-bar strength-${strength}`}
                  style={{ width: `${(strength / 4) * 100}%` }}>

                </div>
              </div>
             
            </div>
            <button type="submit">Sign Up</button>
            <label>Have an Account?</label>
            <h1 className='h1-form' >Log In</h1>
          </form>

          
        </>
        
      )}
      </section>
    </div>
  );
};

export default SignUp;
