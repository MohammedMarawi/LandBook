import React, { useState, useEffect } from 'react';
import styles from './LandCard.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandList = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // 👈 مودال الصورة

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const res = await axios.get("/api/v1/lands/");
        setLands(res.data.data.lands);
      } catch (error) {
        console.log("error fetching lands:", error);
      }
    };
    fetchLands();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <p className="description-text">
        <img src='/lands/icon.png' style={{width: "20px", height: "20px", margin: "auto 4px"}}/>
        <em style={{margin:"25px auto"}}>
          This website gives you lands for investment in agricultural way. Here you see some of our lands
        </em>
        <img src='./lands/icon.png' style={{width: "20px", height: "20px", margin: "auto 6px", marginBottom: "-4px"}}/>
      </p>

      <h2>Lands in Syria</h2>
      <div className={styles.fullcontainer}>
        {lands.map((land) => (
          <div key={land.id} onClick={() => navigate(`/landdetailspage/${land.id}`)}>
            <div className={styles.card}>
              {/* صورة الأرض */}
              {land.landMedia?.length > 0 && (
                <img src={land.landMedia[0]} alt="Land" className={styles.image} />
              )}

              {/* محتوى البطاقة */}
              <div className={styles.content}>
                {/* اسم الأرض أو عنوانها */}
                <h3 className={styles.title}>{land.city} - {land.area} Dunams</h3>

                {/* وصف مختصر */}
                <p className={styles.desc}>{land.description}</p>

                {/* معلومات إضافية */}
                <div className={styles.info}>
                  <span>
                    <img src="/lands/dollers.png" alt="Price" style={{width: "18px", height: "18px"}}/>
                    {land.price}
                  </span>
                  <span>
                    <img src="/lands/house.jpg" alt="Area" style={{width: "18px", height: "18px"}}/>
                    {land.area} Dunams
                  </span>
                  <span>
                    <img src="/lands/Land location.jpg" alt="City" style={{width: "18px", height: "18px"}}/>
                    {land.city}
                  </span>
                </div>

                {/* الفوتر: صورة المالك + زر التواصل */}
                <div className={styles.footer}>
                  <div className={styles.ownerInfo}>
                    <img
                      src={land.userPhoto || "/lands/profile-circle.png"}
                      alt={`${land.firstName} ${land.lastName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(land.userPhoto || "/lands/profile-circle.png");
                      }}
                    />
                    <span>{land.firstName} {land.lastName}</span>
                  </div>
                  <button className={styles.contactButton}>Contact</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* مودال عرض الصورة */}
      {selectedImage && (
        <div 
          className="image-modal" 
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img 
            src={selectedImage} 
            alt="Full View"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 30px rgba(0,0,0,0.6)"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LandList;
