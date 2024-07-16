"use client";

import { CSSProperties, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

// This function regards the code block with no language specified as inline code
const CodeBlock = ({node, className, children, ...props}: any) => {
  
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
  const [styleTooltip, setStyleTooltip] = useState({
    opacity: '0',
    visiblity: 'hidden',
  });

  const handleClick = () => {
    setStyleTooltip({ opacity: '1', visiblity: 'visible' });
    setTimeout(function () {
      setStyleTooltip({ opacity: '0', visiblity: 'hidden' });
    }, 1500);
  };
  
  const copyButton = ( // use "= showCopyToClipboard && (" if you want to show the copy button only on hover
    <div className="absolute top-1 right-1 flex" >
      <div style={styleTooltip}>
        Copied!
      </div>
      <CopyToClipboard text={children} onCopy={() => handleClick()}>
        <FaRegCopy className='opacity-60 hover:opacity-100' size={24} />
      </CopyToClipboard>
    </div>
  )
  
  // https://goodlife.tech/posts/react-markdown-code-highlight.html
  const match = /language-(\w*)(:*.*)/.exec(className || '');
  console.log('match', match);
  const lang = match && match[1] ? match[1] : '';
  const [lang1, lang2] = lang.split('__');
  const filename = match && match[2] ? match[2].slice(1) : '';

  const { added, removed } = (() => {
    const added: number[] = [];
    const removed: number[] = [];
    let lineNumber = 0;
    const lines = String(children).split('\n');
    for (let i = 0; i < lines.length; i++) {
      lineNumber++;
      if (/^\+\s.*$/.test(lines[i])) {
        added.push(lineNumber);
      }
      if (/^\-\s.*$/.test(lines[i])) {
        removed.push(lineNumber);
      }
    }
    return { added, removed };
  })();

  const lineProps: lineTagPropsFunction = (lineNumber) => {
    let style: CSSProperties = {};
    if (lang2 === 'diff') {
      if (added.includes(lineNumber)) {
        style.display = 'block';
        style.backgroundColor = 'rgba(0, 255, 0, 0.4)';
      }
      if (removed.includes(lineNumber)) {
        style.display = 'block';
        style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
      }
    }
    return { style };
  };
  
  if (props.inline) {
    return (
      <code {...props} className="border border-gray-300">{children}</code>
    );
  }
  
  const codeblock = match ? (
    // codeblock
    <>
      {filename && <div className="code-block-title bg-sky-700 pl-4">{filename}</div>}
      <div className="relative"
      onMouseEnter={() => setShowCopyToClipboard(true)}
      onMouseLeave={() => setShowCopyToClipboard(false)}
      >
        {copyButton}
        <SyntaxHighlighter
          customStyle={{
            margin: '0', // remove the default margin
          }}
          style={a11yDark}
          language={lang1}
          wrapLines={true}
          showLineNumbers={true}
          lineProps={lineProps}
          children={String(children).replace(/\n$/, '')}
        />
      </div>
    </>
  ) : (
    // inline code
    <code {...props} className="border border-gray-300">
      {children}
    </code>
  );
  
  return (
    // <div> causes an error here
    <>
      {codeblock}
    </>
  );
}

export default CodeBlock
