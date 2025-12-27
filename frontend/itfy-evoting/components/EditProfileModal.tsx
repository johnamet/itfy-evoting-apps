'use client';

/**
 * Edit Profile Modal
 * Allows candidates to edit their profile information
 */

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Plus,
  Trash2,
  Loader2,
  Save,
  X,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  User,
  FolderPlus,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import type { Candidate, UpdateCandidateRequest, Category } from '@/types';
import { candidatesApi } from '@/lib/api/candidates';
import { useCategoriesByEvent } from '@/hooks';

// ==================== Validation Schema ====================

const educationSchema = z.object({
  institution: z.string().optional(),
  qualification: z.string().optional(),
  field: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.string().optional(),
  organization: z.string().optional(),
});

const socialLinksSchema = z.object({
  facebook: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
});

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  phone_number: z.string().optional(),
  bio: z.string().max(1000, 'Bio must be less than 1000 characters').optional(),
  why_nominate_me: z.string().max(1000, 'Must be less than 1000 characters').optional(),
  video_url: z.string().url().optional().or(z.literal('')),
  skills: z.array(z.string()).optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  social_links: socialLinksSchema.optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// ==================== Component Props ====================

interface EditProfileModalProps {
  candidate: Candidate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (updatedCandidate: Candidate) => void;
}

// ==================== Main Component ====================

export function EditProfileModal({
  candidate,
  open,
  onOpenChange,
  onSuccess,
}: EditProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  // Fetch all categories for the candidate's event
  const eventId = typeof candidate.event === 'string' ? candidate.event : candidate.event._id;
  const { data: categoriesResponse, isLoading: categoriesLoading } = useCategoriesByEvent(
    eventId,
    { limit: 100 },
    !!eventId
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      phone_number: candidate.phone_number || '',
      bio: candidate.bio || '',
      why_nominate_me: candidate.why_nominate_me || '',
      video_url: candidate.video_url || '',
      skills: candidate.skills || [],
      education: candidate.education || [],
      experience: candidate.experience || [],
      achievements: candidate.achievements || [],
      social_links: candidate.social_links || {},
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control,
    name: 'achievements',
  });

  const skills = watch('skills') || [];

  // Reset form when candidate changes
  useEffect(() => {
    if (candidate) {
      reset({
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        phone_number: candidate.phone_number || '',
        bio: candidate.bio || '',
        why_nominate_me: candidate.why_nominate_me || '',
        video_url: candidate.video_url || '',
        skills: candidate.skills || [],
        education: candidate.education || [],
        experience: candidate.experience || [],
        achievements: candidate.achievements || [],
        social_links: candidate.social_links || {},
      });
    }
  }, [candidate, reset]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue('skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setValue(
      'skills',
      skills.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);

      // Clean up empty strings and undefined values
      const cleanData: UpdateCandidateRequest = {};

      if (data.first_name) cleanData.first_name = data.first_name;
      if (data.last_name) cleanData.last_name = data.last_name;
      if (data.phone_number) cleanData.phone_number = data.phone_number;
      if (data.bio) cleanData.bio = data.bio;
      if (data.why_nominate_me) cleanData.why_nominate_me = data.why_nominate_me;
      if (data.video_url) cleanData.video_url = data.video_url;
      if (data.skills && data.skills.length > 0) cleanData.skills = data.skills;
      if (data.education && data.education.length > 0) cleanData.education = data.education;
      if (data.experience && data.experience.length > 0) cleanData.experience = data.experience;
      if (data.achievements && data.achievements.length > 0) cleanData.achievements = data.achievements;

      // Clean social links
      if (data.social_links) {
        const socialLinks: Partial<typeof data.social_links> = {};
        Object.entries(data.social_links).forEach(([key, value]) => {
          if (value && value.trim()) {
            socialLinks[key as keyof typeof data.social_links] = value.trim();
          }
        });
        if (Object.keys(socialLinks).length > 0) {
          cleanData.social_links = socialLinks;
        }
      }

      const response = await candidatesApi.updateMyProfile(cleanData);

      if (response.success && response.data) {
        toast.success('Profile updated successfully!');
        onSuccess?.(response.data);
        onOpenChange(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error: unknown) {
      console.error('Update profile error:', error);
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-auto">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Update your profile information to help voters know more about you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <Tabs defaultValue="basic" className="flex flex-col flex-1 overflow-hidden px-6">
            <TabsList className="grid w-full grid-cols-6 flex-shrink-0 overflow-x-auto">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="education">
                <GraduationCap className="h-4 w-4 mr-1" />
                Education
              </TabsTrigger>
              <TabsTrigger value="experience">
                <Briefcase className="h-4 w-4 mr-1" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-1" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="categories">
                <FolderPlus className="h-4 w-4 mr-1" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="social">
                <Globe className="h-4 w-4 mr-1" />
                Social
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 mt-4 pr-4 ">
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      {...register('first_name')}
                      placeholder="Enter first name"
                    />
                    {errors.first_name && (
                      <p className="text-sm text-destructive">{errors.first_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      {...register('last_name')}
                      placeholder="Enter last name"
                    />
                    {errors.last_name && (
                      <p className="text-sm text-destructive">{errors.last_name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    {...register('phone_number')}
                    placeholder="+1234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  {errors.bio && (
                    <p className="text-sm text-destructive">{errors.bio.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="why_nominate_me">Why Vote for Me?</Label>
                  <Textarea
                    id="why_nominate_me"
                    {...register('why_nominate_me')}
                    placeholder="Tell voters why they should vote for you..."
                    rows={4}
                  />
                  {errors.why_nominate_me && (
                    <p className="text-sm text-destructive">{errors.why_nominate_me.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    {...register('video_url')}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {errors.video_url && (
                    <p className="text-sm text-destructive">{errors.video_url.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      placeholder="Add a skill..."
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 hover:text-destructive"
                          title="Remove skill"
                          aria-label="Remove skill"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Education #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Separator />

                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        {...register(`education.${index}.institution`)}
                        placeholder="University name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Qualification</Label>
                      <Input
                        {...register(`education.${index}.qualification`)}
                        placeholder="Degree, Certificate, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        {...register(`education.${index}.field`)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          {...register(`education.${index}.start_date`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          {...register(`education.${index}.end_date`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendEducation({
                      institution: '',
                      qualification: '',
                      field: '',
                      start_date: '',
                      end_date: '',
                    })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Experience #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Separator />

                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        {...register(`experience.${index}.company`)}
                        placeholder="Company name"
                      />
                      {errors.experience?.[index]?.company && (
                        <p className="text-sm text-destructive">
                          {errors.experience[index]?.company?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Position *</Label>
                      <Input
                        {...register(`experience.${index}.position`)}
                        placeholder="Job title"
                      />
                      {errors.experience?.[index]?.position && (
                        <p className="text-sm text-destructive">
                          {errors.experience[index]?.position?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register(`experience.${index}.description`)}
                        placeholder="Brief description of your role..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          {...register(`experience.${index}.start_date`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          {...register(`experience.${index}.end_date`)}
                          disabled={watch(`experience.${index}.current`)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(`experience.${index}.current`)}
                        id={`current-${index}`}
                        className="rounded"
                      />
                      <Label htmlFor={`current-${index}`} className="cursor-pointer">
                        Currently working here
                      </Label>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendExperience({
                      company: '',
                      position: '',
                      start_date: '',
                      end_date: '',
                      current: false,
                      description: '',
                    })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-4">
                {achievementFields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Achievement #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAchievement(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Separator />

                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        {...register(`achievements.${index}.title`)}
                        placeholder="Achievement title"
                      />
                      {errors.achievements?.[index]?.title && (
                        <p className="text-sm text-destructive">
                          {errors.achievements[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register(`achievements.${index}.description`)}
                        placeholder="Describe your achievement..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Organization</Label>
                        <Input
                          {...register(`achievements.${index}.organization`)}
                          placeholder="Awarding organization"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="month"
                          {...register(`achievements.${index}.date`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendAchievement({
                      title: '',
                      description: '',
                      date: '',
                      organization: '',
                    })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Achievement
                </Button>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                          Apply for Additional Categories
                        </h4>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          You can request to be added to more categories in this event. Your request
                          will be reviewed by administrators before approval.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Current Categories */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="truncate">Current Categories</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.categories && candidate.categories.length > 0 ? (
                        candidate.categories.map((cat) => {
                          const category = typeof cat === 'object' ? cat : null;
                          const isVerified =
                            candidate.admin_verified_categories?.some(
                              (verifiedId) =>
                                verifiedId === (category?._id || cat)
                            ) || false;

                          return (
                            <Badge
                              key={category?._id || cat}
                              variant={isVerified ? 'default' : 'secondary'}
                              className="flex items-center gap-1"
                            >
                              {isVerified && <CheckCircle2 className="h-3 w-3" />}
                              {category?.name || 'Unknown Category'}
                              {!isVerified && <Clock className="h-3 w-3 ml-1" />}
                            </Badge>
                          );
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          You are not currently in any categories
                        </p>
                      )}
                    </div>
                    {candidate.categories?.some((cat) => {
                      const catId = typeof cat === 'object' ? cat._id : cat;
                      return !candidate.admin_verified_categories?.includes(catId);
                    }) && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Categories with clock icon are pending admin approval
                        </p>
                      )}
                  </div>

                  <Separator />

                  {/* Available Categories to Apply */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Apply for New Categories</h4>
                    {categoriesLoading ? (
                      <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <>
                        {categoriesResponse?.data && categoriesResponse.data.length > 0 ? (
                          <>
                            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                              {(categoriesResponse.data as Category[])
                                .filter((cat) => {
                                  // Exclude categories the candidate is already in
                                  const candidateCategoryIds = candidate.categories?.map((c) =>
                                    typeof c === 'object' ? c._id : c
                                  );
                                  return !candidateCategoryIds?.includes(cat._id);
                                })
                                .map((category) => (
                                  <div
                                    key={category._id}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50"
                                  >
                                    <Checkbox
                                      id={`category-${category._id}`}
                                      checked={selectedCategories.includes(category._id)}
                                      onCheckedChange={(checked) => {
                                        setSelectedCategories((prev) =>
                                          checked
                                            ? [...prev, category._id]
                                            : prev.filter((id) => id !== category._id)
                                        );
                                      }}
                                    />
                                    <div className="flex-1">
                                      <Label
                                        htmlFor={`category-${category._id}`}
                                        className="cursor-pointer font-normal"
                                      >
                                        <div className="font-semibold">{category.name}</div>
                                        {category.description && (
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {category.description}
                                          </p>
                                        )}
                                      </Label>
                                    </div>
                                  </div>
                                ))}
                              {(categoriesResponse.data as Category[]).filter((cat) => {
                                const candidateCategoryIds = candidate.categories?.map((c) =>
                                  typeof c === 'object' ? c._id : c
                                );
                                return !candidateCategoryIds?.includes(cat._id);
                              }).length === 0 && (
                                  <p className="text-sm text-muted-foreground text-center py-4">
                                    You are already nominated for all available categories in this event
                                  </p>
                                )}
                            </div>
                            {selectedCategories.length > 0 && (
                              <Button
                                type="button"
                                onClick={async () => {
                                  try {
                                    setIsSubmittingCategory(true);

                                    // Submit each selected category
                                    const promises = selectedCategories.map((categoryId) =>
                                      candidatesApi.requestCategoryAddition(categoryId)
                                    );

                                    await Promise.all(promises);

                                    toast.success(
                                      `Successfully submitted ${selectedCategories.length} category ${selectedCategories.length === 1 ? 'request' : 'requests'
                                      } for admin approval`
                                    );

                                    setSelectedCategories([]);

                                    // Refresh candidate data
                                    const refreshed = await candidatesApi.getMyProfile();
                                    if (refreshed.data) {
                                      onSuccess?.(refreshed.data);
                                    }
                                  } catch (error) {
                                    console.error('Category request error:', error);
                                    toast.error(
                                      error instanceof Error
                                        ? error.message
                                        : 'Failed to submit category requests'
                                    );
                                  } finally {
                                    setIsSubmittingCategory(false);
                                  }
                                }}
                                disabled={isSubmittingCategory}
                                className="w-full"
                              >
                                {isSubmittingCategory ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <FolderPlus className="mr-2 h-4 w-4" />
                                    Request {selectedCategories.length} {selectedCategories.length === 1 ? 'Category' : 'Categories'}
                                  </>
                                )}
                              </Button>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No additional categories available in this event
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
              {/* Social Links Tab */}
              <TabsContent value="social" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    {...register('social_links.facebook')}
                    placeholder="https://facebook.com/username"
                  />
                  {errors.social_links?.facebook && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.facebook.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    {...register('social_links.twitter')}
                    placeholder="https://twitter.com/username"
                  />
                  {errors.social_links?.twitter && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.twitter.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    {...register('social_links.instagram')}
                    placeholder="https://instagram.com/username"
                  />
                  {errors.social_links?.instagram && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.instagram.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    {...register('social_links.linkedin')}
                    placeholder="https://linkedin.com/in/username"
                  />
                  {errors.social_links?.linkedin && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.linkedin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    {...register('social_links.youtube')}
                    placeholder="https://youtube.com/c/username"
                  />
                  {errors.social_links?.youtube && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.youtube.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...register('social_links.website')}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.social_links?.website && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.website.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    id="tiktok"
                    {...register('social_links.tiktok')}
                    placeholder="https://tiktok.com/@username"
                  />
                  {errors.social_links?.tiktok && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.tiktok.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    {...register('social_links.github')}
                    placeholder="https://github.com/username"
                  />
                  {errors.social_links?.github && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.github.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Input
                    id="portfolio"
                    {...register('social_links.portfolio')}
                    placeholder="https://yourportfolio.com"
                  />
                  {errors.social_links?.portfolio && (
                    <p className="text-sm text-destructive">
                      {errors.social_links.portfolio.message}
                    </p>
                  )}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}