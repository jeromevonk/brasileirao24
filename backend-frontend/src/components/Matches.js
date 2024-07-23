import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import MatchList from './MatchList';
import RoundPicker from './RoundPicker';

export default function Matches(props) {
  const { round, handleChange, data } = props;

  return (
    <Stack spacing={3}>
      <RoundPicker
        round={round}
        handleChange={handleChange}
      />
      <MatchList
        data={data}
      />
    </Stack>
  );
}

Matches.propTypes = {
  handleChange: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};