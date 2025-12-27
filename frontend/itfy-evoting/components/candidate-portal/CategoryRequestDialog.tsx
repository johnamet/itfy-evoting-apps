'use client';

import { useState } from 'react';
import { Plus, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { candidatesApi } from '@/lib/api/candidates';
import type { Category } from '@/types';

interface CategoryRequestProps {
  currentCategories: string[];
  availableCategories: Category[];
  onSuccess?: () => void;
}

export function CategoryRequestDialog({
  currentCategories,
  availableCategories,
  onSuccess,
}: CategoryRequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter out categories already assigned
  const eligibleCategories = availableCategories.filter(
    (cat) => !currentCategories.includes(cat._id)
  );

  const handleSubmit = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await candidatesApi.requestCategoryAddition(selectedCategory);
      if (response.success) {
        toast.success('Category request submitted! Awaiting admin approval.');
        setIsOpen(false);
        setSelectedCategory('');
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit category request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (eligibleCategories.length === 0) {
    return (
      <Card className="border-2 border-muted">
        <CardContent className="p-6 text-center">
          <Check className="h-12 w-12 mx-auto mb-3 text-green-600" />
          <p className="text-sm text-muted-foreground">
            You're already nominated in all available categories!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Request Additional Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Additional Category</DialogTitle>
          <DialogDescription>
            Select a category you'd like to be nominated in. Your request will be reviewed by
            administrators.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {eligibleCategories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{category.name}</span>
                      {category.description && (
                        <span className="text-xs text-muted-foreground">
                          {category.description}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-600">
              <strong>Note:</strong> Your request will be reviewed by administrators. You'll be
              notified once it's approved or declined.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
