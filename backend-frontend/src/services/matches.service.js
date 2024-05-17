import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/matches`;

export const matchesService = {
  getMatches,
  getMatchesHardcoded,
};

async function getMatches() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}


async function getMatchesHardcoded() {
  const jsonData = require('../pages/api/results.json'); // TODOOOO
  return jsonData;
}