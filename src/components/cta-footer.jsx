import React  from 'react';
import { Link , useParams} from 'react-router-dom';
import logo from '../styles/logo.svg';

const CTAFooter = ()=>{
    return(
        <div className="footer-cta">
        {/* Yellow Call-to-Action Section */}
        <div className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-heading">Enroll your Child Today!</h2>
              <div className="cta-buttons">
                <Link to="/academic-overview/" className="cta-button">
                  Academics Overview
                </Link>
                <Link to="/curriculum/" className="cta-button">
                 Curriculum
                </Link>
                <Link to="/admission-process/" className="cta-button">
                   Admission Process
                </Link>
                <Link to="/news/" className="cta-button">
                  News & Event
                </Link>
              </div>
            </div>
          </div>
        </div>

      {/* Main Footer Section */}
      
        </div>
      
    )
};

export default CTAFooter;