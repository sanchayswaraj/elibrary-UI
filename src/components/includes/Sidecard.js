import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faBookOpen, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'; // Import appropriate icons
import '../../css/Sidecard.css';

function SideCard() {
  return (
    <div className="side-card">
      <ul className="nav flex-column">
        <li className="nav-item card-hover">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faChartPie} /> Dashboard
          </Link>
        </li>
        <li className="nav-item card-hover">
          <Link to="/surf-ebooks" className="nav-link">
            <FontAwesomeIcon icon={faBookOpen} /> Surf e-books
          </Link>
        </li>
        <li className="nav-item card-hover">
          <Link to="/take-quiz" className="nav-link">
            <FontAwesomeIcon icon={faQuestionCircle} /> Take Quiz
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideCard;
