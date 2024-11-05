import React from 'react';
import './welcome.css'

const WelcomeScreen = ({ onStart }) => (
  <div className="welcome-screen">
    <p className='welcome'><span>W</span>elcome to the <span>M</span>ath <span>Q</span>uiz <span>C</span>hallenge! </p>
    <div className='text'>Are you ready to put your basic math skills to the test? This quiz application is for childrens to test the basic fundamentals of mathematics.
    </div>
    <button onClick={onStart} className='start'>Start</button>
  </div>
);

export default WelcomeScreen;
