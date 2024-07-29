---
title: "Naming Conventions"
subtitle: "How to name variables, functions, and classes"
date: "2024-7-5"
tags: [Code]
---


## Naming Conventions in Python

[PEP 8 – Style Guide for Python Code | peps.python.org](https://peps.python.org/pep-0008/)

### Package

- Python packages should have short, all-lowercase names, and the use of underscores is discouraged. Examples: `mypackage`

### Module

- Modules should have short, all-lowercase names. Underscores can be used in the module name if it improves readability. Example: `module_name`

### Constant

- Constants are usually defined on a module level and written in all capital letters with underscores separating words. Examples: `MAX_OVERFLOW`

### Variable

- Variable names should be lowercase, with underscores for readability.
- Variable names should be short but descriptive. Single-character variable names and meaningless variable names should be avoided. Examples: `player_name`, `score`, etc.
- Boolean variable names are typically in the form of `is + adjective`, `has + noun`, `can + verb`, `with + noun`, etc. Example: `is_active`, `has_children`, `can_swim`, `with_fins`, etc. However, the first word can be omitted if it is obvious from the context.

### Function

- Function names should be lowercase, with underscores for readability. They should be in the form of `verb + noun`, but either can be omitted if it is obvious from the context. Examples: `get_score`, `print_message`

### Class

- Class names should normally use the CapWords convention. Examples: `MyClass`

### Method and Variable

- Use the function and variable naming rules
- Use one leading underscore only for non-public methods and instance variables.

## Naming conventions in other programming languages

Unlike Python, `camelCase` is used for naming variables and functions in other programming languages. Examples: `playerName`, `getScore`, `printMessage`

## Abbreviations

🚫 Don’t use abbreviations unless they are widely used. Recommended abbreviations are given [here](https://github.com/abbrcode/abbreviations-in-code).