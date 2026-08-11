-- ============================================================
-- Kvantum Tech Chatbot — Complete Database Schema
-- Run once to initialize all chatbot tables
-- ============================================================

-- Chat Sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key VARCHAR(128) UNIQUE NOT NULL,
  ip_address  VARCHAR(64),
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  message_count INT DEFAULT 0
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role         VARCHAR(10) NOT NULL CHECK (role IN ('user','bot')),
  content      TEXT NOT NULL,
  intent       VARCHAR(64),
  confidence   NUMERIC(4,3),
  entities     JSONB DEFAULT '{}',
  helpful      BOOLEAN,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Context memory per session
CREATE TABLE IF NOT EXISTS chat_context (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE REFERENCES chat_sessions(id) ON DELETE CASCADE,
  entities   JSONB DEFAULT '{}',
  last_intent VARCHAR(64),
  turn_count  INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Leads generated via chatbot
CREATE TABLE IF NOT EXISTS chat_leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID REFERENCES chat_sessions(id),
  name        VARCHAR(128),
  email       VARCHAR(256),
  phone       VARCHAR(32),
  service     VARCHAR(256),
  budget      VARCHAR(128),
  requirement TEXT,
  status      VARCHAR(32) DEFAULT 'New Lead',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Website pages (crawled)
CREATE TABLE IF NOT EXISTS website_pages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url          TEXT UNIQUE NOT NULL,
  title        TEXT,
  content      TEXT,
  content_hash VARCHAR(64),
  last_indexed TIMESTAMPTZ DEFAULT NOW(),
  status       VARCHAR(16) DEFAULT 'active'
);

-- Knowledge chunks (from website + manual + local data)
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type VARCHAR(32) NOT NULL,   -- 'website','faq','service','blog','manual'
  source_id   TEXT,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  keywords    TEXT[],
  priority    INT DEFAULT 5,
  status      VARCHAR(16) DEFAULT 'active',
  -- Full text search vector
  search_vec  TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,''))
  ) STORED,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ pairs
CREATE TABLE IF NOT EXISTS chat_faqs (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question  TEXT NOT NULL,
  answer    TEXT NOT NULL,
  keywords  TEXT[],
  category  VARCHAR(64),
  priority  INT DEFAULT 5,
  status    VARCHAR(16) DEFAULT 'active',
  search_vec TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(question,'') || ' ' || coalesce(answer,''))
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unanswered questions log
CREATE TABLE IF NOT EXISTS chat_unanswered (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question     TEXT NOT NULL,
  normalized   TEXT,
  frequency    INT DEFAULT 1,
  last_asked   TIMESTAMPTZ DEFAULT NOW(),
  confidence   NUMERIC(4,3),
  resolved     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Synonym mappings
CREATE TABLE IF NOT EXISTS chat_synonyms (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term       TEXT NOT NULL,
  maps_to    TEXT NOT NULL,  -- canonical concept
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat feedback
CREATE TABLE IF NOT EXISTS chat_feedback (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES chat_messages(id),
  helpful    BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source ON knowledge_chunks(source_type);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_search ON knowledge_chunks USING GIN(search_vec);
CREATE INDEX IF NOT EXISTS idx_chat_faqs_search ON chat_faqs USING GIN(search_vec);
CREATE INDEX IF NOT EXISTS idx_chat_unanswered_norm ON chat_unanswered(normalized);
CREATE INDEX IF NOT EXISTS idx_sessions_key ON chat_sessions(session_key);
