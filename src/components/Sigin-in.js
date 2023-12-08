/// SignInForm.js
import React, { useEffect, useState } from 'react';
import '../styles/Sign-in.css'; // Make sure to import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import indianFlag from '../images/india.gif';

const SignInForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [requestId, setRequestId] = useState();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if(Boolean(isLoggedIn) === true){
      navigate('/home')
    }
  }, [isLoggedIn])


  const handleSignIn = () => {
    setShowLoader(true);
    // Implement your sign-in logic here
    console.log(`Signing in with mobile number: ${mobileNumber}`);

    // Save the monileno to session storage
    sessionStorage.setItem("phoneNumber", "+91"+mobileNumber);
    

    axios.post(process.env.REACT_APP_BaseUrl + process.env.REACT_APP_loginApi,
      {
        phoneNumber: "+91"+mobileNumber
      }).then((response) => {
        if(response.status === 200){
          var requestId = response.data && response.data.requestId;
          setRequestId(requestId);
          navigate("/verifyOTP", { state: { requestId: requestId } })
        }
        setShowLoader(false);
    });
  };

  return (
    <>
      {showLoader && 
        <div className='loadingScreen'>
        LOADING ...
        </div>
      }
      <div className="signin-container">
        <h2 className='sigin-text'>Sign In</h2>
        <p className='sigin-para'>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
        {/* <div className="input-container">
          <input
          className='sigin-input'
            type="text"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div> */}
        <div className='sigin-phn-input'>
        <div className="phone-input-container">
          <div className="flag-container">
          <img src={indianFlag} alt="Indian Flag" className="indian-flag" />
          </div>
          <div className="code-container">
            <span>+91</span>
          </div>
          <div className="input-container">
          <input
          className='sigin-input'
            type="text"
            placeholder="Phone number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          </div>
        </div>
        </div>
        <button className='signin-btn' type="button" onClick={() => handleSignIn()}>
            Sign In
          </button>
      </div>
    </>
    
  );
};

export default SignInForm;

