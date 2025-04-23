import React  from 'react';
import { Link , useParams} from 'react-router-dom';
import '../styles/footer.css';
import logo from '../styles/logo.svg';

const Footer = ()=>{
    return(
        <>
      <footer className="footer">
        {/* Yellow Call-to-Action Section */}

      {/* Main Footer Section */}
          <div className="main-footer">
            <div className="container">
              <div className="footer-content">
                {/* Logo and Contact */}
                <div className="footer-logo-contact">
                  <div className="footer-logo">
                    <img
                      src = {logo}
                      alt="Olashore School Logo"
                    />
                  </div>
                  <div className="footer-contact">
                    <h3>Contact</h3>
                    <div className="contact-item">
                      <i className="icon-location"></i>
                      <p>Oba Oladele Olashore Way Iloko-Ijesa P.M.B. 5059, Iloko-Ijesa, Osun State, Nigeria</p>
                    </div>
                    <div className="contact-item">
                      <i className="icon-phone"></i>
                      <p>+234 807 712 4311, +234 903 163 9208</p>
                    </div>
                    <div className="contact-item">
                      <i className="icon-email"></i>
                      <p>info@olashoreschool.com</p>
                    </div>
                    <div className="social-icons">
                      <Link to="#" className="social-icon">
                        <i className="icon-facebook"></i>
                      </Link>
                      <Link to="#" className="social-icon">
                        <i className="icon-twitter"></i>
                      </Link>
                      <Link to="#" className="social-icon">
                        <i className="icon-instagram"></i>
                      </Link>
                      <Link to="#" className="social-icon">
                        <i className="icon-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                  <h3>Quick Links</h3>
                  <ul>
                    <li>
                      <Link to="/school-mission/">Mission Statement</Link>
                    </li>
                  
                    <li>
                        <Link to = '/curriculum/'>Curriculum</Link>
                      
                    </li>
                    <li>
                      <Link to = '/public-speaking/'>Public Speaking</Link>
                    </li>
                    <li>
                      <Link to = '/admission-process/'>Admission Process</Link>
                    </li>
                  
                  </ul>
                </div>

                {/* Affiliations */}
                <div className="footer-links">
                  <h3>Information</h3>
                  <ul>
                    
                    <li>
                      <Link to = '/news/'>News & Event</Link>
                    </li>
                  
                  </ul>
                </div>

                {/* Services */}
                <div className="footer-links">
                  <h3>Services</h3>
                  <ul>
                    <li>
                      <Link to="/school-fees/">Pay school fees</Link>
                    </li>
                    
                  </ul>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="footer-bottom">
                <div className="copyright">
                  <p>© 2025 Olashore International School. All rights reserved.</p>
                </div>
                {/* <div className="footer-policies">
                  <Link to="#">Privacy Policy</Link>
                  <Link to="#">Terms and Conditions</Link>
                  <Link to="#">Cookies Policy</Link>
                </div> */}
              </div>
            </div>
          </div>
        </footer>
        </>
    )
};

export default Footer;