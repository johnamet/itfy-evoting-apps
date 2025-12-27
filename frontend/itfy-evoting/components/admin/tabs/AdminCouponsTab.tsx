"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  RefreshCw,
  Percent,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
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
import { couponsApi } from "@/lib/api/coupons";

// Coupon type
interface Coupon {
  _id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_purchase?: number;
  max_uses?: number;
  uses_count: number;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Mock coupons
const mockCoupons: Coupon[] = [
  {
    _id: "1",
    code: "VOTE20",
    discount_type: "percentage",
    discount_value: 20,
    min_purchase: 10,
    max_uses: 500,
    uses_count: 234,
    expires_at: "2025-01-31T23:59:59Z",
    is_active: true,
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    code: "NEWYEAR25",
    discount_type: "percentage",
    discount_value: 25,
    min_purchase: 20,
    max_uses: 1000,
    uses_count: 567,
    expires_at: "2025-01-01T23:59:59Z",
    is_active: true,
    created_at: "2024-12-10T09:00:00Z",
    updated_at: "2024-12-15T12:00:00Z",
  },
  {
    _id: "3",
    code: "FIXED5",
    discount_type: "fixed",
    discount_value: 5,
    min_purchase: 15,
    max_uses: 200,
    uses_count: 89,
    expires_at: "2025-02-28T23:59:59Z",
    is_active: true,
    created_at: "2024-12-05T11:00:00Z",
    updated_at: "2024-12-14T16:45:00Z",
  },
  {
    _id: "4",
    code: "FLASH50",
    discount_type: "percentage",
    discount_value: 50,
    max_uses: 50,
    uses_count: 50,
    expires_at: "2024-12-15T23:59:59Z",
    is_active: false,
    created_at: "2024-12-14T10:00:00Z",
    updated_at: "2024-12-15T23:59:59Z",
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

// Status badge
function CouponStatus({ coupon }: { coupon: Coupon }) {
  const now = new Date();
  const expired = coupon.expires_at && new Date(coupon.expires_at) < now;
  const maxedOut = coupon.max_uses && coupon.uses_count >= coupon.max_uses;

  if (!coupon.is_active) {
    return (
      <Badge variant="outline" className="bg-slate-600/20 text-slate-400 border-slate-600/30">
        <XCircle className="w-3 h-3 mr-1" /> Inactive
      </Badge>
    );
  }
  if (expired) {
    return (
      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
        <Clock className="w-3 h-3 mr-1" /> Expired
      </Badge>
    );
  }
  if (maxedOut) {
    return (
      <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
        <Users className="w-3 h-3 mr-1" /> Maxed Out
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
      <CheckCircle className="w-3 h-3 mr-1" /> Active
    </Badge>
  );
}

// Coupon card
function CouponCard({
  coupon,
  onEdit,
  onDelete,
  onCopy,
  onToggle,
}: {
  coupon: Coupon;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onToggle: () => void;
}) {
  const usagePercentage = coupon.max_uses 
    ? Math.min((coupon.uses_count / coupon.max_uses) * 100, 100) 
    : 0;

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`px-4 py-2 rounded-lg border-2 border-dashed ${
              coupon.is_active ? "border-blue-500/50 bg-blue-500/10" : "border-slate-600/50 bg-slate-800/30"
            }`}>
              <code className="text-lg font-bold text-white tracking-wider">{coupon.code}</code>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuItem onClick={onCopy} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Copy className="w-4 h-4 mr-2" /> Copy Code
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

          {/* Discount */}
          <div className="flex items-center gap-2 mb-4">
            {coupon.discount_type === "percentage" ? (
              <>
                <Percent className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white">{coupon.discount_value}%</span>
                <span className="text-slate-400">off</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white">GHS {coupon.discount_value}</span>
                <span className="text-slate-400">off</span>
              </>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4 text-sm">
            {coupon.min_purchase && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Min. purchase</span>
                <span className="text-slate-300">GHS {coupon.min_purchase}</span>
              </div>
            )}
            {coupon.expires_at && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Expires</span>
                <span className="text-slate-300">
                  {new Date(coupon.expires_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Usage progress */}
          {coupon.max_uses && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Usage</span>
                <span className="text-slate-300">
                  {coupon.uses_count} / {coupon.max_uses}
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercentage}%` }}
                  className={`h-full rounded-full ${
                    usagePercentage >= 100 ? "bg-red-500" :
                    usagePercentage >= 80 ? "bg-orange-500" :
                    "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Status and toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <CouponStatus coupon={coupon} />
            <Switch checked={coupon.is_active} onCheckedChange={onToggle} className="scale-75" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Coupon modal
function CouponModal({
  open,
  onClose,
  coupon,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  coupon?: Coupon | null;
  onSave: (data: Partial<Coupon>) => void;
}) {
  // Get initial form data based on coupon
  const getInitialFormData = () => ({
    code: coupon?.code || "",
    discount_type: (coupon?.discount_type || "percentage") as "percentage" | "fixed",
    discount_value: coupon?.discount_value || 10,
    min_purchase: coupon?.min_purchase || 0,
    max_uses: coupon?.max_uses || 100,
    expires_at: coupon?.expires_at ? coupon.expires_at.split("T")[0] : "",
    is_active: coupon?.is_active ?? true,
  });

  const [formData, setFormData] = useState(getInitialFormData);

  // Reset form when coupon changes (only when modal is open)
  const couponId = coupon?._id;
  useEffect(() => {
    setFormData(getInitialFormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponId]);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{coupon ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g., VOTE20"
                className="bg-slate-800/50 border-slate-700 text-white uppercase"
                required
              />
              <Button type="button" variant="outline" onClick={generateCode} className="border-slate-600 text-slate-300 hover:bg-slate-800 shrink-0">
                Generate
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Discount Type</Label>
              <Select
                value={formData.discount_type}
                onValueChange={(value: "percentage" | "fixed") =>
                  setFormData({ ...formData, discount_type: value })
                }
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed (GHS)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Discount Value</Label>
              <Input
                type="number"
                min={1}
                max={formData.discount_type === "percentage" ? 100 : undefined}
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Min. Purchase (GHS)</Label>
              <Input
                type="number"
                min={0}
                value={formData.min_purchase}
                onChange={(e) => setFormData({ ...formData, min_purchase: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Max Uses</Label>
              <Input
                type="number"
                min={1}
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: parseInt(e.target.value) || 100 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Expiry Date</Label>
            <Input
              type="date"
              value={formData.expires_at}
              onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Active</Label>
              <p className="text-slate-400 text-xs">Coupon can be used</p>
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
              {coupon ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminCouponsTab() {
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, [statusFilter, searchQuery]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await couponsApi.list({
        search: searchQuery,
        status: statusFilter === "all" ? undefined : statusFilter as any,
      });
      setCoupons(response.data || []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCoupon(null);
    setModalOpen(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Coupon>) => {
    try {
      if (selectedCoupon) {
        await couponsApi.update(selectedCoupon._id, data as any);
      } else {
        await couponsApi.create(data as any);
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (error) {
      console.error("Failed to save coupon:", error);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleToggle = async (coupon: Coupon) => {
    try {
      await couponsApi.update(coupon._id, { is_active: !coupon.is_active });
      fetchCoupons();
    } catch (error) {
      console.error("Failed to toggle coupon:", error);
    }
  };

  // Filter coupons
  const now = new Date();
  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const expired = c.expires_at && new Date(c.expires_at) < now;
    const maxedOut = c.max_uses && c.uses_count >= c.max_uses;

    if (statusFilter === "active") return c.is_active && !expired && !maxedOut && matchesSearch;
    if (statusFilter === "expired") return expired && matchesSearch;
    if (statusFilter === "inactive") return !c.is_active && matchesSearch;
    return matchesSearch;
  });

  // Stats
  const activeCoupons = coupons.filter((c) => {
    const expired = c.expires_at && new Date(c.expires_at) < now;
    const maxedOut = c.max_uses && c.uses_count >= c.max_uses;
    return c.is_active && !expired && !maxedOut;
  }).length;
  const totalUses = coupons.reduce((acc, c) => acc + c.uses_count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupons</h1>
          <p className="text-slate-400 text-sm mt-1">Manage discount codes and promotions</p>
        </div>
        <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Coupons", value: coupons.length, icon: Ticket, color: "blue" },
          { label: "Active", value: activeCoupons, icon: CheckCircle, color: "green" },
          { label: "Total Uses", value: totalUses.toLocaleString(), icon: Users, color: "purple" },
          { label: "Expired", value: coupons.filter((c) => c.expires_at && new Date(c.expires_at) < now).length, icon: Clock, color: "orange" },
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
                  placeholder="Search coupons..."
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
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={fetchCoupons} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Coupons grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-5">
                <Skeleton className="w-24 h-8 mb-4" />
                <Skeleton className="w-20 h-6 mb-4" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2 mb-4" />
                <Skeleton className="w-20 h-6" />
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
          {filteredCoupons.map((coupon) => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              onEdit={() => handleEdit(coupon)}
              onDelete={async () => {
                try {
                  await couponsApi.delete(coupon._id);
                  fetchCoupons();
                } catch (error) {
                  console.error("Failed to delete coupon:", error);
                }
              }}
              onCopy={() => handleCopy(coupon.code)}
              onToggle={() => handleToggle(coupon)}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && filteredCoupons.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Ticket className="w-12 h-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No coupons found</h3>
            <p className="text-slate-400 text-sm mb-4">Create your first discount coupon</p>
            <Button onClick={handleCreate} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Create Coupon
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <CouponModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        coupon={selectedCoupon}
        onSave={handleSave}
      />
    </div>
  );
}
