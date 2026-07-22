# Ben OS Testing Checklist v2.0

## Purpose

This document defines the testing process used before committing changes to Ben OS.

The goal is to ensure:

* Existing features continue working
* New changes do not introduce regressions
* Architecture remains stable
* The system grows safely

Testing should happen before major commits.

---

# Application Startup Testing

Before testing features:

☐ Open the application

☐ Confirm the page loads correctly

☐ Check browser console

☐ Confirm there are no JavaScript errors

☐ Confirm all core systems initialize once

Expected startup:

```
BenOS Core Loaded
BenOS State Loaded
BenOS Storage Loaded
BenOS Events Loaded
BenOS Logger Loaded
BenOS Config Loaded
BenOS Constants Loaded
BenOS Version Loaded
```

---

# Version System Testing

Verify:

☐ Version displays correctly

☐ Footer shows the current BenOS version

☐ No duplicate version sources exist

Expected:

```
BenOS v2.0 — Strong Roots
```

---

# Planner Module Testing

## Creating Tasks

Verify:

☐ Add Today task works

☐ Add Tomorrow task works

☐ New tasks appear immediately

☐ Tasks survive page refresh

---

## Editing Tasks

Verify:

☐ Task text can be changed

☐ Updated text saves

☐ Refresh keeps changes

---

## Completing Tasks

Verify:

☐ Checkbox changes completion state

☐ Completed tasks display correctly

☐ Progress updates immediately

☐ Saved completion remains after refresh

---

## Deleting Tasks

Verify:

☐ Delete button removes task

☐ Storage updates correctly

☐ Progress recalculates

---

## Start My Day

Verify:

☐ Tomorrow tasks move into Today

☐ Tomorrow list clears

☐ Existing Today tasks remain

☐ Progress remains accurate

☐ Refresh preserves the new state

---

# Mission Module Testing

Verify:

☐ Mission greeting loads

☐ Current task displays correctly

☐ Progress information updates

☐ Planner connection works

☐ Mission updates through the planner.updated BenOS.events event

---

# Weather Module Testing

Verify:

☐ Weather loads

☐ API connection works

☐ Errors display gracefully

Future testing:

☐ Storage integration

☐ Event integration

☐ Logger integration

---

# Teachings Module Testing

Verify:

☐ Application loads without console errors

☐ Today's Teaching appears in the #teaching element

☐ Displayed teaching matches BenOS.constants.teachings[current weekday]

☐ Refreshing the page keeps correct behavior

☐ Module initializes once

☐ No duplicate rendering occurs

---

# Calendar Module Testing

Verify:

☐ Application loads without console errors

☐ Calendar initializes once

☐ Today's date displays correctly

☐ Create event works

☐ Delete event works

☐ Events persist after refresh

☐ Today's events display correctly

☐ Upcoming events display correctly

☐ Invalid storage safely falls back to []

☐ No duplicate rendering occurs

---

# BenOS.state Testing

Verify:

☐ Planner tasks load from BenOS.state.planner

☐ Planner mutations (add, delete, complete, Start My Day) update BenOS.state correctly

☐ Storage persistence continues using BenOS.storage

☐ Mission receives Planner updates through BenOS.events

---

# Core System Testing

## Storage

Verify:

☐ Data saves

☐ Data loads

☐ Missing data does not crash the application

---

## Events

Verify:

☐ Events can be created

☐ Events can be emitted

☐ Listeners receive updates

---

## Logger

Verify:

☐ Information messages appear

☐ Warnings appear correctly

☐ Errors are reported

---

# New Module Testing Requirements

Every new module should verify:

## Initialization

☐ Module loads correctly

☐ Dependencies exist

☐ No console errors

---

## Functionality

☐ Main features work

☐ User interaction works

☐ Data persists correctly

---

## Architecture

☐ Uses BenOS core systems

☐ Does not create unnecessary globals

☐ Does not duplicate existing logic

---

# Before Commit Checklist

Before creating a Git commit:

## Code

☐ Application tested

☐ Console checked

☐ No duplicate functions

☐ No broken imports

☐ No unused files created

---

## Documentation

☐ Documentation updated if architecture changed

☐ Version updated if required

☐ CHANGELOG updated for major milestones

---

## Git

☐ Review changed files

☐ Confirm only intended files changed

☐ Create descriptive commit message

Examples:

Good:

```
Fix planner duplicate implementation
Add storage service
Create architecture documentation
```

Avoid:

```
Changes
Fix stuff
Update files
```

---

# Release Testing

Before calling a version complete:

☐ Full application test completed

☐ All active modules tested

☐ Documentation matches reality

☐ Version information matches everywhere

☐ Clean Git status

---

# Ben OS Testing Principle

Testing is not about finding failure.

Testing protects the foundation.

Strong roots allow safe growth.
