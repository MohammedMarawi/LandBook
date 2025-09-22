import React from 'react';
import Header from '../Header/Header';
import SearchSection from '../Header/SearchSection/SearchSection';
import LandList from '../Header/LandCard/LandList';
import ContactForm from '../Header/ContactForm/ContactForm';
import Advisors from '../Header/Advisors/Advisors';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate();
  const gotoContactForm = () => {
    navigate("/ContactForm");
  };

  return (
    <>
      <Header/>
      <SearchSection/>
      <LandList/>
      <Advisors/>

      <div className="imagetofram" style={{ position: "relative", marginBottom: "61px" }}>
        <img src="/lands/fram.png" alt="frame"/>
        <div style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "170px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%"
        }}>
          <button 
            id="Post" 
            onClick={gotoContactForm} 
            style={{
              width: "250px",
              padding: "12px",
              background: "linear-gradient(135deg, #38a169, #2f855a)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #2f855a, #276749)"} 
            onMouseOut={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #38a169, #2f855a)"} 
          >
            Post your land
          </button>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default Mainpage;
