# CLAUDE.md — Ben OS Development Guide

## Project Identity

Project Name: Ben OS  
Version: 2.0 — Strong Roots  
Purpose: A personal operating system designed to support daily execution, personal growth, values alignment, and long-term legacy building.

Ben OS is not just a productivity app. It is a digital framework built around identity, mission, and daily action.

---

# Core Philosophy

Ben OS follows a three-layer structure:

## Layer 1 — Identity

Foundation:
The person I am becoming.

The Seven Grandfather Teachings are always visible:

- Wisdom
- Love
- Respect
- Bravery
- Honesty
- Humility
- Truth

Every feature should support alignment with these principles.

Question:
"Am I acting in alignment with who I want to become?"

---

## Layer 2 — Mission

Purpose:
Understanding what is being built and why.

Focus areas:

- Goals
- Vision
- Relationships
- Community
- Legacy

Question:
"What am I building and why?"

---

## Layer 3 — Daily Execution

Purpose:
Turning values and mission into action.

Core systems:

- Planner
- Daily Tasks
- Tomorrow Planning
- Progress Tracking
- Reflection

Question:
"What actions move me forward today?"

---

# Development Rules

## Before Changing Code

Always:

1. Understand the existing architecture.
2. Review related files.
3. Explain the proposed changes.
4. Identify possible impacts.
5. Wait for approval before major restructuring.

Do not blindly rewrite working systems.

---

# Architecture Principles

Ben OS uses modular architecture.

Current major systems:

- Core Engine
- State Management
- Storage Services
- Event System
- Logger
- Configuration
- Modules

Modules should:

- Be independent where possible.
- Communicate through the core system.
- Avoid duplicate logic.
- Have clear responsibilities.

---

# Current Project Structure

Expected structure:

BenOS
│
├── core
│ ├── benos-core.js
│ ├── state.js
│ ├── storage.js
│ ├── events.js
│ ├── logger.js
│ ├── config.js
│ └── constants.js
│
├── modules
│ ├── planner
│ │ └── planner.js
│ ├── mission
│ ├── teachings
│ ├── weather
│ └── calendar
│
├── assets
├── components
├── docs
│
├── index.html
├── script.js
└── styles.css


---

# Coding Standards

## JavaScript

Use:

- Clear function names.
- Modular code.
- Comments explaining important logic.
- Consistent formatting.

Avoid:

- Duplicate functions.
- Global variables unless intentional.
- Large files containing unrelated systems.

---

# Planner Module Rules

The planner manages:

- Today's tasks
- Tomorrow's tasks
- Task completion
- Progress tracking
- Storage

Do not remove existing functionality.

Before modifying planner.js:

Check:

- Storage connections.
- Event connections.
- UI rendering.
- State management.

---

# Testing Requirements

After changes:

Verify:

- App loads without console errors.
- Tasks save correctly.
- Tasks reload after refresh.
- Buttons work.
- No broken imports.
- No missing functions.

---

# Git Rules

Before major changes:

Create a commit.

Use descriptive messages:

Examples:

Refactor planner module structure
Fix storage loading issue
Connect events system


---

# Communication Style

When working on Ben OS:

Explain:

1. What you found.
2. Why it matters.
3. What you recommend.
4. What files will change.

Do not make large changes without explaining first.

---

# Current Development Goal

Stabilize Ben OS v2.0 Strong Roots.

Priority order:

1. Fix existing bugs.
2. Complete architecture migration.
3. Stabilize modules.
4. Improve user experience.
5. Add new features.

The goal is a reliable foundation before expansion.

---

# Important Reminder

Ben OS is being built as a long-term personal operating system.

Protect the foundation before adding complexity.