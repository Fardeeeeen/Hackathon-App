import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Logo from '../Assets/Logo.png';
import Skill from '../Assets/Skill.svg';

function ChallengePage({ challenges, deleteHackathon }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const challenge = challenges.find(c => c.id === parseInt(id));
  
    if (!challenge) {
      return <Typography>Challenge not found</Typography>;
    }
  
    const handleEdit = () => {
      navigate(`/edit-challenge/${id}`);
    };
  
    const handleDelete = () => {
      deleteHackathon(id);
      navigate('/');
    };

    return (
        <Box sx={{ backgroundColor: '#003145', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
            {/* Mini Header */}
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    padding: '10px 20px',
                    color: 'black',
                    height: '55px',
                }}
            >
                <Link to="/">
                    <img src={Logo} alt="Logo" style={{ width: '85px', height: '40px', marginLeft: '100px', cursor: 'pointer' }} />
                </Link>
            </Box>

            <Box sx={{ padding: '130px 120px', flex: 1 }}>
                {/* Starts On Section */}
                <Box sx={{ 
                    backgroundColor: '#FFCE5C',
                    padding: '8px 16px', 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    borderRadius: '5px', 
                    position: 'relative',
                    marginBottom: '25px',
                }}>
                    <AccessTimeIcon sx={{ marginRight: '8px', color: '#000000' }} />
                    <Typography sx={{ color: '#000000', fontWeight: 500 }}>
                        Starts on {new Date(challenge.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} 09:00 PM (India Standard Time)
                    </Typography>
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '16px' }}>
                    {challenge.name}
                </Typography>

                <Typography variant="h6" sx={{ color: '#FFFFFF', marginBottom: '16px', fontWeight: 400 }}>
                    Identify the class to which each butterfly belongs to
                </Typography>

                <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <Chip
                        avatar={<img src={Skill} alt='skill' />}
                        label={challenge.level}
                        sx={{ 
                            backgroundColor: challenge.level === 'Easy' ? '#F8F9FD' : 
                                            challenge.level === 'Medium' ? '#F8F9FD' : '#F8F9FD',
                            color: '#003145',
                            fontWeight: 'bold',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center'
                        }} 
                    />
                </Box>
            </Grid>
                </Grid>
            </Box>

            {/* Overview Section */}
            <Box sx={{ 
                backgroundColor: '#FFFFFF', 
                padding: '35px 120px', 
                height: 'calc(100vh - 55px - 40px - 24px)',
                overflow: 'auto',
                position: 'relative'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
                    <Typography variant="h6" sx={{ color: '#000000', fontWeight: 600,fontSize:'20px', }}>Overview</Typography>
                    <Box>
                        <Button 
                            variant="contained"
                            startIcon={<EditIcon />} 
                            onClick={handleEdit}
                            sx={{ 
                                marginRight: '16px', 
                                backgroundColor: '#44924C', 
                                color: '#FFFFFF', 
                                '&:hover': { backgroundColor: '#357a3b' },
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                        >
                            Edit
                        </Button>
                        <Button 
    variant="contained"
    startIcon={<DeleteIcon />} 
    onClick={() => {
        console.log('deleteHackathon:', deleteHackathon); 
        if (typeof deleteHackathon === 'function') {
            deleteHackathon(challenge.id); 
            navigate('/');
        } else {
            console.error('deleteHackathon is not a function');
        }
    }}
    sx={{ 
        backgroundColor: '#FFFFFF', 
        color: '#DC1414', 
        '&:hover': { backgroundColor: '#f5f5f5' },
        textTransform: 'none',
        fontWeight: 500,
        border: '1px solid',
    }}
>
    Delete
</Button>
                    </Box>
                </Box>
                <Box sx={{ 
                    borderBottom: '2px solid #000000', 
                    boxShadow: '0 2px 4px rgba(1, 0, 0, 1.1)',
                    width: '100%',
                    position: 'absolute',
                    bottom: '450px',
                    left: '0'
                }} />
              
                <Typography sx={{ color: '#64607D', lineHeight: 1.6, fontSize:'20px', }}>
                    Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.
                    <br /><br />
                    An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.
                    <br /><br />
                    Your Task is to build an Image Classification Model using CNN that classifies to which class of weather each image belongs to.
                </Typography>
            </Box>
        </Box>
    );
}

export default ChallengePage;