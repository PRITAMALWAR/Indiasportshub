import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/matches";

export const getAllMatches = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getMatchesByRound = async (round) => {
  const response = await axios.get(`${API_BASE_URL}/${round}`);
  return response.data;
};

export const scrapeLatest = async () => {
  const response = await axios.get(`${API_BASE_URL}/scrape`);
  return response.data;
};
