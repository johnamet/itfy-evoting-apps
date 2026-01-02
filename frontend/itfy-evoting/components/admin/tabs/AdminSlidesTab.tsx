"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import {
  ImageIcon,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Upload,
  GripVertical,
  ExternalLink,
  Monitor,
  Smartphone,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { slidesApi } from "@/lib/api/slides";
import { eventsApi } from "@/lib/api/events";
import type { Slide, CreateSlideRequest, UpdateSlideRequest, SlideStatus, Event } from "@/types";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Slide card
function SlideCard({
  slide,
  onView,
  onEdit,
  onDelete,
  onToggle,
}: {
  slide: Slide;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const isActive = slide.status === "active";
  const imageUrl = slide.image?.url;

  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const typeColors: Record<string, string> = {
    hero: "bg-purple-500/20 text-purple-400",
    banner: "bg-blue-500/20 text-blue-400",
    announcement: "bg-orange-500/20 text-orange-400",
    promotion: "bg-pink-500/20 text-pink-400",
  };

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group">
        {/* Image preview */}
        <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={slide.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-slate-600" />
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
              <GripVertical className="w-3 h-3 text-slate-300" />
              <span className="text-white text-sm font-medium">#{slide.order}</span>
            </div>
            <Badge className={`text-xs ${typeColors[slide.slide_type] || typeColors.hero}`}>
              {slide.slide_type}
            </Badge>
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 text-white hover:bg-black/70">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuItem onClick={onView} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Eye className="w-4 h-4 mr-2" /> Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Analytics overlay */}
          {(slide.view_count || slide.click_count) && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {slide.view_count !== undefined && slide.view_count > 0 && (
                <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                  {slide.view_count} views
                </div>
              )}
              {slide.click_count !== undefined && slide.click_count > 0 && (
                <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                  {slide.click_count} clicks
                </div>
              )}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-white text-lg mb-1 truncate">{slide.title}</h3>
          <p className="text-slate-400 text-sm mb-3 line-clamp-1">{slide.subtitle || "No subtitle"}</p>

          {/* Link */}
          {slide.button?.url && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <ExternalLink className="w-3 h-3" />
              <span className="truncate">{slide.button.url}</span>
            </div>
          )}

          {/* Status and toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge variant="outline" className={statusColors[slide.status] || statusColors.inactive}>
              {slide.status}
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{isActive ? "Active" : "Inactive"}</span>
              <Switch
                checked={isActive}
                onCheckedChange={onToggle}
                className="scale-75"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Slide Details Dialog (View)
function SlideDetailsDialog({
  slide,
  open,
  onClose,
  events = [],
}: {
  slide: Slide | null;
  open: boolean;
  onClose: () => void;
  events?: Event[];
}) {
  if (!slide) return null;

  const imageUrl = slide.image?.url;
  const mobileImageUrl = slide.mobile_image?.url;
  const linkedEvent = events.find(e => e._id === slide.event);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            Slide Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-400 text-sm">Desktop Image</Label>
              <div className="relative h-48 bg-slate-800/50 rounded-xl overflow-hidden">
                {imageUrl ? (
                  <NextImage src={imageUrl} alt={slide.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Monitor className="w-12 h-12 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-sm">Mobile Image</Label>
              <div className="relative h-48 bg-slate-800/50 rounded-xl overflow-hidden">
                {mobileImageUrl ? (
                  <NextImage src={mobileImageUrl} alt={slide.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Title</Label>
              <p className="text-white font-medium">{slide.title}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Subtitle</Label>
              <p className="text-white">{slide.subtitle || "—"}</p>
            </div>
          </div>

          {slide.description && (
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Description</Label>
              <p className="text-slate-300 text-sm">{slide.description}</p>
            </div>
          )}

          {/* Linked Event */}
          {linkedEvent && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Label className="text-slate-400 text-sm">Linked Event</Label>
              <div className="flex items-center gap-3 mt-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">{linkedEvent.name}</p>
                  {linkedEvent.start_date && (
                    <p className="text-slate-400 text-xs">
                      {new Date(linkedEvent.start_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status & Type */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Status</Label>
              <Badge className={`${
                slide.status === 'active' ? 'bg-green-500/20 text-green-400' :
                slide.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                slide.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {slide.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Type</Label>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                {slide.slide_type}
              </Badge>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Position</Label>
              <Badge variant="outline" className="border-slate-500/30 text-slate-300">
                {slide.position}
              </Badge>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Order</Label>
              <p className="text-white font-medium">#{slide.order}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.button && (slide.button.text || slide.button.url) && (
              <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
                <Label className="text-slate-400 text-sm">Primary Button</Label>
                <div className="space-y-1">
                  <p className="text-white font-medium">{slide.button.text || "—"}</p>
                  {slide.button.url && (
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {slide.button.url}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {slide.button.style && (
                      <Badge variant="outline" className="text-xs">{slide.button.style}</Badge>
                    )}
                    {slide.button.opens_in_new_tab && (
                      <Badge variant="outline" className="text-xs">Opens in new tab</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            {slide.secondary_button && (slide.secondary_button.text || slide.secondary_button.url) && (
              <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
                <Label className="text-slate-400 text-sm">Secondary Button</Label>
                <div className="space-y-1">
                  <p className="text-white font-medium">{slide.secondary_button.text || "—"}</p>
                  {slide.secondary_button.url && (
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {slide.secondary_button.url}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {slide.secondary_button.style && (
                      <Badge variant="outline" className="text-xs">{slide.secondary_button.style}</Badge>
                    )}
                    {slide.secondary_button.opens_in_new_tab && (
                      <Badge variant="outline" className="text-xs">Opens in new tab</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Style Settings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Background Color</Label>
              <div className="flex items-center gap-2">
                {slide.background_color && (
                  <div 
                    className="w-6 h-6 rounded border border-slate-600" 
                    style={{ backgroundColor: slide.background_color }}
                  />
                )}
                <p className="text-white text-sm">{slide.background_color || "None"}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Text Color</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-slate-600" 
                  style={{ backgroundColor: slide.text_color }}
                />
                <p className="text-white text-sm">{slide.text_color}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Overlay Opacity</Label>
              <p className="text-white">{slide.overlay_opacity}%</p>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-400 text-sm">Animation</Label>
              <p className="text-white">{slide.animation || "fade"}</p>
            </div>
          </div>

          {/* Scheduling */}
          {(slide.start_date || slide.end_date) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-slate-400 text-sm">Start Date</Label>
                <p className="text-white">
                  {slide.start_date ? new Date(slide.start_date).toLocaleString() : "—"}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-slate-400 text-sm">End Date</Label>
                <p className="text-white">
                  {slide.end_date ? new Date(slide.end_date).toLocaleString() : "—"}
                </p>
              </div>
            </div>
          )}

          {/* Analytics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">{slide.view_count || 0}</p>
                <p className="text-slate-400 text-sm">Views</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-400">{slide.click_count || 0}</p>
                <p className="text-slate-400 text-sm">Clicks</p>
              </CardContent>
            </Card>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-700">
            <span>Created: {new Date(slide.created_at).toLocaleString()}</span>
            <span>Updated: {new Date(slide.updated_at).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Form data type for slide modal
interface SlideFormData {
  title: string;
  subtitle: string;
  description: string;
  slide_type: string;
  status: SlideStatus;
  position: string;
  order: number;
  event: string; // Event ID
  // Primary button
  button_text: string;
  button_url: string;
  button_style: string;
  button_opens_new_tab: boolean;
  // Secondary button
  secondary_button_text: string;
  secondary_button_url: string;
  secondary_button_style: string;
  secondary_button_opens_new_tab: boolean;
  // Style
  background_color: string;
  text_color: string;
  overlay_opacity: number;
  animation: string;
  animation_duration: number;
  // Scheduling
  start_date: string;
  end_date: string;
  is_published: boolean;
}

// Get initial form data
function getInitialFormData(slide?: Slide | null): SlideFormData {
  if (slide) {
    return {
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      slide_type: slide.slide_type || "hero",
      status: slide.status || "active",
      position: slide.position || "middle",
      order: slide.order || 1,
      event: slide.event || "",
      // Primary button
      button_text: slide.button?.text || "",
      button_url: slide.button?.url || "",
      button_style: slide.button?.style || "primary",
      button_opens_new_tab: slide.button?.opens_in_new_tab || false,
      // Secondary button
      secondary_button_text: slide.secondary_button?.text || "",
      secondary_button_url: slide.secondary_button?.url || "",
      secondary_button_style: slide.secondary_button?.style || "secondary",
      secondary_button_opens_new_tab: slide.secondary_button?.opens_in_new_tab || false,
      // Style
      background_color: slide.background_color || "",
      text_color: slide.text_color || "#ffffff",
      overlay_opacity: slide.overlay_opacity ?? 40,
      animation: slide.animation || "fade",
      animation_duration: slide.animation_duration || 5000,
      // Scheduling
      start_date: slide.start_date ? slide.start_date.slice(0, 16) : "",
      end_date: slide.end_date ? slide.end_date.slice(0, 16) : "",
      is_published: slide.is_published ?? false,
    };
  }
  return {
    title: "",
    subtitle: "",
    description: "",
    slide_type: "hero",
    status: "draft",
    position: "middle",
    order: 1,
    event: "",
    button_text: "",
    button_url: "",
    button_style: "primary",
    button_opens_new_tab: false,
    secondary_button_text: "",
    secondary_button_url: "",
    secondary_button_style: "secondary",
    secondary_button_opens_new_tab: false,
    background_color: "",
    text_color: "#ffffff",
    overlay_opacity: 40,
    animation: "fade",
    animation_duration: 5000,
    start_date: "",
    end_date: "",
    is_published: false,
  };
}

// Slide modal
// Inner form component that resets when key changes
function SlideFormContent({
  slide,
  onClose,
  onSave,
  events = [],
}: {
  slide?: Slide | null;
  onClose: () => void;
  onSave: (data: CreateSlideRequest | UpdateSlideRequest, isUpdate: boolean) => void;
  events?: Event[];
}) {
  const [formData, setFormData] = useState<SlideFormData>(() => getInitialFormData(slide));
  const [imagePreview, setImagePreview] = useState<string | null>(slide?.image?.url || null);
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(slide?.mobile_image?.url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isMobile = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isMobile) {
          setMobileImagePreview(reader.result as string);
        } else {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Title is required");
      return;
    }

    const isUpdate = !!slide;

    // Build common data
    const commonData = {
      title: formData.title,
      subtitle: formData.subtitle || undefined,
      description: formData.description || undefined,
      slide_type: formData.slide_type as 'hero' | 'banner' | 'announcement' | 'promotion',
      status: formData.status,
      event: formData.event || undefined,
      position: formData.position as 'top' | 'middle' | 'bottom',
      order: formData.order,
      display_order: formData.order,
      background_color: formData.background_color || undefined,
      text_color: formData.text_color || "#ffffff",
      overlay_opacity: formData.overlay_opacity,
      animation: formData.animation as 'fade' | 'slide' | 'zoom' | 'none',
      animation_duration: formData.animation_duration,
      start_date: formData.start_date || undefined,
      end_date: formData.end_date || undefined,
      is_published: formData.is_published,
      button: formData.button_text || formData.button_url ? {
        text: formData.button_text || undefined,
        url: formData.button_url || undefined,
        style: formData.button_style as 'primary' | 'secondary' | 'outline' | 'ghost' | 'link',
        opens_in_new_tab: formData.button_opens_new_tab,
      } : undefined,
      secondary_button: formData.secondary_button_text || formData.secondary_button_url ? {
        text: formData.secondary_button_text || undefined,
        url: formData.secondary_button_url || undefined,
        style: formData.secondary_button_style as 'primary' | 'secondary' | 'outline' | 'ghost' | 'link',
        opens_in_new_tab: formData.secondary_button_opens_new_tab,
      } : undefined,
    };

    if (isUpdate) {
      const updateData: UpdateSlideRequest = {
        ...commonData,
        image: imagePreview ? { url: imagePreview, alt: formData.title } : undefined,
        mobile_image: mobileImagePreview ? { url: mobileImagePreview, alt: formData.title } : undefined,
      };
      onSave(updateData, true);
    } else {
      if (!imagePreview) {
        toast.error("Image is required");
        return;
      }
      const createData: CreateSlideRequest = {
        ...commonData,
        image: { url: imagePreview, alt: formData.title },
        mobile_image: mobileImagePreview ? { url: mobileImagePreview, alt: formData.title } : undefined,
      };
      onSave(createData, false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="basic" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Basic</TabsTrigger>
          <TabsTrigger value="buttons" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Buttons</TabsTrigger>
          <TabsTrigger value="style" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Style</TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Schedule</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          {/* Desktop Image upload */}
          <div className="space-y-2">
            <Label className="text-slate-300">Desktop Image *</Label>
            <div className="relative h-40 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden group">
              {imagePreview ? (
                <>
                  <NextImage src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, false)} />
                      <Button type="button" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Upload className="w-4 h-4 mr-2" /> Change
                      </Button>
                    </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, false)} />
                  <Monitor className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-slate-400 text-sm">Desktop image (1920x600)</span>
                </label>
              )}
            </div>
          </div>

          {/* Mobile Image upload */}
          <div className="space-y-2">
            <Label className="text-slate-300">Mobile Image (Optional)</Label>
            <div className="relative h-32 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden group">
              {mobileImagePreview ? (
                <>
                  <NextImage src={mobileImagePreview} alt="Mobile Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
                      <Button type="button" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Upload className="w-4 h-4 mr-2" /> Change
                      </Button>
                    </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
                  <Smartphone className="w-6 h-6 text-slate-500 mb-1" />
                  <span className="text-slate-400 text-xs">Mobile image (optional)</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Slide title"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Slide subtitle"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Slide description (optional)"
              className="bg-slate-800/50 border-slate-700 text-white min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Type</Label>
              <Select value={formData.slide_type} onValueChange={(v) => setFormData({ ...formData, slide_type: v })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Position</Label>
              <Select value={formData.position} onValueChange={(v) => setFormData({ ...formData, position: v })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="middle">Middle</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Order</Label>
              <Input
                type="number"
                min={1}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as SlideStatus })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Link to Event</Label>
              <Select value={formData.event} onValueChange={(v) => setFormData({ ...formData, event: v === "_none" ? "" : v })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Select event (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="_none">No Event</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* Buttons Tab */}
        <TabsContent value="buttons" className="space-y-4 mt-4">
          <div className="p-4 bg-slate-800/30 rounded-lg space-y-4">
            <Label className="text-white font-medium">Primary Button</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Button Text</Label>
                <Input
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  placeholder="Vote Now"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Button URL</Label>
                <Input
                  value={formData.button_url}
                  onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                  placeholder="/events/example"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Style</Label>
                <Select value={formData.button_style} onValueChange={(v) => setFormData({ ...formData, button_style: v })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <Label className="text-slate-400 text-sm">Open in new tab</Label>
                <Switch
                  checked={formData.button_opens_new_tab}
                  onCheckedChange={(c) => setFormData({ ...formData, button_opens_new_tab: c })}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/30 rounded-lg space-y-4">
            <Label className="text-white font-medium">Secondary Button (Optional)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Button Text</Label>
                <Input
                  value={formData.secondary_button_text}
                  onChange={(e) => setFormData({ ...formData, secondary_button_text: e.target.value })}
                  placeholder="Learn More"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Button URL</Label>
                <Input
                  value={formData.secondary_button_url}
                  onChange={(e) => setFormData({ ...formData, secondary_button_url: e.target.value })}
                  placeholder="/about"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm">Style</Label>
                <Select value={formData.secondary_button_style} onValueChange={(v) => setFormData({ ...formData, secondary_button_style: v })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <Label className="text-slate-400 text-sm">Open in new tab</Label>
                <Switch
                  checked={formData.secondary_button_opens_new_tab}
                  onCheckedChange={(c) => setFormData({ ...formData, secondary_button_opens_new_tab: c })}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent value="style" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.background_color || "#000000"}
                  onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                  className="w-12 h-10 p-1 bg-slate-800/50 border-slate-700"
                />
                <Input
                  value={formData.background_color}
                  onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                  placeholder="#000000"
                  className="flex-1 bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.text_color}
                  onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                  className="w-12 h-10 p-1 bg-slate-800/50 border-slate-700"
                />
                <Input
                  value={formData.text_color}
                  onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                  placeholder="#ffffff"
                  className="flex-1 bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-slate-300">Overlay Opacity</Label>
              <span className="text-slate-400 text-sm">{formData.overlay_opacity}%</span>
            </div>
            <Input
              type="range"
              min={0}
              max={100}
              step={5}
              value={formData.overlay_opacity}
              onChange={(e) => setFormData({ ...formData, overlay_opacity: parseInt(e.target.value) })}
              className="w-full bg-slate-800/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Animation</Label>
              <Select value={formData.animation} onValueChange={(v) => setFormData({ ...formData, animation: v })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Duration (ms)</Label>
              <Input
                type="number"
                min={1000}
                max={10000}
                step={500}
                value={formData.animation_duration}
                onChange={(e) => setFormData({ ...formData, animation_duration: parseInt(e.target.value) || 5000 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Start Date</Label>
              <Input
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">End Date</Label>
              <Input
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Published</Label>
              <p className="text-slate-400 text-xs">Make this slide visible to users</p>
            </div>
            <Switch
              checked={formData.is_published}
              onCheckedChange={(c) => setFormData({ ...formData, is_published: c })}
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> If you set a start and end date, the slide will only be visible during that time period when status is &quot;scheduled&quot;.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-700">
        <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          {slide ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

// Slide modal wrapper
function SlideModal({
  open,
  onClose,
  slide,
  onSave,
  events = [],
}: {
  open: boolean;
  onClose: () => void;
  slide?: Slide | null;
  onSave: (data: CreateSlideRequest | UpdateSlideRequest, isUpdate: boolean) => void;
  events?: Event[];
}) {
  // Use key to force remount when slide changes
  const formKey = `${slide?._id ?? "new"}-${open}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{slide ? "Edit Slide" : "Create Slide"}</DialogTitle>
        </DialogHeader>
        <SlideFormContent 
          key={formKey}
          slide={slide} 
          onClose={onClose} 
          onSave={onSave}
          events={events}
        />
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSlidesTab() {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true);
      const response = await slidesApi.list({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
      });

      if (response.success && response.data) {
        setSlides(response.data);
        setTotalPages(response.pagination?.total_pages || 1);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      toast.error("Failed to fetch slides");
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await eventsApi.list({ limit: 100 });
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
    fetchEvents();
  }, [fetchSlides, fetchEvents]);

  const handleCreate = () => {
    setSelectedSlide(null);
    setModalOpen(true);
  };

  const handleEdit = (slide: Slide) => {
    setSelectedSlide(slide);
    setModalOpen(true);
  };

  const handleView = (slide: Slide) => {
    setSelectedSlide(slide);
    setViewDialogOpen(true);
  };

  const handleSave = async (data: CreateSlideRequest | UpdateSlideRequest, isUpdate: boolean) => {
    try {
      if (isUpdate && selectedSlide) {
        await slidesApi.update(selectedSlide._id, data as UpdateSlideRequest);
        toast.success("Slide updated successfully");
      } else {
        await slidesApi.create(data as CreateSlideRequest);
        toast.success("Slide created successfully");
      }
      setModalOpen(false);
      fetchSlides();
    } catch (error) {
      console.error("Failed to save slide:", error);
      toast.error("Failed to save slide");
    }
  };

  const handleToggle = async (slide: Slide) => {
    try {
      if (slide.status === "active") {
        await slidesApi.deactivate(slide._id);
        toast.success("Slide deactivated");
      } else {
        await slidesApi.activate(slide._id);
        toast.success("Slide activated");
      }
      fetchSlides();
    } catch (error) {
      console.error("Failed to toggle slide:", error);
      toast.error("Failed to toggle slide status");
    }
  };

  const handleDelete = async (slide: Slide) => {
    try {
      await slidesApi.delete(slide._id);
      toast.success("Slide deleted successfully");
      fetchSlides();
    } catch (error) {
      console.error("Failed to delete slide:", error);
      toast.error("Failed to delete slide");
    }
  };

  // Filter slides
  const filteredSlides = slides
    .filter((s) => {
      if (statusFilter === "active") return s.status === "active";
      if (statusFilter === "inactive") return s.status === "inactive";
      return true;
    })
    .sort((a, b) => a.order - b.order);

  // Stats
  const activeCount = slides.filter((s) => s.status === "active").length;
  const inactiveCount = slides.filter((s) => s.status !== "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Slides</h1>
          <p className="text-slate-400 text-sm mt-1">Manage homepage carousel slides</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Monitor className="w-4 h-4 mr-2" /> Preview
          </Button>
          <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Slide
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Slides", value: slides.length, icon: ImageIcon, color: "blue" },
          { label: "Active", value: activeCount, icon: Monitor, color: "green" },
          { label: "Inactive", value: inactiveCount, icon: Smartphone, color: "slate" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-500/20`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search slides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={fetchSlides} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Slides grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <Skeleton className="h-40 rounded-t-lg" />
              <CardContent className="p-4">
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-full h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredSlides.map((slide) => (
            <SlideCard
              key={slide._id}
              slide={slide}
              onView={() => handleView(slide)}
              onEdit={() => handleEdit(slide)}
              onDelete={() => handleDelete(slide)}
              onToggle={() => handleToggle(slide)}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filteredSlides.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No slides found</h3>
            <p className="text-slate-400 text-sm mb-4">Create your first slide to get started</p>
            <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Add Slide
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-slate-800/50 border-slate-700 text-slate-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-slate-400 text-sm px-4">Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="bg-slate-800/50 border-slate-700 text-slate-400"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Edit/Create Modal */}
      <SlideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        slide={selectedSlide}
        onSave={handleSave}
        events={events}
      />

      {/* View Dialog */}
      <SlideDetailsDialog
        slide={selectedSlide}
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        events={events}
      />
    </div>
  );
}
