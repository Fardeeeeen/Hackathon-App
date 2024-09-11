import React, { useState } from 'react';
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function AddEditHackathonForm({ addHackathon, editHackathon, currentHackathon, open, onClose }) {
  const [hackathon, setHackathon] = useState(currentHackathon || {
    id: Date.now(),
    name: '',
    description: '',
    level: 'easy',
    status: 'upcoming',
    startDate: '',
    endDate: '',
    image: null
  });

  const handleInputChange = (e) => {
    setHackathon({ ...hackathon, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setHackathon({ ...hackathon, image: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (currentHackathon) {
      editHackathon(hackathon);
    } else {
      addHackathon(hackathon);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentHackathon ? 'Edit Hackathon' : 'Add Hackathon'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={hackathon.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={hackathon.description}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          select
          label="Level"
          name="level"
          value={hackathon.level}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          select
          label="Status"
          name="status"
          value={hackathon.status}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="past">Past</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Start Date"
          name="startDate"
          type="date"
          value={hackathon.startDate}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="End Date"
          name="endDate"
          type="date"
          value={hackathon.endDate}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <input type="file" onChange={handleImageUpload} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditHackathonForm;