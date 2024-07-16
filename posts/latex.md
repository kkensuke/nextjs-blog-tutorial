---
title: "Latex"
subtitle: "A collection of code blocks."
date: "2024-7-5"
---

## Latex

1. **Inline equation:**
	:::simple[]
	```latex:markdown
	This is an inline equation: $\frac{1}{2} + \frac{1}{4} = \frac{3}{4}$
	```
	Output:
	
	This is an inline equation: $\frac{1}{2} + \frac{1}{4} = \frac{3}{4}$
	:::

2. **Block equation:**
	:::simple[]
	```latex:markdown
	$$
	\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}
	$$
	```
	
	Output:
	$$
	\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}
	$$
	:::
	
	:::important[]
	No linebreak leads to inline equation:
	```latex:markdown
	$$\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$$
	```
	
	Output:
	
	$$\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$$
	:::

    :::simple[]
	```latex:markdown
	$$
	\begin{align}
		e^{i\pi} + 1 = 0
	\end{align}
	$$
	```
	
	Output:
	$$
	\begin{align}
		e^{i\pi} + 1 = 0
	\end{align}
	$$
	:::
	
	:::simple[]
	```latex:markdown
	$$
	\begin{align}
		\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
	\end{align}
	$$
	```
	
	Output:
	$$
	\begin{align}
		\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
	\end{align}
	$$
	:::