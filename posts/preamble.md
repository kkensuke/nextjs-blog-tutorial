---
title: "Latex Preamble"
date: "2025-10-18"
subtitle: "A Comprehensive Guide to LaTeX Preamble Setup"
tags: [Latex]
---


This guide explains the key components of a well-structured LaTeX preamble, particularly useful for mathematical, scientific, and technical writing.


## Absolute Basics (Not in the example but essential)
Before diving into the advanced features, here are the fundamental elements every LaTeX document needs:

### Document Class
```latex
\documentclass[12pt,a4paper]{article}
```
This comes before the preamble but is essential. Common classes: `article`, `report`, `book`, `beamer`.

### Text Input Encoding
```latex
\usepackage[utf8]{inputenc}
```
**Critical for modern LaTeX**: Allows you to use UTF-8 characters (accents, non-English characters, special symbols) directly in your source file. If you're using a modern TeX distribution (2018+), this may be default, but it's still good practice to include.

### Language Support
```latex
\usepackage[english]{babel}
```
Sets up language-specific rules for hyphenation, quotation marks, and spacing. Change `english` to your language.

### Document Metadata
```latex
\title{Your Document Title}
\author{Your Name}
\date{\today}
```
These define your document's metadata. Use `\maketitle` in the document body to display them.

### Bibliography Management (if needed)
```latex
\usepackage[style=alphabetic]{biblatex}
\addbibresource{references.bib}
```
For citations and references. Alternatives include `natbib`.


## Essential Packages
### Text Encoding and Fonts
```latex
\usepackage[T1]{fontenc}
```

This ensures proper font encoding for PDF output, which is crucial for correct character display and text copying from PDFs.

### Mathematical Typesetting
```latex
\usepackage{amsmath, amsfonts, amssymb, amsthm}
\usepackage{mathtools}
```

These are fundamental packages for mathematical documents:
- **amsmath**: Core package for mathematical typesetting
- **amsfonts** and **amssymb**: Provide additional mathematical symbols and fonts
- **amsthm**: For theorem environments
- **mathtools**: Enhances amsmath with additional features like `\coloneqq` for definitions

### Physics Notation
```latex
\usepackage{physics}
```

Simplifies physics notation, providing shortcuts for brackets, derivatives, and quantum mechanics notation (like `\ket{}` and `\bra{}`).


## Graphics and Visualization
### Basic Graphics
```latex
\usepackage{xcolor}
\usepackage{graphicx}
\usepackage{tikz}
```

- **xcolor**: Advanced color management
- **graphicx**: For including external images
- **tikz**: Powerful tool for creating vector graphics directly in LaTeX


## Document Structure
### Lists and Enumerations
```latex
\usepackage{enumitem}
```

Provides fine control over list environments (itemize, enumerate, description), allowing customization of spacing, labels, and indentation.

### Tables
```latex
\usepackage{multirow}
\usepackage{longtable}
\usepackage{booktabs}
```

- **multirow**: Create cells spanning multiple rows
- **longtable**: Tables that can span multiple pages
- **booktabs**: Professional-looking tables with better spacing

### Page Layout
```latex
\usepackage[top=25truemm,bottom=20truemm,left=20truemm,right=20truemm]{geometry}
```

Controls page margins and dimensions. The example sets custom margins for all sides.


## Theorem Environments
### Defining Theorem-Like Structures
```latex
\theoremstyle{definition}
\newtheorem{theorem}{Theorem}
\newtheorem{lemma}{Lemma}
\newtheorem{corollary}{Corollary}
\newtheorem{proposition}{Proposition}
\newtheorem{definition}{Definition}
\newtheorem{remark}{Remark}
```

This creates numbered environments for mathematical statements. Each will be automatically numbered sequentially throughout the document.

### Appendix Integration
```latex
\AtAppendix{%
    \counterwithin{theorem}{section}
    \counterwithin{lemma}{section}
    % ... etc
}
```

This resets theorem numbering within each appendix section, creating numbers like "Theorem A.1" instead of continuing the main document numbering.


## Useful Custom Commands
### Latin Abbreviations
```latex
\newcommand{\etal}{\text{et al.}}
\newcommand{\eg}{\text{e.g.,\ }}
\newcommand{\ie}{\text{i.e.,\ }}
\newcommand{\wrt}{\text{w.r.t.\ }}
\newcommand{\iid}{\text{i.i.d.\ }}
```

These ensure consistent formatting and proper spacing for common abbreviations.

**Usage example:**
```latex
The algorithm converges \wrt the parameter $\theta$.
```

### Mathematical Shortcuts

#### Blackboard Bold Letters
```latex
\newcommand{\bbR}{\mathbb{R}}
\newcommand{\bbN}{\mathbb{N}}
\newcommand{\bbZ}{\mathbb{Z}}
\newcommand{\bbC}{\mathbb{C}}
```

Quick shortcuts for common number sets.

**Usage example:**
```latex
Let $f: \bbR \to \bbC$ be a function...
```

#### Calligraphic Letters
```latex
\newcommand{\calH}{\mathcal{H}}
\newcommand{\calL}{\mathcal{L}}
```

Commonly used for special spaces, operators, or categories.

**Usage example:**
```latex
The Hilbert space $\calH$ has dimension $n$.
```

#### Roman Letters
```latex
\newcommand{\rmA}{\mathrm{A}}
```

Useful for operators or when you need upright letters in math mode.

### Mathematical Operators
```latex
\DeclareMathOperator*{\argmin}{arg~min}
\DeclareMathOperator*{\argmax}{arg~max}
\DeclareMathOperator{\sgn}{sgn}
\DeclareMathOperator{\Tr}{Tr}
```

These create properly spaced operator names that behave correctly in subscripts and limits.

**Usage example:**
```latex
\theta^* = \argmax_\theta L(\theta)
```

### Quantum Mechanics Notation
#### Tensor Products
```latex
\newcommand{\ot}{\otimes}
\newcommand{\otn}[1]{^{\otimes {#1}}}
```

Shortcuts for tensor products.

**Usage example:**
```latex
|\psi\rangle\otn{n} = |\psi\rangle \ot |\psi\rangle \ot \cdots \ot |\psi\rangle
```

### Common Matrices
#### Pauli Matrices
```latex
\newcommand{\paulix}{\mqty[\pmat{1}]}
\newcommand{\pauliy}{\mqty[\pmat{2}]}
\newcommand{\pauliz}{\mqty[\pmat{3}]}
```

Predefined Pauli matrices for quantum mechanics.

#### Quantum Gates
```latex
\newcommand{\hadamard}{\frac{1}{\sqrt{2}}\mqty[1 & 1 \\ 1 & -1]}
\newcommand{\mcnot}{\mqty[1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0]}
```

Common quantum gate matrices ready to use.


## Document Revision Tools
### Track Changes System
```latex
\newif\ifverbose
\verbosetrue

\newcommand{\ins}[1]{\ifverbose\textcolor{blue}{#1}\else#1\fi}
\newcommand{\edit}[2]{\ifverbose\textcolor{red}{\stkout{#1} #2}\else#2\fi}
\newcommand{\del}[1]{\ifverbose\textcolor{red}{\stkout{#1}}\fi}
```

This creates a simple track-changes system:
- **\ins{new text}**: Inserts text (shown in blue when verbose mode is on)
- **\edit{old}{new}**: Shows old text struck through and new text
- **\del{removed}**: Marks deleted text

Toggle `\verbosetrue` or `\verbosefalse` to show/hide revisions.


## Hyperlinks and References
```latex
\usepackage[colorlinks=true,citecolor=green,linkcolor=blue]{hyperref}
```

Creates clickable links in your PDF:
- Blue for internal references (sections, equations)
- Green for citations
- Always load this package last to avoid conflicts


## Advanced Features
### Display Breaks
```latex
\allowdisplaybreaks[4]
```

Allows LaTeX to break long equations across pages. The number 4 is the highest priority (most permissive).

### Algorithm Typesetting
```latex
\usepackage[linesnumbered, ruled, vlined]{algorithm2e}
\SetKwInput{kwInit}{Init}
```

For writing pseudocode with line numbers, ruled boxes, and custom keywords.

### Set Notation
```latex
\NewDocumentCommand{\set}{s m o}{%
  \IfBooleanTF{#1}%
    {%
      \IfValueTF{#3}%
        {\{~ #2 ~|~ #3 ~\}}%
        {\{~ #2 ~\}}%
    }%
    {%
      \IfValueTF{#3}%
        {\left\{~ #2 ~\middle|~ #3 ~\right\}}%
        {\left\{~ #2 ~\right\}}%
    }%
}
```

Flexible set notation command.

**Usage examples:**
```latex
\set{x}              % {x}
\set{x}[x > 0]       % {x | x > 0}
\set*{x}[x > 0]      % Non-scaling version
```


## Useful Shortcuts Reference
### Common Superscripts and Modifiers
```latex
\newcommand{\dg}{^\dagger}      % Hermitian conjugate
\newcommand{\T}{^\mathsf{T}}    % Transpose
\newcommand{\prm}{^\prime}      % Prime
```

**Usage:**
```latex
A\dg, M\T, f\prm
```

### Other Handy Commands
```latex
\newcommand{\defeq}{\coloneqq}  % Definition equals
\newcommand{\bs}{\boldsymbol}   % Bold symbol
\newcommand{\pd}{\partial}      % Partial derivative symbol
\newcommand{\ind}{\,\mathrm{d}} % Differential d
```


## Best Practices
1. **Load order matters**: Graphics packages before TikZ, hyperref last
2. **Use semantic commands**: Create `\newcommand{\velocity}{v}` instead of typing `v` directly
3. **Group related packages**: Organize your preamble into sections with comments
4. **Test compatibility**: Some packages conflict; load one at a time when troubleshooting
5. **Keep it minimal**: Only include packages you actually use


## Quick Start Templates
### Absolute Minimum (For Any Document)
```latex
\documentclass[12pt]{article}

% Text encoding
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}

% Language
\usepackage[english]{babel}

% Document info
\title{My Document}
\author{Your Name}
\date{\today}

\begin{document}
\maketitle

Your content here...

\end{document}
```

### For Mathematical/Scientific Writing
```latex
\documentclass[12pt,a4paper]{article}

% Encoding
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[english]{babel}

% Math packages
\usepackage{amsmath, amssymb, amsthm}
\usepackage{mathtools}

% Graphics
\usepackage{graphicx}
\usepackage{xcolor}

% Page layout
\usepackage[margin=1in]{geometry}

% Tables
\usepackage{booktabs}

% Theorem environments
\newtheorem{theorem}{Theorem}
\newtheorem{lemma}{Lemma}
\newtheorem{definition}{Definition}

% Useful shortcuts
\newcommand{\bbR}{\mathbb{R}}
\newcommand{\bbN}{\mathbb{N}}
\newcommand{\bbC}{\mathbb{C}}
\DeclareMathOperator*{\argmax}{arg\,max}
\DeclareMathOperator*{\argmin}{arg\,min}

% Bibliography
\usepackage[style=numeric]{biblatex}
\addbibresource{references.bib}

% Document info
\title{My Mathematical Document}
\author{Your Name}
\date{\today}

% Hyperlinks (load last)
\usepackage[colorlinks=true,linkcolor=blue,citecolor=green]{hyperref}

\begin{document}
\maketitle

\section{Introduction}
Let $f: \bbR \to \bbR$ be a function...

\printbibliography
\end{document}
```


## Conclusion
A well-organized preamble can significantly speed up your LaTeX workflow. Start with the basics and add packages and commands as you need them. The key is consistency and organization—group related commands together and add comments to explain complex definitions.

For quantum computing, physics, or advanced mathematics, this preamble provides an excellent foundation with shortcuts that save typing and ensure consistent notation throughout your document.