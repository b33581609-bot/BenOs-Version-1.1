# Ben OS Version Control

## Purpose

This document defines Git practices for maintaining Ben OS.

The goal is to keep development history clear, traceable, and easy to understand.

---

# Commit Standards

Commits should describe the purpose of the change.

Good examples:

```text
Fix planner duplicate implementation

Add BenOS architecture documentation

Create storage service

Update version system
```

Avoid unclear messages:

```text
Changes

Updates

Fix stuff
```

---

# Commit Principles

## One Purpose Per Commit

Whenever possible:

* Keep commits focused
* Separate unrelated changes
* Make changes easy to review and revert

---

# Main Branch

The main branch represents the stable Ben OS codebase.

Changes should be tested before being merged into the main branch.

---

# Documentation

Architecture changes should include documentation updates.

Examples:

* New modules
* New core systems
* Major workflow changes

---

# Detailed Workflow

The step-by-step Git workflow is maintained in:

```text
WORKFLOW.md
```

This document focuses only on version control standards and commit practices.

---

# Ben OS Version Control Principle

A clean history creates a clear path forward.

Every commit should explain what changed and why.
