import Box from '@mui/material/Box';

const badges = {
  "Athletico-PR": "https://api.sofascore.app/api/v1/team/1967/image",
  "Atlético-GO": "https://api.sofascore.app/api/v1/team/7314/image",
  "Atlético-MG": "https://api.sofascore.app/api/v1/team/1977/image",
  "Bahia": "https://api.sofascore.app/api/v1/team/1955/image",
  "Botafogo": "https://api.sofascore.app/api/v1/team/1958/image",
  "Bragantino": "https://api.sofascore.app/api/v1/team/1999/image",
  "Corinthians": "https://api.sofascore.app/api/v1/team/1957/image",
  "Criciúma": "https://api.sofascore.app/api/v1/team/1984/image",
  "Cruzeiro": "https://api.sofascore.app/api/v1/team/1954/image",
  "Cuiabá": "https://api.sofascore.app/api/v1/team/49202/image",
  "Flamengo": "https://api.sofascore.app/api/v1/team/5981/image",
  "Fluminense": "https://api.sofascore.app/api/v1/team/1961/image",
  "Fortaleza": "https://api.sofascore.app/api/v1/team/2020/image",
  "Grêmio": "https://api.sofascore.app/api/v1/team/5926/image",
  "Internacional": "https://api.sofascore.app/api/v1/team/1966/image",
  "Juventude": "https://api.sofascore.app/api/v1/team/1980/image",
  "Palmeiras": "https://api.sofascore.app/api/v1/team/1963/image",
  "São Paulo": "https://api.sofascore.app/api/v1/team/1981/image",
  "Vasco": "https://api.sofascore.app/api/v1/team/1974/image",
  "Vitória": "https://api.sofascore.app/api/v1/team/1962/image",
}

const getBadge = (team) => {
  return badges[team];
}


export default function Team(props) {
  return (
    <Box display="flex" alignItems="center">
      <img src={getBadge(props.name)} width="24" height="24" style={{ marginRight: '4px'}} />
      {props.name}
    </Box>
  );
}