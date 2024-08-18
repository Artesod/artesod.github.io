import React, { useState, useEffect, useRef } from "react";
import Typical from "react-typical";
import ic from "../scss/themes/logo.png";
import ic2 from "../scss/themes/logo2.png";

const Home = (props) => {
  const{
    sharedData,
    checked,
  } = props
  const [titles, setTitles] = useState([]);
  const [name, setName ] = useState([])
  const parallaxRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (sharedData) {
      setTitles(sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat());

      let fullName = sharedData.firstName + " " + sharedData.lastName
      setName(fullName.split('').map(x => [x, 1500]).flat());
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const homeHeight = window.innerHeight;
      
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      if (overlayRef.current) {
        const opacity = Math.min(scrolled / homeHeight, 0.8); // Max opacity of 0.8
        overlayRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sharedData]);

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <Typical className="title-styles" steps={titles} loop={999} />;
  }, (props, prevProp) => true);

  let networks;
  if (sharedData) {
    networks = sharedData.social.map(function (network) {
      return (
        <span key={network.name} className="m-4" id="tooltip">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class} id="icons"></i>
          </a>
        </span>
      );
    });
  }

    return (
      <div id="home" className="parallax-container" style={{ height: window.innerHeight, display: 'flex', flexDirection: 'column'}}>
        <div className="parallax-background"></div>
        <div className="parallax-overlay" ref={overlayRef}></div>
        <div className="parallax-content" ref={parallaxRef}>
          <div className="row aligner" style={{height: '100%'}}>
            <div className="col-md-12">
            
              {checked? <img className="webicon" src = {ic2}/> : <img className="webicon" src = {ic}/>}
              <div className = "mainbody">
                <h1 className="mb-10">
                  <Typical steps={["Joshua Canta"]}/>
                </h1>

                <br/>
                
                <div className="title-container">
                  <HeaderTitleTypeAnimation />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-links">{networks}</div>
      </div>
    );
}

export default Home;
