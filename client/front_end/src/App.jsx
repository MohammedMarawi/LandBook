import "./App.css";
import Footer from './component/Footer/Footer';
import Advisors from './component/Header/Advisors/Advisors';
import ContactForm from './component/Header/ContactForm/ContactForm';
import Header from './component/Header/Header';
import LandList from './component/Header/LandCard/LandList';
import SearchSection from './component/Header/SearchSection/SearchSection';
import  Landdetailspage  from "./component/landdetailspage/Landgallery.jsx";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Mainpage from "./component/Mainpage/Mainpage.jsx";
import Filter from './component/Header/SearchSection/Filter/Filter.jsx';
import Cover from './component/cover/cover.jsx';
import ReasultSearch from "./component/Header/SearchSection/Filter/ReasultSearch/ReasultSearch.jsx";

import Terms_of_service from "./component/Footer/page_for_footer/Terms_of_service.jsx";
import Property_management from "./component/Footer/page_for_footer/Property_management.jsx";
import Property_consulting from "./component/Footer/page_for_footer/Property_consulting.jsx";
import Private_policy from "./component/Footer/page_for_footer/Private_policy.jsx";
import License from "./component/Footer/page_for_footer/License.jsx";
import Legal_services from "./component/Footer/page_for_footer/Legal_services.jsx";
import Investment_management from "./component/Footer/page_for_footer/Investment_management.jsx";
import Login from "./component/login/login.jsx";
import Signup from "./component/Signup/Signup.jsx";

function App() {
  return (
    <>
      <div >
         <Router>
           <Routes>
           <Route path="/" element={<Cover/>}/>
            <Route path="/Mainpage" element={<Mainpage/>}/>
            <Route path="/Landdetailspage/:id" element={<Landdetailspage/>}/>
            <Route path="/Filter" element={<Filter/>} />
            <Route path="/ReasultSearch/:term" element={<ReasultSearch/>} />
            <Route path="/ContactForm" element={<ContactForm/>} />

            <Route path="/Investment_management" element={<Investment_management/>} />
            <Route path="/Legal_services" element={<Legal_services/>} />
            <Route path="/License" element={<License/>} />
            <Route path="/Private_policy" element={<Private_policy/>} />
            <Route path="/Property_consulting" element={<Property_consulting/>} />
            <Route path="/Property_management" element={<Property_management/>} />
            <Route path="/Terms_of_service" element={<Terms_of_service/>} />
            <Route path="/ReasultSearch/:term" element={<ReasultSearch/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Signup" element={<Signup/>} />

           </Routes>
         </Router>
      </div>
    </>
  );
}

export default App;
