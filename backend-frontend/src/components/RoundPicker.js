import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';

export default function RoundPicker(props) {
  const { handleChange, round } = props;

  return (
    <Pagination
      count={38}
      page={round}
      size="small"
      color="primary"
      boundaryCount={3}
      onChange={(_event, value) => { handleChange('round', value) }}
    />
  );
}

RoundPicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
};