import React from 'react';
import './Cover.css'; 
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/Mainpage"); 
  };
  return (
    
    <div className="cover-container">
     <div className="cover-text">
         <h1>We bring you closer to your <br /> dream land</h1>
         <p>
             Discover the best agricultural lands across Syria with accurate details and updated photos.
                 <br />
             Find, compare, and reserve your ideal land in just a few simple steps.
         </p>
         <div className="cont">
         <button onClick={goToMain}  className="enter-button">Enter site</button>
         {/* <svg class="icon111" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="157" height="48"><path fill="rgb(73, 80, 87)" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg> */}
       
         </div>
     </div>

     <div className="cover-images">
       <div className="div1"> <img src="../../../public/cover/p1.png" /></div>
       <div className="div2">
          <img src="../../../public/cover/p2.jpg" alt="Land Book" />
          <img src="../../../public/cover/p3.jpg" alt="Land Book" />
       </div>
       <div className="div3">
          <img src="../../../public/cover/p4.png" alt="Land Book" />
          <img src="../../../public/cover/p5.jpg" alt="Land Book" />
       </div>
     </div>
   </div>
  );
}

export default Cover;