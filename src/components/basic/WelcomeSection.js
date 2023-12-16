import React from 'react';
import '../../css/App.css';
import { Button } from './Button';
import '../../css/components/basic/WelcomeSection.css';
import { Link } from 'react-router-dom';

function WelcomeSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>Welcome to Our Home Page</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to="/login">
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
        </Link>
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
  );
}

export default WelcomeSection;
