// src/lib/mocks/forms.ts
import type { Form } from '@/types';

export const mockForms: Form[] = [
  {
    _id: 'form1',
    name: 'Ghana Tech Awards 2025 - Event Registration',
    description: 'Register to attend the Ghana Tech Awards 2025 ceremony. Fill in your details to secure your spot.',
    slug: 'ghana-tech-awards-2025-registration',
    form_type: 'registration',
    event: 'event1',
    fields: [
      {
        field_id: 'full_name',
        label: 'Full Name',
        field_type: 'text',
        placeholder: 'Enter your full name',
        help_text: 'As it should appear on your badge',
        validation: {
          required: true,
          min_length: 2,
          max_length: 100,
        },
        order: 1,
      },
      {
        field_id: 'email',
        label: 'Email Address',
        field_type: 'email',
        placeholder: 'your.email@example.com',
        help_text: 'We\'ll send your ticket confirmation here',
        validation: {
          required: true,
        },
        order: 2,
      },
      {
        field_id: 'phone',
        label: 'Phone Number',
        field_type: 'phone',
        placeholder: '+233 XX XXX XXXX',
        help_text: 'For event updates and notifications',
        validation: {
          required: true,
        },
        order: 3,
      },
      {
        field_id: 'organization',
        label: 'Organization / Company',
        field_type: 'text',
        placeholder: 'Your company or organization name',
        help_text: 'Optional - will be displayed on your badge',
        validation: {
          required: false,
          max_length: 100,
        },
        order: 4,
      },
      {
        field_id: 'job_title',
        label: 'Job Title / Role',
        field_type: 'text',
        placeholder: 'e.g. Software Engineer, CEO, Student',
        validation: {
          required: false,
          max_length: 50,
        },
        order: 5,
      },
      {
        field_id: 'ticket_type',
        label: 'Ticket Type',
        field_type: 'select',
        placeholder: 'Select your ticket type',
        options: [
          { label: 'Standard Entry - GHS 50', value: 'standard' },
          { label: 'VIP Entry - GHS 150', value: 'vip' },
          { label: 'Student Entry - GHS 25 (ID required)', value: 'student' },
        ],
        validation: {
          required: true,
        },
        order: 6,
      },
      {
        field_id: 'dietary_requirements',
        label: 'Dietary Requirements',
        field_type: 'select',
        placeholder: 'Select if applicable',
        options: [
          { label: 'No special requirements', value: 'none' },
          { label: 'Vegetarian', value: 'vegetarian' },
          { label: 'Vegan', value: 'vegan' },
          { label: 'Halal', value: 'halal' },
          { label: 'Kosher', value: 'kosher' },
          { label: 'Gluten-free', value: 'gluten_free' },
          { label: 'Other (specify in notes)', value: 'other' },
        ],
        validation: {
          required: false,
        },
        order: 7,
      },
      {
        field_id: 'how_heard',
        label: 'How did you hear about this event?',
        field_type: 'select',
        placeholder: 'Select an option',
        options: [
          { label: 'Social Media', value: 'social_media' },
          { label: 'Friend/Colleague', value: 'referral' },
          { label: 'Company/Organization', value: 'organization' },
          { label: 'News/Media', value: 'news' },
          { label: 'Previous Attendee', value: 'returning' },
          { label: 'Other', value: 'other' },
        ],
        validation: {
          required: false,
        },
        order: 8,
      },
      {
        field_id: 'special_needs',
        label: 'Accessibility Requirements',
        field_type: 'textarea',
        placeholder: 'Let us know if you have any accessibility needs or special requirements...',
        help_text: 'We want to ensure everyone has a great experience',
        validation: {
          required: false,
          max_length: 500,
        },
        order: 9,
      },
      {
        field_id: 'terms_accepted',
        label: 'I agree to the event terms and conditions',
        field_type: 'checkbox',
        help_text: 'You must accept the terms to register',
        validation: {
          required: true,
        },
        order: 10,
      },
      {
        field_id: 'marketing_consent',
        label: 'I would like to receive updates about future events',
        field_type: 'checkbox',
        help_text: 'We\'ll send you information about similar events',
        validation: {
          required: false,
        },
        order: 11,
      },
    ],
    settings: {
      allow_anonymous: false,
      require_email_verification: true,
      submissions_per_user: 1,
      confirmation_message: 'Thank you for registering! Check your email for your ticket confirmation.',
    },
    status: 'active',
    submission_count: 387,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-12-19T00:00:00Z',
  },
  {
    _id: 'form2',
    name: 'Youth Innovation Summit 2025 - Registration',
    description: 'Join us for the Youth Innovation Summit 2025. Register now to be part of this exciting event.',
    slug: 'youth-innovation-summit-2025-registration',
    form_type: 'registration',
    event: 'event2',
    fields: [
      {
        field_id: 'full_name',
        label: 'Full Name',
        field_type: 'text',
        placeholder: 'Enter your full name',
        validation: {
          required: true,
          min_length: 2,
        },
        order: 1,
      },
      {
        field_id: 'email',
        label: 'Email Address',
        field_type: 'email',
        placeholder: 'your.email@example.com',
        validation: {
          required: true,
        },
        order: 2,
      },
      {
        field_id: 'age_group',
        label: 'Age Group',
        field_type: 'select',
        options: [
          { label: '16-18', value: '16-18' },
          { label: '19-24', value: '19-24' },
          { label: '25-30', value: '25-30' },
          { label: '31+', value: '31+' },
        ],
        validation: {
          required: true,
        },
        order: 3,
      },
      {
        field_id: 'terms_accepted',
        label: 'I agree to the terms and conditions',
        field_type: 'checkbox',
        validation: {
          required: true,
        },
        order: 4,
      },
    ],
    settings: {
      allow_anonymous: false,
      submissions_per_user: 1,
    },
    status: 'active',
    submission_count: 0,
    created_at: '2025-10-01T00:00:00Z',
    updated_at: '2025-12-15T00:00:00Z',
  },
];

// Helper to get form by event ID
export const getRegistrationFormByEventId = (eventId: string): Form | undefined => {
  return mockForms.find(form => form.event === eventId && form.form_type === 'registration');
};
