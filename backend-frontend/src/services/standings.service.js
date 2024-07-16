import { format } from 'date-fns'; 

export const standingsService = {
  getStandings,
};

const ITERATE_BY_ROUNDS = [1, 2, 3, 4, 5, 7, 8];
const ITERATE_BY_TEAM = [6];

const TEAMS = {
  "Athletico-PR": { initials: 'CAP', badge: 'https://s.sde.globo.com/media/organizations/2019/09/09/Athletico-PR.svg'},
  "Atlético-GO": { initials: 'ACG', badge: 'https://s.sde.globo.com/media/organizations/2020/07/02/atletico-go-2020.svg'},
  "Atlético-MG": { initials: 'CAM', badge: 'https://s.sde.globo.com/media/organizations/2018/03/10/atletico-mg.svg'},
  "Bahia": { initials: 'BAH', badge: 'https://s.sde.globo.com/media/organizations/2018/03/11/bahia.svg'},
  "Botafogo": { initials: 'BOT', badge: 'https://s.sde.globo.com/media/organizations/2019/02/04/botafogo-svg.svg'},
  "Bragantino": { initials: 'RBB', badge: 'https://s.sde.globo.com/media/organizations/2021/06/28/bragantino.svg'},
  "Corinthians": { initials: 'COR', badge: 'https://s.sde.globo.com/media/organizations/2019/09/30/Corinthians.svg'},
  "Criciúma": { initials: 'CRI', badge: 'https://s.sde.globo.com/media/organizations/2024/03/28/Criciuma-2024.svg'},
  "Cruzeiro": { initials: 'CRU', badge: 'https://s.sde.globo.com/media/organizations/2021/02/13/cruzeiro_2021.svg'},
  "Cuiabá": { initials: 'CUI', badge: 'https://s.sde.globo.com/media/organizations/2018/04/10/Flamengo-2018.svg'},
  "Flamengo": { initials: 'FLA', badge: 'https://s.sde.globo.com/media/organizations/2018/04/10/Flamengo-2018.svg'},
  "Fluminense": { initials: 'FLU', badge: 'https://s.sde.globo.com/media/organizations/2018/03/11/fluminense.svg'},
  "Fortaleza": { initials: 'FOR', badge: 'https://s.sde.globo.com/media/organizations/2021/09/19/Fortaleza_2021_1.svg'},
  "Grêmio": { initials: 'GRE', badge: 'https://s.sde.globo.com/media/organizations/2018/03/12/gremio.svg'},
  "Internacional": { initials: 'INT', badge: 'https://s.sde.globo.com/media/organizations/2018/03/11/internacional.svg'},
  "Juventude": { initials: 'JUV', badge: 'https://s.sde.globo.com/media/organizations/2021/04/29/Juventude-2021-01.svg'},
  "Palmeiras": { initials: 'PAL', badge: 'https://s.sde.globo.com/media/organizations/2019/07/06/Palmeiras.svg'},
  "São Paulo": { initials: 'SAO', badge: 'https://s.sde.globo.com/media/organizations/2018/03/11/sao-paulo.svg'},
  "Vasco": { initials: 'VAS', badge: 'https://s.sde.globo.com/media/organizations/2021/09/04/vasco_SVG.svg'},
  "Vitória": { initials: 'VIT', badge: 'https://s.sde.globo.com/media/organizations/2024/04/09/escudo-vitoria-svg-69281.svg'},
}

function getStandings(matches, option, subOption) {
  
  // ---------------------------
  // Create empty standings
  // ---------------------------
  const standings = {};

  for (const [key, value] of Object.entries(TEAMS)) {
    standings[key] = emptyStandings()
    standings[key].initials = value.initials
    standings[key].badge = value.badge
  }

  // ----------------------------------------------
  // If there are matches, iterate through
  // ----------------------------------------------
  if (Object.keys(matches).length !== 0) {
    if (ITERATE_BY_ROUNDS.includes(option)) {
      iterateByRounds(standings, matches, option, subOption);
    } else if (ITERATE_BY_TEAM) {
      iterateByTeam(standings, matches, option, subOption);
    }
  }

  // ----------------------------------------------
  // Calculate percents
  // ----------------------------------------------
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
  const details = getDetailsFromOptions(option, subOption)

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
  // Get matches ordered by descending date
  const startedMatches = getStartedMatchesInDescendingOrder(matches);
  
  // For every team
  for (const team of Object.keys(standings)) {
    let toFind = subOption;

    // Look for last X matches
    for (let i = 0; i < startedMatches.length && toFind > 0; i++) {
      const match = startedMatches[i];
      
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
function getDetailsFromOptions(option, subOption ) {
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

  return details
}

function convertStandingsToArray(standings) {
  // Convert 
  const standingArray = [];
  for (const [key, value] of Object.entries(standings)) {
    standingArray.push({
      team: key,
      ...value
    })
  }

  return standingArray;
}

function emptyStandings() {
  return { "points": 0, "pointsLost": 0, "matches": 0, "victories": 0, "draws": 0, "losses": 0, "goalsFor": 0, "goalsAgainst": 0, "goalDifference": 0, "percent": 0, lastMatches:  [], "badge": "", "initials": "" }
}

function calculateMatch(standings, match, calculateHome, calculateAway, dateLimit) {
  const { homeTeam, awayTeam, homeScore, awayScore, started, date } = match;

  // If the game has started 
  // AND
  // if dateLimit defined, it's greather than or equal the date
  // THEN
  // consider the match
  if (started && !(dateLimit && date > dateLimit)) {

    // The home team
    if (calculateHome) {
      
      // Calculate standings
      calculateStandings(standings[homeTeam], homeScore, awayScore);

      // Add to last matches
      standings[homeTeam].lastMatches.push({
        outcome: getOutcome(homeScore, awayScore),
        tooltip: `${date} | ${homeTeam} ${homeScore} x ${awayScore} ${awayTeam}`
      })
    }

    // The away team
    if (calculateAway) {
      
      // Calculate standings
      calculateStandings(standings[awayTeam], awayScore, homeScore);

      // Add to last matches
      standings[awayTeam].lastMatches.push({
        outcome: getOutcome(awayScore, homeScore),
        tooltip: `${date} | ${homeTeam} ${homeScore} x ${awayScore} ${awayTeam}`
      })
    }
  }
}

function getOutcome(score, oponentScoreScore,) {
  if (score > oponentScoreScore) {
    return 'V'
  }
  else if (score < oponentScoreScore) {
    return 'D'
  } else {
    return 'E';
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

function getStartedMatchesInDescendingOrder(matches) {
  // Flatten the matches
  const matchesArray = Object.values(matches).flat();

  // Sort by date descending
  return matchesArray
    .filter(item => item.started)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}