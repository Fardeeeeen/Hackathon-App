import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import Logo from '../Assets/Logo.png';

function EditChallenge({ challenges, editHackathon, deleteHackathon }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview

  useEffect(() => {
    const challengeToEdit = challenges.find(c => c.id === parseInt(id));
    if (challengeToEdit) {
      setChallenge(challengeToEdit);
      
      if (challengeToEdit.image) {
        // Handle the image correctly based on its type
        if (typeof challengeToEdit.image === 'string') {
          setImagePreview(challengeToEdit.image); // Assume it's a URL
        } else if (challengeToEdit.image instanceof Blob || challengeToEdit.image instanceof File) {
          setImagePreview(URL.createObjectURL(challengeToEdit.image)); // Create image preview URL
        }
      }
    }
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      if (imagePreview && (imagePreview.startsWith('blob:') || imagePreview.startsWith('data:'))) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [id, challenges]);

  if (!challenge) {
    return <Typography>Challenge not found</Typography>;
  }

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
    if (file) {
      setChallenge(prevChallenge => ({
        ...prevChallenge,
        image: file,
      }));
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl); // Create image preview URL

      // Cleanup function to revoke the object URL when the image changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editHackathon(challenge);
    navigate('/'); 
  };

  const handleDelete = () => {
    if (typeof deleteHackathon === 'function') {
      deleteHackathon(challenge.id);
      navigate('/'); 
    } else {
      console.error('deleteHackathon is not a function');
    }
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
          Edit Challenge Details
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
            Update Challenge
          </Button>
        </form>
      </Box>
    </>
  );
}

export default EditChallenge;