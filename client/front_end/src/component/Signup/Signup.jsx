import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import {useNavigate} from 'react-router-dom';

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      // استخدم الرابط الكامل للباك إند الخاص بك هنا
      const res = await axios.post("/api/v1/users/signup", {
            name: fullName,          // الاسم الكامل
            email: email,            // البريد
            password: password,      // كلمة المرور
            passwordConfirm: passwordConfirm  // تأكيد كلمة المرور
      });

      if (res.data.status === "success") {
        setMessage("Account created successfully ✅");
        // يمكنك تخزين الـ token في localStorage إذا أحببت
        localStorage.setItem("token", res.data.token);
      } else {
        setMessage(res.data.message || "Something went wrong ❌");
      }
    }catch (err) {
        console.error(err);
        if (err.response) {
          setMessage(`Error: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
          setMessage("Network error ❌: Could not reach the server");
        } else {
          setMessage("Something went very wrong ❌");
        }
      }
  };
  const navigate = useNavigate();
  const goToSignin = () => {
    navigate('/Login');
  }
  const goToHome = () => {
    navigate('/Mainpage');
  }

  return (
 <div className="welcom-container">
    <div className="welcome">
    <div className="title-img-welcome tf">
          <h4 className="title-welcome">Create Account</h4>
          <img className="img-create" src="/lands/landbook.jpg" width="60" height="40" alt="Logo" />
    </div>
      <form onSubmit={handleSubmit} className="form-welcome-f">
        <div className="tf">
          <label className="label-welcome">Full Name</label><br />
          <input
            type="text"
            placeholder="Enter your name please"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <label className="label-welcome">Email</label><br />
          <input
            type="email"
            placeholder="Enter your email please"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <label className="label-welcome">Password</label><br />
          <input
            type="password"
            placeholder="Enter your password please"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <label className="label-welcome">Confirm Password</label><br />
          <input
            type="password"
            placeholder="Confirm your password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          /><br />
        </div>

        <div className="tf">
          <button type="submit" className="sign-welcome"
          //  onClick={goToHome}
           >Sign up</button>
           <p className="or-welcome">or</p>
          
          <button type="submit" className="sign-welcome"onClick={goToHome}>Go to Home</button>
        </div>
        <div className="footer-form-welcome">
          <span>Already have an account?</span>
          <a href="#" onClick={goToSignin}>Sign in</a>
        </div>
      </form>
    </div>
    <div className="toat">
        {message && <p style={{width: "42%",
      height: "60px",
      color: "black",
      background:" #ffffff",
      borderRadius: "15px",
      marginLeft: "62px",
      position: "relative",
      bottom: "-42px"}}>{message}</p>}
        </div>
  </div>
  );
}
