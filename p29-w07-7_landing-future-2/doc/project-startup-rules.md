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
import { Y } from "@/types/Y"       # → src/types/Y
import { Z } from "@/lib/Z"         # → src/lib/Z
```

---

*These rules apply to all projects in this environment. Project-specific rules in AGENTS.md take precedence where they conflict.*

*Last Updated: 2026-01-05*
