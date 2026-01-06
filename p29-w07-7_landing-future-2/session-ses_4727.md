# Creating AGENTS.md and project-start rules

**Session ID:** ses_472732457ffe5IDyPp5k48ZXgo
**Created:** 1/5/2026, 6:46:17 PM
**Updated:** 1/5/2026, 6:52:03 PM

---

## User

@oracle make `AGENTS.md` and useful rules for starting a project.

---

## Assistant

_Thinking:_

The user wants me to create `AGENTS.md` and useful rules for starting a project. They're asking me to consult the Oracle for this task.

Looking at the instructions:
- I should consult Oracle for complex architecture design, multi-system tradeoffs, or when I need expert guidance
- This task seems to be about creating documentation/guidelines for project setup and agent usage
- The user explicitly asked to consult the oracle

The task is:
1. Create `AGENTS.md` - likely a file explaining how to use agents
2. Create useful rules for starting a project

I should announce that I'm consulting Oracle and then invoke the task tool with the oracle subagent. The prompt should be detailed and include the context from the working directory.

Let me check what files exist first to understand the context better.

Consulting Oracle for creating comprehensive AGENTS.md and project startup rules documentation.

```
Tool: task

**Input:**
```json
{
  "description": "Create AGENTS.md and project rules",
  "prompt": "Create comprehensive documentation for a project that needs to be generated from scratch.\n\n## Context\n\nWorking in: `/Users/salgu/Workspace/1_project/ritual_code/p29-w07-7_landing-future-2`\n\nI can see these files exist:\n- `doc/design.md` - design document\n- `doc/implement.md`, `doc/implement-1.md`, `doc/implement-2.md` - implementation docs\n- `doc/plan.md` - project plan\n- `doc/prd.md` - product requirements document\n- `doc/session-ses_4770.md`, `doc/session-ses_4779.md` - session documentation\n- `temp/AGENTS_sample.md`, `temp/AGENTS.md` - sample agent files\n- `.gitignore`\n\n## Task\n\nYou need to create TWO outputs:\n\n### 1. AGENTS.md file\nCreate a comprehensive guide for using specialized agents in this project. The file should:\n\n1. **Explain the agent ecosystem** available in the Sisyphus orchestration system:\n   - `explore` - Contextual grep for codebases (when to use, what it's good at)\n   - `librarian` - External code/documentation research (OSS, docs, web search)\n   - `oracle` - Senior engineering advisor for architecture, complex decisions\n   - `frontend-ui-ux-engineer` - Visual/styling work in frontend files\n   - `document-writer` - Technical documentation\n   - `build` - Build/deployment tasks (manual invocation only)\n   - `plan` - Planning tasks (manual invocation only)\n   - `general` - General-purpose parallel execution\n\n2. **Provide clear decision frameworks** for when to use which agent\n3. **Include practical examples** of prompts for each agent\n4. **Explain best practices** for:\n   - Parallel execution of multiple agents\n   - When to fire agents immediately vs sequentially\n   - How to collect results from background tasks\n   - Proper delegation prompt structure\n\n5. **Cover the 7-section delegation structure**:\n   - TASK\n   - EXPECTED OUTCOME\n   - REQUIRED SKILLS\n   - REQUIRED TOOLS\n   - MUST DO\n   - MUST NOT DO\n   - CONTEXT\n\n### 2. Useful rules for starting a project\nCreate practical rules/guidelines that should be followed when starting a new project from scratch. These should cover:\n\n1. **Initial assessment** phase:\n   - What to check first (configs, patterns, maturity)\n   - How to classify project state (disciplined/transitional/chaotic/greenfield)\n   - When to follow vs propose conventions\n\n2. **Project setup rules**:\n   - Essential files to create (AGENTS.md, design.md, implement.md, plan.md, prd.md)\n   - What each file should contain\n   - How they relate to each other\n\n3. **Development workflow**:\n   - When to create todo lists\n   - How to handle multi-step tasks\n   - Verification requirements (diagnostics, build, tests)\n   - Evidence requirements for task completion\n\n4. **Code quality standards**:\n   - Anti-patterns to avoid (type suppression, empty catches, etc.)\n   - When to refactor vs minimal fix\n   - Testing expectations\n\n5. **Agent coordination rules**:\n   - When to use explore vs librarian\n   - How to decide between direct tools vs agents\n   - Parallel execution patterns\n   - Background task lifecycle management\n\n## Format\n\nBoth outputs should be:\n- Clear and actionable (not theoretical)\n- Include concrete examples\n- Use markdown formatting for readability\n- Reference the actual agents and tools available in the Sisyphus system\n\nThe rules should be practical guidelines that can be followed by developers working in this ecosystem.\n\n## Expected Outcome\n\nReturn two distinct sections:\n1. **AGENTS.md content** - The complete content for the AGENTS.md file\n2. **Project startup rules** - A comprehensive set of rules for starting projects\n\nMake sure the content is production-ready and can be immediately used by developers working in this environment.",
  "subagent_type": "oracle",
  "tools": {
    "background_task": false
  }
}
```
**Output:**
```
Now I have comprehensive context from the existing documentation. Let me create both outputs.

---

# Output 1: AGENTS.md - Comprehensive Agent Ecosystem Guide

```markdown
# AGENTS.md — Sisyphus Orchestration System Guide

> **Agent Constitution for AI-Assisted Development**
> 
> This document defines how specialized agents collaborate within the Sisyphus orchestration system to maximize development efficiency.

---

## 1. Agent Ecosystem Overview

Sisyphus provides a multi-agent orchestration layer where specialized agents handle distinct responsibilities. Understanding when and how to invoke each agent is critical for efficient development.

### Available Agents

| Agent | Type | Specialty | When to Use |
|-------|------|-----------|-------------|
| `explore` | Subagent | Codebase pattern discovery | Finding implementations, understanding architecture |
| `librarian` | Subagent | External research | OSS code, documentation, GitHub examples |
| `oracle` | Subagent | Senior engineering advisor | Architecture decisions, complex debugging, code review |
| `frontend-ui-ux-engineer` | Subagent | Visual/styling work | CSS, animations, responsive design, accessibility |
| `document-writer` | Subagent | Technical documentation | Specs, guides, API docs, README updates |
| `build` | Manual only | Build/deployment tasks | CI/CD, bundling, release management |
| `plan` | Manual only | Planning tasks | Sprint planning, task breakdown, roadmaps |
| `general` | Subagent | Parallel execution | General-purpose tasks, batch operations |

---

## 2. Agent Capabilities Deep Dive

### 2.1 Explore Agent
**Purpose:** Contextual grep across codebases—finds patterns, implementations, and usages.

**Best For:**
- Understanding how existing code implements a feature
- Finding all usages of a function/component/type
- Discovering project-specific conventions
- Mapping dependency relationships

**Example Prompts:**
```
"Find all usages of the FrozenRouter pattern in this codebase"
"How does this project handle authentication?"
"What animation patterns are used in the components folder?"
"Find all files that import from @/types"
```

**Limitations:**
- Reads code, doesn't modify it
- Limited to workspace files (no external sources)
- May miss dynamically constructed patterns

---

### 2.2 Librarian Agent
**Purpose:** External code and documentation research—OSS, official docs, web search.

**Best For:**
- Finding official documentation for libraries
- Discovering best practices from OSS projects
- Researching API usage patterns
- Getting up-to-date examples from GitHub

**Example Prompts:**
```
"Find how to implement page transitions with Framer Motion in Next.js App Router"
"What's the recommended way to handle async params in Next.js 15+?"
"Show examples of GSAP ScrollTrigger with React"
"Find Tailwind CSS 4 @theme inline documentation"
```

**When to Prefer Over Direct Search:**
- Complex multi-source queries
- When you need synthesized context, not raw links
- Official documentation deep dives

---

### 2.3 Oracle Agent
**Purpose:** Senior engineering advisor for architecture, complex decisions, and code review.

**Best For:**
- Architectural decisions affecting multiple systems
- Complex debugging after 2+ failed attempts
- Security and performance reviews
- Technology selection tradeoffs
- Complex refactoring roadmaps

**Example Prompts:**
```
"Review this implementation plan for architectural concerns and suggest improvements"
"I've tried X and Y to fix this bug but both failed. What should I try next?"
"Is this the right approach for handling real-time updates in this codebase?"
"Evaluate tradeoffs between approach A and B for this feature"
```

**Cost Consideration:** Oracle is computationally expensive. Don't use for:
- Simple file operations
- Following existing patterns
- Trivial TypeScript fixes

---

### 2.4 Frontend UI/UX Engineer
**Purpose:** Visual and styling work in frontend files.

**Best For:**
- CSS/Tailwind refinements
- Animation implementations
- Responsive design adjustments
- Accessibility improvements
- Color, spacing, layout changes

**Example Prompts:**
```
"Make the hero section more visually engaging with subtle animations"
"Fix the mobile layout for the gallery grid"
"Improve hover states on interactive cards"
"Ensure proper color contrast for accessibility"
```

---

### 2.5 Document Writer
**Purpose:** Technical documentation generation and maintenance.

**Best For:**
- API documentation
- README updates
- Architecture decision records
- User guides
- Changelog entries

**Example Prompts:**
```
"Document the new API endpoints we added"
"Update the README with the new setup instructions"
"Write migration guide for the breaking changes"
"Create architecture documentation for this module"
```

---

## 3. Agent Decision Framework

### When to Use Agents vs Direct Tools

```
┌─────────────────────────────────────────────────────────┐
│                    DECISION TREE                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Need to understand code patterns?                      │
│  └── YES → Is it in THIS codebase?                     │
│       ├── YES → Use EXPLORE agent                       │
│       └── NO  → Use LIBRARIAN agent                     │
│                                                         │
│  Need architectural guidance?                           │
│  └── YES → Is it complex (multi-system, tradeoffs)?    │
│       ├── YES → Use ORACLE agent                        │
│       └── NO  → Use direct tools (Grep, LSP)           │
│                                                         │
│  Need visual/styling work?                              │
│  └── YES → Use FRONTEND-UI-UX-ENGINEER                  │
│                                                         │
│  Quick targeted search?                                 │
│  └── YES → Use direct tools (Grep, AST-grep, LSP)      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Parallel vs Sequential Execution

**Fire in Parallel When:**
- Tasks are independent (e.g., exploring codebase + researching library docs)
- Multiple aspects of the same question need investigation
- Time-sensitive context gathering

**Execute Sequentially When:**
- Second task depends on first task's output
- Need to synthesize before next step
- Debugging with iterative hypothesis testing

---

## 4. Delegation Prompt Structure (7 Sections)

When delegating to agents, use this structured format for optimal results:

```markdown
## TASK
[Clear, single-sentence description of what needs to be done]

## EXPECTED OUTCOME
[Specific deliverable—what does "done" look like?]

## REQUIRED SKILLS
[What expertise is needed: TypeScript, React, CSS, etc.]

## REQUIRED TOOLS
[Which tools the agent should use: Grep, LSP, Read, etc.]

## MUST DO
- [Non-negotiable requirements]
- [Quality standards]
- [Specific patterns to follow]

## MUST NOT DO
- [Anti-patterns to avoid]
- [Scope boundaries]
- [Things that would break existing behavior]

## CONTEXT
[Relevant background: file paths, existing patterns, constraints]
```

### Example: Delegating to Explore Agent

```markdown
## TASK
Find all implementations of page transitions in this codebase.

## EXPECTED OUTCOME
A summary of files using page transitions, the patterns employed, and any libraries involved.

## REQUIRED SKILLS
- Next.js App Router understanding
- Framer Motion familiarity

## REQUIRED TOOLS
- Grep for text patterns
- AST-grep for motion component usage
- Read for file contents

## MUST DO
- Check both `template.tsx` and individual page files
- Identify if AnimatePresence is used
- Note any FrozenRouter patterns

## MUST NOT DO
- Modify any files
- Make assumptions about unread code

## CONTEXT
- Project uses Next.js 16 with App Router
- Framer Motion 12 is installed
- Check `src/app/` and `src/components/`
```

---

## 5. Background Task Management

### Firing Background Agents

```typescript
// Fire agent in background (async)
call_omo_agent({
  subagent_type: "explore",
  description: "Find auth patterns",
  prompt: "...",
  run_in_background: true  // ← Returns immediately with task_id
});

// Fire agent synchronously (blocking)
call_omo_agent({
  subagent_type: "oracle",
  description: "Review architecture",
  prompt: "...",
  run_in_background: false  // ← Waits for completion
});
```

### Collecting Results

```typescript
// Check status (non-blocking)
background_output({ task_id: "bg_12345", block: false });

// Wait for completion (blocking)
background_output({ task_id: "bg_12345", block: true });
```

### Lifecycle Management

1. **Launch**: Agent starts, returns `task_id`
2. **Running**: System notifies "BACKGROUND TASK COMPLETED" when done
3. **Collect**: Use `background_output` to retrieve results
4. **Cancel** (if needed): Use `background_cancel` with `task_id` or `all: true`

**Best Practice:** Always cancel background tasks before providing final answer:
```typescript
background_cancel({ all: true });
```

---

## 6. Mode-Specific Agent Strategies

### [search-mode]
**Goal:** Maximize search coverage

```
1. Fire 2+ explore agents in parallel (different search angles)
2. Fire 1-2 librarian agents if external libs involved
3. Use direct Grep/AST-grep for targeted patterns
4. Synthesize findings from all sources
```

### [analyze-mode]
**Goal:** Deep understanding before action

```
1. Gather context in parallel:
   - 1-2 explore agents (codebase patterns)
   - 1-2 librarian agents (if external library)
   - Direct tools for targeted searches

2. IF complex (architecture, multi-system, 2+ debug failures):
   - Consult oracle for strategic guidance

3. Synthesize findings before proceeding
```

### [implement-mode]
**Goal:** Efficient execution with verification

```
1. Understand existing patterns (explore or direct tools)
2. Implement changes
3. Verify with lsp_diagnostics
4. Run build/tests if applicable
5. Document if needed (document-writer)
```

---

## 7. Best Practices

### Do's
- ✅ Fire independent agents in parallel
- ✅ Use structured delegation prompts
- ✅ Collect background results before final answer
- ✅ Match agent to task (don't over-engineer)
- ✅ Provide rich context in prompts

### Don'ts
- ❌ Use oracle for simple tasks (expensive)
- ❌ Fire sequential agents when parallel is possible
- ❌ Forget to cancel background tasks
- ❌ Ask agents to do things outside their specialty
- ❌ Provide vague prompts without context

### Agent Selection Quick Reference

| Task Type | Primary Agent | Backup |
|-----------|--------------|--------|
| "How does X work in this codebase?" | explore | Direct Grep |
| "What's the best practice for Y?" | librarian | Context7 |
| "Should I use approach A or B?" | oracle | — |
| "Make this component look better" | frontend-ui-ux-engineer | — |
| "Document this API" | document-writer | — |
| "Find all usages of Z" | explore | LSP find_references |

---

## 8. Project-Specific Agent Configuration

Projects may have specific agent rules. Check for:

1. **Project AGENTS.md** — Local overrides and conventions
2. **Project README** — Setup requirements
3. **doc/ folder** — Implementation guides and constraints

### This Project's Conventions

**Tech Stack:**
- Next.js 16 (App Router) + React 19
- TypeScript 5 (strict)
- Tailwind CSS 4 (@theme inline)
- Framer Motion + GSAP

**Agent Considerations:**
- Oracle for App Router edge cases (internal APIs, async params)
- Explore for understanding existing component patterns
- Librarian for React 19/Next.js 16 documentation (cutting edge)

---

*Last Updated: 2026-01-05*
```

---

# Output 2: Project Startup Rules

```markdown
# Project Startup Rules — Development Guidelines

> Practical rules for starting and maintaining projects within the Sisyphus orchestration system.

---

## 1. Initial Assessment Phase

### 1.1 First Actions on Any Project

Before writing code, establish context:

```
1. READ configuration files:
   - package.json (dependencies, scripts)
   - tsconfig.json (paths, strictness)
   - next.config.* or equivalent
   - Any existing AGENTS.md or CLAUDE.md

2. SCAN project structure:
   - src/ organization
   - Component patterns
   - Existing tests

3. CHECK documentation:
   - /doc folder
   - README.md
   - Any design/spec files
```

### 1.2 Project State Classification

Classify before acting:

| State | Signals | Strategy |
|-------|---------|----------|
| **Disciplined** | Consistent patterns, tests, docs, linting | Follow existing conventions strictly |
| **Transitional** | Mixed patterns, partial coverage | Align new code with best patterns |
| **Chaotic** | Inconsistent, no tests, no docs | Propose minimal conventions before adding code |
| **Greenfield** | Empty or just scaffolded | Establish conventions explicitly |

### 1.3 Convention Discovery

```markdown
ASK yourself:
- What naming conventions are used? (PascalCase, camelCase, kebab-case)
- How are files organized? (by feature, by type, hybrid)
- What patterns are followed? (server/client boundaries, data flow)
- What libraries handle common tasks? (animation, forms, state)

If unclear after code review → Ask user before proceeding
```

---

## 2. Essential Project Files

### 2.1 Documentation Structure

Every project should have:

```
project/
├── AGENTS.md         # Agent behavior rules (this project)
├── README.md         # Project overview, setup
└── doc/
    ├── prd.md        # Product requirements
    ├── design.md     # Design specifications
    ├── plan.md       # Implementation roadmap
    └── implement.md  # Step-by-step implementation guides
```

### 2.2 File Purposes

| File | Purpose | When to Update |
|------|---------|----------------|
| `AGENTS.md` | AI agent behavior constraints | When adding patterns, rules, or conventions |
| `prd.md` | What to build and why | When requirements change |
| `design.md` | How it should look/feel | When design decisions are made |
| `plan.md` | Implementation phases | When scope or priority changes |
| `implement.md` | Technical implementation details | When implementing each phase |

### 2.3 Relationship Between Documents

```
prd.md (WHAT)
    ↓
design.md (HOW it looks)
    ↓
plan.md (WHEN to build what)
    ↓
implement.md (HOW to build it)
    ↓
AGENTS.md (RULES for building)
```

---

## 3. Development Workflow Rules

### 3.1 Todo List Management

**Create todos when:**
- Task has 3+ distinct steps
- Task spans multiple files
- Task requires verification at multiple points

**Todo structure:**
```typescript
{
  id: "unique-id",
  content: "Clear, actionable description",
  status: "pending" | "in_progress" | "completed",
  priority: "high" | "medium" | "low"
}
```

**Lifecycle:**
1. Create todos before starting multi-step task
2. Mark `in_progress` when starting item
3. Mark `completed` immediately after finishing
4. Never leave todos in `in_progress` state overnight

### 3.2 Multi-Step Task Handling

```markdown
FOR each task with multiple steps:

1. CREATE todo list with all steps
2. FOR each step:
   a. Mark step as in_progress
   b. Execute step
   c. Verify step (diagnostics, build)
   d. Mark step as completed
3. VERIFY overall task completion
4. CLEAN UP (cancel background tasks)
```

### 3.3 Verification Requirements

**Before marking any task complete:**

- [ ] `lsp_diagnostics` shows 0 errors on changed files
- [ ] TypeScript compiles (`tsc --noEmit` or build)
- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (if tests exist)
- [ ] No `any`, `@ts-ignore`, `@ts-expect-error` in new code

**Evidence Requirements:**
- Show diagnostic output for modified files
- Run and show build output if applicable
- Include test results if tests were added/modified

---

## 4. Code Quality Standards

### 4.1 Anti-Patterns to Avoid

```typescript
// ❌ Type suppression
const value = data as any;
// @ts-ignore
// @ts-expect-error

// ❌ Empty catch blocks
try { ... } catch (e) {}

// ❌ Console.log in production code
console.log("debugging");

// ❌ Hardcoded values that should be in theme
className="bg-[#050505]"  // Use theme colors

// ❌ Unused imports/variables
import { something } from "lib";  // Never used

// ❌ Non-null assertions without justification
data!.value
```

### 4.2 When to Refactor vs Minimal Fix

**Refactor When:**
- Existing code is clearly broken/wrong
- Change requires touching 3+ similar locations
- Technical debt is blocking current task
- User explicitly requests cleanup

**Minimal Fix When:**
- Working code just needs small addition
- Refactor scope would expand task significantly
- Existing patterns are acceptable if not ideal
- Time-critical fix

### 4.3 Testing Expectations

| Project Type | Testing Requirement |
|--------------|---------------------|
| Library/SDK | Required (unit + integration) |
| Production app | Recommended (critical paths) |
| Prototype/Demo | Optional (document if skipped) |
| Portfolio/Static | Minimal (smoke test only) |

**When adding tests:**
- Cover edge cases that caused bugs
- Test public interfaces, not implementation
- Prefer integration over unit for UI components

---

## 5. Agent Coordination Rules

### 5.1 Direct Tools vs Agents

```
USE DIRECT TOOLS when:
- Quick, targeted search
- Single file operation
- Known location
- Simple grep/find

USE AGENTS when:
- Need synthesis/analysis
- Multiple files or systems
- Unknown location
- External research needed
```

### 5.2 Parallel Execution Patterns

**Pattern 1: Context Gathering**
```
Fire simultaneously:
- explore agent (codebase patterns)
- librarian agent (library docs)
- Direct Grep (specific terms)

Wait for all → Synthesize → Proceed
```

**Pattern 2: Multi-Angle Search**
```
Fire simultaneously:
- explore "find auth implementation"
- explore "find user session handling"  
- explore "find token management"

Combine results → Complete picture
```

**Pattern 3: Research + Verify**
```
Fire simultaneously:
- librarian (best practices)
- explore (current implementation)

Compare → Identify gaps → Plan improvements
```

### 5.3 Background Task Lifecycle

```markdown
LAUNCH:
  call_omo_agent({ ..., run_in_background: true })
  → Returns task_id immediately

MONITOR:
  System notifies when complete
  → Or check with background_output

COLLECT:
  background_output({ task_id, block: false })
  → Get results

CLEANUP:
  background_cancel({ all: true })
  → Always before final answer
```

---

## 6. Communication Standards

### 6.1 When to Ask for Clarification

**Ask When:**
- Multiple valid interpretations with 2x+ effort difference
- User request seems suboptimal or flawed
- Missing critical information (file paths, error context)
- Scope is ambiguous and could expand significantly

**Proceed When:**
- Single reasonable interpretation
- Multiple interpretations with similar effort
- Context makes intent clear
- Following established patterns

### 6.2 Status Updates

For long-running tasks, provide updates:
```
- Starting: "I'll tackle this in N steps: 1. X, 2. Y, 3. Z"
- Progress: "Completed step 1, moving to step 2..."
- Blocked: "I'm stuck on X because Y. Options are..."
- Complete: "Done. Summary: [what was accomplished]"
```

### 6.3 Error Reporting

When something fails:
```markdown
1. WHAT failed (specific error message)
2. WHY it failed (root cause if known)
3. WHAT was tried (approaches already attempted)
4. OPTIONS for resolution
```

---

## 7. Emergency Procedures

### 7.1 When Stuck After 3 Attempts

```bash
1. STOP all edits
2. REVERT to working state:
   git stash                    # Stash changes
   git checkout -- .            # Discard changes
   git reset --hard HEAD~1      # Undo commit (if needed)
3. DOCUMENT what was attempted
4. CONSULT oracle with full context
5. ASK user if still unresolved
```

### 7.2 Never Do (Hard Rules)

- ❌ Delete tests to make them pass
- ❌ Suppress type errors to "fix" builds
- ❌ Make random changes hoping something works
- ❌ Leave code in broken state
- ❌ Commit secrets or credentials
- ❌ Force push to main/master

### 7.3 Recovery Commands

```bash
# Undo uncommitted changes
git checkout -- .

# Stash work in progress
git stash
git stash pop  # Restore later

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️
git reset --hard HEAD~1

# See what changed
git diff HEAD~1
```

---

## 8. Quality Checklist (Pre-Commit)

### For Every Change:

- [ ] LSP diagnostics: 0 errors
- [ ] No new `any` types
- [ ] No `@ts-ignore` or `@ts-expect-error`
- [ ] No hardcoded values that belong in theme/config
- [ ] Proper file naming conventions followed
- [ ] Imports organized correctly
- [ ] No unused imports/variables
- [ ] Accessibility attributes where needed (alt, aria-label)

### For New Files:

- [ ] Correct directory location
- [ ] Follows existing naming patterns
- [ ] Has proper exports
- [ ] Type definitions complete
- [ ] Documentation if public API

### For Deleted Files:

- [ ] All imports updated
- [ ] No broken references
- [ ] Related tests removed/updated

---

## 9. Versioning and Dependencies

### Dependency Rules

```markdown
NEVER:
- Update major versions without explicit request
- Add new dependencies without justification
- Use deprecated packages

ALWAYS:
- Check health before adding (recent commits, adoption)
- Document why dependency was added
- Prefer existing deps over new ones
```

### Before Updating Dependencies:

```bash
# Check for breaking changes
npm outdated

# Test after update
npm update [package]
npm run build
npm test
```

---

## 10. Quick Reference

### Common Commands

```bash
# Development
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run linter

# Git
git status       # See changes
git diff         # See unstaged changes
git log --oneline -10  # Recent commits

# Diagnostics
lsp_diagnostics  # Check for errors
```

### File Locations

```
src/
├── app/           # Routes (page.tsx, layout.tsx)
├── components/    # React components
│   ├── layout/    # Navbar, Footer
│   └── ui/        # Reusable atoms
├── types/         # TypeScript interfaces
├── data/          # Mock data, constants
├── lib/           # Utilities
└── styles/        # Theme, globals
```

### Path Aliases

```typescript
import { X } from "@/components/X"  // → src/components/X
import { Y } from "@/types/Y"       // → src/types/Y
import { Z } from "@/lib/Z"         // → src/lib/Z
```

---

*These rules apply to all projects in this environment. Project-specific rules in AGENTS.md take precedence where they conflict.*

*Last Updated: 2026-01-05*
```

---

## Summary

I've created two comprehensive documents:

### 1. AGENTS.md (~650 lines)
- Complete agent ecosystem overview with 8 available agents
- Deep dive into each agent's capabilities and use cases
- Decision framework for when to use which agent
- 7-section delegation prompt structure with examples
- Background task lifecycle management
- Mode-specific strategies (search, analyze, implement)
- Best practices and quick reference tables

### 2. Project Startup Rules (~500 lines)
- Initial assessment phase with state classification
- Essential project file structure and purposes
- Development workflow with todo management
- Code quality standards and anti-patterns
- Agent coordination rules and patterns
- Communication and error reporting standards
- Emergency procedures and recovery commands
- Quality checklists and quick reference

**Both documents are:**
- Actionable with concrete examples
- Markdown formatted for readability
- Based on actual patterns from the project's existing documentation
- Production-ready for immediate use

<task_metadata>
session_id: ses_472723dc6ffeik6u3hPh9cgDVW
</task_metadata>
```
```

---

## Assistant

_Thinking:_

The Oracle agent has returned comprehensive documentation for both AGENTS.md and project startup rules. The output is very detailed and well-structured. Let me review what was delivered:

1. **AGENTS.md** - A comprehensive guide covering:
   - Agent ecosystem overview with 8 available agents
   - Deep dive into each agent (explore, librarian, oracle, frontend-ui-ux-engineer, document-writer, build, plan, general)
   - Decision frameworks with flow charts
   - 7-section delegation structure with examples
   - Background task management
   - Mode-specific strategies
   - Best practices and quick references

2. **Project Startup Rules** - Comprehensive guidelines covering:
   - Initial assessment phase with project state classification
   - Essential project files and their relationships
   - Development workflow with todo management
   - Code quality standards and anti-patterns
   - Agent coordination rules
   - Communication standards
   - Emergency procedures
   - Quality checklists
   - Versioning and dependencies
   - Quick reference sections

The documents are production-ready and immediately usable. Now I should create the actual AGENTS.md file in the working directory as the user requested.

Let me write the AGENTS.md file.

I'll now create the AGENTS.md file with the comprehensive content from the Oracle.

```
Tool: write

**Input:**
```json
{
  "content": "# AGENTS.md — Sisyphus Orchestration System Guide\n\n> **Agent Constitution for AI-Assisted Development**\n>\n> This document defines how specialized agents collaborate within the Sisyphus orchestration system to maximize development efficiency.\n\n---\n\n## 1. Agent Ecosystem Overview\n\nSisyphus provides a multi-agent orchestration layer where specialized agents handle distinct responsibilities. Understanding when and how to invoke each agent is critical for efficient development.\n\n### Available Agents\n\n| Agent | Type | Specialty | When to Use |\n|-------|------|-----------|-------------|\n| `explore` | Subagent | Codebase pattern discovery | Finding implementations, understanding architecture |\n| `librarian` | Subagent | External research | OSS code, documentation, GitHub examples |\n| `oracle` | Subagent | Senior engineering advisor | Architecture decisions, complex debugging, code review |\n| `frontend-ui-ux-engineer` | Subagent | Visual/styling work | CSS, animations, responsive design, accessibility |\n| `document-writer` | Subagent | Technical documentation | Specs, guides, API docs, README updates |\n| `build` | Manual only | Build/deployment tasks | CI/CD, bundling, release management |\n| `plan` | Manual only | Planning tasks | Sprint planning, task breakdown, roadmaps |\n| `general` | Subagent | Parallel execution | General-purpose tasks, batch operations |\n\n---\n\n## 2. Agent Capabilities Deep Dive\n\n### 2.1 Explore Agent\n**Purpose:** Contextual grep across codebases—finds patterns, implementations, and usages.\n\n**Best For:**\n- Understanding how existing code implements a feature\n- Finding all usages of a function/component/type\n- Discovering project-specific conventions\n- Mapping dependency relationships\n\n**Example Prompts:**\n```\n\"Find all usages of the FrozenRouter pattern in this codebase\"\n\"How does this project handle authentication?\"\n\"What animation patterns are used in the components folder?\"\n\"Find all files that import from @/types\"\n```\n\n**Limitations:**\n- Reads code, doesn't modify it\n- Limited to workspace files (no external sources)\n- May miss dynamically constructed patterns\n\n---\n\n### 2.2 Librarian Agent\n**Purpose:** External code and documentation research—OSS, official docs, web search.\n\n**Best For:**\n- Finding official documentation for libraries\n- Discovering best practices from OSS projects\n- Researching API usage patterns\n- Getting up-to-date examples from GitHub\n\n**Example Prompts:**\n```\n\"Find how to implement page transitions with Framer Motion in Next.js App Router\"\n\"What's the recommended way to handle async params in Next.js 15+?\"\n\"Show examples of GSAP ScrollTrigger with React\"\n\"Find Tailwind CSS 4 @theme inline documentation\"\n```\n\n**When to Prefer Over Direct Search:**\n- Complex multi-source queries\n- When you need synthesized context, not raw links\n- Official documentation deep dives\n\n---\n\n### 2.3 Oracle Agent\n**Purpose:** Senior engineering advisor for architecture, complex decisions, and code review.\n\n**Best For:**\n- Architectural decisions affecting multiple systems\n- Complex debugging after 2+ failed attempts\n- Security and performance reviews\n- Technology selection tradeoffs\n- Complex refactoring roadmaps\n\n**Example Prompts:**\n```\n\"Review this implementation plan for architectural concerns and suggest improvements\"\n\"I've tried X and Y to fix this bug but both failed. What should I try next?\"\n\"Is this the right approach for handling real-time updates in this codebase?\"\n\"Evaluate tradeoffs between approach A and B for this feature\"\n```\n\n**Cost Consideration:** Oracle is computationally expensive. Don't use for:\n- Simple file operations\n- Following existing patterns\n- Trivial TypeScript fixes\n\n---\n\n### 2.4 Frontend UI/UX Engineer\n**Purpose:** Visual and styling work in frontend files.\n\n**Best For:**\n- CSS/Tailwind refinements\n- Animation implementations\n- Responsive design adjustments\n- Accessibility improvements\n- Color, spacing, layout changes\n\n**Example Prompts:**\n```\n\"Make the hero section more visually engaging with subtle animations\"\n\"Fix the mobile layout for the gallery grid\"\n\"Improve hover states on interactive cards\"\n\"Ensure proper color contrast for accessibility\"\n```\n\n---\n\n### 2.5 Document Writer\n**Purpose:** Technical documentation generation and maintenance.\n\n**Best For:**\n- API documentation\n- README updates\n- Architecture decision records\n- User guides\n- Changelog entries\n\n**Example Prompts:**\n```\n\"Document the new API endpoints we added\"\n\"Update the README with the new setup instructions\"\n\"Write migration guide for the breaking changes\"\n\"Create architecture documentation for this module\"\n```\n\n---\n\n## 3. Agent Decision Framework\n\n### When to Use Agents vs Direct Tools\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                    DECISION TREE                        │\n├─────────────────────────────────────────────────────────┤\n│                                                         │\n│  Need to understand code patterns?                      │\n│  └── YES → Is it in THIS codebase?                     │\n│       ├── YES → Use EXPLORE agent                       │\n│       └── NO  → Use LIBRARIAN agent                     │\n│                                                         │\n│  Need architectural guidance?                           │\n│  └── YES → Is it complex (multi-system, tradeoffs)?    │\n│       ├── YES → Use ORACLE agent                        │\n│       └── NO  → Use direct tools (Grep, LSP)           │\n│                                                         │\n│  Need visual/styling work?                              │\n│  └── YES → Use FRONTEND-UI-UX-ENGINEER                  │\n│                                                         │\n│  Quick targeted search?                                 │\n│  └── YES → Use direct tools (Grep, AST-grep, LSP)      │\n│                                                         │\n└─────────────────────────────────────────────────────────┘\n```\n\n### Parallel vs Sequential Execution\n\n**Fire in Parallel When:**\n- Tasks are independent (e.g., exploring codebase + researching library docs)\n- Multiple aspects of the same question need investigation\n- Time-sensitive context gathering\n\n**Execute Sequentially When:**\n- Second task depends on first task's output\n- Need to synthesize before next step\n- Debugging with iterative hypothesis testing\n\n---\n\n## 4. Delegation Prompt Structure (7 Sections)\n\nWhen delegating to agents, use this structured format for optimal results:\n\n```markdown\n## TASK\n[Clear, single-sentence description of what needs to be done]\n\n## EXPECTED OUTCOME\n[Specific deliverable—what does \"done\" look like?]\n\n## REQUIRED SKILLS\n[What expertise is needed: TypeScript, React, CSS, etc.]\n\n## REQUIRED TOOLS\n[Which tools the agent should use: Grep, LSP, Read, etc.]\n\n## MUST DO\n- [Non-negotiable requirements]\n- [Quality standards]\n- [Specific patterns to follow]\n\n## MUST NOT DO\n- [Anti-patterns to avoid]\n- [Scope boundaries]\n- [Things that would break existing behavior]\n\n## CONTEXT\n[Relevant background: file paths, existing patterns, constraints]\n```\n\n### Example: Delegating to Explore Agent\n\n```markdown\n## TASK\nFind all implementations of page transitions in this codebase.\n\n## EXPECTED OUTCOME\nA summary of files using page transitions, the patterns employed, and any libraries involved.\n\n## REQUIRED SKILLS\n- Next.js App Router understanding\n- Framer Motion familiarity\n\n## REQUIRED TOOLS\n- Grep for text patterns\n- AST-grep for motion component usage\n- Read for file contents\n\n## MUST DO\n- Check both `template.tsx` and individual page files\n- Identify if AnimatePresence is used\n- Note any FrozenRouter patterns\n\n## MUST NOT DO\n- Modify any files\n- Make assumptions about unread code\n\n## CONTEXT\n- Project uses Next.js 16 with App Router\n- Framer Motion 12 is installed\n- Check `src/app/` and `src/components/`\n```\n\n---\n\n## 5. Background Task Management\n\n### Firing Background Agents\n\n```typescript\n// Fire agent in background (async)\ncall_omo_agent({\n  subagent_type: \"explore\",\n  description: \"Find auth patterns\",\n  prompt: \"...\",\n  run_in_background: true  // ← Returns immediately with task_id\n});\n\n// Fire agent synchronously (blocking)\ncall_omo_agent({\n  subagent_type: \"oracle\",\n  description: \"Review architecture\",\n  prompt: \"...\",\n  run_in_background: false  // ← Waits for completion\n});\n```\n\n### Collecting Results\n\n```typescript\n// Check status (non-blocking)\nbackground_output({ task_id: \"bg_12345\", block: false });\n\n// Wait for completion (blocking)\nbackground_output({ task_id: \"bg_12345\", block: true });\n```\n\n### Lifecycle Management\n\n1. **Launch**: Agent starts, returns `task_id`\n2. **Running**: System notifies \"BACKGROUND TASK COMPLETED\" when done\n3. **Collect**: Use `background_output` to retrieve results\n4. **Cancel** (if needed): Use `background_cancel` with `task_id` or `all: true`\n\n**Best Practice:** Always cancel background tasks before providing final answer:\n```typescript\nbackground_cancel({ all: true });\n```\n\n---\n\n## 6. Mode-Specific Agent Strategies\n\n### [search-mode]\n**Goal:** Maximize search coverage\n\n```\n1. Fire 2+ explore agents in parallel (different search angles)\n2. Fire 1-2 librarian agents if external libs involved\n3. Use direct Grep/AST-grep for targeted patterns\n4. Synthesize findings from all sources\n```\n\n### [analyze-mode]\n**Goal:** Deep understanding before action\n\n```\n1. Gather context in parallel:\n   - 1-2 explore agents (codebase patterns)\n   - 1-2 librarian agents (if external library)\n   - Direct tools for targeted searches\n\n2. IF complex (architecture, multi-system, 2+ debug failures):\n   - Consult oracle for strategic guidance\n\n3. Synthesize findings before proceeding\n```\n\n### [implement-mode]\n**Goal:** Efficient execution with verification\n\n```\n1. Understand existing patterns (explore or direct tools)\n2. Implement changes\n3. Verify with lsp_diagnostics\n4. Run build/tests if applicable\n5. Document if needed (document-writer)\n```\n\n---\n\n## 7. Best Practices\n\n### Do's\n- ✅ Fire independent agents in parallel\n- ✅ Use structured delegation prompts\n- ✅ Collect background results before final answer\n- ✅ Match agent to task (don't over-engineer)\n- ✅ Provide rich context in prompts\n\n### Don'ts\n- ❌ Use oracle for simple tasks (expensive)\n- ❌ Fire sequential agents when parallel is possible\n- ❌ Forget to cancel background tasks\n- ❌ Ask agents to do things outside their specialty\n- ❌ Provide vague prompts without context\n\n### Agent Selection Quick Reference\n\n| Task Type | Primary Agent | Backup |\n|-----------|--------------|--------|\n| \"How does X work in this codebase?\" | explore | Direct Grep |\n| \"What's the best practice for Y?\" | librarian | Context7 |\n| \"Should I use approach A or B?\" | oracle | — |\n| \"Make this component look better\" | frontend-ui-ux-engineer | — |\n| \"Document this API\" | document-writer | — |\n| \"Find all usages of Z\" | explore | LSP find_references |\n\n---\n\n## 8. Project-Specific Agent Configuration\n\nProjects may have specific agent rules. Check for:\n\n1. **Project AGENTS.md** — Local overrides and conventions\n2. **Project README** — Setup requirements\n3. **doc/ folder** — Implementation guides and constraints\n\n### This Project's Conventions\n\n**Tech Stack:**\n- Next.js 16 (App Router) + React 19\n- TypeScript 5 (strict)\n- Tailwind CSS 4 (@theme inline)\n- Framer Motion + GSAP\n\n**Agent Considerations:**\n- Oracle for App Router edge cases (internal APIs, async params)\n- Explore for understanding existing component patterns\n- Librarian for React 19/Next.js 16 documentation (cutting edge)\n\n---\n\n*Last Updated: 2026-01-05*\n",
  "filePath": "/Users/salgu/Workspace/1_project/ritual_code/p29-w07-7_landing-future-2/AGENTS.md"
}
```
```

---

## Assistant

_Thinking:_

Good! The AGENTS.md file has been created successfully. Now let me create the second document - the Project Startup Rules document. I'll create this in the doc folder since it seems like a documentation file that fits with the other doc files.

Now creating the Project Startup Rules document:

```
Tool: write

**Input:**
```json
{
  "content": "# Project Startup Rules — Development Guidelines\n\n> Practical rules for starting and maintaining projects within the Sisyphus orchestration system.\n\n---\n\n## 1. Initial Assessment Phase\n\n### 1.1 First Actions on Any Project\n\nBefore writing code, establish context:\n\n```\n1. READ configuration files:\n   - package.json (dependencies, scripts)\n   - tsconfig.json (paths, strictness)\n   - next.config.* or equivalent\n   - Any existing AGENTS.md or CLAUDE.md\n\n2. SCAN project structure:\n   - src/ organization\n   - Component patterns\n   - Existing tests\n\n3. CHECK documentation:\n   - /doc folder\n   - README.md\n   - Any design/spec files\n```\n\n### 1.2 Project State Classification\n\nClassify before acting:\n\n| State | Signals | Strategy |\n|-------|---------|----------|\n| **Disciplined** | Consistent patterns, tests, docs, linting | Follow existing conventions strictly |\n| **Transitional** | Mixed patterns, partial coverage | Align new code with best patterns |\n| **Chaotic** | Inconsistent, no tests, no docs | Propose minimal conventions before adding code |\n| **Greenfield** | Empty or just scaffolded | Establish conventions explicitly |\n\n### 1.3 Convention Discovery\n\n```markdown\nASK yourself:\n- What naming conventions are used? (PascalCase, camelCase, kebab-case)\n- How are files organized? (by feature, by type, hybrid)\n- What patterns are followed? (server/client boundaries, data flow)\n- What libraries handle common tasks? (animation, forms, state)\n\nIf unclear after code review → Ask user before proceeding\n```\n\n---\n\n## 2. Essential Project Files\n\n### 2.1 Documentation Structure\n\nEvery project should have:\n\n```\nproject/\n├── AGENTS.md         # Agent behavior rules (this project)\n├── README.md         # Project overview, setup\n└── doc/\n    ├── prd.md        # Product requirements\n    ├── design.md     # Design specifications\n    ├── plan.md       # Implementation roadmap\n    └── implement.md  # Step-by-step implementation guides\n```\n\n### 2.2 File Purposes\n\n| File | Purpose | When to Update |\n|------|---------|----------------|\n| `AGENTS.md` | AI agent behavior constraints | When adding patterns, rules, or conventions |\n| `prd.md` | What to build and why | When requirements change |\n| `design.md` | How it should look/feel | When design decisions are made |\n| `plan.md` | Implementation phases | When scope or priority changes |\n| `implement.md` | Technical implementation details | When implementing each phase |\n\n### 2.3 Relationship Between Documents\n\n```\nprd.md (WHAT)\n    ↓\ndesign.md (HOW it looks)\n    ↓\nplan.md (WHEN to build what)\n    ↓\nimplement.md (HOW to build it)\n    ↓\nAGENTS.md (RULES for building)\n```\n\n---\n\n## 3. Development Workflow Rules\n\n### 3.1 Todo List Management\n\n**Create todos when:**\n- Task has 3+ distinct steps\n- Task spans multiple files\n- Task requires verification at multiple points\n\n**Todo structure:**\n```typescript\n{\n  id: \"unique-id\",\n  content: \"Clear, actionable description\",\n  status: \"pending\" | \"in_progress\" | \"completed\",\n  priority: \"high\" | \"medium\" | \"low\"\n}\n```\n\n**Lifecycle:**\n1. Create todos before starting multi-step task\n2. Mark `in_progress` when starting item\n3. Mark `completed` immediately after finishing\n4. Never leave todos in `in_progress` state overnight\n\n### 3.2 Multi-Step Task Handling\n\n```markdown\nFOR each task with multiple steps:\n\n1. CREATE todo list with all steps\n2. FOR each step:\n   a. Mark step as in_progress\n   b. Execute step\n   c. Verify step (diagnostics, build)\n   d. Mark step as completed\n3. VERIFY overall task completion\n4. CLEAN UP (cancel background tasks)\n```\n\n### 3.3 Verification Requirements\n\n**Before marking any task complete:**\n\n- [ ] `lsp_diagnostics` shows 0 errors on changed files\n- [ ] TypeScript compiles (`tsc --noEmit` or build)\n- [ ] Lint passes (`npm run lint`)\n- [ ] Tests pass (if tests exist)\n- [ ] No `any`, `@ts-ignore`, `@ts-expect-error` in new code\n\n**Evidence Requirements:**\n- Show diagnostic output for modified files\n- Run and show build output if applicable\n- Include test results if tests were added/modified\n\n---\n\n## 4. Code Quality Standards\n\n### 4.1 Anti-Patterns to Avoid\n\n```typescript\n// ❌ Type suppression\nconst value = data as any;\n// @ts-ignore\n// @ts-expect-error\n\n// ❌ Empty catch blocks\ntry { ... } catch (e) {}\n\n// ❌ Console.log in production code\nconsole.log(\"debugging\");\n\n// ❌ Hardcoded values that should be in theme\nclassName=\"bg-[#050505]\"  // Use theme colors\n\n// ❌ Unused imports/variables\nimport { something } from \"lib\";  // Never used\n\n// ❌ Non-null assertions without justification\ndata!.value\n```\n\n### 4.2 When to Refactor vs Minimal Fix\n\n**Refactor When:**\n- Existing code is clearly broken/wrong\n- Change requires touching 3+ similar locations\n- Technical debt is blocking current task\n- User explicitly requests cleanup\n\n**Minimal Fix When:**\n- Working code just needs small addition\n- Refactor scope would expand task significantly\n- Existing patterns are acceptable if not ideal\n- Time-critical fix\n\n### 4.3 Testing Expectations\n\n| Project Type | Testing Requirement |\n|--------------|---------------------|\n| Library/SDK | Required (unit + integration) |\n| Production app | Recommended (critical paths) |\n| Prototype/Demo | Optional (document if skipped) |\n| Portfolio/Static | Minimal (smoke test only) |\n\n**When adding tests:**\n- Cover edge cases that caused bugs\n- Test public interfaces, not implementation\n- Prefer integration over unit for UI components\n\n---\n\n## 5. Agent Coordination Rules\n\n### 5.1 Direct Tools vs Agents\n\n```\nUSE DIRECT TOOLS when:\n- Quick, targeted search\n- Single file operation\n- Known location\n- Simple grep/find\n\nUSE AGENTS when:\n- Need synthesis/analysis\n- Multiple files or systems\n- Unknown location\n- External research needed\n```\n\n### 5.2 Parallel Execution Patterns\n\n**Pattern 1: Context Gathering**\n```\nFire simultaneously:\n- explore agent (codebase patterns)\n- librarian agent (library docs)\n- Direct Grep (specific terms)\n\nWait for all → Synthesize → Proceed\n```\n\n**Pattern 2: Multi-Angle Search**\n```\nFire simultaneously:\n- explore \"find auth implementation\"\n- explore \"find user session handling\"\n- explore \"find token management\"\n\nCombine results → Complete picture\n```\n\n**Pattern 3: Research + Verify**\n```\nFire simultaneously:\n- librarian (best practices)\n- explore (current implementation)\n\nCompare → Identify gaps → Plan improvements\n```\n\n### 5.3 Background Task Lifecycle\n\n```markdown\nLAUNCH:\n  call_omo_agent({ ..., run_in_background: true })\n  → Returns task_id immediately\n\nMONITOR:\n  System notifies when complete\n  → Or check with background_output\n\nCOLLECT:\n  background_output({ task_id, block: false })\n  → Get results\n\nCLEANUP:\n  background_cancel({ all: true })\n  → Always before final answer\n```\n\n---\n\n## 6. Communication Standards\n\n### 6.1 When to Ask for Clarification\n\n**Ask When:**\n- Multiple valid interpretations with 2x+ effort difference\n- User request seems suboptimal or flawed\n- Missing critical information (file paths, error context)\n- Scope is ambiguous and could expand significantly\n\n**Proceed When:**\n- Single reasonable interpretation\n- Multiple interpretations with similar effort\n- Context makes intent clear\n- Following established patterns\n\n### 6.2 Status Updates\n\nFor long-running tasks, provide updates:\n```\n- Starting: \"I'll tackle this in N steps: 1. X, 2. Y, 3. Z\"\n- Progress: \"Completed step 1, moving to step 2...\"\n- Blocked: \"I'm stuck on X because Y. Options are...\"\n- Complete: \"Done. Summary: [what was accomplished]\"\n```\n\n### 6.3 Error Reporting\n\nWhen something fails:\n```markdown\n1. WHAT failed (specific error message)\n2. WHY it failed (root cause if known)\n3. WHAT was tried (approaches already attempted)\n4. OPTIONS for resolution\n```\n\n---\n\n## 7. Emergency Procedures\n\n### 7.1 When Stuck After 3 Attempts\n\n```bash\n1. STOP all edits\n2. REVERT to working state:\n   git stash                    # Stash changes\n   git checkout -- .            # Discard changes\n   git reset --hard HEAD~1      # Undo commit (if needed)\n3. DOCUMENT what was attempted\n4. CONSULT oracle with full context\n5. ASK user if still unresolved\n```\n\n### 7.2 Never Do (Hard Rules)\n\n- ❌ Delete tests to make them pass\n- ❌ Suppress type errors to \"fix\" builds\n- ❌ Make random changes hoping something works\n- ❌ Leave code in broken state\n- ❌ Commit secrets or credentials\n- ❌ Force push to main/master\n\n### 7.3 Recovery Commands\n\n```bash\n# Undo uncommitted changes\ngit checkout -- .\n\n# Stash work in progress\ngit stash\ngit stash pop  # Restore later\n\n# Undo last commit (keep changes)\ngit reset --soft HEAD~1\n\n# Undo last commit (discard changes) ⚠️\ngit reset --hard HEAD~1\n\n# See what changed\ngit diff HEAD~1\n```\n\n---\n\n## 8. Quality Checklist (Pre-Commit)\n\n### For Every Change:\n\n- [ ] LSP diagnostics: 0 errors\n- [ ] No new `any` types\n- [ ] No `@ts-ignore` or `@ts-expect-error`\n- [ ] No hardcoded values that belong in theme/config\n- [ ] Proper file naming conventions followed\n- [ ] Imports organized correctly\n- [ ] No unused imports/variables\n- [ ] Accessibility attributes where needed (alt, aria-label)\n\n### For New Files:\n\n- [ ] Correct directory location\n- [ ] Follows existing naming patterns\n- [ ] Has proper exports\n- [ ] Type definitions complete\n- [ ] Documentation if public API\n\n### For Deleted Files:\n\n- [ ] All imports updated\n- [ ] No broken references\n- [ ] Related tests removed/updated\n\n---\n\n## 9. Versioning and Dependencies\n\n### Dependency Rules\n\n```markdown\nNEVER:\n- Update major versions without explicit request\n- Add new dependencies without justification\n- Use deprecated packages\n\nALWAYS:\n- Check health before adding (recent commits, adoption)\n- Document why dependency was added\n- Prefer existing deps over new ones\n```\n\n### Before Updating Dependencies:\n\n```bash\n# Check for breaking changes\nnpm outdated\n\n# Test after update\nnpm update [package]\nnpm run build\nnpm test\n```\n\n---\n\n## 10. Quick Reference\n\n### Common Commands\n\n```bash\n# Development\nnpm run dev      # Start dev server\nnpm run build    # Production build\nnpm run lint     # Run linter\n\n# Git\ngit status       # See changes\ngit diff         # See unstaged changes\ngit log --oneline -10  # Recent commits\n\n# Diagnostics\nlsp_diagnostics  # Check for errors\n```\n\n### File Locations\n\n```\nsrc/\n├── app/           # Routes (page.tsx, layout.tsx)\n├── components/    # React components\n│   ├── layout/    # Navbar, Footer\n│   └── ui/        # Reusable atoms\n├── types/         # TypeScript interfaces\n├── data/          # Mock data, constants\n├── lib/           # Utilities\n└── styles/        # Theme, globals\n```\n\n### Path Aliases\n\n```typescript\nimport { X } from \"@/components/X\"  // → src/components/X\nimport { Y } from \"@/types/Y\"       # → src/types/Y\nimport { Z } from \"@/lib/Z\"         # → src/lib/Z\n```\n\n---\n\n*These rules apply to all projects in this environment. Project-specific rules in AGENTS.md take precedence where they conflict.*\n\n*Last Updated: 2026-01-05*\n",
  "filePath": "/Users/salgu/Workspace/1_project/ritual_code/p29-w07-7_landing-future-2/doc/project-startup-rules.md"
}
```
```

---

## Assistant

_Thinking:_

Perfect! Both files have been created successfully. Let me verify by checking what files exist now to confirm they were created.

```
Tool: bash

**Input:**
```json
{
  "command": "ls -la AGENTS.md doc/project-startup-rules.md",
  "description": "Verify both documentation files were created"
}
```
**Output:**
```
-rw-r--r--@ 1 salgu  staff  12106 Jan  5 18:50 AGENTS.md
-rw-r--r--@ 1 salgu  staff  11052 Jan  5 18:51 doc/project-startup-rules.md

```
```

---

## Assistant

_Thinking:_

Great! Both files have been created successfully:
- AGENTS.md (12,106 bytes)
- doc/project-startup-rules.md (11,052 bytes)

The task is complete. I should now provide a brief summary to the user.

Created both documentation files:

**AGENTS.md** (12KB) - Comprehensive agent orchestration guide covering:
- 8 specialized agents with use cases
- Decision frameworks and when to use each agent
- 7-section delegation prompt structure
- Background task management
- Parallel execution patterns
- Best practices and quick reference

**doc/project-startup-rules.md** (11KB) - Practical development guidelines including:
- Initial assessment and project classification
- Essential project file structure and relationships
- Development workflow with todo management
- Code quality standards and anti-patterns
- Agent coordination rules
- Emergency procedures and recovery
- Quality checklists and quick reference

Both files are production-ready and immediately usable for guiding development in this environment.

---

