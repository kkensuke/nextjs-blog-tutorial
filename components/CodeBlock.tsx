"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

const CodeBlock = ({ children, className, node, ...rest}: any) => {
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
  
  const copyButton = ( // use "showCopyToClipboard && (" if you want to show the copy button only on hover
    <div className="absolute top-1 right-1 flex" >
      <div style={styleTooltip}>
        Copied!
      </div>
      <CopyToClipboard text={children} onCopy={() => handleClick()}>
        <FaRegCopy className='opacity-60 hover:opacity-100' size={24} />
      </CopyToClipboard>
    </div>
  )
  
  const match = /language-(\w+)/.exec(className || '');
  const codeblock = match ? (
    // codeblock
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
        language={match[1]}
        showLineNumbers={true}
        PreTag="div"
        children={String(children).replace(/\n$/, '')} {...rest}
      />
    </div>
  ) : (
    // inline code (add border and {className} to <code> if you want to style inline code)
    <code className="border border-gray-300">
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
