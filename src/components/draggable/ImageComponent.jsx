import React from 'react';
import { Box } from '@mui/material';
import { ReactComponent as MidIcon } from './../../assets/Mid.svg'; 
import { ReactComponent as TableIcon } from './../../assets/Table.svg'; 

function ImageComponent({image, height, width}) {
  return image==="Table" ? (<TableIcon style={{ width, height  }} />) 
  : (<MidIcon style={{ width, height }} />) ;
}

export default ImageComponent;