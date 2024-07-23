import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import MatchList from './MatchList';
import RoundPicker from './RoundPicker';

import { matchesService } from 'src/services';

export default function Matches(props) {
  const { currentRound, matches } = props;

  const [round, setRound] = React.useState(currentRound);

  const handleChange = (name, value) => {
    if (name === 'round') {
      setRound(value)
    }
  };

  // Figure out match data
  let matchData;
  if (true) {
    matchData = matches[round]

  } else {
    matchData = matchesService.getMatchesFromTeam(matches, "Palmeiras")
  }

  return (
    <Stack spacing={3}>
      <RoundPicker
        round={round}
        handleChange={handleChange}
      />
      <MatchList
        data={matchData}
      />
    </Stack>
  );
}

Matches.propTypes = {
  handleChange: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  matches: PropTypes.array.isRequired,
};