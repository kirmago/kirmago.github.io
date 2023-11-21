import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import background from '../../../assets/earth/earth.mp4';
import './NoPages.scss';

const NoPages = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          navigate('/');
          window.location.reload();
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoPause = () => {
      if (videoElement.paused) {
        videoElement.play();
      }
    };

    videoElement.addEventListener('pause', handleVideoPause);

    return () => {
      videoElement.removeEventListener('pause', handleVideoPause);
    };
  }, []);
  
  const location = useLocation();
  const pathArray = location.pathname.split('/').filter(Boolean);

  return (
    <>
      <div className="container-err">
        <video ref={videoRef} src={background} autoPlay loop muted />
        <div className="error-pages-container">
          <div className="error-wrapper">
            <h1>Tersesat?</h1>
            <h4>ERROR 404.</h4>
            <p id="kec">Page <i>{pathArray}</i> tidak tersedia</p>
            <p id="gang">Otomatis kamu akan diarahkan dalam homepage {seconds} detik</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPages;