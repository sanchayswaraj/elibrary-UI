import React from 'react';

function Header() {
  
  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
       <a href="/"> <img
          src="/images/logo.png" // logo
          alt="Logo"
          height="30"
          className="d-inline-block align-top"
        /></a>
        <span className="navbar-brand mb-0 h1 ml-2">E-Library</span>
      </div>
    </header>
  );
}

export default Header;
