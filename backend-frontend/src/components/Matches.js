import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MatchList from './MatchList';
import RoundPicker from './RoundPicker';
import PagePicker from './PagePicker';
import SelectedTeam from './SelectedTeam';
import { matchesService } from 'src/services';
import { AppContext } from 'src/pages/_app';

export default function Matches(props) {
  const { currentRound, matches } = props;

  const [round, setRound] = React.useState(currentRound);
  const [page, setPage] = React.useState(2);

  // Context
  const context = React.useContext(AppContext);
  const [team, setTeam] = context?.team;

  const handleChange = (name, value) => {
    if (name === 'round') {
      setRound(value)
    } else if (name === 'page') {
      setPage(value)
    } else if (name === 'team') {
      setTeam(value)
    }
  };

  // Figure out match data
  let matchData;
  if (team) {
    matchData = matchesService
      .getMatchesFromTeam(matches, team)
      .slice((page - 1) * 13, (page - 1) * 13 + 13)
  } else {
    matchData = matches[round]
  }

  return (
    <Stack spacing={3}>
      <Paper elevation={1} sx={{ width: '100%' }}>
        <Typography
          variant="body1"
          align="center"
          fontWeight="bold"
        >
          Jogos
        </Typography>
      </Paper>
      {
        team ?
          <Stack>
            <SelectedTeam
              team={team}
              handleChange={handleChange}
            />
            <PagePicker
              page={page}
              handleChange={handleChange}
            />
          </Stack>
          :
          <RoundPicker
            round={round}
            handleChange={handleChange}
          />
      }
      <MatchList
        data={matchData}
      />
    </Stack>
  );
}

Matches.propTypes = {
  currentRound: PropTypes.number.isRequired,
  matches: PropTypes.object.isRequired,
};