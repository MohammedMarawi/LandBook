import React from "react";
import "./CropTable.css"; // تأكد من استيراد ملف CSS
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';

const CropTable = () => {

  const [table,settable] = useState([])
  let { id } = useParams();

  useEffect (()=> { 
    axios.get(`/api/histories/land/${id}`)
    .then(res => {
      console.log("id = ",id);
      console.log(res.data.data || [])
      settable(res.data.data || []);
    })
    .catch(err => console.log("error:",err))
  },[id])

  return (
    <div className="table-container">
    <table className="crop-table">
      <thead>
        <tr>
          <th>Season</th>
          <th>Crop</th>
          <th>Production</th>
          {/* <th>Investor Contact</th> */}
          <th>Problems</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {table.map((item, index) => (
          <tr key={index}>
            <td>{item.season}</td>
            <td>{item.crop}</td>
            <td>{item.production}</td>
            {/* <td className="email">{item.investor}</td> */}
            <td>{item.problems}</td>
            <td>{item.startDate ? new Date(item.startDate).toLocaleDateString() :""}</td>
            <td>{item.endDate ? new Date(item.endDate).toLocaleDateString() :""}</td>
          </tr>
          ))} 
      </tbody>
    </table>
  </div>
  );
};

export default CropTable;