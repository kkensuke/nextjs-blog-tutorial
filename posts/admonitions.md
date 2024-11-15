---
title: "Admonitions"
date: "2024-10-31"
subtitle: "A guide to using admonitions and directives in Markdown"
tags: [Markdown, Admonitions]
---

This guide explains how to use directives and admonitions in Markdown to create rich, interactive content.

## Inline Directives `:name[label]{attributes}`
::::simple{title="Button"}
```markdown
:btn[cmd], :btn[shift], :btn[ctrl], :btn[opt], :btn[enter],
:btn[left], :btn[right], :btn[up], :btn[down], :btn[tab],
:btn[space], :btn[delete], :btn[esc], :btn[custom]
```
:::simple
:btn[cmd], :btn[shift], :btn[ctrl], :btn[opt], :btn[enter], :btn[left], :btn[right], :btn[up], :btn[down], :btn[tab], :btn[space], :btn[delete], :btn[esc], :btn[Custom]
:::
::::

::::simple{title="YouTube Link"}
```markdown
Watch this video on YouTube: :youtube[Click here]{#dQw4w9WgXcQ}.
```
:::simple
Watch this video on YouTube: :youtube[Click here]{#dQw4w9WgXcQ}.
:::
::::


## Block Directives `::name[label]{attributes}`
::::simple{title="YouTube Embed"}
```markdown
::youtube[Watch this amazing video]{#dQw4w9WgXcQ}
```
::youtube[Watch this amazing video]{#dQw4w9WgXcQ}
::::


::::simple{title="Link Card"}
```markdown
::link[https://www.google.com]
```

::link[https://www.google.com]
::::


## Admonitions

Admonitions are specially formatted content blocks that help highlight important information.

### Basic Syntax
```markdown
:::type
Your content here
:::
```

### Available Types

::::simple
```markdown
:::note
This is a note admonition.
:::
```
:::note
This is a note admonition.
:::
::::

:::overview
This is an overview admonition.
:::

:::warning
This is a warning admonition.
:::

:::important
This is an important admonition.
:::

:::tip
This is a tip admonition.
:::

:::example
This is an example admonition.
:::

:::comment
This is a comment admonition.
:::

:::quote
This is a quote admonition.
:::

:::question
This is a question admonition.
:::

:::simple{title="Simple Admonition"}
This is a simple admonition with a custom title.
:::

:::simple
This is a simple admonition without a title.
:::

### Custom Titles
::::simple
```markdown
:::note{title="Did you know?"}
You can customize the title of any admonition!
:::
```

:::note{title="Did you know?"}
You can customize the title of any admonition!
:::
::::

### Nested Admonitions
You can nest admonitions by using more colons in the opening and closing tags:

::::note{title="Outer Admonition"}
This is the outer admonition.

:::important{title="Inner Admonition"}
This is a nested important admonition.
:::
::::

## Best Practices

1. Use inline directives (`:`) for elements that are part of your text flow
2. Use block directives (`::`) for standalone elements like embeds
3. Choose appropriate admonition types based on your content
4. Use clear, descriptive titles for your admonitions
5. Don't overuse admonitions - use them to highlight truly important information



## Custom Admonitions
You can create custom admonitions by adding a function to `components/admonitions_pale.tsx` (or `components/admonitions.tsx`) following the pattern of the existing admonitions.

```tsx[title=components/admonitions_pale.tsx,showLineNumbers=true]
import React from 'react';

interface AdmonitionProps {
  title: string;
  children: React.ReactNode;
}

const OverviewAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Overview';
  return (
    <div className="admonition my-3 rounded-xl border bg-indigo-50 text-slate-700">
      <div className="admonition-title flex p-3 text-indigo-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-indigo-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const NoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Note';
  return (
    <div className="admonition my-3 rounded-xl border bg-sky-50 text-slate-700">
      <div className="admonition-title flex p-3 text-sky-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-sky-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const ImportantAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Important';
  return (
    <div className="admonition my-3 rounded-xl border bg-amber-50 text-slate-700">
      <div className="admonition-title flex p-3 text-amber-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-amber-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const TipAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Tip';
  return (
    <div className="admonition my-3 rounded-xl border bg-emerald-50 text-slate-700">
      <div className="admonition-title flex p-3 text-emerald-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-emerald-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const WarningAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Warning';
  return (
    <div className="admonition my-3 rounded-xl border bg-rose-50 text-slate-700">
      <div className="admonition-title flex p-3 text-rose-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-rose-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const CommentAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Comment';
  return (
    <div className="admonition my-3 rounded-xl border bg-neutral-50 text-slate-700">
      <div className="admonition-title flex p-3 text-neutral-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-neutral-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const ExampleAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Example';
  return (
    <div className="admonition my-3 rounded-xl border bg-violet-50 text-slate-700">
      <div className="admonition-title flex p-3 text-violet-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-violet-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const QuoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Quote';
  return (
    <div className="admonition my-3 rounded-xl border bg-teal-50 italic text-slate-700">
      <div className="admonition-title flex p-3 text-teal-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-teal-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const QuestionAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Question';
  return (
    <div className="admonition my-3 rounded-xl border bg-cyan-50 text-slate-700">
      <div className="admonition-title flex p-3 text-cyan-700">
        <svg className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {title}
      </div>
      <div className="border-t-2 border-cyan-200"></div>
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const SimpleAdmonition = ({ title, children }: AdmonitionProps) => {
  return (
    <div className="admonition my-3 rounded-xl border bg-slate-50 text-slate-700">
      {title && (
        <>
          <div className="admonition-title flex p-3 text-slate-700">
            {title}
          </div>
          <div className="border-t-2 border-slate-200"></div>
        </>
      )}
      <div className="admonition-content p-4">{children}</div>
    </div>
  );
}

const AdmonitionComponents = {
  overview: OverviewAdmonition,
  note: NoteAdmonition,
  important: ImportantAdmonition,
  tip: TipAdmonition,
  warning: WarningAdmonition,
  comment: CommentAdmonition,
  example: ExampleAdmonition,
  quote: QuoteAdmonition,
  question: QuestionAdmonition,
  simple: SimpleAdmonition,
}

export default AdmonitionComponents;
```


Another example with a different color scheme:

```tsx[title=components/admonitions.tsx,showLineNumbers=true]
import './admonitions.css'
import { FaRocket } from 'react-icons/fa';
import { PiNotePencilBold } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import { ImWarning } from "react-icons/im";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";


interface AdmonitionProps {
  title: string;
  children: any;
}


const OverviewAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Overview';
  return (
    <div className="admonition admonition-overview bg-red-100 text-slate-600" >
      <div className="admonition-title flex text-red-600">
        <FaRocket className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-red-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const NoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Note';
  return (
    <div className="admonition admonition-note bg-cyan-100 text-slate-600" >
      <div className="admonition-title flex text-blue-600">
        <PiNotePencilBold className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-blue-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const ImportantAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Important';
  return (
    <div className="admonition admonition-important bg-yellow-100 text-slate-600" >
      <div className="admonition-title flex text-orange-500">
        <FaFire className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-orange-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const TipAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Tip';
  return (
    <div className="admonition admonition-tip bg-green-100 text-slate-600" >
      <div className="admonition-title flex text-green-600">
        <FaRegLightbulb className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-green-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const WarningAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Warning';
  return (
    <div className="admonition admonition-warning bg-red-100 text-slate-600" >
      <div className="admonition-title flex text-red-500">
        <ImWarning className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-red-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const CommentAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Comment';
  return (
    <div className="admonition admonition-comment bg-slate-100 text-slate-600" >
      <div className="admonition-title flex text-slate-600">
        <FaRegCommentDots className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-slate-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const ExampleAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Example';
  return (
    <div className="admonition admonition-example bg-purple-100 text-slate-600" >
      <div className="admonition-title flex text-purple-600">
        <AiOutlineExperiment className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-purple-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const QuoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Quote';
  return (
    <div className="admonition admonition-quote bg-blue-100 italic text-slate-600" >
      <div className="admonition-title flex text-blue-600">
        <FaQuoteLeft className='my-auto mr-2' size={'18'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-blue-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const QuestionAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Question';
  return (
    <div className="admonition admonition-Question bg-slate-100 text-slate-600" >
      <div className="admonition-title flex text-slate-600">
        <FaQuestion className='my-auto mr-2' size={'18'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-slate-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}

const SimpleAdmonition = ({ title, children }: AdmonitionProps) => {
  return (
    <div className="admonition admonition-simple bg-gray-50 text-slate-600">
      {title && (
        <>
          <div className="admonition-title flex text-slate-600">
            {title}
          </div>
          <div className="border-t-2 border-slate-500"></div>
        </>
      )}
      <div className="admonition-content">{children}</div>
    </div>
  );
};


const AdmonitionComponents = {
  overview: OverviewAdmonition,
  note: NoteAdmonition,
  important: ImportantAdmonition,
  tip: TipAdmonition,
  warning: WarningAdmonition,
  comment: CommentAdmonition,
  example: ExampleAdmonition,
  quote: QuoteAdmonition,
  question: QuestionAdmonition,
  simple: SimpleAdmonition,
}

export default AdmonitionComponents;
```


```css[title=admonitions.css,showLineNumbers=true]
.admonition {
    margin: 1.5rem 0px;
    padding: 5px 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
  
.admonition-title {
    font-size: 1.2em;
    font-weight: bold;
}
```