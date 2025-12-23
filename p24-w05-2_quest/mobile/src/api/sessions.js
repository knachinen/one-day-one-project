import api from './config';

/**
 * Get today's study time for current user
 * @param {string} userId - User ID (for MVP, defaults to test-user-1)
 */
export const getTodayStudyTime = async (userId = 'test-user-1') => {
  try {
    const response = await api.get('/sessions/today', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch today\'s study time:', error);
    throw error;
  }
};

/**
 * Get all study sessions for current user
 * @param {string} userId - User ID
 * @param {number} limit - Number of sessions to fetch
 */
export const getSessions = async (userId = 'test-user-1', limit = 50) => {
  try {
    const response = await api.get('/sessions', {
      params: { userId, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    throw error;
  }
};

export default {
  getTodayStudyTime,
  getSessions,
};
