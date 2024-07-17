import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import StandingsTable from '../components/StandingsTable';
import OptionPicker from '../components/OptionPicker';
import { matchesService, standingsService } from 'src/services';
import { withRouter } from 'next/router'

export async function getServerSideProps() {
  const matches = await matchesService.getMatches();

  return {
    props: {
      matches
    },
  }
}

function Index(props) {
  const [standings, setStandings] = React.useState([]);
  const [selected, setSelected] = React.useState({option: 1, subOption: 1});

  const { matches } = props;

  const handleChange = (name, value) => {
    if (name === 'option') {
      setSelected((prevSelected) => {
        const newValues = { ...prevSelected, option: value };

        if (value === 6) newValues.subOption = 5;
        if (value === 7) newValues.subOption = 3;
        if (value === 8) newValues.subOption = new Date(2024, 4, 22);

        return newValues;
      });
    } else {
      setSelected((prevSelected) => {
        const newValues = { ...prevSelected, subOption: value };
        return newValues;
      });
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
        <Stack spacing={1}>
          {
            <Stack spacing={1}>
              <OptionPicker
                selected={selected}
                handleChange={handleChange}
              />
              <StandingsTable
                data={standings}
              />
            </Stack>
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default withRouter(Index)
