const express = require('express');
const router = express.Router();

// GET /api/announcements - Get all announcements
// TODO: Add announcements table to database schema
// For now, returning mock data
router.get('/', async (req, res) => {
  try {
    // Mock announcements data
    // Later: Replace with actual database query
    const announcements = [
      {
        id: 1,
        title: '새로운 타이머 기능이 추가되었습니다!',
        content: '포모도로 타이머와 자유 타이머 중 선택하실 수 있습니다. 집중 시간을 더욱 효율적으로 관리해보세요.',
        date: '2025.12.23',
        isNew: true,
      },
      {
        id: 2,
        title: '스쿼드 최대 인원 확대 안내',
        content: '스쿼드 최대 인원이 50명에서 100명으로 확대되었습니다. 더 많은 친구들과 함께 학습하세요!',
        date: '2025.12.20',
        isNew: false,
      },
      {
        id: 3,
        title: 'Quest MVP 버전 출시',
        content: '학습 타이머, 스쿼드, 실시간 채팅 기능을 만나보세요. 여러분의 학습 여정을 응원합니다!',
        date: '2025.12.15',
        isNew: false,
      },
    ];

    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

module.exports = router;
