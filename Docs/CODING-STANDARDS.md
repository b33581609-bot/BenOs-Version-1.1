# Ben OS Coding Standards v2.0

## Purpose

This document defines the coding standards used when creating and maintaining Ben OS.

The goal is to keep the system:

* Organized
* Reliable
* Easy to understand
* Easy to expand
* Safe to modify

Ben OS should grow through stable improvements, not through accumulated complexity.

---

# Core Coding Principles

## 1. One Responsibility Per File

Each file should have one clear purpose.

Examples:

Good:

```
planner.js
```

Handles planning functionality.

```
storage.js
```

Handles saving and loading data.

Avoid:

```
script.js
```

containing planner, weather, teachings, and mission logic together.

---

# 2. Avoid Duplicate Logic

There should only be one source of truth for each feature.

Avoid:

* Duplicate functions
* Copy-and-paste implementations
* Multiple systems controlling the same data

Example:

Bad:

```javascript
function updateProgress() {}
```

in multiple locations.

Good:

One function with one responsibility.

---

# 3. Avoid Unnecessary Global Functions

Functions should belong to the appropriate BenOS system whenever possible.

Preferred:

```javascript
BenOS.modules.planner.createTask()
```

Avoid creating unrelated global functions:

```javascript
createTask()
```

Global functions increase the risk of naming conflicts.

---

# 4. Use BenOS Core Systems

Modules should communicate through the architecture provided by BenOS.

Preferred systems:

* BenOS.state
* BenOS.storage
* BenOS.events
* BenOS.logger
* BenOS.config
* BenOS.constants

Future development should reduce direct communication between modules.

---

# File Header Standard

Major BenOS files should contain a header describing their purpose.

Example:

```javascript
/*
File:
Version:
Purpose:

Responsibilities:

Dependencies:

Used By:

Future Improvements:

Last Updated:
*/
```

This allows future developers to understand a file before modifying it.

---

# JavaScript Standards

## Naming

Use descriptive names.

Good:

```javascript
updateMissionProgress()
```

Avoid:

```javascript
update()
```

---

## Functions

Functions should:

* Do one thing
* Have clear names
* Avoid excessive length
* Be easy to test

---

## Variables

Use names that describe the data.

Good:

```javascript
completedTasks
```

Avoid:

```javascript
x
```

---

# Comments

Comments should explain:

* Why something exists
* Complex logic
* Important decisions

Avoid comments that simply repeat the code.

Example:

Poor:

```javascript
// Add one
count++;
```

Better:

```javascript
// Increase completion count after task validation
count++;
```

---

# Module Development Rules

Every module should:

* Have its own folder
* Own its logic
* Have documentation
* Use core systems
* Be independently testable

Recommended structure:

```
modules/
└── module-name/
    ├── module-name.js
    ├── README.md
    └── tests/
```

---

# Before Committing Code

Verify:

## Functionality

☐ Application loads
☐ No console errors
☐ Existing features still work

## Code Quality

☐ No duplicate functions
☐ No unused code
☐ No accidental global variables
☐ Naming is clear

## Documentation

☐ Changes are documented
☐ Version information is updated when needed

---

# Lessons From Previous Development

Ben OS development has shown that small architecture mistakes can create large debugging problems.

Examples:

## Duplicate Planner Logic

Problem:

Two implementations controlled the same feature.

Result:

Changes were applied to code that was not actually running.

Lesson:

Maintain one source of truth.

---

## Direct Module Coupling

Problem:

Modules calling each other directly.

Result:

Future changes become risky.

Lesson:

Use core systems for communication.

---

# Ben OS Coding Principle

Code should be built like the system itself:

Strong roots first.

Clear structure.
Simple logic.
Intentional growth.
