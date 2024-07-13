function isRoundComplete(round, i) {
  finished = round.filter(item => item.finished)
  console.log(`Round ${i} with ${finished.length} finished`)
  return finished.length == 10
}

async function getRoundFromAPI(round) {
  try {
    const response = await fetch(`https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2024/rodada/${round}/jogos`);

    if (!response.ok) {
      throw new Error(`Failed getting round ${round}`);
    }

    const data = await response.json();
    const matches = [];

    for (const item of data) {
      matches.push({
        homeTeam: item.equipes.mandante.nome_popular,
        homeTeamBadge: item.equipes.mandante.escudo,
        homeTeamInitials: item.equipes.mandante.sigla,
        awayTeam: item.equipes.visitante.nome_popular,
        awayTeamBadge: item.equipes.visitante.escudo,
        awayTeamInitials: item.equipes.visitante.sigla,
        homeScore: item.placar_oficial_mandante,
        awayScore: item.placar_oficial_visitante,
        date: item.data_realizacao?.substring(0, 10) || null,
        started: item.jogo_ja_comecou,
        finished: item.transmissao?.broadcast?.id == "ENCERRADA" ? true : false
      });
    }

    return matches;
  } catch (error) {
    throw new Error(`Error related to round ${round}: ${error.message}`);
  }
}

module.exports = {
  isRoundComplete,
  getRoundFromAPI,
};
