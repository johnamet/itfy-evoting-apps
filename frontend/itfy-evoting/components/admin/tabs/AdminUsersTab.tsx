import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Shield,
  Mail,
  Clock,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Ban,
  RotateCcw,
  Trash,
  Key,
  History,
  X,
  UserX,
  ShieldCheck,
  Settings,
} from "lucide-react";

import { usersApi } from "@/lib/api/users";
import { useAuthStore } from "@/store/auth";
import type { User, UserRole, UserStatus } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InlineSpinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { activitiesApi, Activity } from "@/lib/api";

interface UserStats {
  total: number;
  byStatus: {
    active: number;
    inactive: number;
    suspended: number;
  };
  byRole: Record<string, number>;
  verification: {
    verified: number;
    unverified: number;
  };
  activity: {
    recentRegistrations: number;
    recentLogins: number;
  };
}

const roleBadgeColors: Record<UserRole, string> = {
  super_admin: "bg-red-500/20 text-red-400 border-red-500/30",
  admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  organiser: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  moderator: "bg-green-500/20 text-green-400 border-green-500/30",
};

const statusBadgeColors: Record<UserStatus, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  suspended: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
};

function UserCard({
  user,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onAction,
  isSuperAdmin,
  isDeleted = false,
}: {
  user: User;
  selected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAction: (action: string) => void;
  isSuperAdmin: boolean;
  isDeleted?: boolean;
}) {
  const userStatus = user.status;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card
        className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden transition-all duration-200 ${
          selected ? "ring-2 ring-blue-500" : "hover:border-slate-600"
        } ${isDeleted ? "opacity-75" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <Checkbox
              checked={selected}
              onCheckedChange={onSelect}
              className="border-slate-600 data-[state=checked]:bg-blue-500"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                
                {!isDeleted ? (
                  <>
                    <DropdownMenuItem onClick={onView} className="text-slate-300">
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit} className="text-slate-300">
                      <Edit className="w-4 h-4 mr-2" /> Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction('activity')} className="text-slate-300">
                      <History className="w-4 h-4 mr-2" /> Activity Log
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    {user.status === "suspended" ? (
                      <DropdownMenuItem onClick={() => onAction('reactivate')} className="text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" /> Reactivate
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onAction('suspend')} className="text-orange-400">
                        <Ban className="w-4 h-4 mr-2" /> Suspend
                      </DropdownMenuItem>
                    )}
                    
                    {!user.email_verified && (
                      <DropdownMenuItem onClick={() => onAction('verify')} className="text-blue-400">
                        <Mail className="w-4 h-4 mr-2" /> Verify Email
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={() => onAction('resetPassword')} className="text-purple-400">
                      <Key className="w-4 h-4 mr-2" /> Reset Password
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem onClick={onDelete} className="text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" /> Soft Delete
                    </DropdownMenuItem>
                    
                    {isSuperAdmin && (
                      <DropdownMenuItem onClick={() => onAction('hardDelete')} className="text-red-600">
                        <Trash className="w-4 h-4 mr-2" /> Hard Delete
                      </DropdownMenuItem>
                    )}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={onView} className="text-slate-300">
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </DropdownMenuItem>
                    {isSuperAdmin && (
                      <>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={() => onAction('restore')} className="text-green-400">
                          <RotateCcw className="w-4 h-4 mr-2" /> Restore User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAction('hardDelete')} className="text-red-600">
                          <Trash className="w-4 h-4 mr-2" /> Permanently Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col items-center text-center mb-4">
            <Avatar className="w-16 h-16 mb-3 ring-2 ring-slate-700">
              <AvatarImage src={user.photo_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-white truncate w-full">{user.name}</h3>
            <p className="text-sm text-slate-400 truncate w-full">{user.email}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className={roleBadgeColors[user.role]}>
              <Shield className="w-3 h-3 mr-1" />
              {user.role?.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className={statusBadgeColors[userStatus]}>
              {userStatus === "active" ? (
                <UserCheck className="w-3 h-3 mr-1" />
              ) : userStatus === "suspended" ? (
                <Ban className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {userStatus}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {user.email_verified ? "Verified" : "Unverified"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {user.last_login
                ? new Date(user.last_login).toLocaleDateString()
                : "Never"}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function EnhancedAdminUsersTab() {
  const { user: currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "super_admin";
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userActivityLog, setUserActivityLog] = useState<Activity[]>([]);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [showBulkActionsModal, setShowBulkActionsModal] = useState(false);
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "organiser" as UserRole,
    bio: "",
  });
  const [formError, setFormError] = useState("");

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemsPerPage = 12;

  // Debounce search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch users when filters change
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, roleFilter, statusFilter, verificationFilter, debouncedSearch, activeTab]);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await usersApi.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      if (activeTab === "deleted") {
        // Fetch deleted users (super admin only)
        if (!isSuperAdmin) {
          setDeletedUsers([]);
          setLoading(false);
          return;
        }

        const response = await usersApi.listDeleted({
          page: currentPage,
          limit: itemsPerPage,
        });

        if (response.success && response.data) {
          setDeletedUsers(response.data);
          setTotalPages(response.pagination?.total_pages || 1);
          setTotalUsers(response.pagination?.total_items || response.data.length);
        } else {
          setDeletedUsers([]);
        }
      } else {
        // Fetch active users
        const response = await usersApi.list({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch || undefined,
          role: roleFilter !== "all" ? (roleFilter as UserRole) : undefined,
          status: statusFilter !== "all" ? (statusFilter as 'active' | 'inactive' | 'suspended') : undefined,
          email_verified: verificationFilter === "all" ? undefined : verificationFilter === "verified",
        });

        if (response.success && response.data) {
          setUsers(response.data);
          setTotalPages(response.pagination?.total_pages || 1);
          setTotalUsers(response.pagination?.total_items || response.data.length);
        } else {
          setUsers([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      if (activeTab === "deleted") {
        setDeletedUsers([]);
      } else {
        setUsers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  //fetch user activity log
  const fetchUserActivityLog = async () => {
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      const response = await activitiesApi.getUserActivities(selectedUser._id);
      if (response.success && response.data) {
        console.log("User Activity Log:", response.data)
        setUserActivityLog(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user activity log:", error);
    } finally {
      setActionLoading(false);
    }
  }

  const handleRefresh = async () => {
    await Promise.all([fetchUsers(), fetchStats(),]);
  };

  const displayUsers = activeTab === "active" ? users : deletedUsers;
  const filteredUsers = displayUsers; // Filtering is now done on the backend

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u._id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleAction = async (action: string, user: User) => {
    setSelectedUser(user);
    
    switch (action) {
      case 'suspend':
        try {
          setActionLoading(true);
          await usersApi.suspend(user._id);
          await handleRefresh();
        } catch (error) {
          console.error("Failed to suspend user:", error);
        } finally {
          setActionLoading(false);
        }
        break;
      case 'reactivate':
        try {
          setActionLoading(true);
          await usersApi.reactivate(user._id);
          await handleRefresh();
        } catch (error) {
          console.error("Failed to reactivate user:", error);
        } finally {
          setActionLoading(false);
        }
        break;
      case 'verify':
        try {
          setActionLoading(true);
          await usersApi.forceVerifyEmail(user._id);
          await handleRefresh();
        } catch (error) {
          console.error("Failed to verify email:", error);
        } finally {
          setActionLoading(false);
        }
        break;
      case 'restore':
        setShowRestoreConfirm(true);
        break;
      case 'hardDelete':
        setShowHardDeleteConfirm(true);
        break;
      case 'activity':
        fetchUserActivityLog();
        setShowActivityLogModal(true);
        break;
      case 'resetPassword':
        setShowResetPasswordModal(true);
        break;
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      await usersApi.delete(selectedUser._id);
      setShowDeleteConfirm(false);
      setSelectedUser(null);
      await handleRefresh();
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleHardDelete = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      await usersApi.hardDelete(selectedUser._id);
      setShowHardDeleteConfirm(false);
      setSelectedUser(null);
      await handleRefresh();
    } catch (error) {
      console.error("Failed to hard delete user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      await usersApi.restore(selectedUser._id);
      setShowRestoreConfirm(false);
      setSelectedUser(null);
      await handleRefresh();
    } catch (error) {
      console.error("Failed to restore user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      await usersApi.sendPasswordReset(selectedUser._id);
      setShowResetPasswordModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to send password reset:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    try {
      setActionLoading(true);
      
      switch (action) {
        case 'suspend':
        case 'activate':
        case 'verify':
        case 'delete':
          await usersApi.bulkAction({
            userIds: selectedUsers,
            action: action === 'verify' ? 'verify_email' : action as 'activate' | 'deactivate' | 'suspend' | 'delete',
          });
          break;
      }
      
      setShowBulkActionsModal(false);
      setSelectedUsers([]);
      await handleRefresh();
    } catch (error: unknown) {
      console.error(`Failed to perform bulk ${action}:`, error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setFormError("Name, email and password are required");
      return;
    }
    
    try {
      setActionLoading(true);
      setFormError("");
      await usersApi.create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setShowCreateModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "organiser",
        bio: "",
      });
      await handleRefresh();
    } catch (error: unknown) {
      console.error("Failed to create user:", error);
      setFormError(error instanceof Error ? error.message : "Failed to create user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser || !formData.name || !formData.email) {
      setFormError("Name and email are required");
      return;
    }
    
    try {
      setActionLoading(true);
      setFormError("");
      await usersApi.update(selectedUser._id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      setShowEditModal(false);
      setSelectedUser(null);
      await handleRefresh();
    } catch (error: unknown) {
      console.error("Failed to update user:", error);
      setFormError(error instanceof Error ? error.message : "Failed to update user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      await usersApi.exportUsers('csv', {
        role: roleFilter !== "all" ? (roleFilter as UserRole) : undefined,
        status: statusFilter !== "all" ? (statusFilter as 'active' | 'inactive' | 'suspended') : undefined,
        search: debouncedSearch || undefined,
      });
    } catch (error) {
      console.error("Failed to export users:", error);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setVerificationFilter("all");
  };

  const hasActiveFilters = searchQuery || roleFilter !== "all" || statusFilter !== "all" || verificationFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage platform users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Users", value: stats?.total ?? totalUsers, icon: Users, color: "blue" },
          { label: "Active", value: stats?.byStatus?.active ?? 0, icon: UserCheck, color: "green" },
          { label: "Suspended", value: stats?.byStatus?.suspended ?? 0, icon: Ban, color: "orange" },
          { label: "Deleted", value: deletedUsers.length, icon: UserX, color: "red" },
          { label: "Verified", value: stats?.verification?.verified ?? 0, icon: Mail, color: "purple" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                {statsLoading ? (
                  <Skeleton className="w-12 h-7" />
                ) : (
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                )}
              </div>
              <p className="text-slate-400 text-xs">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "active" | "deleted")}>
        <TabsList className="bg-slate-900/50 border border-slate-700/50">
          <TabsTrigger value="active">
            <Users className="w-4 h-4 mr-2" />
            Active Users ({users.length})
          </TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="deleted">
              <Trash2 className="w-4 h-4 mr-2" />
              Deleted Users ({deletedUsers.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {/* Filters */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="organiser">Organiser</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                    {activeTab === "active" && (
                      <>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                          <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700">
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="unverified">Unverified</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedUsers.length > 0 && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                        {selectedUsers.length} selected
                      </Badge>
                    )}
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-slate-800/50 border-slate-700"}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-slate-800/50 border-slate-700"}
                    >
                      <LayoutList className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRefresh}
                      disabled={loading}
                      className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>

                {selectedUsers.length > 0 && activeTab === "active" && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                    <span className="text-sm text-slate-400 mr-2">Bulk Actions:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBulkActionsModal(true)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Actions ({selectedUsers.length})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Users display */}
          {loading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="bg-slate-900/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
                    <Skeleton className="w-32 h-4 mx-auto mb-2" />
                    <Skeleton className="w-24 h-3 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  selected={selectedUsers.includes(user._id)}
                  onSelect={() => handleSelectUser(user._id)}
                  onView={() => {
                    setSelectedUser(user);
                    setShowViewModal(true);
                  }}
                  onEdit={() => {
                    setSelectedUser(user);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      password: "",
                      role: user.role,
                      bio: "",
                    });
                    setShowEditModal(true);
                  }}
                  onDelete={() => {
                    setSelectedUser(user);
                    setShowDeleteConfirm(true);
                  }}
                  onAction={(action) => handleAction(action, user)}
                  isSuperAdmin={isSuperAdmin}
                  isDeleted={activeTab === "deleted"}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="text-slate-400">User</TableHead>
                    <TableHead className="text-slate-400">Role</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Last Login</TableHead>
                    <TableHead className="text-slate-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const userStatus = user.status;
                    return (
                    <TableRow key={user._id} className="border-slate-700">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user._id)}
                          onCheckedChange={() => handleSelectUser(user._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.photo_url || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                              {user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={roleBadgeColors[user.role]}>
                          {user.role.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadgeColors[userStatus]}>
                          {userStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400">
                        {user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(user);
                              setShowViewModal(true);
                            }}>
                              <Eye className="w-4 h-4 mr-2" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(user);
                              setFormData({
                                name: user.name,
                                email: user.email,
                                password: "",
                                role: user.role,
                                bio: user.bio || "",
                              });
                              setShowEditModal(true);
                            }}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Empty state */}
          {!loading && filteredUsers.length === 0 && (
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-12 text-center">
                {activeTab === "deleted" ? <UserX className="w-12 h-12 mx-auto text-slate-500 mb-4" /> : <Users className="w-12 h-12 mx-auto text-slate-500 mb-4" />}
                <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
                <p className="text-slate-400 text-sm">
                  {activeTab === "deleted" 
                    ? "No deleted users to display"
                    : hasActiveFilters 
                      ? "Try adjusting your filters"
                      : "Create your first user to get started"
                  }
                </p>
                {activeTab === "active" && !hasActiveFilters && (
                  <Button onClick={() => setShowCreateModal(true)} className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    <Plus className="w-4 h-4 mr-2" /> Add User
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-slate-800/50 border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-slate-400 text-sm px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-slate-800/50 border-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {/* Create User Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create New User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new user to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {formError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {formError}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-300">Role</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as UserRole })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="organiser">Organiser</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              disabled={actionLoading}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={actionLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {actionLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : null}
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Edit User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update user information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {formError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {formError}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-slate-300">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-slate-300">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-slate-300">Role</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as UserRole })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="organiser">Organiser</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              disabled={actionLoading}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateUser}
              disabled={actionLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {actionLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Delete User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete {selectedUser?.name}? This action can be reversed later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={actionLoading}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={actionLoading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {actionLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 py-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                      {selectedUser.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                    <p className="text-slate-400">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className={roleBadgeColors[selectedUser.role]}>
                        {selectedUser.role.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline" className={statusBadgeColors[selectedUser.status]}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-sm">Email Status</p>
                    <p className="text-white">
                      {selectedUser.email_verified ? "✓ Verified" : "✗ Unverified"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-sm">Last Login</p>
                    <p className="text-white">
                      {selectedUser.last_login 
                        ? new Date(selectedUser.last_login).toLocaleString()
                        : "Never"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-sm">Account Created</p>
                    <p className="text-white">
                      {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Hard Delete Confirmation */}
      <Dialog open={showHardDeleteConfirm} onOpenChange={setShowHardDeleteConfirm}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <Trash className="w-5 h-5" />
              Permanently Delete User
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              This action is <strong className="text-red-400">irreversible</strong>. All user data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
                <p className="text-white font-medium mb-2">You are about to permanently delete:</p>
                <p className="text-slate-300">{selectedUser.name} ({selectedUser.email})</p>
              </div>
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400">This will delete:</p>
                <ul className="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                  <li>User profile and credentials</li>
                  <li>All associated activity logs</li>
                  <li>Permission assignments</li>
                  <li>Any linked content</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowHardDeleteConfirm(false)}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleHardDelete();
                setShowHardDeleteConfirm(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash className="w-4 h-4 mr-2" />
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation */}
      <Dialog open={showRestoreConfirm} onOpenChange={setShowRestoreConfirm}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-green-400 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Restore User
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="text-slate-300 mb-4">
                Restore <strong className="text-white">{selectedUser.name}</strong> to active users?
              </p>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400">This will:</p>
                <ul className="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                  <li>Restore user access</li>
                  <li>Reactivate their account</li>
                  <li>Allow them to log in again</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={async () => {
                setShowRestoreConfirm(false);
              }}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleRestore();
                console.log("Restore:", selectedUser);
                setShowRestoreConfirm(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Modal */}
      <Dialog open={showBulkActionsModal} onOpenChange={setShowBulkActionsModal}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Bulk Actions</DialogTitle>
            <DialogDescription className="text-slate-400">
              Apply action to {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => handleBulkAction('suspend')}
            >
              <Ban className="w-4 h-4 mr-2" />
              Suspend Users
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => handleBulkAction('activate')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Activate Users
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => handleBulkAction('verify')}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verify Emails
            </Button>
            <Separator className="bg-slate-700" />
            <Button
              variant="outline"
              className="w-full justify-start border-red-900/50 text-red-400 hover:bg-red-950/50"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Users
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activity Log Modal */}
      <Dialog open={showActivityLogModal} onOpenChange={setShowActivityLogModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              Activity Log - {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {userActivityLog.map((log, i) => (
                <div key={i} className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{log.action}</span>
                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                      {log.created_at}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">IP: {log.ip_address}</p>
                  <p className="text-slate-400 text-sm mt-1">IP: {log.user_agent}</p>

                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Reset Password Modal */}
      <Dialog open={showResetPasswordModal} onOpenChange={setShowResetPasswordModal}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Key className="w-5 h-5" />
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Send password reset link to {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-300">
              A password reset link will be sent to the user&apos;s email address. They will be required to create a new password.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResetPasswordModal(false)}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSendPasswordReset();
                setShowResetPasswordModal(false);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}