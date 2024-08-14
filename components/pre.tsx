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
  if (!children || typeof children !== 'object' || !('type' in children) || children.type !== 'code') {
    return <code {...props}>{children}</code>;
  }
  
  const { className, children: code } = 'props' in children ? children.props : {className: '', children: ''};
  
  const match = /language-(\w+)(?:\[(.*?)\])?/.exec(className || '');
  const lang = match ? match[1] : 'plaintext';
  const propertiesString = match && match[2] ? match[2] : '';

  const properties = propertiesString.split(',').reduce((acc, prop) => {
    const [key, value] = prop.split('=');
    acc[key.trim()] = value?.trim() || '';
    return acc;
  }, {} as Record<string, string>);

  const title = properties['title'] || '';
  const isDiff = properties['diff'] === 'true';
  const showLineNumber = properties['showLineNumber'] === 'true';
  
  
  // copy
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({
    opacity: '0',
    visibility: 'hidden',
  });

  const handleCopy = () => {
    setTooltipStyle({ opacity: '1', visibility: 'visible' });
    setTimeout(() => {
      setTooltipStyle({ opacity: '0', visibility: 'hidden' });
    }, 1500);
  };
  
  
  // code diff
  const codeLines = String(code).split('\n');
  const addedLines: number[] = [];
  const removedLines: number[] = [];

  codeLines.forEach((line, index) => {
    if (/^\+\s.*$/.test(line)) addedLines.push(index + 1);
    if (/^\-\s.*$/.test(line)) removedLines.push(index + 1);
  });

  const getLineProps = (lineNumber: number): { style: CSSProperties } => {
    if (isDiff) {
      if (addedLines.includes(lineNumber)) {
        return { style: { display: 'block', backgroundColor: 'rgba(0, 255, 0, 0.3)' } };
      }
      if (removedLines.includes(lineNumber)) {
        return { style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.3)' } };
      }
    }
    return { style: {} };
  };
  
  
  // remove default margin and top border radius if it has a title.
  const customStyle: CSSProperties = title
    ? { margin: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }
    : { margin: '0' };
  
  
  return (
    <div className='my-3'>
        {title && <div className="code-block-title rounded-t-md border-[1px] border-slate-500 bg-white py-0 pl-4 font-mono text-sm text-black">{title}</div>}
        <div className="relative"
          onMouseEnter={() => setShowCopyToClipboard(true)}
          onMouseLeave={() => setShowCopyToClipboard(false)}
        >
         {showCopyToClipboard && (
            <div className="absolute top-1 right-1 flex">
              <div className="tooltip text-white" style={tooltipStyle}>
                Copied!
              </div>
              <CopyToClipboard text={String(code)} onCopy={handleCopy}>
                <FaRegCopy className='text-slate-200 opacity-60 hover:opacity-100' size={24} />
              </CopyToClipboard>
            </div>
          )}
          <SyntaxHighlighter
            // remove default margin and top border radius
            customStyle={customStyle}
            style={a11yDark}
            language={lang}
            wrapLines={true}
            showLineNumbers={showLineNumber}
            lineProps={getLineProps}
            children={String(code).replace(/\n$/, '')}
            codeTagProps={{style: {fontFamily: 'monospace'} }}
          />
        </div>
    </div>
  );
};

export default Pre;