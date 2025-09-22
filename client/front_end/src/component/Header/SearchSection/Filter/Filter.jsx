import React from 'react';
import Header from '../../Header';
import FilterSection2 from './FilterSection/FilterSection2';

function Filter() {
  return (
   <>
   <Header/>
   <h3  id="Home" style={{textAlign:"center",margin:"10px",paddingTop: "100px"}}>Select your preferred land criteria and discover your ideal farmland.</h3>
   <FilterSection2/>
   </>
  );
}

export default Filter;