import { format } from 'date-fns'; 

export const standingsService = {
  getStandings,
};

const ITERATE_BY_ROUNDS = [1, 2, 3, 4, 5, 7, 8];
const ITERATE_BY_TEAM = [6];
const TEAMS = [
  "Athletico-PR",
  "Atlético-GO",
  "Atlético-MG",
  "Bahia",
  "Botafogo",
  "Bragantino",
  "Corinthians",
  "Criciúma",
  "Cruzeiro",
  "Cuiabá",
  "Flamengo",
  "Fluminense",
  "Fortaleza",
  "Grêmio",
  "Internacional",
  "Juventude",
  "Palmeiras",
  "São Paulo",
  "Vasco",
  "Vitória",
]

function getStandings(matches, option, subOption) {
  
  // ---------------------------
  // Create empty standings
  // ---------------------------
  const standings = {};

  for (const team of TEAMS) {
    standings[team] = emptyStandings()
    // TODO: colocar badge e iniciais aqui, hardcoded
  }

  // If there are matches, iterate through
  if (Object.keys(matches).length !== 0) {
    if (ITERATE_BY_ROUNDS.includes(option)) {
      iterateByRounds(standings, matches, option, subOption);
    } else if (ITERATE_BY_TEAM) {
      iterateByTeam(standings, matches, option, subOption);
    }
  }

  // Calculate percents
  for (const [key, value] of Object.entries(standings)) {
    standings[key].percent = value.matches == 0 ? 0 : Math.round((100 * value.points) / (value.matches * 3) * 10) / 10;
  }

  // Convert 
  return convertStandingsToArray(standings);
}

// -----------------------------------------------
// Iterate by round in crescent order
// -----------------------------------------------
function iterateByRounds(standings, matches, option, subOption) {
  const details = {
    startRound: 1,
    endRound: 38,
    calculateHome: true,
    calculateAway: true,
  }

  switch (option) {
    case 1:
      // No changes
      break;

    case 2:
      details.calculateAway = false;
      break;

    case 3:
      details.calculateHome = false;
      break;

    case 4:
      details.endRound = 19
      break;

    case 5:
      details.startRound = 20;
      details.endRound = 38
      break;

    case 6:
      // N/A here
      break;

    case 7:
      details.endRound = subOption;
      break;

    case 8:
      details.dateLimit = format(subOption, 'yyyy-MM-dd'); 
      break;
  }

  for (let i = details.startRound; i <= details.endRound; i++) {
    const round = matches[i];

    for (const match of round) {
      calculateMatch(standings, match, details.calculateHome, details.calculateAway, details.dateLimit)
    }
  }
}

// -----------------------------------------------
// Iterate by team
// -----------------------------------------------
function iterateByTeam(standings, matches, _option, subOption) {
  // Get matches order by date in descending order
  const sortedMatches = getMatchesInDescendingOrder(matches);

  // Get array of teams
  const teamNames = Object.keys(standings);
  
  // For every team
  for (const team of teamNames) {
    let toFind = subOption;

    // Look for last X matches
    for (let i = 0; i < sortedMatches.length && toFind > 0; i++) {
      const match = sortedMatches[i];
      
      // Did the team play at home, away?
      if (team === match.homeTeam) {
        calculateMatch(standings, match, true, false, false);
        toFind--;
      } else if(team === match.awayTeam) {
        calculateMatch(standings, match, false, true, false);
        toFind--;
      }
    }
  }
}

// -----------------------------------------------
// Util
// -----------------------------------------------
function convertStandingsToArray(standings) {
  // Convert 
  const sorted = [];
  for (const [key, value] of Object.entries(standings)) {
    sorted.push({
      team: key,
      ...value
    })
  }

  return sorted;
}

function emptyStandings() {
  return { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0, "percent": 0, "badge": "", "initials": "" }
}

function calculateMatch(standings, match, calculateHome, calculateAway, dateLimit) {
  const { homeTeam, awayTeam, homeScore, awayScore, started, date } = match;

  // Check if badge and initials are saved
  if (!standings[homeTeam].badge) standings[homeTeam].badge = match.homeTeamBadge;
  if (!standings[homeTeam].initials) standings[homeTeam].initials = match.homeTeamInitials;

  if (!standings[awayTeam].badge) standings[awayTeam].badge = match.awayTeamBadge;
  if (!standings[awayTeam].initials) standings[awayTeam].initials = match.awayTeamInitials;


  // If the game has started 
  // AND
  // if dateLimit defined, it's greather than or equal the date
  // THEN
  // consider the match
  if (started && !(dateLimit && date > dateLimit)) {

    // The home team
    if (calculateHome) calculateStandings(standings[homeTeam], homeScore, awayScore)

    // The away team
    if (calculateAway) calculateStandings(standings[awayTeam], awayScore, homeScore)
  }
}

function getResults(score, oponentScore) {
  const results = {
    points: 0,
    pointsLost: 0,
    victory: 0,
    draw: 0,
    loss: 0,
    goalsFor: score,
    goalsAgainst: oponentScore,
    goalDifference: score - oponentScore
  }

  if (score > oponentScore) {
    results.points = 3
    results.victory = 1
  } else if (score == oponentScore) {
    results.points = 1
    results.pointsLost = 2
    results.draw = 1

  } else {
    results.pointsLost = 3
    results.loss = 1
  }

  return results;
}

function calculateStandings(team, score, oponentScore) {
  const results = getResults(score, oponentScore)
  team.matches += 1
  team.points += results.points
  team.pointsLost += results.pointsLost
  team.victories += results.victory
  team.draws += results.draw
  team.losses += results.loss
  team.goalsFor += results.goalsFor
  team.goalsAgainst += results.goalsAgainst
  team.goalDifference += results.goalDifference
}

function getMatchesInDescendingOrder(matches) {
  // Flatten the matches
  const matchesArray = Object.values(matches).flat();

  // Sort by date descending
  return matchesArray
    .filter(item => item.started)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}