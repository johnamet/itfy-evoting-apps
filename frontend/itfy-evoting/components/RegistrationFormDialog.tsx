'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Loader2, CheckCircle2, AlertCircle, Ticket, User, Mail, 
  Phone, Building2, Briefcase, CalendarCheck, Info,
  FileText, Star
} from 'lucide-react';
import type { FormField, Event } from '@/types';
import { getRegistrationFormByEventId } from '@/lib/mocks/forms';
import { format } from 'date-fns';

interface RegistrationFormDialogProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  [key: string]: string | boolean | string[];
}

interface FormErrors {
  [key: string]: string;
}

// Get icon for field type
const getFieldIcon = (fieldId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'full_name': <User className="w-4 h-4" />,
    'name': <User className="w-4 h-4" />,
    'email': <Mail className="w-4 h-4" />,
    'phone': <Phone className="w-4 h-4" />,
    'organization': <Building2 className="w-4 h-4" />,
    'company': <Building2 className="w-4 h-4" />,
    'job_title': <Briefcase className="w-4 h-4" />,
    'role': <Briefcase className="w-4 h-4" />,
    'ticket_type': <Ticket className="w-4 h-4" />,
  };
  
  return iconMap[fieldId] || null;
};

export function RegistrationFormDialog({ event, open, onOpenChange }: RegistrationFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Get the registration form for this event
  const registrationForm = useMemo(() => {
    return getRegistrationFormByEventId(event._id);
  }, [event._id]);

  // Sort fields by order
  const sortedFields = useMemo(() => {
    if (!registrationForm?.fields) return [];
    return [...registrationForm.fields].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [registrationForm]);

  // Initialize form data with default values
  useEffect(() => {
    if (registrationForm && open) {
      const initialData: FormData = {};
      registrationForm.fields.forEach(field => {
        if (field.default_value !== undefined) {
          initialData[field.field_id] = field.default_value as string | boolean;
        } else if (field.field_type === 'checkbox') {
          initialData[field.field_id] = false;
        } else {
          initialData[field.field_id] = '';
        }
      });
      setFormData(initialData);
      setErrors({});
      setIsSuccess(false);
      setSubmitError(null);
    }
  }, [registrationForm, open]);

  // Validate a single field
  const validateField = (field: FormField, value: string | boolean | string[]): string | null => {
    const validation = field.validation;
    if (!validation) return null;

    const stringValue = typeof value === 'string' ? value : '';

    if (validation.required) {
      if (typeof value === 'boolean' && !value) {
        return validation.custom_message || `${field.label} is required`;
      }
      if (typeof value === 'string' && !value.trim()) {
        return validation.custom_message || `${field.label} is required`;
      }
    }

    if (stringValue && validation.min_length && stringValue.length < validation.min_length) {
      return `${field.label} must be at least ${validation.min_length} characters`;
    }

    if (stringValue && validation.max_length && stringValue.length > validation.max_length) {
      return `${field.label} must be no more than ${validation.max_length} characters`;
    }

    if (field.field_type === 'email' && stringValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(stringValue)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.field_type === 'phone' && stringValue) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      if (!phoneRegex.test(stringValue)) {
        return 'Please enter a valid phone number';
      }
    }

    if (validation.pattern && stringValue) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(stringValue)) {
        return validation.custom_message || `${field.label} format is invalid`;
      }
    }

    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    sortedFields.forEach(field => {
      const error = validateField(field, formData[field.field_id]);
      if (error) {
        newErrors[field.field_id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle field value change
  const handleChange = (fieldId: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/forms/${registrationForm?._id}/submit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ data: formData }),
      // });
      
      console.log('Form submitted:', formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('An error occurred while submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render a single field based on its type
  const renderField = (field: FormField) => {
    const hasError = !!errors[field.field_id];
    const isRequired = field.validation?.required;
    const icon = getFieldIcon(field.field_id);

    switch (field.field_type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white flex items-center gap-2">
              {icon}
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.field_id}
              type={field.field_type === 'email' ? 'email' : field.field_type === 'phone' ? 'tel' : field.field_type === 'url' ? 'url' : 'text'}
              placeholder={field.placeholder}
              value={formData[field.field_id] as string || ''}
              onChange={(e) => handleChange(field.field_id, e.target.value)}
              className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-sky-500 ${hasError ? 'border-red-500' : ''}`}
            />
            {field.help_text && !hasError && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {field.help_text}
              </p>
            )}
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white flex items-center gap-2">
              {icon}
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.field_id}
              type="number"
              placeholder={field.placeholder}
              value={formData[field.field_id] as string || ''}
              onChange={(e) => handleChange(field.field_id, e.target.value)}
              min={field.validation?.min_value}
              max={field.validation?.max_value}
              className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-sky-500 ${hasError ? 'border-red-500' : ''}`}
            />
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white flex items-center gap-2">
              {icon || <FileText className="w-4 h-4" />}
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Textarea
              id={field.field_id}
              placeholder={field.placeholder}
              value={formData[field.field_id] as string || ''}
              onChange={(e) => handleChange(field.field_id, e.target.value)}
              rows={4}
              className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-sky-500 resize-none ${hasError ? 'border-red-500' : ''}`}
            />
            {field.help_text && !hasError && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {field.help_text}
              </p>
            )}
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white flex items-center gap-2">
              {icon}
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Select
              value={formData[field.field_id] as string || ''}
              onValueChange={(value) => handleChange(field.field_id, value)}
            >
              <SelectTrigger className={`bg-white/5 border-white/20 text-white focus:border-sky-500 ${hasError ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {field.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.help_text && !hasError && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {field.help_text}
              </p>
            )}
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.field_id} className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id={field.field_id}
                checked={formData[field.field_id] as boolean || false}
                onCheckedChange={(checked) => handleChange(field.field_id, !!checked)}
                className={`mt-1 border-white/30 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 ${hasError ? 'border-red-500' : ''}`}
              />
              <div className="flex-1">
                <Label htmlFor={field.field_id} className="text-white cursor-pointer">
                  {field.label}
                  {isRequired && <span className="text-red-400 ml-1">*</span>}
                </Label>
                {field.help_text && (
                  <p className="text-xs text-gray-400 mt-1">{field.help_text}</p>
                )}
              </div>
            </div>
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1 ml-7">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.field_id} className="space-y-3">
            <Label className="text-white flex items-center gap-2">
              {icon}
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name={field.field_id}
                    value={option.value}
                    checked={formData[field.field_id] === option.value}
                    onChange={(e) => handleChange(field.field_id, e.target.value)}
                    className="w-4 h-4 text-sky-500 bg-white/5 border-white/30 focus:ring-sky-500"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4" />
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.field_id}
              type="date"
              value={formData[field.field_id] as string || ''}
              onChange={(e) => handleChange(field.field_id, e.target.value)}
              className={`bg-white/5 border-white/20 text-white focus:border-sky-500 ${hasError ? 'border-red-500' : ''}`}
            />
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      case 'rating':
        const ratingValue = parseInt(formData[field.field_id] as string) || 0;
        const maxRating = field.validation?.max_value || 5;
        return (
          <div key={field.field_id} className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Star className="w-4 h-4" />
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <div className="flex gap-1">
              {Array.from({ length: maxRating }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  title={`Rate ${i + 1} out of ${maxRating}`}
                  onClick={() => handleChange(field.field_id, String(i + 1))}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-6 h-6 ${i < ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                  />
                </button>
              ))}
            </div>
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.field_id} className="space-y-2">
            <Label htmlFor={field.field_id} className="text-white">
              {field.label}
              {isRequired && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.field_id}
              placeholder={field.placeholder}
              value={formData[field.field_id] as string || ''}
              onChange={(e) => handleChange(field.field_id, e.target.value)}
              className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-sky-500 ${hasError ? 'border-red-500' : ''}`}
            />
            {hasError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors[field.field_id]}
              </p>
            )}
          </div>
        );
    }
  };

  // No registration form found
  if (!registrationForm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-gray-900/95 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-400" />
              Registration Unavailable
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Registration for this event is not currently available. Please check back later or contact the event organizer for more information.
            </p>
          </div>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-gray-900/95 border-white/10 text-white max-w-md">
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
            <p className="text-gray-300">
              {registrationForm.settings?.confirmation_message || 
                'Thank you for registering. Check your email for confirmation details.'}
            </p>
            <div className="pt-4 space-y-3">
              <div className="p-4 rounded-lg bg-white/5 text-left">
                <p className="text-sm text-gray-400">Event</p>
                <p className="text-white font-medium">{event.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-left">
                <p className="text-sm text-gray-400">Date</p>
                <p className="text-white font-medium">
                  {format(new Date(event.start_date), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => onOpenChange(false)} 
              className="w-full mt-4"
              style={{ backgroundColor: event.color_theme || '#0152be' }}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${event.color_theme || '#0152be'}20` }}
            >
              <Ticket className="w-6 h-6" style={{ color: event.color_theme || '#0152be' }} />
            </div>
            <div>
              <span>Event Registration</span>
              <p className="text-sm font-normal text-gray-400 mt-1">{event.name}</p>
            </div>
          </DialogTitle>
          {registrationForm.description && (
            <DialogDescription className="text-gray-400 mt-2">
              {registrationForm.description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Event Summary */}
        <div className="flex gap-4 p-4 rounded-lg bg-white/5 mt-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarCheck className="w-4 h-4" />
              <span>{format(new Date(event.start_date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            {event.location?.name && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <Building2 className="w-4 h-4" />
                <span>{event.location.name}</span>
              </div>
            )}
          </div>
          {event.registration_fee && !event.registration_fee.is_free && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Registration Fee</p>
              <p className="text-lg font-bold" style={{ color: event.color_theme || '#0152be' }}>
                {event.registration_fee.currency || event.currency} {event.registration_fee.amount}
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {sortedFields.map(field => renderField(field))}

          {/* Error message */}
          {submitError && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{submitError}</p>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 text-white"
              style={{ backgroundColor: event.color_theme || '#0152be' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
