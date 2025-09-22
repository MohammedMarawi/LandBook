import React from 'react';
import './LandInfo.css';
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const LandInfo = () => {
  const [land ,setLand] = useState([""]);
  useEffect (() => {
    const fetchLands = async () => {
      try {
        console.log('aaaayybbbbbbbvv') ;
        const res = await axios.get("/api/v1/lands/")
        setLand(res.data.data.lands) ; 
      }
      catch(error) {
        console.log("errorrrrrrrr") ; 
      }
    } ;
  
    fetchLands() ; 
  },[]);
  return (
    // <div className="container_landinfo">
    //   <div className="top-button">
    //     <button className="button-map">Land map</button>
    //   </div>

    //   <div className="cards-wrapper">
    //     {/* General Info */}
    //     <div className="card">
    //       <p className="headercard">General Info:</p>
    //       <p>Land area: {land.area}</p>
    //       <p>Land price: {land.price} $</p>
    //       <p>Land City: {land.city}</p>
    //       <p>Land Region: {land.village}</p>
    //       <p>Booking situation: Booked</p>
    //       <p>When booking ends: 1.6.2027</p>
    //     </div>

    //     {/* Logistics */}
    //     <div className="card">
    //       <p className="headercard">Logesties:</p>
    //       <p>Workers number: {land.workersNumber}</p>
    //       <p>Equipments: {land.equipments}</p>
    //     </div>

    //     {/* About land */}
    //     <div className="card">
    //       <p className="headercard">About land:</p>
    //       <p>Rain rate:{land.ratingsAverage}</p>
    //       <p>Climate situation: sometimes rainy and sometimes dry</p>
    //       <p>What you can plant: {land.suitableCrops}</p>
    //       <p>Irrigation way: {land.irrigationfall}</p>
    //       <p>Soil kind: {land.soilTypes}</p>
    //     </div>

    //   </div>
    // </div>
    <>
    </>
  );
};

export default LandInfo;