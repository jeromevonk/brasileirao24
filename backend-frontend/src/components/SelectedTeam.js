import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SelectedTeam(props) {
  const { handleChange, team } = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      mb={1}
    >
      {
        team &&
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bold"
          >
            {team}
          </Typography>
          <IconButton
            aria-label="Close"
            size="small"
              onClick={() => handleChange('team', '')}
              
          >
            <CloseIcon />
          </IconButton>
        </Box>
      }
    </Box>
  );
}

SelectedTeam.propTypes = {
  handleChange: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
};
