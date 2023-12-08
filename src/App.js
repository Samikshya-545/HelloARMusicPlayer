import logo from './logo.svg';
import './App.css';
import SignInForm from './components/Sigin-in';
import OtpVerification from './components/Otp-verify';
import Dashboard from './components/Dashboard';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/verifyOTP" element={<OtpVerification />} />
        <Route path="/home" element={<Dashboard />} />

        <Route path="*" element={<SignInForm />} />
      </Routes>
    </div>
  );
}

export default App;
