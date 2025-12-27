'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ImagePlus, Trash2, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GalleryManagerProps {
  images: string[];
  onUpload: (files: File[]) => Promise<void>;
  onDelete: (imageUrl: string) => Promise<void>;
  maxImages?: number;
}

export function GalleryManager({
  images = [],
  onUpload,
  onDelete,
  maxImages = 10,
}: GalleryManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate number of images
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types and sizes
    const invalidFiles = files.filter(
      file => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024
    );

    if (invalidFiles.length > 0) {
      toast.error('All files must be images under 5MB');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(files);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (imageUrl: string) => {
    setDeletingImage(imageUrl);
    try {
      await onDelete(imageUrl);
      toast.success('Image deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete image');
    } finally {
      setDeletingImage(null);
      setImageToDelete(null);
    }
  };

  return (
    <>
      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5">
          <CardTitle className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5 text-purple-600" />
            Gallery
          </CardTitle>
          <CardDescription>
            Upload up to {maxImages} images ({images.length}/{maxImages})
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Gallery Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-muted group"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setImageToDelete(imageUrl)}
                        disabled={deletingImage === imageUrl}
                      >
                        {deletingImage === imageUrl ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < maxImages && (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <ImagePlus className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  {images.length === 0
                    ? 'Upload your gallery images'
                    : `Add more images (${maxImages - images.length} remaining)`}
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  variant="outline"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Select Images
                    </>
                  )}
                </Button>
              </div>
            )}

            {images.length >= maxImages && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Maximum number of images reached
              </p>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setImageToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => imageToDelete && handleDelete(imageToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
