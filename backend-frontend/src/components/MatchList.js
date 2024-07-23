import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MatchResult from '../components/MatchResult';

import { getTeam } from '../helpers/teams'

import { AppContext } from 'src/pages/_app';

export default function MatchList(props) {
  const { data } = props;

  // Context
  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;

  return (
    <Box>
      {
        data.map(match => {
          const home = getTeam(match.homeTeam);
          const away = getTeam(match.awayTeam);

          return (
            <div id={`match-${home.initials}-${away.initials}`}>
              <MatchResult
                homeTeam={largeScreen.width ? match.homeTeam : home.initials}
                homeBadge={home.badge}
                homeScore={match.homeScore}
                awayTeam={largeScreen.width ? match.awayTeam : away.initials}
                awayBadge={away.badge}
                awayScore={match.awayScore}
                date={match.date}
                time={match.time}
                started={match.started}
                finished={match.finished}
                stadium={match.stadium}
              />
              <Divider />
            </div>
          )
        })
      }

    </Box>
  );
}

MatchList.propTypes = {
  data: PropTypes.array.isRequired,
};