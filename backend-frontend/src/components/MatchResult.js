import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Team from '../components/Team';
import { convertDateBrazilianFormat } from 'src/helpers'

const MatchResult = ({ homeTeam, homeBadge, homeScore, awayTeam, awayBadge, awayScore, date, time, started, finished, stadium }) => {
  
  const getColor = (started, finished) => {
    if (started && !finished) {
      return 'red';
    } else {
      return 'black';
    }
  };

  return (
    <Stack
      spacing={0}
    >
      <Typography
        variant="caption"
        component="span"
        textAlign='center'
        fontWeight='bold'
      >
        {convertDateBrazilianFormat(date)} {time} {stadium}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="350px"
        mb={0.8}
        mt={0.5}
      >
        <Box display="flex" justifyContent="flex-end" alignItems="center" width="42%">
          <Team name={homeTeam} badge={homeBadge} />
        </Box>
        <Box mx={2} display="flex" justifyContent="center" alignItems="center" width="16%">
          <Typography
            variant="h7"
            component="span"
            style={{ textAlign: 'center', color: getColor(started, finished) }}>
            {homeScore} x {awayScore}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center" width="42%">
          <Team name={awayTeam} badge={awayBadge} />
        </Box>
      </Box>
    </Stack>

  );
};

export default MatchResult;

MatchResult.propTypes = {
  homeTeam: PropTypes.string.isRequired,
  homeBadge: PropTypes.string.isRequired,
  homeScore: PropTypes.number.isRequired,
  awayTeam: PropTypes.string.isRequired,
  awayBadge: PropTypes.string.isRequired,
  awayScore: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  started: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  stadium: PropTypes.string.isRequired,
};