"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Folder,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

import { categoriesApi } from "@/lib/api/categories";
import type { Category } from "@/types";

// Mock categories
const mockCategories: Category[] = [
  {
    _id: "1",
    name: "Best Male Artist",
    slug: "best-male-artist",
    description: "Award for the best male musical artist of the year",
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    is_active: true,
    candidate_count: 12,
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    name: "Best Female Artist",
    slug: "best-female-artist",
    description: "Award for the best female musical artist of the year",
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    is_active: true,
    candidate_count: 10,
    created_at: "2024-10-01T10:30:00Z",
    updated_at: "2024-12-15T12:00:00Z",
  },
  {
    _id: "3",
    name: "Best Rapper",
    slug: "best-rapper",
    description: "Award for the best hip-hop/rap artist",
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    is_active: true,
    candidate_count: 8,
    created_at: "2024-10-02T09:00:00Z",
    updated_at: "2024-12-14T16:45:00Z",
  },
  {
    _id: "4",
    name: "Best New Artist",
    slug: "best-new-artist",
    description: "Award for breakthrough artist of the year",
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    is_active: false,
    candidate_count: 6,
    created_at: "2024-10-03T11:00:00Z",
    updated_at: "2024-12-10T11:00:00Z",
  },
];

// Container animation variants
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

// Category card
function CategoryCard({
  category,
  onView,
  onEdit,
  onDelete,
}: {
  category: Category;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
              category.is_active ? "from-blue-500/20 to-purple-500/20" : "from-slate-600/20 to-slate-700/20"
            }`}>
              <Tag className={`w-6 h-6 ${category.is_active ? "text-blue-400" : "text-slate-500"}`} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuItem onClick={onView} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Eye className="w-4 h-4 mr-2" /> View
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

          <h3 className="font-semibold text-white text-lg mb-1">{category.name}</h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">{category.description || "No description"}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Event</span>
              <span className="text-slate-300 truncate max-w-[150px]">
                {typeof category.event === "object" ? category.event?.name : "No event"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Candidates</span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{category.candidate_count || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge
              variant="outline"
              className={category.is_active
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-slate-600/20 text-slate-400 border-slate-600/30"
              }
            >
              {category.is_active ? "Active" : "Inactive"}
            </Badge>
            <span className="text-slate-500 text-xs">
              {new Date(category.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Category form modal
function CategoryModal({
  open,
  onClose,
  category,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
  onSave: (data: Partial<Category>) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
    event: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        is_active: category.is_active ?? true,
        event: typeof category.event === "object" ? category.event?._id || "" : "",
      });
    } else {
      setFormData({ name: "", description: "", is_active: true, event: "" });
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{category ? "Edit Category" : "Create Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Category name"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Active Status</Label>
              <p className="text-slate-400 text-xs">Enable voting for this category</p>
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
              {category ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminCategoriesTab() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, statusFilter, searchQuery]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.list({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
      });

      if (response.success && response.data) {
        setCategories(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setCategories(mockCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Category>) => {
    try {
      if (selectedCategory) {
        await categoriesApi.update(selectedCategory._id, data);
      } else {
        await categoriesApi.create(data);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((c) => {
    if (statusFilter === "active") return c.is_active;
    if (statusFilter === "inactive") return !c.is_active;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Category Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage event categories and awards</p>
        </div>
        <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Categories", value: categories.length, icon: Folder, color: "blue" },
          { label: "Active", value: categories.filter((c) => c.is_active).length, icon: Tag, color: "green" },
          { label: "Inactive", value: categories.filter((c) => !c.is_active).length, icon: Tag, color: "slate" },
          { label: "Total Candidates", value: categories.reduce((acc, c) => acc + (c.candidate_count || 0), 0), icon: Users, color: "purple" },
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
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search categories..."
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-slate-800/50 border-slate-700 text-slate-400"}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-slate-800/50 border-slate-700 text-slate-400"}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={fetchCategories} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-5">
                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-2/3 h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onView={() => {}}
              onEdit={() => handleEdit(category)}
              onDelete={() => {}}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filteredCategories.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Tag className="w-12 h-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No categories found</h3>
            <p className="text-slate-400 text-sm mb-4">Create your first category to get started</p>
            <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Add Category
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
      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  );
}
