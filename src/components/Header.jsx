import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import Rocket from '../Assets/Header.svg';
import Logo from '../Assets/Logo.png';
import { motion } from 'framer-motion'; 

function Header() {
  return (
    <>
      {/* Mini Header */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '10px 20px',
          color: 'black',
          height: '55px',
        }}
      >
        {/* Wrapping the logo inside Link to navigate to home */}
        <Link to="/" style={{ marginLeft: '100px' }}>
          <motion.img 
            src={Logo} 
            alt="Logo" 
            style={{ width: '85px', height: '40px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Link>
      </Box>

      {/* Main Header */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          textAlign: 'center',
          padding: '50px 0',
          backgroundColor: '#003145',
          marginBottom: '0',
          position: 'relative',
          marginLeft: '-80px',
        }}
      >
        {/* Vertical Yellow Line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '210px',
            height: '23%',
            top: '85px',
            width: '10px',
            backgroundColor: '#FFCE5C',
          }}
          initial={{ height: 0 }}
          animate={{ height: '23%' }}
          transition={{ duration: 1 }}
        />

        {/* Header Content with Animations */}
        <motion.div
          className='header-content'
          style={{ marginLeft: '10%', justifyContent: 'space-between', textAlign: 'left', width: '50%' }}
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}    
          transition={{ duration: 1 }}        
        >
          <Typography variant="h2" sx={{ color: '#FFF', fontWeight: 600, fontSize: '48px', mb: '16px', lineHeight: '56px', textAlign: 'start', width: '83%' }}>
            Accelerate Innovation with Global AI Challenges
          </Typography>
          <Typography variant="body1" sx={{ color: '#FFF', fontSize: '18px', mb: '32px', textAlign: 'start', width: '65%', lineHeight: '28px' }}>
            AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
          </Typography>
          <Link to="/create-challenge" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}   
            >
              <Button
                variant="contained"
                style={{ backgroundColor: '#FFFFFF', padding: '12px 20px', color: '#003145', fontWeight: '600', lineHeight: '18px' }}
              >
                Create Challenge
              </Button>
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Rocket Image */}
        <motion.div
          className='header-img'
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}   
          transition={{ duration: 1, delay: 0.5 }}  
        >
          <img src={Rocket} alt='rocket' />
        </motion.div>
      </Box>
    </>
  );
}

export default Header;