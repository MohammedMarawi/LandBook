import React, { useState, useEffect } from 'react';
import './FilterSection.css';
import axios from 'axios';



const LandFilter = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/lands")
      .then(res => {
        setLands(res.data.data.lands); // تأكد من نفس المفتاح اللي راجع من الـ API
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="lands-container">
      {lands.map((land) => (
        <div key={land._id} className="land-card">
          {/* صورة الأرض */}
          <img src={land.landMedia[0]} alt={land.title} className="land-image" />

          {/* معلومات المالك */}
          <div className="owner-info">
            <img
              src={land.userPhoto}   // 👈 صورة المالك
              alt={`${land.firstName} ${land.lastName}`}
              className="owner-pic"
            />
            <span className="owner-name">{land.firstName} {land.lastName}</span>
          </div>

          {/* باقي تفاصيل الأرض */}
          <p className="land-title">{land.title}</p>
          <p>Area: {land.area} m²</p>
          <p>Price: {land.price} $</p>
        </div>
      ))}
    </div>
  );
};




const FilterSection2 = () => {
  // بيانات الأراضي
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);

  // حالات الفلاتر
  const [city, setCity] = useState("");
  const [village, setVillage] = useState("");
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // هنا ضع state للمفضلة
  const [favorites, setFavorites] = useState({}); // key: id, value: true/false

  // وظيفة تبديل المفضلة
  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const res = await axios.get("/api/v1/lands");
        const data = Array.isArray(res.data.data.lands) ? res.data.data.lands : [];
        setLands(data);
        setFilteredLands(data);
        console.log("Loaded lands:", data);
      } catch (error) {
        console.log("Error fetching lands:", error);
      }
    };
    fetchLands();
  }, []);

  // خريطة المدن مع القرى
  const cityVillagesMap = {
    "Damascus": ["Douma", "Darayya", "Al-Tall", "Al-Zabadani", "Yabroud"],
    "Aleppo": ["Al-Bab", "Azaz", "Afrin", "Manbij", "Jarabulus"],
    "Hama": ["Taybat al-Imam", "Suran", "Masyaf", "Karnaz", "Kafr Zita"],
    "Homs": ["Al-Qusayr", "Al-Rastan", "Talbiseh", "Al-Qaryatayn", "Palmyra"],
    "Idlib": ["Maarat al-Numan", "Saraqib", "Binnish", "Kafranbel", "Jisr al-Shughur"],
    "Latakia": ["Qardaha", "Jableh", "Al-Haffah", "Salibeh", "Kasab"],
    "Tartus": ["Baniyas", "Safita", "Dreikish", "Al-Hamidiyah", "Sheikh Badr"],
    "Deir ez-Zor": ["Al-Mayadin", "Al-Bukamal", "Al-Kasra", "Al-Tabni", "Al-Suwar"],
    "Daraa": ["Busra al-Sham", "Izra‘", "Tafas", "Nawa", "Al-Hirak"],
    "As-Suwayda": ["Shahba", "Salkhad", "Qanawat", "Ariqa", "Al-Mazraa"]
  };

  // عرض جميع العقارات عند تحميل الصفحة
  useEffect(() => {
    setFilteredLands(lands);
  }, [lands]);

  // تحديث الفلتر
  const handleViewResults = () => {
    let results = lands;

    if (price) {
      results = results.filter(l => typeof l.price === "number");
      switch (price) {
        case "less-10000": results = results.filter(l => l.price < 100000); break;
        case "10000-20000": results = results.filter(l => l.price >= 100000 && l.price < 200000); break;
        case "20000-30000": results = results.filter(l => l.price >= 200000 && l.price < 300000); break;
        case "30000-40000": results = results.filter(l => l.price >= 300000 && l.price < 400000); break;
        case "more-40000": results = results.filter(l => l.price > 400000); break;
        default: break;
      }
    }
    if (space) {
      results = results.filter(l => typeof l.area === "number");
      switch (space) {
        case "less-1dunams": results = results.filter(l => l.area < 1); break;
        case "1-5dunams": results = results.filter(l => l.area >= 1 && l.area < 5); break;
        case "5-10dunams": results = results.filter(l => l.area >= 5 && l.area < 10); break;
        case "10-50dunams": results = results.filter(l => l.area >= 10 && l.area < 50); break;
        case "more-50dunams": results = results.filter(l => l.area > 50); break;
        default: break;
      }
    }

    if (city) {
      results = results.filter(l => l.city?.toLowerCase() === city.toLowerCase());
    }

    if (village) {
      results = results.filter(l => l.village && l.village === village);
    }

    setFilteredLands(results);
  };

  // الترتيب
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filteredLands];

    switch (option) {
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "area-desc":
        sorted.sort((a, b) => b.area - a.area);
        break;
      case "area-asc":
        sorted.sort((a, b) => a.area - b.area);
        break;
      default:
        break;
    }

    setFilteredLands(sorted);
  };

  return (
    <div className="property-page">
      {/* قسم الفلترة */}
      <div className="filter-section">
        <h2>Filter</h2>
        
        <div className="filter-container">
          {/* اختيار المدينة */}
          <select value={city} onChange={(e) => { setCity(e.target.value); setVillage(""); }}>
            <option value="">Cities</option>
            {Object.keys(cityVillagesMap).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          {/* اختيار القرية */}
          <select value={village} onChange={(e) => setVillage(e.target.value)} disabled={!city}>
            <option value="">{city ? "Select Village" : "Select a City first"}</option>
            {city && cityVillagesMap[city].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          {/* السعر */}
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Price</option>
            <option value="less-10000">Less than 100,000 $</option>
            <option value="10000-20000">100,000 - 200,000 $</option>
            <option value="20000-30000">200,000 - 300,000 $</option>
            <option value="30000-40000">300,000 - 400,000 $</option>
            <option value="more-40000">More than 400,000 $</option>
          </select>

          {/* المساحة */}
          <select value={space} onChange={(e) => setSpace(e.target.value)}>
            <option value="">Space</option>
            <option value="less-1dunams">Less than 1 dunams</option>
            <option value="1-5dunams">1 - 5 dunams</option>
            <option value="5-10dunams">5 - 10 dunams</option>
            <option value="10-50dunams">10 - 50 dunams</option>
            <option value="more-50dunams">More than 50 dunams</option>
          </select>

          <button className="view-results-btn" onClick={handleViewResults}>View Results</button>
        </div>
      </div>

      {/* عرض العقارات */}
      <div className="property-list">
        <div className="property-list-header">
          <select className='sortselect' value={sortOption} onChange={(e) => handleSort(e.target.value)}>
            <option value=""> Sort </option>
            <option value="price-desc">Descending order by price</option>
            <option value="price-asc">Ascending order by price</option>
            <option value="area-desc">Descending order by area</option>
            <option value="area-asc">Ascending order by area</option>
          </select>
        </div>

        {filteredLands.map((property) => (
          <div key={property.id} className="property-item">
            <div className="property-image">
              {property.landMedia?.map((media, i) => (
                <img key={i} src={media} alt={`Media ${i + 1}`} />
              ))}
               {/* زر القلب */}
               <button 
               className={`favorite-button ${favorites[property.id] ? 'active' : ''}`}
                 onClick={() => toggleFavorite(property.id)}
               >
                 ❤
               </button>
            </div>
            <div className="property-details">
              <div className="property-header">
                <p style={{display:"flex"}}>
                  <img src="/lands/dollers.png" style={{width: "20px",height: "20px"}} />
                  <div className="property-price">{property.price}</div>
                </p>
                <p style={{display:"flex"}}>
                  <img src="/lands/house.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                  <div className="property-size">{property.area} Dunmas</div>
                </p>
                <p style={{display:"flex"}}>
                  <img src="/lands/Land location.jpg" style={{width: "20px",height: "20px",marginRight: "4px"}} />
                  <div className="property-location">{property.city}</div>
                </p>
              </div>
              
              <p className="property-description">{property.description}</p>
              
              <div className="property-footer">
                 <div className="owner-info">
                   <img
                      src={property.userPhoto || "/lands/profile-circle.png"}
                      alt={`${property.firstName} ${property.lastName}`}
                      onClick={() => setSelectedImage(property.userPhoto || "/lands/profile-circle.png")}
                      style={{cursor: "pointer"}}
                    />
                   {property.firstName} {property.lastName}
                 </div>

                <button className="contact-button">Contact</button>
              </div>
            </div>
          </div>
        ))}
        
 {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" />
        </div>
      )}
        
      </div>
    </div>
  );
};

export default FilterSection2;