const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

async function seed() {
  console.log('🌱 Seeding database...\n');

  try {
    const now = Date.now();
    const password = await bcrypt.hash('test1234', 10);

    // Create test users with fixed IDs for easy testing
    const user1Id = 'test-user-1'; // Fixed ID for API testing
    const user2Id = 'test-user-2';
    const user3Id = 'test-user-3';

    console.log('👤 Creating users...');
    await db.run(
      `INSERT OR IGNORE INTO users (user_id, email, password_hash, username, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user1Id, 'test1@quest.app', password, '김철수', now]
    );

    await db.run(
      `INSERT OR IGNORE INTO users (user_id, email, password_hash, username, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user2Id, 'test2@quest.app', password, '이영희', now]
    );

    await db.run(
      `INSERT OR IGNORE INTO users (user_id, email, password_hash, username, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user3Id, 'test3@quest.app', password, '박민수', now]
    );

    console.log('✅ Users created\n');

    // Create test squads
    const squad1Id = uuidv4();
    const squad2Id = uuidv4();

    console.log('📚 Creating squads...');
    await db.run(
      `INSERT OR IGNORE INTO squads (squad_id, name, description, owner_id, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [squad1Id, '공시 화이팅', '공무원 시험 준비 모임', user1Id, now]
    );

    await db.run(
      `INSERT OR IGNORE INTO squads (squad_id, name, description, owner_id, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [squad2Id, '취준생 모각코', '취업 준비생들의 스터디', user2Id, now]
    );

    console.log('✅ Squads created\n');

    // Add members to squads
    console.log('👥 Adding squad members...');

    // Squad 1 members
    for (let i = 0; i < 12; i++) {
      const userId = i === 0 ? user1Id : i === 1 ? user2Id : i === 2 ? user3Id : uuidv4();
      const role = i === 0 ? 'owner' : 'member';

      await db.run(
        `INSERT OR IGNORE INTO squad_members (squad_member_id, squad_id, user_id, role, joined_at)
         VALUES (?, ?, ?, ?, ?)`,
        [uuidv4(), squad1Id, userId, role, now]
      );
    }

    // Squad 2 members
    for (let i = 0; i < 8; i++) {
      const userId = i === 0 ? user2Id : i === 1 ? user1Id : i === 2 ? user3Id : uuidv4();
      const role = i === 0 ? 'owner' : 'member';

      await db.run(
        `INSERT OR IGNORE INTO squad_members (squad_member_id, squad_id, user_id, role, joined_at)
         VALUES (?, ?, ?, ?, ?)`,
        [uuidv4(), squad2Id, userId, role, now]
      );
    }

    console.log('✅ Squad members added\n');

    // Create some study sessions for today
    console.log('⏱️  Creating study sessions...');
    const startOfDay = new Date().setHours(0, 0, 0, 0);

    // User 1 sessions (test-user-1) - total: 2h 30m (9000 seconds)
    await db.run(
      `INSERT OR IGNORE INTO study_sessions (session_id, user_id, squad_id, start_time, end_time, duration, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [uuidv4(), user1Id, squad1Id, startOfDay + 3600000, startOfDay + 7200000, 3600, now] // 1 hour
    );

    await db.run(
      `INSERT OR IGNORE INTO study_sessions (session_id, user_id, squad_id, start_time, end_time, duration, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [uuidv4(), user1Id, squad1Id, startOfDay + 7200000, startOfDay + 12600000, 5400, now] // 1.5 hours
    );

    // User 2 sessions (test-user-2)
    await db.run(
      `INSERT OR IGNORE INTO study_sessions (session_id, user_id, squad_id, start_time, end_time, duration, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [uuidv4(), user2Id, squad1Id, startOfDay + 7200000, startOfDay + 10800000, 3600, now]
    );

    // User 2 in Squad 2
    await db.run(
      `INSERT OR IGNORE INTO study_sessions (session_id, user_id, squad_id, start_time, end_time, duration, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [uuidv4(), user2Id, squad2Id, startOfDay + 3600000, startOfDay + 5400000, 1800, now]
    );

    console.log('✅ Study sessions created\n');
    console.log('📊 Sample data:');
    console.log('  - User 1 (test-user-1): 2h 30m today');
    console.log('  - User 2 (test-user-2): 1h 30m today\n');

    console.log('🎉 Database seeding complete!\n');
    console.log('Test credentials:');
    console.log('  - test1@quest.app / test1234 (김철수)');
    console.log('  - test2@quest.app / test1234 (이영희)');
    console.log('  - test3@quest.app / test1234 (박민수)\n');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }

  process.exit(0);
}

seed();
