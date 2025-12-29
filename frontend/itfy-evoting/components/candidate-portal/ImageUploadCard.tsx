'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, Trash2, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface ImageUploadCardProps {
  title: string;
  description: string;
  currentImage?: string;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
  aspectRatio?: 'square' | 'video' | 'auto';
  icon?: React.ElementType;
}

export function ImageUploadCard({
  title,
  description,
  currentImage,
  onUpload,
  onDelete,
  aspectRatio = 'square',
  icon: Icon = Camera,
}: ImageUploadCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      await onUpload(file);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      setPreview(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
      setPreview(null);
      toast.success('Image deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete image');
    } finally {
      setIsDeleting(false);
    }
  };

  const displayImage = preview || currentImage;
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: 'aspect-auto',
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Image Display */}
          <div className={`relative ${aspectClasses[aspectRatio]} w-full bg-muted rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25`}>
            {displayImage ? (
              <>
                <Image
                  src={displayImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Icon className="h-12 w-12 mb-2" />
                <p className="text-sm">No image uploaded</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isDeleting}
              className="flex-1"
              variant={displayImage ? 'outline' : 'default'}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {displayImage ? 'Change' : 'Upload'}
                </>
              )}
            </Button>
            {displayImage && onDelete && (
              <Button
                onClick={handleDelete}
                disabled={isUploading || isDeleting}
                variant="destructive"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
