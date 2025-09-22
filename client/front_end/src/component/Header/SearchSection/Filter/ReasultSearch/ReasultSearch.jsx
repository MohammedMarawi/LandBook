import React, { useState, useEffect } from 'react';
import './ReasultSearch.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from '../../../Header';


const ReasultSearch = () => {
// بيانات الأراضي
const [lands, setLands] = useState([]);
const [filteredLands,setFilteredLands] = useState([]);
const [filtered, setFiltered] = useState([]);
const location = useLocation();

const { term } = useParams();
useEffect (() => {
  const fetchLands = async () => {
    try {
      console.log('aaaayybbbbbbbvv') ;
      const res = await axios.get("/api/v1/lands/")
      // console.log(res.data);
      setLands(res.data.data.lands) ; 
      setFiltered(res.data.data.lands) ; 
    }
    catch(error) {
      console.log("errorrrrrrrr") ; 
    }
  } ;

  fetchLands() ; 
},[]);
useEffect(() => {
  if(term){
    const filtered = lands.filter((land)=> 
      land.city.toLowerCase().includes(term.toLowerCase())
     ||
      land.location.village.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLands(filtered);
  }else{
    setFilteredLands(lands);
  }
},[lands,term]);

  return(
  <>
  <Header/>
      {filteredLands.map(property => (
          <div key={property.id} className="property-item1">
            <div className="property-image1">
            {property.landMedia?.map((media,i)=> (
                  <img className='image1' key={i} src={media} alt={`Media ${i+1}`} />
                ))}
            </div>
            
            <div className="property-details1">
              <div className="property-header1">

              <p style={{display:"flex"}}>
                <img src="/lands/dollers.png" style={{width: "20px",height: "20px"}} />
                <div className="property-price1">{property.price}</div>
              </p>

              <p style={{display:"flex"}}>
                 <img src="/lands/house.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                 <div className="property-size1">{property.area} Dunmas</div>

             </p>
             <p style={{display:"flex"}}>
                 <img src="/lands/Land location.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                 <div className="property-location1">
                   {property.city}
                 </div>
             </p>
              </div>
              
              <p className="property-description1">{property.description}</p>
              
              <div className="property-footer1">
                <div className="owner-info1">
                  <span className="owner-icon1">
                  <img src="/lands/profile-circle.png" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                  </span>
                  {property.firstName} {property.lastName}
                </div>
                <button className="contact-button1">Contact</button>
              </div>
            </div>
          </div>
        ))}
  </>
  );
};

export default ReasultSearch;
