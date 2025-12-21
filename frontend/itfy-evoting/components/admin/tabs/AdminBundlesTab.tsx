"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
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
  Vote,
  DollarSign,
  Tag,
  Percent,
  Star,
  Zap,
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

// Bundle type
interface Bundle {
  _id: string;
  name: string;
  votes: number;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  description?: string;
  is_featured: boolean;
  is_active: boolean;
  sales_count: number;
  created_at: string;
  updated_at: string;
}

// Mock bundles
const mockBundles: Bundle[] = [
  {
    _id: "1",
    name: "Starter Pack",
    votes: 10,
    price: 5,
    original_price: 5,
    description: "Perfect for casual voters",
    is_featured: false,
    is_active: true,
    sales_count: 1245,
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    name: "Popular Choice",
    votes: 50,
    price: 20,
    original_price: 25,
    discount_percentage: 20,
    description: "Best value for dedicated fans",
    is_featured: true,
    is_active: true,
    sales_count: 3420,
    created_at: "2024-10-01T10:30:00Z",
    updated_at: "2024-12-15T12:00:00Z",
  },
  {
    _id: "3",
    name: "Super Fan",
    votes: 100,
    price: 35,
    original_price: 50,
    discount_percentage: 30,
    description: "For the ultimate supporters",
    is_featured: true,
    is_active: true,
    sales_count: 2180,
    created_at: "2024-10-02T09:00:00Z",
    updated_at: "2024-12-14T16:45:00Z",
  },
  {
    _id: "4",
    name: "Mega Bundle",
    votes: 500,
    price: 150,
    original_price: 250,
    discount_percentage: 40,
    description: "Maximum voting power",
    is_featured: false,
    is_active: true,
    sales_count: 542,
    created_at: "2024-10-03T11:00:00Z",
    updated_at: "2024-12-10T11:00:00Z",
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

// Bundle card
function BundleCard({
  bundle,
  onEdit,
  onDelete,
  onToggle,
}: {
  bundle: Bundle;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const hasDiscount = bundle.discount_percentage && bundle.discount_percentage > 0;

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group relative ${
        bundle.is_featured ? "ring-2 ring-yellow-500/50" : ""
      }`}>
        {bundle.is_featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Star className="w-3 h-3 mr-1" /> Featured
            </Badge>
          </div>
        )}
        
        {hasDiscount && (
          <div className="absolute top-3 right-12 z-10">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              -{bundle.discount_percentage}%
            </Badge>
          </div>
        )}

        <CardContent className="p-5 pt-12">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Package className="w-7 h-7 text-blue-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
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

          <h3 className="font-bold text-white text-xl mb-1">{bundle.name}</h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">{bundle.description || "No description"}</p>

          {/* Votes */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-slate-800/30 rounded-lg">
            <Vote className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-white">{bundle.votes}</span>
            <span className="text-slate-400">votes</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-white">GHS {bundle.price}</span>
            {hasDiscount && bundle.original_price && (
              <span className="text-slate-500 line-through text-sm">GHS {bundle.original_price}</span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-slate-500">Sales</span>
            <span className="text-slate-300">{bundle.sales_count.toLocaleString()} sold</span>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Badge
              variant="outline"
              className={bundle.is_active
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-slate-600/20 text-slate-400 border-slate-600/30"
              }
            >
              {bundle.is_active ? "Active" : "Inactive"}
            </Badge>
            <Switch checked={bundle.is_active} onCheckedChange={onToggle} className="scale-75" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Bundle modal
function BundleModal({
  open,
  onClose,
  bundle,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  bundle?: Bundle | null;
  onSave: (data: Partial<Bundle>) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    votes: 10,
    price: 5,
    original_price: 5,
    discount_percentage: 0,
    description: "",
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (bundle) {
      setFormData({
        name: bundle.name || "",
        votes: bundle.votes || 10,
        price: bundle.price || 5,
        original_price: bundle.original_price || bundle.price || 5,
        discount_percentage: bundle.discount_percentage || 0,
        description: bundle.description || "",
        is_featured: bundle.is_featured ?? false,
        is_active: bundle.is_active ?? true,
      });
    } else {
      setFormData({
        name: "",
        votes: 10,
        price: 5,
        original_price: 5,
        discount_percentage: 0,
        description: "",
        is_featured: false,
        is_active: true,
      });
    }
  }, [bundle, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{bundle ? "Edit Bundle" : "Create Bundle"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Bundle Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Super Fan Pack"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Number of Votes</Label>
              <Input
                type="number"
                min={1}
                value={formData.votes}
                onChange={(e) => setFormData({ ...formData, votes: parseInt(e.target.value) || 1 })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Price (GHS)</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Original Price (GHS)</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Discount %</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={formData.discount_percentage}
                onChange={(e) => setFormData({ ...formData, discount_percentage: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description"
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <Label className="text-white">Featured</Label>
                <p className="text-slate-400 text-xs">Highlight this bundle</p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <Label className="text-white">Active</Label>
                <p className="text-slate-400 text-xs">Available for purchase</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {bundle ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminBundlesTab() {
  const [loading, setLoading] = useState(true);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);

  useEffect(() => {
    fetchBundles();
  }, [statusFilter, searchQuery]);

  const fetchBundles = async () => {
    try {
      setLoading(true);
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBundles(mockBundles);
    } catch (error) {
      console.error("Failed to fetch bundles:", error);
      setBundles(mockBundles);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedBundle(null);
    setModalOpen(true);
  };

  const handleEdit = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Bundle>) => {
    // Save logic here
    console.log("Saving bundle:", data);
    setModalOpen(false);
    fetchBundles();
  };

  const handleToggle = async (bundle: Bundle) => {
    // Toggle logic here
    console.log("Toggling bundle:", bundle._id);
    fetchBundles();
  };

  // Filter bundles
  const filteredBundles = bundles.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && b.is_active) ||
      (statusFilter === "inactive" && !b.is_active) ||
      (statusFilter === "featured" && b.is_featured);
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalRevenue = bundles.reduce((acc, b) => acc + b.price * b.sales_count, 0);
  const totalSales = bundles.reduce((acc, b) => acc + b.sales_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Vote Bundles</h1>
          <p className="text-slate-400 text-sm mt-1">Manage vote packages and pricing</p>
        </div>
        <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Bundle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Bundles", value: bundles.length, icon: Package, color: "blue" },
          { label: "Active", value: bundles.filter((b) => b.is_active).length, icon: Zap, color: "green" },
          { label: "Total Sales", value: totalSales.toLocaleString(), icon: Tag, color: "purple" },
          { label: "Revenue", value: `GHS ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "orange" },
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
                  placeholder="Search bundles..."
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
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={fetchBundles} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bundles grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredBundles.map((bundle) => (
            <BundleCard
              key={bundle._id}
              bundle={bundle}
              onEdit={() => handleEdit(bundle)}
              onDelete={() => {}}
              onToggle={() => handleToggle(bundle)}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filteredBundles.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No bundles found</h3>
            <p className="text-slate-400 text-sm mb-4">Create your first vote bundle</p>
            <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Add Bundle
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <BundleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        bundle={selectedBundle}
        onSave={handleSave}
      />
    </div>
  );
}
