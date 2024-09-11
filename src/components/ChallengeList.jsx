import React, { useState } from 'react';
import { TextField, Grid, Box, InputAdornment, Typography, FormGroup, FormControlLabel, Checkbox, Collapse, IconButton } from '@mui/material';
import { Search, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Close as CloseIcon } from '@mui/icons-material';
import ChallengeCard from './ChallengeCard';
import { motion } from 'framer-motion';

function ChallengeList({ challenges, deleteHackathon, editHackathon }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: {
      all: true,
      active: false,
      upcoming: false,
      past: false,
    },
    level: {
      easy: false,
      medium: false,
      hard: false,
    },
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value],
      },
    }));
  };

  const clearFilter = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: false,
      },
    }));
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchSearch = challenge.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      filters.status.all ||
      filters.status[challenge.status] ||
      filters.level[challenge.level.toLowerCase()];
    return matchSearch && matchFilter;
  });

  

  const appliedFilters = [];
  for (const [category, filterValues] of Object.entries(filters)) {
    for (const [key, value] of Object.entries(filterValues)) {
      if (value && key !== 'all') {
        appliedFilters.push({ filter: `${key.charAt(0).toUpperCase() + key.slice(1)} ${category}`, category, key });
      }
    }
  }

  return (
    <>
      {/* Explore Challenges Section */}
      <Box
        sx={{
          padding: '80px 30px 20px 30px',
          backgroundColor: '#002A3B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#FFFFFF',
          }}
        >
          Explore Challenges
        </Typography>

        {/* Search and Filter Container */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            position: 'relative',
          }}
        >
          {/* Search */}
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#B0B3C6' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              backgroundColor: '#fff',
              borderRadius: '8px',
              input: {
                color: '#001F3B',
              },
              mr: 2,
              height: '56px', 
            }}
          />

          {/* Filter */}
          <Box sx={{ width: '150px', position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                marginBottom: '0',
                backgroundColor: '#FFFFFF',
                color: 'black',
                borderRadius: '8px',
                height: '56px',
                padding: '0 10px',
              }}
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <Typography variant="h6">Filter</Typography>
              {isFilterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse
              in={isFilterExpanded}
              sx={{
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '200px',
                zIndex: 999,
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="subtitle1" sx={{ marginTop: '10px', color: '#666666' }}>Status</Typography>
              <FormGroup>
                {Object.entries(filters.status).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={value}
                        onChange={() => handleFilterChange('status', key)}
                        sx={{ color: '#666666', '&.Mui-checked': { color: '#666666' } }}
                      />
                    }
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    sx={{ color: '#666666' }}
                  />
                ))}
              </FormGroup>
              <Typography variant="subtitle1" sx={{ marginTop: '10px', color: '#666666' }}>Level</Typography>
              <FormGroup>
                {Object.entries(filters.level).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={value}
                        onChange={() => handleFilterChange('level', key)}
                        sx={{ color: '#666666', '&.Mui-checked': { color: '#666666' } }}
                      />
                    }
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    sx={{ color: '#666666' }}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </Box>
        </Box>

        {/* Applied Filters */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {appliedFilters.length > 0 && appliedFilters.map((filter, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: '#798f9a',
                height:'40px',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight:'bold',
                transition: 'all 0.3s ease', 
                '&:hover': {
                  backgroundColor: '#5c6f77',
                },
              }}
            >
              {filter.filter}
              <IconButton
                size="small"
                sx={{ color: '#FFFFFF', marginLeft: '8px' }}
                onClick={() => clearFilter(filter.category, filter.key)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Challenges List */}
      <Box
        sx={{
          backgroundColor: '#003145', 
          padding: '40px',
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {filteredChallenges.map((challenge) => (
            <Grid item key={challenge.id} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <ChallengeCard challenge={challenge} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ChallengeList;