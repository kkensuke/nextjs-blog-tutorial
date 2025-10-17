---
title: "GitHub Flavored Markdown with remark-gfm"
date: "2024-5-3"
subtitle: "A Comprehensive Guide to GFM Features and Usage"
tags: [Markdown]
---

## Introduction

[remark-gfm](https://github.com/remarkjs/remark-gfm) is a plugin for [remark](https://github.com/remarkjs/remark) that adds support for GitHub Flavored Markdown (GFM) features. This guide covers all the GFM features supported by the package and provides practical examples for each.

## Installation and Setup

```bash
npm install remark-gfm
```

### Integration with Remark

```javascript
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {read} from 'to-vfile'
import {unified} from 'unified'

const file = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(await read('example.md'))

console.log(String(file))
```

## Autolink Literals

GFM automatically converts URLs and email addresses to links without requiring explicit markdown link syntax.

### Examples

```markdown
# Standard URLs
www.example.com
https://example.com
http://example.com

# Email Addresses
contact@example.com
support@example.com
```

### Real-world Examples:

Visit our website at www.company.com or contact us at support@company.com.
Follow us on https://twitter.com/company for updates.

### Limitations and Best Practices:
- Autolinks must be surrounded by whitespace
- URLs with special characters might need explicit linking
- Some domains might require explicit `http://` or `https://` prefix

## Footnotes

Footnotes allow you to add references and additional information without cluttering the main content.

### Basic Syntax

:::simple
```markdown
Here's a statement that needs a reference[^1].

[^1]: This is the reference text.
```
Here's a statement that needs a reference[^1].

[^1]: This is the reference text.
:::

### Examples with Multiple References

:::simple
```markdown
Here's a complex example[^1] with multiple footnotes[^2] demonstrating different use cases[^3].

[^1]: First footnote with simple text.
[^2]: Second footnote with multiple lines:
    - Supporting point 1
    - Supporting point 2
    - Supporting point 3
[^3]: Third footnote with `code` and [links](https://example.com).
```

Here's a complex example[^1] with multiple footnotes[^2] demonstrating different use cases[^3].

[^1]: First footnote with simple text.
[^2]: Second footnote with multiple lines:
    - Supporting point 1
    - Supporting point 2
    - Supporting point 3
[^3]: Third footnote with `code` and [links](https://example.com).
:::

### Best Practices:
- Use meaningful reference labels
- Keep footnotes concise
- Consider using inline footnotes for brief additions
- Order footnotes logically

## Strikethrough

Strikethrough text is useful for showing changes, updates, or deprecated information.

### Basic Syntax

```markdown
~~Strikethrough text~~
```

### Use Cases

1. **Showing Changes**:
  - Original price: ~~\$99.99~~ Now: $79.99

2. **Task Updates**:
  - ~~Complete initial draft~~
  - ~~Review with team~~
  - Publish document

3. **Deprecated Features**:
  ~~Use legacy API~~ Use new v2 API endpoints

### Nested Formatting

You can combine strikethrough with other formatting:
- ~~**Bold strikethrough**~~
- ~~*Italic strikethrough*~~
- ~~`code strikethrough`~~

## Tables

Tables in GFM provide flexible ways to organize and present data.

### Alignment Options

#### Left-aligned (Default)
```markdown
| Header 1 | Header 2 | Header 3 |
| - | - | - |
| Row 1 | Data | Data |
| Row 2 | Data | Data |
```

| Header 1 | Header 2 | Header 3 |
| - | - | - |
| Row 1 | Data | Data |
| Row 2 | Data | Data |

#### Right-aligned
```markdown
| Header 1 | Header 2 | Header 3 |
| -: | -: | -: |
| Row 1 | Data | Data |
| Row 2 | Data | Data |
```

| Header 1 | Header 2 | Header 3 |
| -: | -: | -: |
| Row 1 | Data | Data |
| Row 2 | Data | Data |

#### Center-aligned
```markdown
| Header 1 | Header 2 | Header 3 |
| :-: | :-: | :-: |
| Row 1 | Data | Data |
| Row 2 | Data | Data |
```

| Header 1 | Header 2 | Header 3 |
| :-: | :-: | :-: |
| Row 1 | Data | Data |
| Row 2 | Data | Data |


### Advanced Table Features
#### Mixed Alignment
```markdown
| Left | Center | Right |
| :- | :-: | -: |
| Text | Text | Text |
| Data | Data | Data |
```
| Left | Center | Right |
| :- | :-: | -: |
| Text | Text | Text |
| Data | Data | Data |

#### Complex Tables with Formatting
```markdown
| Feature | Status | Notes |
| :- | :-: | :- |
| Basic Tables    | ✅ | **Fully** supported |
| Mixed Alignment | ✅ | *Partially* supported |
| Nested Lists    | ❌ | Not supported in tables |
```
| Feature | Status | Notes |
| :- | :-: | :- |
| Basic Tables    | ✅ | **Fully** supported |
| Mixed Alignment | ✅ | *Partially* supported |
| Nested Lists    | ❌ | Not supported in tables |

### Best Practices for Tables
1. Keep tables simple and readable
2. Use consistent column widths
3. Align numbers right
4. Align text left
5. Use center alignment sparingly

## Tasklists

Tasklists (or checklists) are perfect for tracking progress and creating interactive to-do lists.

### Basic Syntax

```markdown
- [ ] Unchecked item
- [x] Checked item
```

### Real-world Examples

#### Project Checklist
- [ ] Project Setup
  - [x] Initialize repository
  - [x] Set up development environment
  - [ ] Configure CI/CD
- [ ] Development Phase
  - [x] Create basic structure
  - [ ] Implement core features
  - [ ] Write tests
- [ ] Deployment
  - [ ] Prepare documentation
  - [ ] Deploy to staging
  - [ ] Deploy to production

#### Release Checklist
- [x] Code review completed
- [x] Tests passed
- [x] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes prepared

### Best Practices:
1. Use hierarchical structure for complex tasks
2. Keep items concise
3. Update regularly
4. Include completion dates for tracked items


## Compatibility and Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
| :- | :-: | :-: | :-: | :-: |
| Autolinks | ✅ | ✅ | ✅ | ✅ |
| Footnotes | ✅ | ✅ | ✅ | ✅ |
| Strikethrough | ✅ | ✅ | ✅ | ✅ |
| Tables | ✅ | ✅ | ✅ | ✅ |
| Tasklists | ✅ | ✅ | ✅ | ✅ |

## Additional Resources

- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [Remark GFM Plugin Documentation](https://github.com/remarkjs/remark-gfm)
- [Markdown Guide](https://www.markdownguide.org/)
