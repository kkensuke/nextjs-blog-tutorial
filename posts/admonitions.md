---
title: "Admonitions"
subtitle: "A collection of admonitions and code blocks. A collection of admonitions and code blocks. A collection of admonitions and code blocks."
date: "2024-4-27"
---

## Admonitions

:::abstract[]
This is an abstract admonition.
:::

Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 

:::note[]
This is a note admonition.

~strike~ *italic* `code` **bold** [link](https://example.com)
:::

Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 

:::warning[]
This is a warning admonition.
:::

:::important[]
This is an important admonition.
:::

:::tip[]
This is a tip admonition.
:::

:::example[]
This is a example admonition.
:::

:::comment[]
This is an comment admonition.
:::

:::quote[]
This is an quote admonition.
:::

:::question[]
This is an question admonition.
:::

:::simple[]
This is an simple admonition.
:::


You can make nested admonitions by adding more colons to the opening and closing tags.
::::note[]

Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 
Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text 

~~~python
def hello():
    for i in range(3):
        print("Hello, world!")
~~~

:::important[]
This is an important admonition.

```python
print("Hello, world!")
```
:::

::::


::::simple[]
```markdown
:::note[]
This is a note admonition.
:::
```
:::note[]
This is a note admonition.
:::
::::
