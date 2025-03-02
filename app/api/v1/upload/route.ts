// app/api/v1/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { LIMITS } from '@/config/constants';

// Multer-like middleware function for Next.js Route Handlers
async function parseMultipartForm(request: Request) {
  const formData = await request.formData();
  const files: any[] = formData.getAll('images');
  
  if (!files || files.length === 0) {
    throw new Error('No images provided');
  }
  
  const parsedFiles = [];
  const maxSizeBytes = LIMITS.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  
  for (const file of files) {
    if (!(file instanceof File)) {
      continue;
    }
    
    // Check file size server-side as well for security
    if (file.size > maxSizeBytes) {
      throw new Error(`File "${file.name}" exceeds the maximum allowed size of ${LIMITS.MAX_UPLOAD_SIZE_MB}MB`);
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const fileExtension = path.extname(originalName);
    const id = uuidv4();
    const fileName = `${id}${fileExtension}`;
    
    parsedFiles.push({
      id,
      buffer,
      originalName,
      fileName,
      size: file.size,
      type: file.type,
    });
  }
  
  return parsedFiles;
}

export async function POST(request: Request) {
  try {
    // Make sure the upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const files = await parseMultipartForm(request);
    
    const savedFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(uploadDir, file.fileName);
        await writeFile(filePath, file.buffer);
        
        const name = path.parse(file.originalName).name;
        
        return {
          id: file.id,
          name: name,
          originalName: file.originalName,
          url: `/images/${file.fileName}`,
          size: file.size,
        };
      })
    );
    
    return NextResponse.json({ 
      message: 'Files uploaded successfully', 
      images: savedFiles 
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to upload files' },
      { status: 500 }
    );
  }
}