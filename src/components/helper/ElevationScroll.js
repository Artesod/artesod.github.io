import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? (props.lightMode ? '#D7CAAA' : '#616161') : 'transparent',
      transition: 'background-color 0.3s ease',
      height: trigger ? '50px' : '100px',
      transition: 'height 0.5s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
}

export default ElevationScroll;