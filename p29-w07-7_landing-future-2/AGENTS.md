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
