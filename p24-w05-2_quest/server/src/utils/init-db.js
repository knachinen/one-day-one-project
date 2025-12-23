const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../quest.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing database...\n');

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      username TEXT NOT NULL,
      profile_image_url TEXT,
      created_at INTEGER NOT NULL,
      last_login_at INTEGER,
      is_active INTEGER DEFAULT 1,
      total_study_time INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) console.error('❌ Users table error:', err);
    else console.log('✅ Users table created');
  });

  // Squads table
  db.run(`
    CREATE TABLE IF NOT EXISTS squads (
      squad_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      owner_id TEXT NOT NULL,
      is_private INTEGER DEFAULT 0,
      max_members INTEGER DEFAULT 50,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES users(user_id)
    )
  `, (err) => {
    if (err) console.error('❌ Squads table error:', err);
    else console.log('✅ Squads table created');
  });

  // Squad_Members table
  db.run(`
    CREATE TABLE IF NOT EXISTS squad_members (
      squad_member_id TEXT PRIMARY KEY,
      squad_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      joined_at INTEGER NOT NULL,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      UNIQUE(squad_id, user_id)
    )
  `, (err) => {
    if (err) console.error('❌ Squad_Members table error:', err);
    else console.log('✅ Squad_Members table created');
  });

  // Study_Sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      session_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      squad_id TEXT,
      session_type TEXT DEFAULT 'free',
      start_time INTEGER NOT NULL,
      end_time INTEGER,
      duration INTEGER,
      is_valid INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE SET NULL
    )
  `, (err) => {
    if (err) console.error('❌ Study_Sessions table error:', err);
    else console.log('✅ Study_Sessions table created');
  });

  // Messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      message_id TEXT PRIMARY KEY,
      squad_id TEXT NOT NULL,
      user_id TEXT,
      message_type TEXT NOT NULL,
      content TEXT,
      image_url TEXT,
      timestamp INTEGER NOT NULL,
      is_deleted INTEGER DEFAULT 0,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
    )
  `, (err) => {
    if (err) console.error('❌ Messages table error:', err);
    else console.log('✅ Messages table created');
  });

  // Photos table
  db.run(`
    CREATE TABLE IF NOT EXISTS photos (
      photo_id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL UNIQUE,
      user_id TEXT NOT NULL,
      squad_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      thumbnail_url TEXT,
      captured_at INTEGER NOT NULL,
      uploaded_at INTEGER NOT NULL,
      is_verified INTEGER DEFAULT 0,
      FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (squad_id) REFERENCES squads(squad_id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error('❌ Photos table error:', err);
    else console.log('✅ Photos table created');
  });

  // Reactions table
  db.run(`
    CREATE TABLE IF NOT EXISTS reactions (
      reaction_id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      emoji TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      UNIQUE(message_id, user_id, emoji)
    )
  `, (err) => {
    if (err) console.error('❌ Reactions table error:', err);
    else console.log('✅ Reactions table created');
  });

  console.log('\n🔧 Creating indexes...\n');

  // Indexes
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on users.email created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_squad_members_squad ON squad_members(squad_id)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on squad_members.squad_id created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_squad_members_user ON squad_members(user_id)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on squad_members.user_id created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_user ON study_sessions(user_id)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on study_sessions.user_id created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON study_sessions(start_time DESC)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on study_sessions.start_time created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_messages_squad ON messages(squad_id, timestamp DESC)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on messages.squad_id created');
  });

  db.run('CREATE INDEX IF NOT EXISTS idx_reactions_message ON reactions(message_id)', (err) => {
    if (err) console.error('❌ Index error:', err);
    else console.log('✅ Index on reactions.message_id created');

    console.log('\n🎉 Database initialization complete!');
    console.log('📁 Database file: quest.db\n');
  });
});

db.close();
