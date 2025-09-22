import React from 'react';
import './LandBookCard.css'; // ربط ملف CSS
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from "react";

export default function LandBookCard() {
  const [land ,setLand] = useState([""]);
  useEffect (() => {
    const fetchLands = async () => {
      try {
        console.log('aaaayybbbbbbbvv') ;
        const res = await axios.get(`/api/v1/lands/${id}`);
        setLand(res.data.data.lands) ; 
      }
      catch(error) {
        console.log("errorrrrrrrr") ; 
      }
    } ;
  
    fetchLands() ; 
  },[]);

  return (
    // <div className="contact-container-card">
    //   <div className="contact-card">
    //     <img
    //       src="../public/Advisors/p5.jpg" // استبدله بالرابط الصحيح للصورة
    //       alt="Profile"
    //       className="profile-pic"
    //     />
    //     <div className="info-card-details">
    //       <div className='content'>
    //           {/* <Infonamecontext.provide> */}
    //         <h3><span className="icon"><img src='./public/lands/profile-circle.png' style={{width: "20px",height: "20px",marginBottom: "-3px"}}></img></span></h3>
    //         {/* </Infonamecontext.provide> */}
    //         <p>
    //           <span className="icon"><img src='./public/lands/phone_icon.png' style={{width:" 23px",marginBottom:"-4px"}}></img></span>
    //           {/* <a href="tel:+963944015895">{land.phone.areaCode}{land.phone.number}</a> */}
    //         </p>
    //         <p>
    //           <span className="icon"><img src="./public/lands/sms.png" alt="" style={{marginbBottom: "-6px",width: "21px"}} /></span>
    //           <a href="mailto:taha@sy.com">{land.email}</a>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="bottom-button">
    //     <button className="button-readmore">Book the land</button>
    //   </div>
    //   </div>
    // </div>
    <></>
  );
}