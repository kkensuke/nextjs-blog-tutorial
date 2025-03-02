import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { title, subtitle, content, tags, date } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Create filename from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${slug}.md`;
    
    // Check if a file with this slug already exists
    const postsDir = path.join(process.cwd(), 'posts');
    const existingFiles = fs.readdirSync(postsDir);
    
    if (existingFiles.includes(filename)) {
      return NextResponse.json(
        { message: 'A post with this title already exists. Please use a different title.' },
        { status: 409 } // 409 Conflict status code
      );
    }
    
    // Create markdown content
    const markdown = `---
title: "${title}"
date: "${date}"
subtitle: "${subtitle}"
tags: [${tags}]
---

${content}`;

    // Save to posts directory
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