"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
  Folder,
  Star,
  Play,
  Pause,
  BarChart3,
  Clock,
  Vote,
  Loader2,
  CheckCircle,
  XCircle,
  CheckSquare,
  Square,
  Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { categoriesApi, type CategoryFilters, type CategoryStatsResponse } from "@/lib/api/categories";
import { eventsApi } from "@/lib/api/events";
import type { Category, Event, CategoryStatus, CreateCategoryRequest, UpdateCategoryRequest } from "@/types";

// Status colors
const statusColors: Record<CategoryStatus, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
  archived: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  closed: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const statusIcons: Record<CategoryStatus, React.ReactNode> = {
  active: <CheckCircle className="w-3 h-3" />,
  inactive: <Pause className="w-3 h-3" />,
  deleted: <XCircle className="w-3 h-3" />,
  archived: <Folder className="w-3 h-3" />,
  closed: <Clock className="w-3 h-3" />,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Category card component
function CategoryCard({
  category,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onToggleVoting,
  onToggleFeatured,
  isLoading,
}: {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVoting: () => void;
  onToggleFeatured: () => void;
  isLoading?: boolean;
}) {
  const eventName = typeof category.event === "object" ? category.event?.name : "No event";
  
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group transition-all h-full ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-blue-400" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                category.status === "active" ? "from-blue-500/20 to-purple-500/20" : "from-slate-600/20 to-slate-700/20"
              }`}>
                <Tag className={`w-5 h-5 ${category.status === "active" ? "text-blue-400" : "text-slate-500"}`} />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-400 hover:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 w-48">
                <DropdownMenuItem onClick={onView} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-700" />
                
                {/* Voting toggle */}
                <DropdownMenuItem onClick={onToggleVoting} className={category.is_voting_open 
                  ? "text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10"
                  : "text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10"
                }>
                  {category.is_voting_open ? (
                    <><Pause className="w-4 h-4 mr-2" /> Close Voting</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" /> Open Voting</>
                  )}
                </DropdownMenuItem>
                
                {/* Featured toggle */}
                <DropdownMenuItem onClick={onToggleFeatured} className="text-yellow-400 hover:text-yellow-300 focus:text-yellow-300 focus:bg-yellow-500/10">
                  <Star className={`w-4 h-4 mr-2 ${category.is_featured ? "fill-current" : ""}`} />
                  {category.is_featured ? "Unfeature" : "Feature"}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-700" />
                
                <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Category info */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white text-lg truncate">{category.name}</h3>
              {category.is_featured && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-slate-400 text-sm line-clamp-2">{category.description || "No description"}</p>
          </div>

          {/* Event and candidates */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Event</span>
              <span className="text-slate-300 truncate max-w-[150px]">{eventName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Candidates</span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{category.candidateCount || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Total Votes</span>
              <div className="flex items-center gap-1">
                <Vote className="w-3 h-3 text-green-400" />
                <span className="text-slate-300">{(category.total_votes || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status and voting badges */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge variant="outline" className={statusColors[category.status]}>
              {statusIcons[category.status]}
              <span className="ml-1 capitalize">{category.status}</span>
            </Badge>
            {category.is_voting_open ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Play className="w-3 h-3 mr-1" /> Voting Open
              </Badge>
            ) : (
              <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                <Pause className="w-3 h-3 mr-1" /> Voting Closed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Category Details Dialog
function CategoryDetailsDialog({
  category,
  stats,
  isOpen,
  onClose,
  isLoading,
}: {
  category: Category | null;
  stats: CategoryStatsResponse | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}) {
  if (!category) return null;

  const eventName = typeof category.event === "object" ? category.event?.name : "Unknown";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-400" />
            </div>
            {category.name}
            {category.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Category details and statistics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="details" className="data-[state=active]:bg-slate-700">Details</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColors[category.status]}>
                {statusIcons[category.status]}
                <span className="ml-1 capitalize">{category.status}</span>
              </Badge>
              {category.is_featured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                </Badge>
              )}
              {category.is_voting_open ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Play className="w-3 h-3 mr-1" /> Voting Open
                </Badge>
              ) : (
                <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                  <Pause className="w-3 h-3 mr-1" /> Voting Closed
                </Badge>
              )}
            </div>

            {/* Description */}
            {category.description && (
              <div>
                <Label className="text-slate-400 text-sm">Description</Label>
                <p className="text-white mt-1">{category.description}</p>
              </div>
            )}

            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Event</Label>
                <p className="text-white mt-1">{eventName}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Slug</Label>
                <p className="text-white mt-1 font-mono text-sm">{category.slug}</p>
              </div>
            </div>

            {/* Voting settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Voting Start</Label>
                <p className="text-white mt-1">
                  {category.voting_start_date 
                    ? new Date(category.voting_start_date).toLocaleDateString() 
                    : "Not set"}
                </p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Voting Deadline</Label>
                <p className="text-white mt-1">
                  {category.voting_deadline 
                    ? new Date(category.voting_deadline).toLocaleDateString() 
                    : "Not set"}
                </p>
              </div>
            </div>

            {/* Candidate limits */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Min Candidates</Label>
                <p className="text-white mt-1">{category.min_candidates}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Max Candidates</Label>
                <p className="text-white mt-1">{category.max_candidates || "No limit"}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Current</Label>
                <p className="text-white mt-1">{category.candidateCount || 0}</p>
              </div>
            </div>

            {/* Voting rules */}
            {category.voting_rules && (
              <div>
                <Label className="text-slate-400 text-sm">Voting Rules</Label>
                <p className="text-white mt-1 text-sm">{category.voting_rules}</p>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div>
                <Label className="text-slate-400 text-sm">Created At</Label>
                <p className="text-white mt-1">{new Date(category.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Last Updated</Label>
                <p className="text-white mt-1">{new Date(category.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
            ) : stats ? (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Vote className="w-6 h-6 mx-auto text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{(stats.total_votes || 0).toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Total Votes</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Users className="w-6 h-6 mx-auto text-blue-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{stats.total_candidates || 0}</p>
                      <p className="text-slate-400 text-sm">Candidates</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Top candidates */}
                {stats.top_candidates && stats.top_candidates.length > 0 && (
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Top Candidates</Label>
                    <div className="space-y-2">
                      {stats.top_candidates.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                              i === 1 ? "bg-slate-400/20 text-slate-300" :
                              i === 2 ? "bg-orange-500/20 text-orange-400" :
                              "bg-slate-600/20 text-slate-400"
                            }`}>
                              {i < 3 ? <Trophy className="w-4 h-4" /> : <span>#{i + 1}</span>}
                            </div>
                            <span className="text-white font-medium">{item.candidate_name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-medium">{item.vote_count.toLocaleString()}</span>
                            <span className="text-slate-400 text-sm ml-2">({item.percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No statistics available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Create/Edit Category Dialog
function CategoryFormDialog({
  category,
  events,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: {
  category: Category | null;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryRequest | UpdateCategoryRequest) => void;
  isLoading?: boolean;
}) {
  // Compute initial form data
  const initialFormData: Partial<CreateCategoryRequest> = category
    ? {
        name: category.name || "",
        description: category.description || "",
        event: typeof category.event === "object" ? category.event?._id : category.event?.toString() || "",
        min_candidates: category.min_candidates || 2,
        max_candidates: category.max_candidates || undefined,
        voting_rules: category.voting_rules || "",
      }
    : {
        name: "",
        description: "",
        event: "",
        min_candidates: 2,
        max_candidates: undefined,
        voting_rules: "",
      };

  const [formData, setFormData] = useState<Partial<CreateCategoryRequest>>(initialFormData);

  // Reset form when category changes
  const categoryId = category?._id ?? null;
  const prevCategoryIdRef = React.useRef<string | null>(categoryId);

  if (prevCategoryIdRef.current !== categoryId) {
    prevCategoryIdRef.current = categoryId;
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setFormData(initialFormData);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as CreateCategoryRequest);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-400" />
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {category ? "Update category information" : "Create a new category for an event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-slate-300">Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Best Male Artist"
              required
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          <div>
            <Label className="text-slate-300">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Award for the best male musical artist of the year"
              rows={3}
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          {!category && (
            <div>
              <Label className="text-slate-300">Event *</Label>
              <Select
                value={formData.event}
                onValueChange={(value) => setFormData({ ...formData, event: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Min Candidates</Label>
              <Input
                type="number"
                min={1}
                value={formData.min_candidates}
                onChange={(e) => setFormData({ ...formData, min_candidates: parseInt(e.target.value) || 2 })}
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-300">Max Candidates</Label>
              <Input
                type="number"
                min={1}
                value={formData.max_candidates || ""}
                onChange={(e) => setFormData({ ...formData, max_candidates: parseInt(e.target.value) || undefined })}
                placeholder="No limit"
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-slate-300">Voting Rules</Label>
            <Textarea
              value={formData.voting_rules}
              onChange={(e) => setFormData({ ...formData, voting_rules: e.target.value })}
              placeholder="Optional voting rules..."
              rows={2}
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {category ? "Updating..." : "Creating..."}
                </>
              ) : (
                category ? "Update Category" : "Create Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Main component
export default function AdminCategoriesTab() {
  // Data state
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  
  // UI state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Dialog state
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStatsResponse | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch events for filter dropdown
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

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const filters: CategoryFilters = {
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as CategoryStatus) : undefined,
        event: eventFilter !== "all" ? eventFilter : undefined,
      };

      const response = await categoriesApi.list(filters);

      if (response.success && response.data) {
        setCategories(response.data);
        setTotalPages(response.pagination?.total_pages || 1);
        setTotalItems(response.pagination?.total_items || 0);
      } else {
        setCategories([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, eventFilter, searchQuery]);

  // Fetch category stats
  const fetchCategoryStats = async (categoryId: string) => {
    try {
      setStatsLoading(true);
      const response = await categoriesApi.getStats(categoryId);
      if (response.success && response.data) {
        setCategoryStats(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch category stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, eventFilter, searchQuery]);

  // Handlers
  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowDetailsDialog(true);
    fetchCategoryStats(category._id);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowFormDialog(true);
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setShowFormDialog(true);
  };

  const handleFormSubmit = async (data: CreateCategoryRequest | UpdateCategoryRequest) => {
    try {
      setActionLoading("form");
      if (selectedCategory) {
        await categoriesApi.update(selectedCategory._id, data as UpdateCategoryRequest);
        toast.success("Category updated successfully");
      } else {
        await categoriesApi.create(data as CreateCategoryRequest);
        toast.success("Category created successfully");
      }
      setShowFormDialog(false);
      fetchCategories();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Operation failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      setActionLoading(selectedCategory._id);
      await categoriesApi.delete(selectedCategory._id);
      toast.success(`${selectedCategory.name} deleted`);
      setShowDeleteDialog(false);
      fetchCategories();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete category";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleVoting = async (category: Category) => {
    try {
      setActionLoading(category._id);
      if (category.is_voting_open) {
        await categoriesApi.closeVoting(category._id);
        toast.success(`Voting closed for ${category.name}`);
      } else {
        await categoriesApi.openVoting(category._id);
        toast.success(`Voting opened for ${category.name}`);
      }
      fetchCategories();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to toggle voting";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeatured = async (category: Category) => {
    try {
      setActionLoading(category._id);
      await categoriesApi.toggleFeatured(category._id);
      toast.success(`${category.name} ${category.is_featured ? "unfeatured" : "featured"}`);
      fetchCategories();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to toggle featured";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === categories.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(categories.map((c) => c._id)));
    }
  };

  // Bulk actions
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    try {
      setActionLoading("bulk");
      await categoriesApi.bulkDelete(Array.from(selectedIds));
      toast.success(`${selectedIds.size} categories deleted`);
      setSelectedIds(new Set());
      fetchCategories();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bulk delete failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Stats calculations
  const stats = {
    total: totalItems,
    active: categories.filter((c) => c.status === "active").length,
    votingOpen: categories.filter((c) => c.is_voting_open).length,
    totalCandidates: categories.reduce((acc, c) => acc + (c.candidateCount || 0), 0),
    totalVotes: categories.reduce((acc, c) => acc + (c.total_votes || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Tag className="w-7 h-7 text-blue-400" />
            Category Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage event categories and awards</p>
        </div>
        <Button 
          onClick={handleCreateCategory}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Categories", value: stats.total, icon: Folder, color: "blue" },
          { label: "Active", value: stats.active, icon: CheckCircle, color: "green" },
          { label: "Voting Open", value: stats.votingOpen, icon: Play, color: "orange" },
          { label: "Candidates", value: stats.totalCandidates, icon: Users, color: "purple" },
          { label: "Total Votes", value: stats.totalVotes.toLocaleString(), icon: Vote, color: "emerald" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and bulk actions */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              {/* Event filter */}
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Event" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              {/* Bulk actions */}
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-slate-400 text-sm">{selectedIds.size} selected</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleBulkDelete}
                    disabled={actionLoading === "bulk"}
                    className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              )}

              {/* View mode toggle */}
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchCategories} 
                disabled={loading}
                className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories display */}
      {loading ? (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "space-y-2"
        }>
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-5">
                <Skeleton className="w-10 h-10 rounded-xl mb-4" />
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-2/3 h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Tag className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No categories found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || statusFilter !== "all" || eventFilter !== "all"
                ? "Try adjusting your filters"
                : "Get started by adding your first category"}
            </p>
            <Button onClick={handleCreateCategory} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Category
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              isSelected={selectedIds.has(category._id)}
              onSelect={() => toggleSelection(category._id)}
              onView={() => handleViewCategory(category)}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => { setSelectedCategory(category); setShowDeleteDialog(true); }}
              onToggleVoting={() => handleToggleVoting(category)}
              onToggleFeatured={() => handleToggleFeatured(category)}
              isLoading={actionLoading === category._id}
            />
          ))}
        </motion.div>
      ) : (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="text-slate-400 w-12">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-white">
                    {selectedIds.size === categories.length ? (
                      <CheckSquare className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-slate-400">Category</TableHead>
                <TableHead className="text-slate-400">Event</TableHead>
                <TableHead className="text-slate-400">Candidates</TableHead>
                <TableHead className="text-slate-400">Votes</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Voting</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const eventName = typeof category.event === "object" ? category.event?.name : "—";
                return (
                  <TableRow 
                    key={category._id} 
                    className={`border-slate-700 hover:bg-slate-800/50 ${selectedIds.has(category._id) ? "bg-blue-500/10" : ""}`}
                  >
                    <TableCell>
                      <button 
                        onClick={() => toggleSelection(category._id)} 
                        className="text-slate-400 hover:text-white"
                      >
                        {selectedIds.has(category._id) ? (
                          <CheckSquare className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="text-white font-medium flex items-center gap-1">
                            {category.name}
                            {category.is_featured && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                          </span>
                          {category.description && (
                            <p className="text-slate-500 text-xs truncate max-w-[200px]">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{eventName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-white">
                        <Users className="w-4 h-4 text-blue-400" />
                        {category.candidateCount || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-white">
                        <Vote className="w-4 h-4 text-green-400" />
                        {(category.total_votes || 0).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[category.status]}>
                        {statusIcons[category.status]}
                        <span className="ml-1 capitalize">{category.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {category.is_voting_open ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <Play className="w-3 h-3 mr-1" /> Open
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                          <Pause className="w-3 h-3 mr-1" /> Closed
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                          <DropdownMenuItem onClick={() => handleViewCategory(category)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCategory(category)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem onClick={() => handleToggleVoting(category)} className={category.is_voting_open 
                            ? "text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10"
                            : "text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10"
                          }>
                            {category.is_voting_open ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {category.is_voting_open ? "Close Voting" : "Open Voting"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeatured(category)} className="text-yellow-400 hover:text-yellow-300 focus:text-yellow-300 focus:bg-yellow-500/10">
                            <Star className={`w-4 h-4 mr-2 ${category.is_featured ? "fill-current" : ""}`} />
                            {category.is_featured ? "Unfeature" : "Feature"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem onClick={() => { setSelectedCategory(category); setShowDeleteDialog(true); }} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
          <span className="text-slate-400 text-sm px-4">
            Page {currentPage} of {totalPages}
          </span>
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

      {/* Dialogs */}
      <CategoryDetailsDialog
        category={selectedCategory}
        stats={categoryStats}
        isOpen={showDetailsDialog}
        onClose={() => { setShowDetailsDialog(false); setCategoryStats(null); }}
        isLoading={statsLoading}
      />

      <CategoryFormDialog
        category={selectedCategory}
        events={events}
        isOpen={showFormDialog}
        onClose={() => setShowFormDialog(false)}
        onSubmit={handleFormSubmit}
        isLoading={actionLoading === "form"}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Category</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete <span className="text-white font-medium">{selectedCategory?.name}</span>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={actionLoading === selectedCategory?._id}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading === selectedCategory?._id ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
