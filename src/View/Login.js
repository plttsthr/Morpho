// LoginComponent.js
import React, { useState } from 'react';
import { auth } from "../firebase"; 
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [showError, setShowError] = useState(false);


  const history = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user.email);

        const userEmail = userCredential.user.email;
        // Handle successful login
        // setIsLoggedIn(true);
        setUserName(userEmail);
        history('/home');

        
      })
      .catch((error) => {
        console.log('Login error:', error.message);
        setShowError(true); // Show the error message

      });
  };

  const handleSignOut = () => {
    signOut(auth) // Call the signOut function
      .then(() => {
        setIsLoggedIn(false); // Update the isLoggedIn state
      })
      .catch((error) => {
        console.log('Sign-out error:', error.message);
      });
  };


    const navigateToSignUp = () => {
        history('/signup');
      };

      const navigateToDashboard = () => {
        history('/dashboard');
      };



  return (
    <div class="landing-page-contact">
      <section className="contact-section">

      <h2>Log In</h2>
      <div className={`error-container ${showError ? 'visible' : ''}`}>
        <p className="error-message">Invalid email or password.
        <br />
        Try again.</p>
      </div>
      <form onSubmit={signIn}>
          <label htmlFor="email">Email:</label>
          <input
          type="text"
          id="email"
          name="email"
          value={email}
          placeholder="username@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <label htmlFor="password">Password:</label>
          <input
          type="password"
          id="password"
          name="password"
          placeholder="*********************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
            <label className="Forgotpassword">Forgot Password?</label>
            
          <button  type="submit">Log In</button>
          <label>New here?</label>
            <h1 className='h1-form' >Sign up</h1>
      </form>
      </section>
    </div>
  );
};

export default Login;
