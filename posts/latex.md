---
title: "Latex in Markdown"
subtitle: "A comprehensive guide to writing mathematical expressions in Markdown"
date: "2024-7-5"
tags: [Markdown, Latex]
---

## Basic Latex Usage

1. **Simple Inline Equations:**
    :::simple[]
    ```latex:markdown
    Here are some inline equations:
    - Area of a circle: $A = \pi r^2$
    - Quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
    - Einstein's famous equation: $E = mc^2$
    ```
    Output:
    
    Here are some inline equations:
    - Area of a circle: $A = \pi r^2$
    - Quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
    - Einstein's famous equation: $E = mc^2$
    :::

2. **Basic Block Equations:**
    :::simple[]
    ```latex:markdown
    The Gaussian integral:
    $$
    \int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}
    $$
    ```
    Output:
    
    The Gaussian integral:
    $$
    \int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}
    $$
    :::

## Advanced Mathematical Expressions

1. **Matrix Operations:**
    :::simple[]
    ```latex:markdown
    $$
    \begin{pmatrix}
        a & b \\
        c & d
    \end{pmatrix}
    \begin{pmatrix}
        x \\
        y
    \end{pmatrix} =
    \begin{pmatrix}
        ax + by \\
        cx + dy
    \end{pmatrix}
    $$
    ```
    Output:
    $$
    \begin{pmatrix}
        a & b \\
        c & d
    \end{pmatrix}
    \begin{pmatrix}
        x \\
        y
    \end{pmatrix} =
    \begin{pmatrix}
        ax + by \\
        cx + dy
    \end{pmatrix}
    $$
    :::

2. **Multi-line Equations with Alignment:**
    :::simple[]
    ```latex:markdown
    $$
    \begin{align}
        (x + y)^3 &= (x + y)(x + y)^2 \\
        &= (x + y)(x^2 + 2xy + y^2) \\
        &= x^3 + 3x^2y + 3xy^2 + y^3
    \end{align}
    $$
    ```
    Output:
    $$
    \begin{align}
        (x + y)^3 &= (x + y)(x + y)^2 \\
        &= (x + y)(x^2 + 2xy + y^2) \\
        &= x^3 + 3x^2y + 3xy^2 + y^3
    \end{align}
    $$
    :::

## Special Mathematical Notations

1. **Set Theory and Logic:**
    :::simple[]
    ```latex:markdown
    $$
    \begin{align}
        A \cap (B \cup C) &= (A \cap B) \cup (A \cap C) \\
        \forall x \in \mathbb{R}, \exists y &: y > x \\
        P(A|B) &= \frac{P(B|A)P(A)}{P(B)}
    \end{align}
    $$
    ```
    Output:
    $$
    \begin{align}
        A \cap (B \cup C) &= (A \cap B) \cup (A \cap C) \\
        \forall x \in \mathbb{R}, \exists y &: y > x \\
        P(A|B) &= \frac{P(B|A)P(A)}{P(B)}
    \end{align}
    $$
    :::

2. **Calculus and Series:**
    :::simple[]
    ```latex:markdown
    $$
    \begin{align}
        \frac{d}{dx}\left[\int_a^x f(t)dt\right] &= f(x) \\
        \sum_{n=0}^{\infty} x^n &= \frac{1}{1-x}, |x| < 1 \\
        \lim_{x \to 0} \frac{\sin x}{x} &= 1
    \end{align}
    $$
    ```
    Output:
    $$
    \begin{align}
        \frac{d}{dx}\left[\int_a^x f(t)dt\right] &= f(x) \\
        \sum_{n=0}^{\infty} x^n &= \frac{1}{1-x}, |x| < 1 \\
        \lim_{x \to 0} \frac{\sin x}{x} &= 1
    \end{align}
    $$
    :::

## Famous Mathematical Constants and Equations

1. **Euler's Identity:**
    :::simple[]
    ```latex:markdown
    The most beautiful equation in mathematics:
    $$
        e^{i\pi} + 1 = 0
    $$
    ```
    Output:
    
    The most beautiful equation in mathematics:
    $$
        e^{i\pi} + 1 = 0
    $$
    :::

2. **Important Mathematical Functions:**
    :::simple[]
    ```latex:markdown
    $$
    \begin{align}
        \zeta(s) &= \sum_{n=1}^{\infty} \frac{1}{n^s} \quad \text{(Riemann zeta function)} \\
        \Gamma(z) &= \int_0^{\infty} t^{z-1}e^{-t}dt \quad \text{(Gamma function)} \\
        \vartheta(z) &= \sum_{n=-\infty}^{\infty} e^{-\pi n^2 z} \quad \text{(Theta function)}
    \end{align}
    $$
    ```
    Output:
    $$
    \begin{align}
        \zeta(s) &= \sum_{n=1}^{\infty} \frac{1}{n^s} \quad \text{(Riemann zeta function)} \\
        \Gamma(z) &= \int_0^{\infty} t^{z-1}e^{-t}dt \quad \text{(Gamma function)} \\
        \vartheta(z) &= \sum_{n=-\infty}^{\infty} e^{-\pi n^2 z} \quad \text{(Theta function)}
    \end{align}
    $$
    :::

:::note[]
Remember that proper spacing in Latex equations can be achieved using:
- `\,` for a small space
- `\;` for a medium space
- `\quad` for a large space
- `\qquad` for an extra large space
:::