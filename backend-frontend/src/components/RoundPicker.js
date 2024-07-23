import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function RoundPicker(props) {
  const { handleChange, round } = props;

  return (
    <Box 
      display="flex"
      justifyContent="center"
    >
      <Pagination
        count={38}
        page={round}
        size="small"
        color="primary"
        boundaryCount={2}
        onChange={(_event, value) => { handleChange('round', value) }}
      />
    </Box>

  );
}

RoundPicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
};