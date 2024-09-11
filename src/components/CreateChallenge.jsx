import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Logo from '../Assets/Logo.png';

function CreateChallenge({ addHackathon }) {
  const [challenge, setChallenge] = useState({
    name: '',
    startDate: null,
    endDate: null,
    description: '',
    image: null,
    level: 'Easy',
  });

  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallenge(prevChallenge => ({
      ...prevChallenge,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setChallenge(prevChallenge => ({
      ...prevChallenge,
      [name]: date,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setChallenge(prevChallenge => ({
      ...prevChallenge,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Create image preview URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHackathon({
      ...challenge,
      id: Date.now(), 
      status: 'upcoming', 
    });
    navigate('/');
  };

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
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ width: '85px', height: '40px', marginLeft: '100px', cursor: 'pointer' }} />
        </Link>
      </Box>

      {/* Main Form */}
      <Box sx={{ maxWidth: '600px', padding: '20px', textAlign: 'start', marginLeft: '100px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 600 }}>
          Challenge Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            Challenge Name
          </Typography>
          <TextField
            fullWidth
            name="name"
            value={challenge.name}
            onChange={handleChange}
            sx={{ marginBottom: '20px' }}
          />
          
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            Start Date
          </Typography>
          <DatePicker
            selected={challenge.startDate}
            onChange={handleDateChange('startDate')}
            placeholderText="Add Start Date"
            dateFormat="MMMM d, yyyy"
            customInput={<TextField fullWidth sx={{ marginBottom: '20px' }} />}
          />

          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            End Date
          </Typography>
          <DatePicker
            selected={challenge.endDate}
            onChange={handleDateChange('endDate')}
            placeholderText="Add End Date"
            dateFormat="MMMM d, yyyy"
            customInput={<TextField fullWidth sx={{ marginBottom: '20px' }} />}
          />

          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            name="description"
            value={challenge.description}
            onChange={handleChange}
            sx={{ marginBottom: '20px' }}
          />

          <Typography variant="subtitle1" sx={{ marginBottom: '8px', height: '56px' }}>
            Image
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: '#f5f5f5', color: '#000', width: '40%', height: '56px' }}
          >
            <CloudUploadIcon sx={{ marginRight: '8px' }} />
            Upload
            <input
              type="file"
              hidden
              onChange={handleImageChange} // Use new handler
            />
          </Button>

          {/* Display uploaded image */}
          {imagePreview && (
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="subtitle1">Uploaded Image Preview</Typography>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
          )}

          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            Level Type
          </Typography>
          <Select
            fullWidth
            name="level"
            value={challenge.level}
            onChange={handleChange}
            sx={{ marginBottom: '40px', width: '40%' }}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>

          <Button 
            type="submit" 
            variant="contained" 
            sx={{ backgroundColor: '#44924C', color: '#fff', padding: '10px 20px', marginBottom: '30px', display: 'block' }}
          >
            Create Challenge
          </Button>
        </form>
      </Box>
    </>
  );
}

export default CreateChallenge;