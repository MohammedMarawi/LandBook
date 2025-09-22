import React from "react";
import './Footer.css';
import { Navigate, useNavigate} from "react-router-dom";

const Footer = () => {
  const Navigate = useNavigate();
  const handleClickProperty_consulting = () => {
    Navigate('/Property_consulting')
  }
  const handleClickLegal_services = () => {
    Navigate('/Legal_services')
  }
  const handleClickProperty_management = () => {
    Navigate('/Property_management')
  }
  const handleClickInvestment_management = () => {
    Navigate('/Investment_management')
  }
  const handleClickTerms_of_service = () => {
    Navigate('/Terms_of_service')
  }
  const handleClickPrivate_policy = () => {
    Navigate('/Private_policy')
  }
  const handleClickLicense = () => {
    Navigate('/License')
  }
  return (
    <footer className="footer">
      <div className="footer-description" id="Footer">
        LandBook is your trusted platform for reserving and purchasing agricultural land in Syria, with support from professional advisors.
      </div>
      <div className="footer-columns">
        {/* Quick Links */}
        <div className="footer-column">
          <p>Quick links</p>
          <ul>
            <li><a id="#Home">Home</a></li>
            <li><a href="#Available_lands">Available lands</a></li>
            <li><a href="#Advisors">Advisors</a></li>
            <li><a href="#Post">Post</a></li>
          </ul>
        </div>

        {/* Legal Terms */}
        <div className="footer-column">
          <p>Legal terms</p>
          <ul>
            <li><a onClick={handleClickTerms_of_service}>Terms of service</a></li>
            <li><a onClick={handleClickPrivate_policy}>Private policy</a></li>
            <li><a href="#" onClick={handleClickLicense}>License</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div className="footer-column">
          <p>Our services</p>
          <ul>
            <li><a onClick={handleClickProperty_consulting}>Property consulting</a></li>
            <li><a href="#" onClick={handleClickLegal_services}>Legal services</a></li>
            <li><a href="#" onClick={handleClickProperty_management}>Property management</a></li>
            <li><a href="#" onClick={handleClickInvestment_management}>Investment management</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column finall">
          <p>Contact Information</p>
          <ul>
            <li>+963 968604726</li>
            <li>info@landbook.sy</li>
            <li className="social-icons">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fas fa-globe"></i></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        2025 Land Book. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;