// OtpVerification.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Otp-verify.css'; // Make sure to import the CSS file

const OtpVerification = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();

  var phoneNumber = sessionStorage.getItem("phoneNumber");
  const phnNumber = phoneNumber.substring(3);
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  console.log(isLoggedIn)
  useEffect(() => {
    if(Boolean(isLoggedIn) === true){
      navigate('/home')
    }
  }, [isLoggedIn]);


  var requestId = location.state?.requestId;
  console.log(location);
  useEffect(() => {
    if(!phoneNumber || !requestId){
      navigate('/login');
    }
  }, [phoneNumber, requestId])

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
  };

  const handleVerify = () => {
    // Implement your OTP verification logic here
    const enteredOtp = otp.join('');
    if(enteredOtp.length !== 4){
      return;
    }
    axios.post(process.env.REACT_APP_BaseUrl + process.env.REACT_APP_verifyOtpAPI,
      {
        phoneNumber,
        requestId,
        otp: enteredOtp
      }).then((response) => {
        if(response.status === 200){
          sessionStorage.setItem("isLoggedIn", true);
          navigate("/home")
        }
        console.log(response);
      }).catch((err) => {
        console.log(err);
        navigate("/login")
      })
    console.log(`Verifying OTP: ${enteredOtp}`);
  };

  return (
    <div className="otp-container">
      <h2 className='otp-verify-text'>OTP Verification</h2>
      <p className='otp-verify-para'>We have sent an otp to <span>{phnNumber}</span>. Please enter the code recived to verify.</p>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
      </div>
      <button className='otp-verify-btn' type="button" onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
};

export default OtpVerification;
