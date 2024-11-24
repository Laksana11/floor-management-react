import React from 'react'
import VerticalDrawer from '../components/VerticalDrawer'
import {AppBar, Box, Typography} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { Basket } from '../components/Basket';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ReactComponent as ThreeDots } from './../assets/ThreeDots.svg'


const Layout = () => {
  return (
    <div className="d-flex">
    <VerticalDrawer />

    <Box sx={{ flexGrow: 1  }} className="ml-20 mt-0">
        <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='text-black bg-white text-center'>
            Floor Management
           
          </Typography>
          
        </AppBar>


        <Grid container spacing={2} >      
          <Grid item xs={3} >
            <div className='p-8'>Tables</div>
          </Grid>
          
          <Grid item xs={9}>
            <div className="border pl-5 pb-4 pt-7 flex justify-between items-center font-bold">
              <div>Main Room</div>
              <div className="flex space-x-2">
                <Button variant="contained" className="bg-gradient-to-tr from-black via-red-800 to-red-500 text-white !normal-case " >+ Add Room</Button>
                <Button variant="outlined" className="!border-gray-400 !text-gray-600 p-5 !rounded-md !normal-case">Save Room</Button>
                <Button variant="text"><ThreeDots style={{height:"20px", width: "20px"}}/></Button>
              </div>
            </div>

            
          </Grid>
        </Grid>

        
        <DndProvider backend={HTML5Backend}>
            <Basket />
        </DndProvider>
    </Box>
    
  </div>
  )
}

export default Layout