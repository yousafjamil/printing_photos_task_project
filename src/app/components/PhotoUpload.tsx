'use client'; 

import { useState, useCallback } from 'react';
import { Photo } from './../lib/utils';

interface PhotoUploadProps {
  onPhotosChange: (photos: Photo[]) => void;
}

export default function PhotoUpload({ onPhotosChange }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 5 - photos.length); // Limit to 5 
    const newPhotos: Photo[] = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  }, [photos, onPhotosChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files);
    }
  }, [handleFileChange]);

  const removePhoto = useCallback((index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onPhotosChange(updated);
    // Cleanup URL to avoid memory leaks
    URL.revokeObjectURL(photos[index].preview);
  }, [photos, onPhotosChange]);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-sm font-medium text-gray-600">
            Drag & drop or click to upload photos (up to 5)
          </p>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group"> {/* Same  for remove btn */}
              <div className="w-full aspect-square bg-gray-200 rounded"> 
                <img
                  src={photo.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded thumbnail"
                />
              </div>
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2" 
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}