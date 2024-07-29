---
title: "Code block"
subtitle: "A collection of code blocks."
date: "2024-5-5"
tags: [Markdown, Code]
---

## Inline code

This is an `inline code` block.

## Code blocks

:::simple[]
````md:markdown
```
import numpy as np
import matplotlib.pyplot as plt
```
````

Output:
```
import numpy as np
import matplotlib.pyplot as plt
```
:::




:::simple[]
````md:markdown
```python:asdf.py
def hello():
    for i in range(3):
        print("Hello, world!")

for i in range(3):
    hello()
```
````

Output:
```python:asdf.py
def hello():
    for i in range(3):
        print("Hello, world!")

for i in range(3):
    hello()
```
:::




:::simple[]
````md:markdown
```python__diff:diff.py
- def old_function():
-    print("Old function")
+ def new_function():
+    print("New function")
```
````

Output:
```python__diff:diff.py
- def old_function():
-    print("Old function")
+ def new_function():
+    print("New function")
```
:::





```js:code.js
function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}


function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key:`code-segment-${childrenCount}-${i}`
    }));
  }
}

function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node;
  if (type === "text") {
    return value;
  } else if (tagName) {
    const TagName = tagName;
    const childrenCreator = createChildren(style, useInlineStyles);
    const props = (
      useInlineStyles
      ? { style: createStyleObject(properties.className, style) }
      : { className: createClassNameString(properties.className) }
    );
    const children = childrenCreator(node.children);
    return <TagName key={key} {...props}>{children}</TagName>;
  }
}
```