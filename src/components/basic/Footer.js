import React from 'react';
import '../../css/components/basic/Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div class='footer-link-items'>
          <h2>Contact Us</h2>
          <p>email: onestoptreatment@gmail.com</p>
        </div>
        <div class='footer-link-items'>
          <h2>Social Media</h2>
          <p>Instagram: OneStopTreatment</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
