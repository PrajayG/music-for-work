import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Very basic markdown parsing
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-bold mt-6 mb-4 text-ocean-foam">{line.substring(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-semibold mt-5 mb-3 text-ocean-foam">{line.substring(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-medium mt-4 mb-2 text-ocean-foam">{line.substring(4)}</h3>);
    } else if (line.trim() === '') {
      // elements.push(<br key={key++} />); // Skip empty lines or add spacing
    } else {
      elements.push(<p key={key++} className="mb-4 leading-relaxed text-ocean-mist">{line}</p>);
    }
  }

  return <div className="prose prose-invert max-w-none">{elements}</div>;
}
