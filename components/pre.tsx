"use client";

import { CSSProperties, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";
import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown';

// ref:
// https://goodlife.tech/posts/react-markdown-code-highlight.html
// https://www.newt.so/docs/tutorials/customize-code-block-using-react-markdown

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== 'object') {
    return <code {...props}>{children}</code>
  }
  const childType = 'type' in children ? children.type : '';
  if (childType !== 'code') {
    return <code {...props}>{children}</code>
  }
  
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
  const [styleTooltip, setStyleTooltip] = useState({
    opacity: '0',
    visiblity: 'hidden',
  });

  const handleClick = () => {
    setStyleTooltip({ opacity: '1', visiblity: 'visible' });
    setTimeout(() => {
      setStyleTooltip({ opacity: '0', visiblity: 'hidden' });
    }, 1500);
  };
  
  const childProps = 'props' in children ? children.props : {};
  const { className, children: code } = childProps;
  const match = /language-(\w*)(:*.*)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  const [lang1, lang2] = lang.split('__');
  const filename = match && match[2] ? match[2].slice(1) : '';
  
  const copyButton = (
    <div className="absolute top-1 right-1 flex">
      <div className="tooltip text-white" style={styleTooltip}>
        Copied!
      </div>
      <CopyToClipboard text={code} onCopy={handleClick}>
        <FaRegCopy className='text-slate-200 opacity-60 hover:opacity-100' size={24} />
      </CopyToClipboard>
    </div>
  );
  
  const { added, removed } = (() => {
    const added: number[] = [];
    const removed: number[] = [];
    let lineNumber = 0;
    const lines = String(code).split('\n');
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

  const lineProps = (lineNumber: number): { style: CSSProperties } => {
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
  
  // remove default margin and top border radius if it has a filename. fontfamily: 'monospace'
  const customStyle = !filename ? { margin: '0' } : { margin: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' };

  return (
    <div className='my-3'>
        {filename && <div className="code-block-title rounded-t-md border-[1px] border-slate-500 bg-white py-0 pl-4 font-mono text-sm text-black">{filename}</div>}
        <div className="relative"
          onMouseEnter={() => setShowCopyToClipboard(true)}
          onMouseLeave={() => setShowCopyToClipboard(false)}
        >
          {showCopyToClipboard && copyButton}
          <SyntaxHighlighter
            // remove default margin and top border radius
            customStyle={customStyle}
            style={a11yDark}
            language={lang1}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={lineProps}
            children={String(code).replace(/\n$/, '')}
          />
        </div>
    </div>
  );
};

export default Pre;
