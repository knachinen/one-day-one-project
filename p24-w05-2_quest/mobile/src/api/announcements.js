import api from './config';

/**
 * Get all announcements
 */
export const getAnnouncements = async () => {
  try {
    const response = await api.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    throw error;
  }
};

export default {
  getAnnouncements,
};
