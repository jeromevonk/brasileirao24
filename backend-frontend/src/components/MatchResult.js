// components/MatchResult.js
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Team from '../components/Team';
import { convertDateBrazilianFormat } from 'src/helpers'

const MatchResult = ({ homeTeam, homeBadge, homeScore, awayTeam, awayBadge, awayScore, date, time, started, finished, stadium }) => {
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
        width="320px"
        mb={0.5}
        mt={0.5}
      >
        <Box display="flex" justifyContent="flex-end" alignItems="center" width="42%">
          <Team name={homeTeam} badge={homeBadge} />
        </Box>
        <Box mx={2} display="flex" justifyContent="center" alignItems="center" width="16%">
          <Typography variant="h7" component="span" style={{ textAlign: 'center' }}>
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
