"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  vscDarkPlus,      // GitHub-like dark theme
  dracula,          // Popular dark theme
  atomDark,         // Atom editor dark theme
  oneDark,          // One Dark theme
  synthwave84,      // Retro/cyberpunk theme
  materialDark,     // Material design dark
  coldarkDark,      // Modern dark theme
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy, Check } from 'lucide-react';

// Theme options with descriptions
const themes = {
  vscDarkPlus: {
    style: vscDarkPlus,
    name: 'VSCode Dark+',
    description: 'Clean and professional, similar to VSCode'
  },
  dracula: {
    style: dracula,
    name: 'Dracula',
    description: 'Popular dark theme with vibrant colors'
  },
  atomDark: {
    style: atomDark,
    name: 'Atom Dark',
    description: 'Inspired by Atom editor'
  },
  oneDark: {
    style: oneDark,
    name: 'One Dark',
    description: 'Elegant and balanced dark theme'
  },
  synthwave84: {
    style: synthwave84,
    name: 'Synthwave',
    description: 'Retro cyberpunk vibes'
  },
  materialDark: {
    style: materialDark,
    name: 'Material Dark',
    description: 'Based on Material Design'
  },
  coldarkDark: {
    style: coldarkDark,
    name: 'Coldark Dark',
    description: 'Modern minimalist dark theme'
  }
};

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('coldarkDark');
  
  // Handle non-code blocks
  if (!children || typeof children !== 'object' || !('type' in children)) {
    return <code {...props}>{children}</code>;
  }

  // Extract code and language
  const { className = '', children: codeString ='' } = 'props' in children ? children.props : {};
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || 'plaintext';

  // Handle copy functionality
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="my-4 space-y-2">
      {/* Theme Selector */}
      {/* <div className="flex items-center gap-2">
        <label className="text-sm text-slate-500">Theme:</label>
        <select 
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.name} - {theme.description}
            </option>
          ))}
        </select>
      </div> */}

      {/* Code Block */}
      <div className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
        <div className="relative">
          <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <CopyToClipboard text={String(codeString)} onCopy={handleCopy}>
              <button className="rounded-md bg-slate-700/50 p-2 text-slate-400 backdrop-blur-sm transition-colors hover:bg-slate-700 hover:text-slate-200">
                {isCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </CopyToClipboard>
          </div>

          <SyntaxHighlighter
            language={language}
            style={themes[currentTheme as keyof typeof themes].style}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '14px',
              padding: '1.5rem',
            }}
            codeTagProps={{
              style: { fontFamily: 'ui-monospace, monospace' }
            }}
          >
            {String(codeString).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;