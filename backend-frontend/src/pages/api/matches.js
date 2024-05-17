export default async function handler(req, res) {
  try {
    // Object to store the results
    const responseData = {};

    // Array to store promises for each request
    const requests = [];

    // Loop through rounds from 1 to 38
    for (let i = 1; i <= 38; i++) {
      // Push each fetch promise into the requests array
      requests.push(
        fetch(`https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2024/rodada/${i}/jogos`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed getting round ${i}`);
            }
            return response.json();
          })
          .then(data => {
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
                started: item.jogo_ja_comecou
              })
            }

            // Store within the corresponding key
            responseData[i] = matches;
          })
          .catch(error => {
            throw new Error(`Error related to round ${i}: ${error.message}`);
          })
      );
    }

    // Use Promise.all to wait for all requests to resolve
    await Promise.all(requests);

    // Send the object of data as the API response
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from Globo Esporte API" });
  }
}
