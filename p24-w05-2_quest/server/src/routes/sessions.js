const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// GET /api/sessions/today - Get today's study time for a user
router.get('/today', async (req, res) => {
  try {
    // For MVP, use a test user ID (later: get from auth token)
    // You can pass userId as query param: ?userId=xxx
    const userId = req.query.userId || 'test-user-1';

    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    // Get all completed sessions for today
    const sessions = await db.query(`
      SELECT
        COALESCE(SUM(duration), 0) as total_seconds,
        COUNT(*) as session_count
      FROM study_sessions
      WHERE user_id = ?
        AND start_time >= ?
        AND start_time <= ?
        AND end_time IS NOT NULL
        AND is_valid = 1
    `, [userId, startOfDay, endOfDay]);

    const totalSeconds = sessions[0]?.total_seconds || 0;
    const sessionCount = sessions[0]?.session_count || 0;

    // Format time as "XXh XXm"
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const studyTime = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;

    // Calculate progress (assuming 5 hours goal)
    const goalSeconds = 5 * 3600; // 5 hours
    const progress = Math.min(Math.round((totalSeconds / goalSeconds) * 100), 100);

    res.json({
      studyTime,
      progress,
      totalSeconds,
      sessionCount,
      goal: '05h 00m',
    });
  } catch (error) {
    console.error('Error fetching today\'s sessions:', error);
    res.status(500).json({ error: 'Failed to fetch today\'s study time' });
  }
});

// GET /api/sessions - Get all sessions for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'test-user-1';
    const limit = parseInt(req.query.limit) || 50;

    const sessions = await db.query(`
      SELECT
        session_id,
        user_id,
        squad_id,
        session_type,
        start_time,
        end_time,
        duration,
        is_valid,
        created_at
      FROM study_sessions
      WHERE user_id = ?
      ORDER BY start_time DESC
      LIMIT ?
    `, [userId, limit]);

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

module.exports = router;
