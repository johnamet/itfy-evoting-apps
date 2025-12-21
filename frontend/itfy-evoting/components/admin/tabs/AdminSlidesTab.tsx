"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Image,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  LayoutGrid,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  GripVertical,
  ExternalLink,
  Monitor,
  Smartphone,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
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
import type { Slide } from "@/types";

// Mock slides
const mockSlides: Slide[] = [
  {
    _id: "1",
    title: "Ghana Music Awards 2025",
    subtitle: "Vote for your favorite artists",
    image_url: "/slides/gma-2025.jpg",
    link_url: "/events/gma-2025",
    button_text: "Vote Now",
    order: 1,
    is_active: true,
    created_at: "2024-11-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    title: "Telecel Ghana Music Awards",
    subtitle: "The biggest music event of the year",
    image_url: "/slides/tgma.jpg",
    link_url: "/events/tgma",
    button_text: "Learn More",
    order: 2,
    is_active: true,
    created_at: "2024-11-05T09:00:00Z",
    updated_at: "2024-12-14T12:00:00Z",
  },
  {
    _id: "3",
    title: "Best New Artist 2025",
    subtitle: "Discover fresh talent",
    image_url: "/slides/new-artist.jpg",
    link_url: "/categories/best-new-artist",
    button_text: "Explore",
    order: 3,
    is_active: false,
    created_at: "2024-11-10T11:00:00Z",
    updated_at: "2024-12-10T16:00:00Z",
  },
];

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
  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group">
        {/* Image preview */}
        <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
          {slide.image_url ? (
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="w-12 h-12 text-slate-600" />
            </div>
          )}
          
          {/* Order badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
            <GripVertical className="w-3 h-3 text-slate-300" />
            <span className="text-white text-sm font-medium">#{slide.order}</span>
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
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-white text-lg mb-1 truncate">{slide.title}</h3>
          <p className="text-slate-400 text-sm mb-3 line-clamp-1">{slide.subtitle || "No subtitle"}</p>

          {/* Link */}
          {slide.link_url && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <ExternalLink className="w-3 h-3" />
              <span className="truncate">{slide.link_url}</span>
            </div>
          )}

          {/* Button text and status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
              {slide.button_text || "No button"}
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{slide.is_active ? "Active" : "Inactive"}</span>
              <Switch
                checked={slide.is_active}
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

// Slide modal
function SlideModal({
  open,
  onClose,
  slide,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  slide?: Slide | null;
  onSave: (data: Partial<Slide>) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link_url: "",
    button_text: "",
    order: 1,
    is_active: true,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || "",
        subtitle: slide.subtitle || "",
        link_url: slide.link_url || "",
        button_text: slide.button_text || "",
        order: slide.order || 1,
        is_active: slide.is_active ?? true,
      });
      setImagePreview(slide.image_url || null);
    } else {
      setFormData({
        title: "",
        subtitle: "",
        link_url: "",
        button_text: "",
        order: 1,
        is_active: true,
      });
      setImagePreview(null);
    }
  }, [slide, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{slide ? "Edit Slide" : "Create Slide"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Image upload */}
          <div className="space-y-2">
            <Label className="text-slate-300">Slide Image</Label>
            <div className="relative h-48 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      <Button type="button" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Upload className="w-4 h-4 mr-2" /> Change
                      </Button>
                    </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  <Upload className="w-10 h-10 text-slate-500 mb-2" />
                  <span className="text-slate-400 text-sm">Click to upload image</span>
                  <span className="text-slate-500 text-xs mt-1">1920x600 recommended</span>
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Slide title"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
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

          <div className="space-y-2">
            <Label className="text-slate-300">Subtitle</Label>
            <Input
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Slide subtitle"
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Link URL</Label>
              <Input
                value={formData.link_url}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                placeholder="/events/example"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Button Text</Label>
              <Input
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                placeholder="Vote Now"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Active</Label>
              <p className="text-slate-400 text-xs">Show this slide on the homepage</p>
            </div>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {slide ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSlidesTab() {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);

  useEffect(() => {
    fetchSlides();
  }, [currentPage, statusFilter, searchQuery]);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await slidesApi.list({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
      });

      if (response.success && response.data) {
        setSlides(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setSlides(mockSlides);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      setSlides(mockSlides);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSlide(null);
    setModalOpen(true);
  };

  const handleEdit = (slide: Slide) => {
    setSelectedSlide(slide);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Slide>) => {
    try {
      if (selectedSlide) {
        await slidesApi.update(selectedSlide._id, data);
      } else {
        await slidesApi.create(data);
      }
      setModalOpen(false);
      fetchSlides();
    } catch (error) {
      console.error("Failed to save slide:", error);
    }
  };

  const handleToggle = async (slide: Slide) => {
    try {
      await slidesApi.update(slide._id, { is_active: !slide.is_active });
      fetchSlides();
    } catch (error) {
      console.error("Failed to toggle slide:", error);
    }
  };

  // Filter slides
  const filteredSlides = slides
    .filter((s) => {
      if (statusFilter === "active") return s.is_active;
      if (statusFilter === "inactive") return !s.is_active;
      return true;
    })
    .sort((a, b) => a.order - b.order);

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
          { label: "Total Slides", value: slides.length, icon: Image, color: "blue" },
          { label: "Active", value: slides.filter((s) => s.is_active).length, icon: Monitor, color: "green" },
          { label: "Inactive", value: slides.filter((s) => !s.is_active).length, icon: Smartphone, color: "slate" },
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
              onView={() => {}}
              onEdit={() => handleEdit(slide)}
              onDelete={() => {}}
              onToggle={() => handleToggle(slide)}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filteredSlides.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Image className="w-12 h-12 mx-auto text-slate-500 mb-4" />
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

      {/* Modal */}
      <SlideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        slide={selectedSlide}
        onSave={handleSave}
      />
    </div>
  );
}
