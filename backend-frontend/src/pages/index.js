import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Standings from '../components/Standings';
import Matches from '../components/Matches';
import { matchesService, standingsService } from 'src/services';
import { AppContext } from 'src/pages/_app';
import { withRouter } from 'next/router'

export async function getServerSideProps() {
  const matches = await matchesService.getMatches();
  const currentRound = matchesService.getCurrentRound(matches);

  return {
    props: {
      matches,
      currentRound
    },
  }
}

function Index(props) {
  const { matches, currentRound } = props;

  // Context
  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;

  // States
  const [standings, setStandings] = React.useState([]);
  const [selected, setSelected] = React.useState({ option: 1, subOption: 1 });
  const [round, setRound] = React.useState(currentRound);

  const handleChange = (name, value) => {
    if (name === 'option') {
      setSelected((prevSelected) => {
        const newValues = { ...prevSelected, option: value };

        if (value === 6) newValues.subOption = 5;
        if (value === 7) newValues.subOption = 3;
        if (value === 8) newValues.subOption = new Date(2024, 4, 22);

        return newValues;
      });
    } else if (name === 'subOption') {
      setSelected((prevSelected) => {
        const newValues = { ...prevSelected, subOption: value };
        return newValues;
      });
    } else if (name === 'round') {
      setRound(value)
    }
  };

  // -----------------------------------------------------
  // Get standings
  // -----------------------------------------------------
  React.useEffect(() => {
    setStandings(standingsService.getStandings(matches, selected.option, selected.subOption))
  }, [selected.option, selected.subOption]);

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingLeft: '12px', paddingRight: '12px' }}
    >
      <Box sx={{ my: 2 }}>
        <Stack spacing={3} direction={largeScreen.width ? 'row' : 'column'}>
          <Standings
            selected={selected}
            handleChange={handleChange}
            data={standings}
          />
          <Matches 
            round={round}
            handleChange={handleChange}
            data={matches[round]}
          />
        </Stack>
      </Box>
    </Container>
  );
}

export default withRouter(Index)
