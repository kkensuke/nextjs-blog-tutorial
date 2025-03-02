import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name } = await request.json();
    
    if (!id || !name) {
      return NextResponse.json(
        { message: 'Image ID and new name are required' },
        { status: 400 }
      );
    }
    
    // Find the image file in the images directory
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    const files = fs.readdirSync(uploadDir);
    
    // The file will start with the UUID (id)
    const imageFile = files.find(file => file.startsWith(id));
    
    if (!imageFile) {
      return NextResponse.json(
        { message: 'Image not found' },
        { status: 404 }
      );
    }
    
    // The URL doesn't change because we're not renaming the actual file,
    // we're just storing a display name for it
    const url = `/images/${imageFile}`;
    
    return NextResponse.json({
      message: 'Image renamed successfully',
      id,
      name,
      url
    });
  } catch (error) {
    console.error('Error renaming image:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to rename image' },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Image ID is required' },
        { status: 400 }
      );
    }
    
    // Find the image file in the images directory
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    const files = fs.readdirSync(uploadDir);
    
    // The file will start with the UUID (id)
    const imageFile = files.find(file => file.startsWith(id));
    
    if (!imageFile) {
      return NextResponse.json(
        { message: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Delete the file
    const filePath = path.join(uploadDir, imageFile);
    fs.unlinkSync(filePath);
    
    return NextResponse.json({
      message: 'Image deleted successfully',
      id
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to delete image' },
      { status: 500 }
    );
  }
}