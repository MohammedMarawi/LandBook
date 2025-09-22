import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const goToSignup = () => {
    navigate('/Signup');
  }

  const goToHome = () => {
    navigate('/Mainpage');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
  
      // إذا الباك إند بيرجع success + token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("✅ Login successful!");
        console.log("✅ Login successful!");
      } else {
        console.log("❌ Login failed: " + (res.data.message || "Invalid credentials"));
        setMessage("❌ Login failed: " + (res.data.message || "Invalid credentials"));
      }
    } catch (err) {
      if (err.response) {
        // السيرفر رد بكود خطأ
        console.log(`❌ Error ${err.response.status}: ${err.response.data.message || "Unauthorized"}`);
        setMessage(`❌ Error ${err.response.status}: ${err.response.data.message || "Unauthorized"}`);
      } else {
        // مشكلة بالاتصال
        console.log("❌ Network error, check your backend URL");
        setMessage("❌ Network error, check your backend URL");
      }
    }
  };
  



  return (
  <div className="welcom-container">
    <div className="welcome">
       <div className="title-img-welcome tf">
          <h4 className="title-welcome">Welcome Back</h4>
          <img
            className="img-welcome"
            src="/lands/landbook.jpg"
            width="60"
            height="40"
            alt="Logo"
          />
        </div>
      <form onSubmit={handleSubmit} className="form-welcome-f">
        <div className="tf">
          <label className="label-welcome" htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            placeholder=" your email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <label className="label-welcome" htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            placeholder=" your password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <label>Did you forget your password?</label> <br/>
          <button type="submit" className="sign-welcome"
          //  onClick={goToHome}
           >Sign in</button>

          <p className="or-welcome">or</p>

          <button type="button" className="Sign-Google-welcome">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.66 1.2 8.9 3.54l6.64-6.64C34.05 4 29.34 2 24 2 14.74 2 6.76 7.85 3.6 16.3l7.75 6.02c1.53-4.55 5.83-8.82 12.65-8.82z"/>
              <path fill="#34A853" d="M46.5 24c0-1.59-.14-3.12-.42-4.6H24v9.03h12.8c-.58 2.94-2.23 5.43-4.75 7.11l7.42 5.74C43.82 35.5 46.5 30.2 46.5 24z"/>
              <path fill="#FBBC05" d="M11.35 28.32c-.33-1-0.52-2.07-0.52-3.18s0.19-2.18 0.52-3.18l-7.75-6.02C1.13 21.95 0 27.88 0 34c0 6.12 1.13 12.05 3.6 17.7l7.75-6.02z"/>
              <path fill="#EA4335" d="M24 46c5 0 9.19-1.65 12.25-4.5l-7.42-5.74c-2.1 1.41-4.82 2.25-8.83 2.25-6.82 0-11.12-4.27-12.65-8.82l-7.75 6.02C6.76 40.15 14.74 46 24 46z"/>
            </svg> */}
            Sign in with Google
          </button>

          <p className="or-welcome">or</p>

          <button type="submit" className="sign-welcome"onClick={goToHome}>Go to Home</button>
        </div>

        <div className="footer-form-welcome">
          <span>Don't have an account?</span>
          <a href="#" onClick={goToSignup}>Sign up</a>
        </div>

 <div className="toat">
 {message && <p style={{width: "42%",
      height: "60px",
      color: "black",
      background: "rgb(255 255 255 / 58%)",
      borderRadius:" 5px",
      marginLeft:"180px",
      position: "relative",
      bottom: "-42px",
      textAlign: "center",
      padding: "10px"}}>{message}</p>}

        </div>      </form>
    </div>
  </div>
  );
}
