'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Loader2, Upload, X, AlertCircle } from 'lucide-react';
import { submissionsApi } from '@/lib/api/submissions';
import type { Form, FormField } from '@/types';
import { cn } from '@/lib/utils';

interface NominationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: Form;
  preselectedCategoryId?: string;
}

export default function NominationFormModal({
  isOpen,
  onClose,
  form,
  preselectedCategoryId
}: NominationFormModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize form data
  useEffect(() => {
    if (form.fields) {
      const initialData: Record<string, unknown> = {};
      form.fields.forEach((field: FormField) => {
        if (field.field_type === 'checkbox') {
          initialData[field.field_id] = [];
        } else {
          initialData[field.field_id] = '';
        }
      });
      
      // Pre-select category if provided
      if (preselectedCategoryId) {
        const categoryField = form.fields.find(f => f.field_type === 'select' && f.label.toLowerCase().includes('category'));
        if (categoryField) {
          initialData[categoryField.field_id] = preselectedCategoryId;
        }
      }
      
      setFormData(initialData);
    }
  }, [form, preselectedCategoryId]);

  const validateField = (field: FormField, value: unknown): string | null => {
    // Required validation
    if (field.validation?.required) {
      if (!value || (Array.isArray(value) && value.length === 0) || value === '') {
        return `${field.label} is required`;
      }
    }

    // Email validation
    if (field.field_type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.field_type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    // URL validation
    if (field.field_type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    // Number validation
    if (field.field_type === 'number' && value) {
      if (field.validation?.min_value !== undefined && value < field.validation.min_value) {
        return `Minimum value is ${field.validation.min_value}`;
      }
      if (field.validation?.max_value !== undefined && value > field.validation.max_value) {
        return `Maximum value is ${field.validation.max_value}`;
      }
    }

    // String length validation
    if ((field.field_type === 'text' || field.field_type === 'textarea') && value) {
      if (field.validation?.min_length && value.length < field.validation.min_length) {
        return `Minimum length is ${field.validation.min_length} characters`;
      }
      if (field.validation?.max_length && value.length > field.validation.max_length) {
        return `Maximum length is ${field.validation.max_length} characters`;
      }
    }

    return null;
  };

  const handleInputChange = (fieldId: string, value: unknown, field: FormField) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }

    // Validate on change for better UX
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldId]: error }));
    }
  };

  const handleFileChange = (fieldId: string, file: File | null) => {
    if (file) {
      setFiles(prev => ({ ...prev, [fieldId]: file }));
      setFormData(prev => ({ ...prev, [fieldId]: file.name }));
    } else {
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fieldId];
        return newFiles;
      });
      setFormData(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    form.fields?.forEach((field: FormField) => {
      const fieldId = field.field_id;
      const value = formData[fieldId];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[fieldId] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submissionData: Record<string, unknown> = {};
      
      form.fields?.forEach((field: FormField) => {
        const fieldId = field.field_id;
        submissionData[fieldId] = formData[fieldId];
      });

      // Submit form
      let response;
      if (Object.keys(files).length > 0) {
        response = await submissionsApi.submitWithFiles(form._id, submissionData, files);
      } else {
        response = await submissionsApi.submit(form._id, submissionData);
      }

      if (response.success) {
        setIsSubmitted(true);
        
        // Close modal after showing success message
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({});
          setFiles({});
          setErrors({});
        }, 2500);
      } else {
        setSubmitError(response.message || 'Failed to submit form');
      }
    } catch (error: unknown) {
      console.error('Error submitting nomination:', error);
      setSubmitError((error as Error).message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldId = field.field_id;
    const value = formData[fieldId] || '';
    const error = errors[fieldId];

    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <div key={fieldId} className="space-y-2">
            <Label htmlFor={fieldId} className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleInputChange(fieldId, e.target.value, field)}
              className={cn(
                'bg-white/5 border-white/10 text-white placeholder:text-slate-400',
                error && 'border-red-500'
              )}
            />
            {field.help_text && (
              <p className="text-xs text-slate-400">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={fieldId} className="space-y-2">
            <Label htmlFor={fieldId} className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleInputChange(fieldId, e.target.value, field)}
              rows={4}
              className={cn(
                'bg-white/5 border-white/10 text-white placeholder:text-slate-400',
                error && 'border-red-500'
              )}
            />
            {field.help_text && (
              <p className="text-xs text-slate-400">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
      case 'dropdown':
        return (
          <div key={fieldId} className="space-y-2">
            <Label htmlFor={fieldId} className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Select
              value={value}
              onValueChange={(val) => handleInputChange(fieldId, val, field)}
            >
              <SelectTrigger className={cn(
                'bg-white/5 border-white/10 text-white',
                error && 'border-red-500'
              )}>
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {field.options?.map((option, idx) => (
                  <SelectItem
                    key={idx}
                    value={typeof option === 'object' ? option.value : option}
                    className="text-white hover:bg-slate-700"
                  >
                    {typeof option === 'object' ? option.label : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.help_text && (
              <p className="text-xs text-slate-400">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={fieldId} className="space-y-2">
            <Label className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option, idx) => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;
                
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`${fieldId}-${idx}`}
                      name={fieldId}
                      value={optionValue}
                      checked={value === optionValue}
                      onChange={(e) => handleInputChange(fieldId, e.target.value, field)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <Label
                      htmlFor={`${fieldId}-${idx}`}
                      className="text-slate-300 cursor-pointer font-normal"
                    >
                      {optionLabel}
                    </Label>
                  </div>
                );
              })}
            </div>
            {field.help_text && (
              <p className="text-xs text-slate-400">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldId} className="space-y-2">
            <Label className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option, idx) => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;
                const isChecked = Array.isArray(value) && value.includes(optionValue);
                
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Checkbox
                      id={`${fieldId}-${idx}`}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(Array.isArray(value) ? value : []), optionValue]
                          : (Array.isArray(value) ? value : []).filter((v: unknown) => v !== optionValue);
                        handleInputChange(fieldId, newValue, field);
                      }}
                      className="border-white/20"
                    />
                    <Label
                      htmlFor={`${fieldId}-${idx}`}
                      className="text-slate-300 cursor-pointer font-normal"
                    >
                      {optionLabel}
                    </Label>
                  </div>
                );
              })}
            </div>
            {field.help_text && (
              <p className="text-xs text-slate-400">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={fieldId} className="space-y-2">
            <Label htmlFor={fieldId} className="text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <div className={cn(
              'border-2 border-dashed rounded-lg p-4',
              error ? 'border-red-500' : 'border-white/20 hover:border-purple-500/50',
              'transition-colors cursor-pointer'
            )}>
              <input
                id={fieldId}
                type="file"
                onChange={(e) => handleFileChange(fieldId, e.target.files?.[0] || null)}
                className="hidden"
                accept={field.validation?.accept}
              />
              <label htmlFor={fieldId} className="cursor-pointer">
                {files[fieldId] ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Upload className="w-4 h-4 text-green-400" />
                      <span>{files[fieldId].name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFileChange(fieldId, null);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300">
                      Click to upload or drag and drop
                    </p>
                    {field.help_text && (
                      <p className="text-xs text-slate-400 mt-1">{field.help_text}</p>
                    )}
                  </div>
                )}
              </label>
            </div>
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Nomination Submitted!</h3>
            <p className="text-slate-300">
              Your nomination has been successfully submitted for review. You&apos;ll be notified once it&apos;s approved.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {form.name}
          </DialogTitle>
          {form.description && (
            <p className="text-slate-300 text-sm mt-2">{form.description}</p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {form.fields?.map(field => renderField(field))}

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {submitError}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Nomination'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
