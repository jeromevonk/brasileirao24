import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { AppContext } from 'src/pages/_app';

export default function Team(props) {
  const { name, badge } = props;

  // Context
  const context = React.useContext(AppContext);
  const [_, setTeam] = context?.team;

  return (
    <Box display="flex" alignItems="center">
      <img src={badge} width="24" height="24" style={{ marginRight: '4px' }} />
      <Box
        component="span"
        onClick={() => setTeam(name )}
        style={{ cursor: 'pointer' }}
      >
        {name}
      </Box>
    </Box>
  );
}

Team.propTypes = {
  name: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
};