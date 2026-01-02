"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
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
  Grid,
  List,
  Loader2,
  X,
  CheckSquare,
  Square,
  Tag,
  Sparkles,
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

import { couponsApi } from "@/lib/api/coupons";
import { eventsApi } from "@/lib/api/events";
import type {
  Coupon,
  Event,
  CouponStatus,
  CreateCouponRequest,
  UpdateCouponRequest,
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

// Coupon status badge
function CouponStatusBadge({ coupon }: { coupon: Coupon }) {
  const now = new Date();
  const expired = coupon.validity_end && new Date(coupon.validity_end) < now;
  const maxedOut = coupon.max_total_uses && coupon.current_redemptions >= coupon.max_total_uses;

  if (coupon.status === "inactive") {
    return (
      <Badge variant="outline" className="bg-slate-600/20 text-slate-400 border-slate-600/30">
        <XCircle className="w-3 h-3 mr-1" /> Inactive
      </Badge>
    );
  }
  if (expired || coupon.status === "expired") {
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

// Coupon card component
function CouponCard({
  coupon,
  eventName,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onCopy,
  onToggleStatus,
}: {
  coupon: Coupon;
  eventName: string;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onToggleStatus: () => void;
}) {
  const usagePercentage = coupon.max_total_uses
    ? Math.min((coupon.current_redemptions / coupon.max_total_uses) * 100, 100)
    : 0;

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy();
    toast.success("Coupon code copied!");
  };

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card
        className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group cursor-pointer ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={onSelect}
      >
        <CardContent className="p-5">
          {/* Selection checkbox */}
          <div className="flex items-start justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white -ml-1 -mt-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              {isSelected ? (
                <CheckSquare className="w-4 h-4 text-blue-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </Button>
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
                    onCopy();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy Code
                </DropdownMenuItem>
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
                    onToggleStatus();
                  }}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                >
                  {coupon.status === "active" ? (
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

          {/* Code */}
          <div
            className={`px-4 py-2 rounded-lg border-2 border-dashed mb-4 inline-flex items-center gap-2 ${
              coupon.status === "active"
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-slate-600/50 bg-slate-800/30"
            }`}
          >
            <code className="text-lg font-bold text-white tracking-wider">{coupon.code}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white"
              onClick={handleCopyClick}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          {/* Description */}
          {coupon.description && (
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{coupon.description}</p>
          )}

          {/* Event */}
          <p className="text-slate-500 text-xs mb-4">
            <Tag className="w-3 h-3 inline mr-1" />
            {eventName}
          </p>

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
            {coupon.min_purchase_amount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Min. purchase</span>
                <span className="text-slate-300">GHS {coupon.min_purchase_amount}</span>
              </div>
            )}
            {coupon.validity_end && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Expires</span>
                <span className="text-slate-300">
                  {new Date(coupon.validity_end).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Usage progress */}
          {coupon.max_total_uses && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Usage</span>
                <span className="text-slate-300">
                  {coupon.current_redemptions} / {coupon.max_total_uses}
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercentage}%` }}
                  className={`h-full rounded-full ${
                    usagePercentage >= 100
                      ? "bg-red-500"
                      : usagePercentage >= 80
                      ? "bg-orange-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <CouponStatusBadge coupon={coupon} />
            {coupon.is_public && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Public
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Coupon row component (list view)
function CouponRow({
  coupon,
  eventName,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onCopy,
  onToggleStatus,
}: {
  coupon: Coupon;
  eventName: string;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onToggleStatus: () => void;
}) {
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

        {/* Code */}
        <div
          className={`px-3 py-1.5 rounded border-2 border-dashed flex-shrink-0 ${
            coupon.status === "active"
              ? "border-blue-500/50 bg-blue-500/10"
              : "border-slate-600/50 bg-slate-800/30"
          }`}
        >
          <code className="text-sm font-bold text-white tracking-wider">{coupon.code}</code>
        </div>

        {/* Discount */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {coupon.discount_type === "percentage" ? (
            <span className="text-lg font-bold text-white">{coupon.discount_value}%</span>
          ) : (
            <span className="text-lg font-bold text-white">GHS {coupon.discount_value}</span>
          )}
        </div>

        {/* Event */}
        <div className="flex-1 min-w-0 hidden md:block">
          <p className="text-slate-400 text-sm truncate">{eventName}</p>
        </div>

        {/* Usage */}
        <div className="text-center hidden sm:block w-20">
          <div className="text-sm font-medium text-white">{coupon.current_redemptions}</div>
          <p className="text-slate-500 text-xs">
            {coupon.max_total_uses ? `/ ${coupon.max_total_uses}` : "uses"}
          </p>
        </div>

        {/* Status */}
        <CouponStatusBadge coupon={coupon} />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white"
            onClick={onCopy}
          >
            <Copy className="w-4 h-4" />
          </Button>
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
                onClick={onToggleStatus}
                className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
              >
                {coupon.status === "active" ? (
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
      </div>
    </motion.div>
  );
}

// Form modal component
function CouponFormModal({
  isOpen,
  onClose,
  coupon,
  events,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  coupon?: Coupon | null;
  events: Event[];
  onSubmit: (data: CreateCouponRequest | UpdateCouponRequest) => void;
  isLoading?: boolean;
}) {
  // Compute initial form data
  const initialFormData = useMemo(
    () =>
      coupon
        ? {
            code: coupon.code || "",
            description: coupon.description || "",
            event: typeof coupon.event === "string" ? coupon.event : String(coupon.event),
            discount_type: coupon.discount_type || "percentage",
            discount_value: coupon.discount_value || 10,
            min_purchase_amount: coupon.min_purchase_amount || 0,
            max_total_uses: coupon.max_total_uses || undefined,
            max_uses_per_user: coupon.max_uses_per_user || 1,
            validity_start: coupon.validity_start ? coupon.validity_start.split("T")[0] : "",
            validity_end: coupon.validity_end ? coupon.validity_end.split("T")[0] : "",
            is_public: coupon.is_public || false,
            terms_and_conditions: coupon.terms_and_conditions || "",
          }
        : {
            code: "",
            description: "",
            event: "",
            discount_type: "percentage" as const,
            discount_value: 10,
            min_purchase_amount: 0,
            max_total_uses: undefined,
            max_uses_per_user: 1,
            validity_start: "",
            validity_end: "",
            is_public: false,
            terms_and_conditions: "",
          },
    [coupon]
  );

  const [formData, setFormData] = useState(initialFormData);
  const [generatingCode, setGeneratingCode] = useState(false);

  // Reset form when coupon changes
  const couponId = coupon?._id ?? null;
  const prevCouponIdRef = React.useRef<string | null>(couponId);

  if (prevCouponIdRef.current !== couponId) {
    prevCouponIdRef.current = couponId;
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setFormData(initialFormData);
    }
  }

  const generateCode = async () => {
    try {
      setGeneratingCode(true);
      const response = await couponsApi.generateCode();
      if (response.data?.code) {
        setFormData({ ...formData, code: response.data.code });
        toast.success("Code generated!");
      }
    } catch {
      // Fallback to local generation
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setFormData({ ...formData, code });
    } finally {
      setGeneratingCode(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: CreateCouponRequest | UpdateCouponRequest = {
      ...formData,
      discount_type: formData.discount_type as "percentage" | "fixed",
    };
    onSubmit(submitData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Ticket className="w-5 h-5 text-blue-400" />
            {coupon ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {coupon ? "Update coupon details" : "Create a new discount coupon for your event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Code */}
          <div>
            <Label className="text-slate-300">Coupon Code *</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g., VOTE20"
                className="bg-slate-800/50 border-slate-700 text-white uppercase"
                required
                disabled={!!coupon}
              />
              {!coupon && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateCode}
                  disabled={generatingCode}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 shrink-0"
                >
                  {generatingCode ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Event */}
          {!coupon && (
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
              placeholder="Brief description of this coupon..."
              rows={2}
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          {/* Discount type and value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Discount Type *</Label>
              <Select
                value={formData.discount_type}
                onValueChange={(value: "percentage" | "fixed") =>
                  setFormData({ ...formData, discount_type: value })
                }
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed (GHS)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Discount Value *</Label>
              <Input
                type="number"
                min={1}
                max={formData.discount_type === "percentage" ? 100 : undefined}
                value={formData.discount_value}
                onChange={(e) =>
                  setFormData({ ...formData, discount_value: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
                required
              />
            </div>
          </div>

          {/* Min purchase and max uses */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Min. Purchase (GHS)</Label>
              <Input
                type="number"
                min={0}
                value={formData.min_purchase_amount}
                onChange={(e) =>
                  setFormData({ ...formData, min_purchase_amount: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-300">Max Total Uses</Label>
              <Input
                type="number"
                min={1}
                value={formData.max_total_uses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_total_uses: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                placeholder="Unlimited"
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
          </div>

          {/* Max uses per user */}
          <div>
            <Label className="text-slate-300">Max Uses Per User</Label>
            <Input
              type="number"
              min={1}
              value={formData.max_uses_per_user}
              onChange={(e) =>
                setFormData({ ...formData, max_uses_per_user: parseInt(e.target.value) || 1 })
              }
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          {/* Validity dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Valid From</Label>
              <Input
                type="date"
                value={formData.validity_start}
                onChange={(e) => setFormData({ ...formData, validity_start: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-300">Valid Until</Label>
              <Input
                type="date"
                value={formData.validity_end}
                onChange={(e) => setFormData({ ...formData, validity_end: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-1"
              />
            </div>
          </div>

          {/* Terms */}
          <div>
            <Label className="text-slate-300">Terms & Conditions</Label>
            <Textarea
              value={formData.terms_and_conditions}
              onChange={(e) => setFormData({ ...formData, terms_and_conditions: e.target.value })}
              placeholder="Optional terms and conditions..."
              rows={2}
              className="bg-slate-800/50 border-slate-700 text-white mt-1"
            />
          </div>

          {/* Public toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <Label className="text-white">Public Coupon</Label>
              <p className="text-slate-400 text-xs">Show on public coupon list</p>
            </div>
            <Switch
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
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
                  {coupon ? "Updating..." : "Creating..."}
                </>
              ) : coupon ? (
                "Update Coupon"
              ) : (
                "Create Coupon"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Main component
export default function AdminCouponsTab() {
  // State
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCoupons, setSelectedCoupons] = useState<Set<string>>(new Set());

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [couponsToDelete, setCouponsToDelete] = useState<string[]>([]);

  // Pagination
  const [page] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Event map for display
  const eventMap = useMemo(() => {
    const map: Record<string, string> = {};
    events.forEach((e) => {
      map[e._id] = e.name;
    });
    return map;
  }, [events]);

  // Fetch coupons
  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await couponsApi.list({
        page,
        limit,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as CouponStatus) : undefined,
        event: eventFilter !== "all" ? eventFilter : undefined,
      });

      if (response.success && response.data) {
        setCoupons(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.total_pages || 1);
        }
      } else {
        setCoupons([]);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch coupons:", error);
      toast.error("Failed to load coupons");
      setCoupons([]);
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
    fetchCoupons();
    fetchEvents();
  }, [fetchCoupons, fetchEvents]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const active = coupons.filter((c) => {
      const expired = c.validity_end && new Date(c.validity_end) < now;
      const maxedOut = c.max_total_uses && c.current_redemptions >= c.max_total_uses;
      return c.status === "active" && !expired && !maxedOut;
    }).length;
    const expired = coupons.filter(
      (c) => c.validity_end && new Date(c.validity_end) < now
    ).length;
    const totalUses = coupons.reduce((acc, c) => acc + c.current_redemptions, 0);
    return { total: coupons.length, active, expired, totalUses };
  }, [coupons]);

  // Filter coupons
  const filteredCoupons = useMemo(() => {
    return coupons.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [coupons, searchQuery]);

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedCoupons);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCoupons(newSelected);
  };

  const selectAll = () => {
    if (selectedCoupons.size === filteredCoupons.length) {
      setSelectedCoupons(new Set());
    } else {
      setSelectedCoupons(new Set(filteredCoupons.map((c) => c._id)));
    }
  };

  // CRUD handlers
  const handleCreate = () => {
    setSelectedCoupon(null);
    setFormModalOpen(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (data: CreateCouponRequest | UpdateCouponRequest) => {
    try {
      setActionLoading(true);
      if (selectedCoupon) {
        await couponsApi.update(selectedCoupon._id, data as UpdateCouponRequest);
        toast.success("Coupon updated successfully");
      } else {
        await couponsApi.create(data as CreateCouponRequest);
        toast.success("Coupon created successfully");
      }
      setFormModalOpen(false);
      fetchCoupons();
    } catch (error: unknown) {
      console.error("Failed to save coupon:", error);
      toast.error("Failed to save coupon");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (coupon: Coupon) => {
    setCouponsToDelete([coupon._id]);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedCoupons.size === 0) return;
    setCouponsToDelete(Array.from(selectedCoupons));
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setActionLoading(true);
      if (couponsToDelete.length === 1) {
        await couponsApi.delete(couponsToDelete[0]);
        toast.success("Coupon deleted successfully");
      } else {
        await couponsApi.bulkDelete(couponsToDelete);
        toast.success(`${couponsToDelete.length} coupons deleted`);
      }
      setDeleteDialogOpen(false);
      setCouponsToDelete([]);
      setSelectedCoupons(new Set());
      fetchCoupons();
    } catch (error: unknown) {
      console.error("Failed to delete coupons:", error);
      toast.error("Failed to delete coupons");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!");
  };

  const handleToggleStatus = async (coupon: Coupon) => {
    try {
      if (coupon.status === "active") {
        await couponsApi.deactivate(coupon._id);
        toast.success("Coupon deactivated");
      } else {
        await couponsApi.activate(coupon._id);
        toast.success("Coupon activated");
      }
      fetchCoupons();
    } catch (error: unknown) {
      console.error("Failed to toggle status:", error);
      toast.error("Failed to toggle status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Ticket className="w-7 h-7 text-blue-400" />
            Discount Coupons
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage discount codes and promotions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchCoupons}
            disabled={loading}
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Coupon
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Coupons" value={stats.total} icon={Ticket} color="blue" />
        <StatCard label="Active" value={stats.active} icon={CheckCircle} color="green" />
        <StatCard label="Total Uses" value={stats.totalUses.toLocaleString()} icon={Users} color="purple" />
        <StatCard label="Expired" value={stats.expired} icon={Clock} color="orange" />
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
                  placeholder="Search coupons..."
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
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View mode and bulk actions */}
            <div className="flex items-center gap-2">
              {selectedCoupons.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete ({selectedCoupons.size})
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
          {filteredCoupons.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAll}
                className="text-slate-400 hover:text-white"
              >
                {selectedCoupons.size === filteredCoupons.length ? (
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
                {filteredCoupons.length} coupon{filteredCoupons.length !== 1 ? "s" : ""}
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
                <Skeleton className="w-24 h-8 mb-4" />
                <Skeleton className="w-20 h-6 mb-4" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2 mb-4" />
                <Skeleton className="w-20 h-6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredCoupons.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Ticket className="w-16 h-16 mx-auto text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No coupons found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery || statusFilter !== "all" || eventFilter !== "all"
                ? "Try adjusting your filters"
                : "Create your first discount coupon to get started"}
            </p>
            {!searchQuery && statusFilter === "all" && eventFilter === "all" && (
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Coupon
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
          {filteredCoupons.map((coupon) => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              eventName={eventMap[coupon.event as string] || "Unknown Event"}
              isSelected={selectedCoupons.has(coupon._id)}
              onSelect={() => toggleSelection(coupon._id)}
              onEdit={() => handleEdit(coupon)}
              onDelete={() => handleDelete(coupon)}
              onCopy={() => handleCopy(coupon.code)}
              onToggleStatus={() => handleToggleStatus(coupon)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
          {filteredCoupons.map((coupon) => (
            <CouponRow
              key={coupon._id}
              coupon={coupon}
              eventName={eventMap[coupon.event as string] || "Unknown Event"}
              isSelected={selectedCoupons.has(coupon._id)}
              onSelect={() => toggleSelection(coupon._id)}
              onEdit={() => handleEdit(coupon)}
              onDelete={() => handleDelete(coupon)}
              onCopy={() => handleCopy(coupon.code)}
              onToggleStatus={() => handleToggleStatus(coupon)}
            />
          ))}
        </motion.div>
      )}

      {/* Form Modal */}
      <CouponFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        coupon={selectedCoupon}
        events={events}
        onSubmit={handleFormSubmit}
        isLoading={actionLoading}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Coupon(s)?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {couponsToDelete.length === 1
                ? "This will permanently delete the selected coupon. This action cannot be undone."
                : `This will permanently delete ${couponsToDelete.length} coupons. This action cannot be undone.`}
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
