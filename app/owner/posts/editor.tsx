"use client";

import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/card';
import { PencilIcon, SaveIcon, ImageIcon } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { apiClient } from '@/lib/api/client';
import { API } from '@/config/constants';
import ImageUploadPanel, { UploadedImage } from './ImageUploadPanel';

export default function PostEditor() {
  const [post, setPost] = useState({
    title: '',
    subtitle: '',
    content: '',
    tags: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [status, setStatus] = useState('');
  const [showImageUploader, setShowImageUploader] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const markdownEditorRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');
  
    const formattedTags = post.tags.split(',').map(tag => tag.trim()).filter(Boolean).join(', ');
    
    const { data, error } = await apiClient.post(API.BLOG.POSTS, {
      ...post,
      tags: formattedTags
    });
  
    if (error) {
      console.error('Error saving post:', error);
      // Check if the error is about a duplicate title
      if (error.includes('already exists')) {
        setStatus('Error: A post with this title already exists. Please use a different title.');
      } else {
        setStatus('Error saving post. Please try again.');
      }
      return;
    }
  
    setStatus('Post saved successfully!');
    
    // Reset form
    setPost({
      title: '',
      subtitle: '',
      content: '',
      tags: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    // Clear uploaded images
    setUploadedImages([]);
  
    // Clear success message after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  }

  const handleInsertImageUrl = (url: string) => {
    if (!markdownEditorRef.current) return;

    const textarea = markdownEditorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Get image name if we can match it from our uploads
    const image = uploadedImages.find(img => img.url === url);
    const imageAlt = image ? image.name : 'Image';
    
    // Create markdown image syntax with a new line after it
    const imageMarkdown = `![${imageAlt}](${url})\n`;
    
    // Insert at cursor position or replace selected text
    const newContent = 
      post.content.substring(0, start) + 
      imageMarkdown +
      post.content.substring(end);
    
    setPost({
      ...post,
      content: newContent
    });
    
    // Set focus back to textarea and place cursor on the new line after inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = start + imageMarkdown.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const toggleImageUploader = () => {
    setShowImageUploader(!showImageUploader);
  };

  return (
    <ErrorBoundary>
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PencilIcon className="h-5 w-5" />
          New Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={post.subtitle}
              onChange={(e) => setPost({ ...post, subtitle: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={post.date}
              onChange={(e) => setPost({ ...post, date: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={post.tags}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
              <button
                type="button"
                onClick={toggleImageUploader}
                className="flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
              >
                <ImageIcon size={14} />
                {showImageUploader ? 'Hide Image Manager' : 'Show Image Manager'}
              </button>
            </div>
            
            {showImageUploader && (
              <div className="mb-4 mt-2 rounded-lg border border-gray-200 p-4">
                <ImageUploadPanel 
                  onImageUrlCopy={handleInsertImageUrl} 
                  uploadedImages={uploadedImages}
                  setUploadedImages={setUploadedImages}
                />
              </div>
            )}
            
            <textarea
              ref={markdownEditorRef}
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              rows={15}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {status && (
            <div className={`rounded-md p-4 ${
              status.includes('Error') 
                ? 'bg-red-50 text-red-700' 
                : 'bg-green-50 text-green-700'
            }`}>
              {status}
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <SaveIcon className="h-4 w-4" />
            Save Post
          </button>
        </form>
      </CardContent>
    </Card>
    </ErrorBoundary>
  );
}