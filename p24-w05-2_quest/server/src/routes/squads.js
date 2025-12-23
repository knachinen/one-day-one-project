const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// GET /api/squads - Get all squads for current user
router.get('/', async (req, res) => {
  try {
    // For MVP, get all squads (later filter by user membership)
    const squads = await db.query(`
      SELECT
        s.squad_id,
        s.name,
        s.description,
        s.image_url,
        COUNT(DISTINCT sm.user_id) as member_count
      FROM squads s
      LEFT JOIN squad_members sm ON s.squad_id = sm.squad_id AND sm.is_active = 1
      GROUP BY s.squad_id
      ORDER BY s.created_at DESC
    `);

    // Get today's study time for each squad
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    const squadsWithStats = await Promise.all(squads.map(async (squad) => {
      // Get total study time today for squad members
      const studyStats = await db.get(`
        SELECT
          COALESCE(SUM(duration), 0) as total_seconds
        FROM study_sessions
        WHERE squad_id = ?
          AND start_time >= ?
          AND start_time <= ?
          AND is_valid = 1
      `, [squad.squad_id, startOfDay, endOfDay]);

      // Format total study time
      const totalSeconds = studyStats?.total_seconds || 0;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const totalStudyTime = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;

      return {
        id: squad.squad_id,
        name: squad.name,
        emoji: '📚', // Default emoji for now
        memberCount: squad.member_count || 0,
        onlineCount: 0, // Will be updated with Socket.io in real implementation
        totalStudyTime,
      };
    }));

    res.json(squadsWithStats);
  } catch (error) {
    console.error('Error fetching squads:', error);
    res.status(500).json({ error: 'Failed to fetch squads' });
  }
});

module.exports = router;
