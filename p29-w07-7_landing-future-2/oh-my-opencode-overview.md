# oh-my-opencode Repository Overview

## Purpose
**oh-my-opencode** is the #1 OpenCode plugin that transforms AI-assisted coding from simple code generation to disciplined, multi-agent orchestration. It enables AI agents to work like engineering teams with professional-grade tools.

**Core Mission**: Make agent-generated code indistinguishable from human-written code while achieving vastly more productivity.

## Key Statistics
- **8.2k** GitHub stars | **553** forks
- **$24,000** worth of production testing
- **Production-ready** with real-world success stories

## Architecture Highlights

### 1. **7 Specialized AI Agents**
- **Sisyphus** (Claude Opus 4.5) - Main orchestrator with extended thinking
- **Oracle** (GPT-5.2) - Architecture & code review
- **Librarian** (Claude Sonnet 4.5) - Documentation & research
- **Explore** (Grok Code) - Fast codebase exploration
- **Frontend UI/UX Engineer** (Gemini 3 Pro) - UI development
- **Document Writer** (Gemini 3 Flash) - Technical docs
- **Multimodal Looker** (Gemini 3 Flash) - PDF/image analysis

### 2. **Enterprise-Grade Tooling**
- **11 LSP Tools** - hover, goto definition, find references, diagnostics
- **AST-Grep** - Pattern-based code search/replacement (25 languages)
- **Background Agents** - Parallel async task execution
- **Session Management** - History, search, recovery
- **Tmux Integration** - Interactive terminal for server processes

### 3. **Claude Code Compatibility Layer**
- Full hooks system (PreToolUse, PostToolUse, UserPromptSubmit, Stop)
- Command/Skill/Agent/MCP loaders
- Todo management & transcripts in Claude-compatible formats
- Seamless migration from existing workflows

### 4. **Built-in MCP Servers**
- **Exa** - Web search
- **Context7** - Official documentation lookup
- **grep.app** - GitHub code search

## Tech Stack
- **TypeScript 5.7+** with strict mode
- **Bun** (exclusive package manager)
- **OpenCode SDK 1.1.1**
- **AST-Grep 0.40.0**
- **MCP SDK 1.25.1**
- **Zod 4.1.8** for schema validation

## Directory Structure
```
oh-my-opencode/
├── src/
│   ├── agents/           # 7 specialized agents
│   ├── hooks/            # 22+ lifecycle hooks
│   ├── tools/            # LSP, AST-Grep, session, background tasks
│   ├── mcp/              # Built-in MCP servers
│   ├── features/         # Claude Code compatibility
│   ├── auth/             # Google Antigravity OAuth
│   └── config/           # Zod schemas & types
├── .opencode/            # OpenCode configs
├── script/               # Build utilities
└── dist/                 # Build output
```

## Real-World Impact
- **Quant Research**: "1 hour vs 3 months of human work"
- **Developers**: "8000 eslint warnings fixed in a day"
- **Projects**: "45k line tauri app to SaaS overnight"

## Innovation Highlights
1. **Multi-Model Orchestration** - Different AI models for specific tasks
2. **Background Task Parallelism** - True team-like collaboration
3. **Zero-Configuration** - Works out-of-the-box
4. **Todo Continuation Enforcer** - Forces agents to finish all tasks
5. **Context Window Management** - Smart compaction & recovery

## Documentation Links
- Repository: https://github.com/code-yeongyu/oh-my-opencode/tree/dev
- NPM Package: https://www.npmjs.com/package/oh-my-opencode

---

*Generated on 2026-01-05*
