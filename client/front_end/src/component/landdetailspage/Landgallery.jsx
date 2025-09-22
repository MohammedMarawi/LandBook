import React from 'react'
import Header from '../Header/Header';
import "./LandGallery.css"; // تأكد من ربط ملف CSS
import LandInfo from '../landdetailspage/LandInfo/LandInfo';
import Footer from '../Footer/Footer';
import LandBookingCard from '../landdetailspage/LandBookCard/LandBookCard';
import CommentSection from '../landdetailspage/CommentSection/CommentSection';
import CropTable from '../landdetailspage/CropTable/CropTable';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from "react";
const Landgallery = () => { 
  const [detials,setdetials] = useState({})
  const [table,settable] = useState([])
  const [landImages, setLandImages] = useState([]);
  let { id } = useParams();


  useEffect (()=> { 
    axios.get(`/api/v1/lands/${id}`)
    .then(res => {
      console.log(res.data.data.land)
      setdetials(res.data.data.land);
      setLandImages(res.data.data.land.landMedia); 
    })
  },[id])

  // useEffect (()=> { 
  //   axios.get(`/api/histories/land/${id}`)
  //   .then(res => {
  //     console.log("id = ",id);
  //     console.log(res.data.data || [])
  //     settable(res.data.data || []);
  //   })
  //   .catch(err => console.log("error:",err))
  // },[id])

  // const landImages = [
  //   "/public/landdetailspage/p1.jpg",
  //   "/public/landdetailspage/p2.jpg",
  //   "/public/landdetailspage/p3.jpg",
  //   "/public/landdetailspage/p4.jpg",
  //   "/public/landdetailspage/p5.jpg",
  //   "/public/landdetailspage/p1.jpg",
  //   "/public/landdetailspage/p2.jpg",
  //   "/public/landdetailspage/p3.jpg",
  //   "/public/landdetailspage/p4.jpg",
  //   "/public/landdetailspage/p5.jpg",
  // ];
  const initialComments = [
    {
      name: 'Yaman Attar',
      date: '16 July, 2022',
      stars: 4,
      comment:
    'After touring the agricultural land, I was impressed by the rich soil quality and its potential for high crop yields.'  },
    {
      name: 'Haya Bawwab',
      date: '12 April, 2022',
      stars: 3,
      comment:
      'Many farmers believe that the irrigation system in this area needs improvement to maximize productivity.'
    },
  ];
  const handlePost = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          name: 'Anonymous',
          date: new Date().toLocaleDateString(),
          stars: rating,
          comment: newComment,
        },
      ]);
      setNewComment('');
      setRating(0);
    }
  };
 
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  return (
    <>
    <Header/>
    
    <div className="containerr">
      <img src='../public/lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto 4px"}}/>
       <em style={{margin:"25px auto"}}>And now you can see the details and every thing about the land you chose</em>
       <img src='../public/lands/icon.png' style={{width: "20px"
                     , height: "20px" , margin: "auto  6px",marginBottom: "-4px"}}/>
      <div className="image-grid">
      {/* {landImages.map((src, idx) => (
          <div className="image-card" key={idx}> */}

        {landImages.length > 0 ? (
            landImages.map((src, idx) => (
              <div className="image-card" key={idx}>
                <img src={src} alt={`Land ${idx + 1}`} />
              </div>

            ))
          ) : (
            <p>Loading images...</p>
          )} 

          {/* </div>
        ))} */}
      </div>
    </div> 
   
    <div className="details-box">
       
    </div>
     <div className="container_landinfo">
      <div className="top-button">
        <button className="button-map">Land map</button>
      </div>

      <div className="cards-wrapper">
        {/* General Info */}
        <div className="card">
          <p className="headercard">General Info:</p>
          <p>Land area: {detials.area}</p>
          <p>Land price: {detials.price} $</p>
          <p>Land City: {detials.city}</p>
          <p>Land Region: {detials.village}</p>
          <p>Booking situation: Booked</p>
          <p>When booking ends: 1.6.2027</p>
        </div>

        {/* Logistics */}
        <div className="card">
          <p className="headercard">Logesties:</p>
          <p>Workers number: {detials.workersNumber}</p>
          <p>Equipments: {detials.equipments}</p>
          <div>{detials.village}</div>
        </div>
      

        

        {/* About land */}
        <div className="card">
          <p className="headercard">About land:</p>
          <p>Rain rate: {detials.ratingsAverage}</p>
          <p>Climate situation: {detials.climateDescription}</p>
          <p>What you can plant: {detials.suitableCrops}</p>
          <p>Irrigation way: {detials.irrigationMethods}</p>
          <p>Soil kind: {detials.soilTypes}</p>
        </div>

      </div>
    </div>

    <CropTable/>

<div className="contact-container-card">
      <div className="contact-card">
        <img
          src={detials.userPhoto} // استبدله بالرابط الصحيح للصورة
          alt="Profile"
          className="profile-pic"
        />
        {/* {detials.landMedia.ownershipPhoto} */}
        <div className="info-card-details1">
          <div className='content1'>
            <h3><span className="icon1"><img src='/lands/profile-circle.png' style={{width: "20px",height: "20px",marginBottom: "-3px"}}></img>
             {detials.firstName}{detials.lastName}</span></h3>
            <p>
              <span className="icon1"><img src='/lands/phone_icon.png' style={{width:" 23px",marginBottom:"-4px"}}></img></span>
              {/* <a href="tel:+963944015895">
                {detials.phone.areaCode}{detials.phone.number}</a> */}
            </p>
            <p>
              <span className="icon1">
                <img src="/lands/sms.png" alt="" style={{marginbBottom: "-6px",width: "21px"}} />
                </span>
              <a href="mailto:taha@sy.com">{detials.email}</a>
            </p>
          </div>
        </div>
        <div className="bottom-button">
        <button className="button-readmore">Book the land</button>
      </div>
      </div>
    </div>
    <CommentSection/>
    {/* <div className="comment-container">
      <div className="add-comment">
        <textarea
          placeholder="Add your comment:"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? 'star filled' : 'star'}
            >
              ★
            </span>
          ))}
        </div>
        <button className='post' onClick={handlePost}>Post</button>
      </div>
      {comments.map((c, index) => (
        <div className="comment" key={index}>
          <div className="comment-header">
              <div style={{    display: "flex",alignItems: "center"}}>
                    <span className="user-icon">👤</span>
                    <p style={{ marginBottom:"-9px",fontSize:"20px"}}>{c.name}</p>
             </div>
            <p className="date">{c.date}</p>
          </div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < c.stars ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
          <p className="comment-text">{c.comment}</p>
        </div>
        
      ))}
    </div> */}
    <Footer/> 
    </>
  )
}

export default Landgallery;
