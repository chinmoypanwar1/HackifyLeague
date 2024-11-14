import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Select, MenuItem, InputLabel, FormControl, Typography, Box } from '@mui/material';

function FilterSidebar() {
  const [filters, setFilters] = useState({
    eligibility: false,
    managedByDevpost: false,
    location: { online: false, inPerson: false },
    status: { upcoming: false, open: false, ended: false },
    length: { length1: false, length2: false, length3: false },
    interestTags: {
      beginnerFriendly: false,
      socialGood: false,
      machineLearningAI: false,
      openEnded: false,
      education: false,
    },
    host: '',
    difficulty: { easy: false, medium: false, hard: false },
    prize: { low: false, medium: false, high: false },
  });

  const handleCheckboxChange = (category, subCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [subCategory]: !prevFilters[category][subCategory],
      },
    }));
  };

  const handleMainCheckboxChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleHostChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      host: event.target.value,
    }));
  };

  return (<div></div>
    
  );
}

export default FilterSidebar;
