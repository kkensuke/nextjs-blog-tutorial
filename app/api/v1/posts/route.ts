import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { title, subtitle, content, tags, date } = await request.json();
    
    // Create filename from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${slug}.md`;
    
    // Create markdown content
    const markdown = `---
title: "${title}"
date: "${date}"
subtitle: "${subtitle}"
tags: [${tags}]
---

${content}`;

    // Save to posts directory
    const postsDir = path.join(process.cwd(), 'posts');
    fs.writeFileSync(path.join(postsDir, filename), markdown);

    return NextResponse.json({ message: 'Post saved successfully', slug });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { message: 'Error saving post' },
      { status: 500 }
    );
  }
}