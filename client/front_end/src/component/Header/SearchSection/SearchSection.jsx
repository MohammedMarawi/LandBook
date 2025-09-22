import React, { useState } from "react";
import "./SearchSection.css";
import { useNavigate } from "react-router-dom";



export default function SearchSection() {
  const [searchTerm,setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();      // منع تحديث الصفحة
    onSearch(query);         // استدعاء الدالة اللي تجي من الأب
  };
  const navigate = useNavigate();
  const goToFilter = () => {
    navigate('/Filter');
  }
  
  const goToResultSearch = () => {
    navigate('/ResultSearch');
  }
  const handleSearch = () => {
    if(!searchTerm.trim()) return;
    navigate(`/ReasultSearch/${searchTerm.trim()}`);
  }
  return (
    <div className="search-section">
      <div className="search-bar">
        <input type="text" placeholder="Search here" value={searchTerm} onChange={(e) =>
                                                                      setSearchTerm(e.target.value)} className="search-input" />
        <button className="filter-button" onClick={handleSearch}>Search</button>
      
      </div>
      <button className="filter-button" onClick={goToFilter}>Filter</button>
     
    </div>
  );
}