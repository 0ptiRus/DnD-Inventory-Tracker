
import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-links">
        <a href="/about">About</a>
        <a href="/characters">Characters</a>
      </nav>
      <div className="header-image">    
        <img src="/dice.jpg" />
      </div>
      <nav className="nav-links">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
