import api from './config';

/**
 * Get all squads for the current user
 */
export const getMySquads = async () => {
  try {
    const response = await api.get('/squads');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch squads:', error);
    throw error;
  }
};

/**
 * Get single squad by ID
 */
export const getSquadById = async (squadId) => {
  try {
    const response = await api.get(`/squads/${squadId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch squad ${squadId}:`, error);
    throw error;
  }
};

export default {
  getMySquads,
  getSquadById,
};
