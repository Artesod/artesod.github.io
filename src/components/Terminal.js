import React from 'react';
import Style from '../scss/terminal-modules.scss';
import classNames from 'classnames';
import { Box } from '@mui/material';

const iconClass = 'fa fa-circle';

function Terminal(props) {
  const { 
    text,
    lightMode,
    } = props;  

  return (
    <Box
      component={'section'}
      className={classNames(Style.terminal, Style.shadowed)}
      width={{ xs: '80%', md: '50%' }}
      borderRadius={'0.5rem'}
      mb={'4rem'}
    >
      <Box
        sx={{ backgroundColor: lightMode ? "#D7CAAA" : "#656565" }}
        p={'0.5rem'}
        borderRadius={'0.5rem 0.5rem 0 0'}
        fontSize={'1rem'}
      >
        <i className={classNames(iconClass, Style.red)} style={{color: '#ff6057'}}/>
        <i className={classNames(iconClass, Style.amber)} style={{color: '#ffbd2e'}}/>
        <i className={classNames(iconClass, Style.green)} style={{color: '#27c93f'}}/>
      </Box>
      <Box
        py={{ xs: '1rem', md: '2rem' }}
        px={{ xs: '2rem', md: '3rem' }}
        borderRadius={'0 0 0.5rem 0.5rem'}
        sx={{ backgroundColor: '#27242f' }}
        fontSize={'1.5rem'}
        fontFamily={'Courier New, Courier, monospace'}
      >
        {text}
      </Box>
    </Box>
  );
}

export default Terminal;