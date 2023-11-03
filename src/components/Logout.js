import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Footer from './includes/Footer';
import Header from './includes/Header';

function Logout() {
  return (
    <div className='logout'>
        <Header/>
        <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                 <h2>You have successfully logged out, Thank You!</h2>
                 <Link to="/login" className="btn btn-primary mt-3">
        Go Back To Login
      </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
  );
}

export default Logout;
