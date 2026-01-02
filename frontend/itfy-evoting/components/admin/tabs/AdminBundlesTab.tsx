"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Package,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  Vote,
  Tag,
  Zap,
  Loader2,
  RefreshCw,
  Grid,
  List,
  X,
  CheckCircle,
  XCircle,
  Copy,
  Percent,
  CheckSquare,
  Square,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
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

import { bundlesApi } from "@/lib/api/bundles";
import { eventsApi } from "@/lib/api/events";
import type {
  Bundle,
  Event,
  BundleStatus,
  CreateBundleRequest,
  UpdateBundleRequest,
} from "@/types";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Status config
const statusConfig: Record<
  BundleStatus,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  active: { label: "Active", color: "green", icon: CheckCircle },
  inactive: { label: "Inactive", color: "slate", icon: XCircle },
  archived: { label: "Archived", color: "amber", icon: Clock },
};

// Get event name helper
function getEventName(event: Bundle["event"]): string {
  if (!event) return "No Event";
  if (typeof event === "object" && "name" in event) return event.name;
  return "Unknown Event";
}

// Stats card
function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    orange: "bg-orange-500/20 text-orange-400",
    amber: "bg-amber-500/20 text-amber-400",
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-white">{value}</div>
          <p className="text-slate-400 text-xs">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Bundle card component
function BundleCard({
  bundle,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onDuplicate,
}: {
  bundle: Bundle;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleFeatured: () => void;
  onDuplicate: () => void;
}) {
  const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;
  const config = statusConfig[bundle.status] || statusConfig.inactive;
  const StatusIcon = config.icon;

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card
        className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group relative cursor-pointer ${
          bundle.is_featured ? "ring-2 ring-yellow-500/50" : ""
        } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        onClick={onSelect}
      >
        {/* Selection checkbox */}
        <div className="absolute top-3 left-3 z-10" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-400 hover:text-white"
            onClick={onSelect}
          >
            {isSelected ? (
              <CheckSquare className="w-4 h-4 text-blue-400" />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Featured badge */}
        {bundle.is_featured && (
          <div className="absolute top-3 left-10 z-10">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Star className="w-3 h-3 mr-1 fill-current" /> Featured
            </Badge>
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-12 z-10">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <Percent className="w-3 h-3 mr-1" />
              {bundle.discount_percentage}% OFF
            </Badge>
          </div>
        )}

        <CardContent className="p-5 pt-12">
          {/* Header with icon and menu */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Package className="w-7 h-7 text-blue-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFeatured();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  <Star className="w-4 h-4 mr-2" />
                  {bundle.is_featured ? "Remove Featured" : "Make Featured"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  {bundle.status === "active" ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" /> Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" /> Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Name and description */}
          <h3 className="font-bold text-white text-xl mb-1">{bundle.name}</h3>
          <p className="text-slate-400 text-sm mb-3 line-clamp-2">
            {bundle.description || "No description"}
          </p>

          {/* Event */}
          <p className="text-slate-500 text-xs mb-4">
            <Tag className="w-3 h-3 inline mr-1" />
            {getEventName(bundle.event)}
          </p>

          {/* Votes */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-slate-800/30 rounded-lg">
            <Vote className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-white">{bundle.vote_count}</span>
            <span className="text-slate-400">votes</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-white">
              {bundle.currency || "GHS"} {bundle.price.toFixed(2)}
            </span>
            {hasDiscount && bundle.original_price && (
              <span className="text-slate-500 line-through text-sm">
                {bundle.currency || "GHS"} {bundle.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Price per vote */}
          {bundle.pricePerVote && (
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-slate-500">Per vote</span>
              <span className="text-slate-300">
                {bundle.currency || "GHS"} {bundle.pricePerVote.toFixed(2)}
              </span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge
              variant="outline"
              className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
            <span className="text-slate-500 text-xs">Order: {bundle.display_order}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Bundle row component (list view)
function BundleRow({
  bundle,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}: {
  bundle: Bundle;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleFeatured: () => void;
}) {
  const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;
  const config = statusConfig[bundle.status] || statusConfig.inactive;
  const StatusIcon = config.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={`group bg-slate-900/30 hover:bg-slate-800/50 rounded-lg p-4 border border-transparent ${
        isSelected ? "border-blue-500 bg-blue-500/10" : "hover:border-slate-700"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Selection checkbox */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-white"
          onClick={onSelect}
        >
          {isSelected ? (
            <CheckSquare className="w-4 h-4 text-blue-400" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </Button>

        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Package className="w-5 h-5 text-blue-400" />
        </div>

        {/* Name and description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{bundle.name}</h3>
            {bundle.is_featured && (
              <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
            )}
          </div>
          <p className="text-slate-400 text-sm truncate">
            {bundle.description || "No description"}
          </p>
        </div>

        {/* Votes */}
        <div className="text-center hidden sm:block w-20">
          <div className="text-lg font-bold text-white">{bundle.vote_count}</div>
          <p className="text-slate-500 text-xs">votes</p>
        </div>

        {/* Price */}
        <div className="text-right hidden md:block w-28">
          <div className="text-lg font-bold text-white">
            {bundle.currency || "GHS"} {bundle.price.toFixed(2)}
          </div>
          {hasDiscount && (
            <p className="text-red-400 text-xs">-{bundle.discount_percentage}%</p>
          )}
        </div>

        {/* Status */}
        <Badge
          variant="outline"
          className={`hidden lg:flex bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}
        >
          <StatusIcon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
            <DropdownMenuItem
              onClick={onEdit}
              className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onToggleFeatured}
              className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
            >
              <Star className="w-4 h-4 mr-2" />
              {bundle.is_featured ? "Remove Featured" : "Make Featured"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onToggleStatus}
              className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
            >
              {bundle.status === "active" ? (
                <>
                  <XCircle className="w-4 h-4 mr-2" /> Deactivate
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" /> Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

// Form modal component
function BundleFormModal({
  isOpen,
  onClose,
  bundle,
  events,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  bundle?: Bundle | null;
  events: Event[];
  onSubmit: (data: CreateBundleRequest | UpdateBundleRequest) => void;
  isLoading?: boolean;
}) {
  // Compute initial form data
  const initialFormData: Partial<CreateBundleRequest> = useMemo(() => {
    if (bundle) {
      return {
        name: bundle.name || "",
        description: bundle.description || "",
        event: typeof bundle.event === "object" ? bundle.event._id : bundle.event?.toString() || "",
        vote_count: bundle.vote_count || 10,
        price: bundle.price || 0,
        discount_percentage: bundle.discount_percentage || 0,
        is_featured: bundle.is_featured || false,
        valid_from: bundle.valid_from ? bundle.valid_from.split("T")[0] : "",
        valid_until: bundle.valid_until ? bundle.valid_until.split("T")[0] : "",
      };
    }
    return {
      name: "",
      description: "",
      event: "",
      vote_count: 10,
      price: 0,
      discount_percentage: 0,
      is_featured: false,
      valid_from: "",
      valid_until: "",
    };
  }, [bundle]);

  const [formData, setFormData] = useState<Partial<CreateBundleRequest>>(initialFormData);

  // Reset form when bundle changes
  const bundleId = bundle?._id ?? null;
  const prevBundleIdRef = React.useRef<string | null>(bundleId);

  if (prevBundleIdRef.current !== bundleId) {
    prevBundleIdRef.current = bundleId;
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setFormData(initialFormData);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as CreateBundleRequest);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-400" />
            {bundle ? "Edit Bundle" : "Create New Bundle"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {bundle
              ? "Update bundle details and pricing"
              : "Create a new vote bundle for your event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name */}
          <div>
            <Label className="text-slate-300">Bundle Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Super Fan Pack"
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
              required
            />
          </div>

          {/* Event */}
          {!bundle && (
            <div>
              <Label className="text-slate-300">Event *</Label>
              <Select
                value={formData.event}
                onValueChange={(value) => setFormData({ ...formData, event: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id} className="text-white">
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description */}
          <div>
            <Label className="text-slate-300">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this bundle..."
              rows={2}
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          {/* Votes and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Number of Votes *</Label>
              <Input
                type="number"
                min={1}
                value={formData.vote_count}
                onChange={(e) =>
                  setFormData({ ...formData, vote_count: parseInt(e.target.value) || 1 })
                }
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-slate-300">Price (GHS) *</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                }
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
                required
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <Label className="text-slate-300">Discount Percentage</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={formData.discount_percentage}
              onChange={(e) =>
                setFormData({ ...formData, discount_percentage: parseInt(e.target.value) || 0 })
              }
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
              placeholder="0"
            />
          </div>

          {/* Validity dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Valid From</Label>
              <Input
                type="date"
                value={formData.valid_from}
                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-300">Valid Until</Label>
              <Input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Featured Bundle</Label>
              <p className="text-slate-400 text-xs">Highlight this bundle on the purchase page</p>
            </div>
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
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
                  {bundle ? "Updating..." : "Creating..."}
                </>
              ) : bundle ? (
                "Update Bundle"
              ) : (
                "Create Bundle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Main component
export default function AdminBundlesTab() {
  // State
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBundles, setSelectedBundles] = useState<Set<string>>(new Set());
  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [bundlesToDelete, setBundlesToDelete] = useState<string[]>([]);

  // Pagination
  const [page] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Fetch bundles
  const fetchBundles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await bundlesApi.list({
        page,
        limit,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as BundleStatus) : undefined,
        event: eventFilter !== "all" ? eventFilter : undefined,
      });

      if (response.success && response.data) {
        setBundles(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.total_pages || 1);
        }
      } else {
        setBundles([]);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch bundles:", error);
      toast.error("Failed to load bundles");
      setBundles([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery, statusFilter, eventFilter]);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      const response = await eventsApi.list({ page: 1, limit: 100 });
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch events:", error);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchBundles();
    fetchEvents();
  }, [fetchBundles, fetchEvents]);

  // Stats
  const stats = useMemo(() => {
    const active = bundles.filter((b) => b.status === "active").length;
    const featured = bundles.filter((b) => b.is_featured).length;
    const totalVotes = bundles.reduce((acc, b) => acc + b.vote_count, 0);
    return { total: bundles.length, active, featured, totalVotes };
  }, [bundles]);

  // Filter bundles
  const filteredBundles = useMemo(() => {
    return bundles.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [bundles, searchQuery]);

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedBundles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBundles(newSelected);
  };

  const selectAll = () => {
    if (selectedBundles.size === filteredBundles.length) {
      setSelectedBundles(new Set());
    } else {
      setSelectedBundles(new Set(filteredBundles.map((b) => b._id)));
    }
  };

  // CRUD handlers
  const handleCreate = () => {
    setSelectedBundle(null);
    setFormModalOpen(true);
  };

  const handleEdit = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (data: CreateBundleRequest | UpdateBundleRequest) => {
    try {
      setActionLoading(true);
      if (selectedBundle) {
        await bundlesApi.update(selectedBundle._id, data as UpdateBundleRequest);
        toast.success("Bundle updated successfully");
      } else {
        await bundlesApi.create(data as CreateBundleRequest);
        toast.success("Bundle created successfully");
      }
      setFormModalOpen(false);
      fetchBundles();
    } catch (error: unknown) {
      console.error("Failed to save bundle:", error);
      toast.error("Failed to save bundle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (bundle: Bundle) => {
    setBundlesToDelete([bundle._id]);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedBundles.size === 0) return;
    setBundlesToDelete(Array.from(selectedBundles));
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setActionLoading(true);
      if (bundlesToDelete.length === 1) {
        await bundlesApi.delete(bundlesToDelete[0]);
        toast.success("Bundle deleted successfully");
      } else {
        await bundlesApi.bulkDelete(bundlesToDelete);
        toast.success(`${bundlesToDelete.length} bundles deleted`);
      }
      setDeleteDialogOpen(false);
      setBundlesToDelete([]);
      setSelectedBundles(new Set());
      fetchBundles();
    } catch (error: unknown) {
      console.error("Failed to delete bundles:", error);
      toast.error("Failed to delete bundles");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (bundle: Bundle) => {
    try {
      if (bundle.status === "active") {
        await bundlesApi.deactivate(bundle._id);
        toast.success("Bundle deactivated");
      } else {
        await bundlesApi.activate(bundle._id);
        toast.success("Bundle activated");
      }
      fetchBundles();
    } catch (error: unknown) {
      console.error("Failed to toggle status:", error);
      toast.error("Failed to toggle status");
    }
  };

  const handleToggleFeatured = async (bundle: Bundle) => {
    try {
      if (bundle.is_featured) {
        await bundlesApi.unfeature(bundle._id);
        toast.success("Bundle unfeatured");
      } else {
        await bundlesApi.feature(bundle._id);
        toast.success("Bundle featured");
      }
      fetchBundles();
    } catch (error: unknown) {
      console.error("Failed to toggle featured:", error);
      toast.error("Failed to toggle featured");
    }
  };

  const handleDuplicate = async (bundle: Bundle) => {
    try {
      await bundlesApi.duplicate(bundle._id);
      toast.success("Bundle duplicated");
      fetchBundles();
    } catch (error: unknown) {
      console.error("Failed to duplicate bundle:", error);
      toast.error("Failed to duplicate bundle");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-7 h-7 text-blue-400" />
            Vote Bundles
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage vote packages and pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchBundles}
            disabled={loading}
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Bundle
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Bundles" value={stats.total} icon={Package} color="blue" />
        <StatCard label="Active" value={stats.active} icon={Zap} color="green" />
        <StatCard label="Featured" value={stats.featured} icon={Star} color="amber" />
        <StatCard label="Total Votes" value={stats.totalVotes.toLocaleString()} icon={Vote} color="purple" />
      </div>

      {/* Filters */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search bundles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Event filter */}
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="All Events" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id} className="text-white">
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View mode and bulk actions */}
            <div className="flex items-center gap-2">
              {selectedBundles.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete ({selectedBundles.size})
                </Button>
              )}

              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`h-9 w-9 rounded-none ${
                    viewMode === "grid" ? "bg-slate-700 text-white" : "text-slate-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`h-9 w-9 rounded-none ${
                    viewMode === "list" ? "bg-slate-700 text-white" : "text-slate-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Selection info */}
          {filteredBundles.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAll}
                className="text-slate-400 hover:text-white"
              >
                {selectedBundles.size === filteredBundles.length ? (
                  <>
                    <X className="w-4 h-4 mr-1" /> Deselect All
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4 mr-1" /> Select All
                  </>
                )}
              </Button>
              <span className="text-slate-500 text-sm">
                {filteredBundles.length} bundle{filteredBundles.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      {loading ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          }
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-5">
                <Skeleton className="w-14 h-14 rounded-xl mb-4" />
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-full h-4 mb-4" />
                <Skeleton className="w-full h-12 mb-4" />
                <Skeleton className="w-24 h-8" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredBundles.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No bundles found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery || statusFilter !== "all" || eventFilter !== "all"
                ? "Try adjusting your filters"
                : "Create your first vote bundle to get started"}
            </p>
            {!searchQuery && statusFilter === "all" && eventFilter === "all" && (
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Bundle
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredBundles.map((bundle) => (
            <BundleCard
              key={bundle._id}
              bundle={bundle}
              isSelected={selectedBundles.has(bundle._id)}
              onSelect={() => toggleSelection(bundle._id)}
              onEdit={() => handleEdit(bundle)}
              onDelete={() => handleDelete(bundle)}
              onToggleStatus={() => handleToggleStatus(bundle)}
              onToggleFeatured={() => handleToggleFeatured(bundle)}
              onDuplicate={() => handleDuplicate(bundle)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
          {filteredBundles.map((bundle) => (
            <BundleRow
              key={bundle._id}
              bundle={bundle}
              isSelected={selectedBundles.has(bundle._id)}
              onSelect={() => toggleSelection(bundle._id)}
              onEdit={() => handleEdit(bundle)}
              onDelete={() => handleDelete(bundle)}
              onToggleStatus={() => handleToggleStatus(bundle)}
              onToggleFeatured={() => handleToggleFeatured(bundle)}
            />
          ))}
        </motion.div>
      )}

      {/* Form Modal */}
      <BundleFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        bundle={selectedBundle}
        events={events}
        onSubmit={handleFormSubmit}
        isLoading={actionLoading}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Bundle(s)?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {bundlesToDelete.length === 1
                ? "This will permanently delete the selected bundle. This action cannot be undone."
                : `This will permanently delete ${bundlesToDelete.length} bundles. This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={actionLoading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
