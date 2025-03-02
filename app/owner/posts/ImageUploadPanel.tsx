import React, { useState, useRef } from 'react';
import { Upload, X, Pencil, Check, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react';
import { API, LIMITS } from '@/config/constants';

export interface UploadedImage {
  id: string;
  name: string;
  originalName: string;
  url: string;
  size: number;
  isEditing?: boolean;
}

interface ImageUploadPanelProps {
  onImageUrlCopy: (url: string) => void;
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const ImageUploadPanel: React.FC<ImageUploadPanelProps> = ({ 
  onImageUrlCopy, 
  uploadedImages,
  setUploadedImages 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    // Check file sizes
    const maxSizeBytes = LIMITS.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
    const oversizedFiles = Array.from(files).filter(file => file.size > maxSizeBytes);
    
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => f.name).join(', ');
      setUploadError(`Some files exceed the ${LIMITS.MAX_UPLOAD_SIZE_MB}MB limit: ${fileNames}`);
      setIsUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await fetch(API.UPLOAD.IMAGES, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const data = await response.json();
      
      // Add new images to the list
      const newImages = data.images.map((img: any) => ({
        id: img.id,
        name: img.name,
        originalName: img.originalName,
        url: img.url,
        size: img.size,
        isEditing: false,
      }));

      setUploadedImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRenameClick = (id: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isEditing: true } : img
      )
    );
  };

  const handleNameChange = (id: string, newName: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, name: newName } : img
      )
    );
  };

  const handleSaveRename = async (id: string) => {
    const image = uploadedImages.find((img) => img.id === id);
    if (!image) return;

    try {
      const response = await fetch(API.UPLOAD.RENAME(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: image.name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to rename image');
      }

      const data = await response.json();
      
      // Update the image in the list with the new URL
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, url: data.url, isEditing: false } : img
        )
      );
    } catch (error) {
      console.error('Error renaming image:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to rename image');
      
      // Reset to original name on error
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, isEditing: false } : img
        )
      );
    }
  };

  const handleCancelRename = (id: string) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isEditing: false } : img
      )
    );
  };

  const handleCopyUrl = (e: React.MouseEvent, url: string) => {
    // Prevent button click from bubbling up or submitting forms
    e.preventDefault();
    e.stopPropagation();
    
    // Call the callback to handle the URL copy
    onImageUrlCopy(url);
  };
  
  const handleDeleteImage = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await fetch(API.UPLOAD.DELETE(id), {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete image');
        }
        
        // Remove the image from the list
        setUploadedImages((prev) => prev.filter((img) => img.id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
        setUploadError(error instanceof Error ? error.message : 'Failed to delete image');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Image Manager</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUploadClick();
          }}
          disabled={isUploading}
          className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          type="button"
        >
          <Upload size={14} />
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      {uploadError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {uploadError}
        </div>
      )}

      {uploadedImages.length > 0 ? (
        <div className="rounded-lg border border-gray-200">
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Preview</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Size</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {uploadedImages.map((image) => (
                  <tr key={image.id}>
                    <td className="whitespace-nowrap px-3 py-2">
                      <div className="h-12 w-12 overflow-hidden rounded border border-gray-200">
                        <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {image.isEditing ? (
                        <input
                          type="text"
                          value={image.name}
                          onChange={(e) => handleNameChange(image.id, e.target.value)}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm">{image.name}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                      {formatFileSize(image.size)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-center">
                      <div className="flex justify-center space-x-2">
                        {image.isEditing ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleSaveRename(image.id);
                              }}
                              className="rounded bg-green-100 p-1 text-green-600 hover:bg-green-200"
                              title="Save"
                              type="button"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleCancelRename(image.id);
                              }}
                              className="rounded bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                              title="Cancel"
                              type="button"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleRenameClick(image.id);
                              }}
                              className="rounded bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                              title="Rename"
                              type="button"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={(e) => handleCopyUrl(e, image.url)}
                              className="rounded bg-blue-100 p-1 text-blue-600 hover:bg-blue-200"
                              title="Copy URL"
                              type="button"
                            >
                              <LinkIcon size={16} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteImage(e, image.id)}
                              className="rounded bg-red-100 p-1 text-red-600 hover:bg-red-200"
                              title="Delete Image"
                              type="button"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-500">No images uploaded yet</p>
          <p className="mt-1 text-xs text-gray-400">Upload images to include in your posts (max {LIMITS.MAX_UPLOAD_SIZE_MB}MB per file)</p>
        </div>
      )}

      <div className="mt-2 rounded-md bg-blue-50 p-3 text-xs text-blue-600">
        <p>
          <strong>Tips:</strong>
        </p>
        <ul className="mt-1 list-inside list-disc space-y-1">
          <li>Maximum file size: {LIMITS.MAX_UPLOAD_SIZE_MB}MB per image</li>
          <li>To use an image in your markdown, copy its URL and use: <code className="mt-1 block bg-blue-100 p-1">![Image description](image-url)</code></li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploadPanel;