"use client";

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
  Loader2,
  AlertCircle,
  CheckCircle,
  Ban,
  Calendar,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

import { usersApi, type UserFilters } from "@/lib/api/users";
import type { User, UserRole } from "@/types";

// User stats interface (matches backend)
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

// Role badge colors
const roleBadgeColors: Record<UserRole, string> = {
  super_admin: "bg-red-500/20 text-red-400 border-red-500/30",
  admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  organiser: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  moderator: "bg-green-500/20 text-green-400 border-green-500/30",
};

// Status badge colors
type UserStatusType = 'active' | 'inactive' | 'suspended' | 'deleted';
const statusBadgeColors: Record<UserStatusType, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  suspended: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
};

// Note: This tab now relies on the real `usersApi` for data.
// Fallback to local mock data was removed so the admin UI uses real integrations.

// User card component for grid view
function UserCard({
  user,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
}: {
  user: User;
  selected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
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
        }`}
      >
        <CardContent className="p-4">
          {/* Selection checkbox */}
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

          {/* Avatar and info */}
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

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className={roleBadgeColors[user.role]}>
              <Shield className="w-3 h-3 mr-1" />
              {user.role?.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className={statusBadgeColors[user.status]}>
              {user.status === "active" ? (
                <UserCheck className="w-3 h-3 mr-1" />
              ) : user.status === "suspended" ? (
                <Ban className="w-3 h-3 mr-1" />
              ) : (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {user.status}
            </Badge>
          </div>

          {/* Meta info */}
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

export default function AdminUsersTab() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "organiser" as UserRole,
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
  }, [currentPage, roleFilter, statusFilter, debouncedSearch]);

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

      const filters: UserFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch || undefined,
        role: roleFilter !== "all" ? (roleFilter as UserRole) : undefined,
        status: statusFilter !== "all" ? (statusFilter as 'active' | 'inactive' | 'suspended') : undefined,
      };

      const response = await usersApi.list(filters);

      if (response.success && response.data) {
        setUsers(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalUsers(response.pagination?.totalItems || response.data.length);
      } else {
        // If API response is not successful, show empty list
        setUsers([]);
        setTotalPages(1);
        setTotalUsers(0);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // On error, show empty list so UI reflects upstream failure
      setUsers([]);
      setTotalPages(1);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u._id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "organiser",
    });
    setFormError("");
    setShowEditModal(true);
  };

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "organiser",
    });
    setFormError("");
    setShowCreateModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);
      await usersApi.delete(selectedUser._id);
      await fetchUsers();
      await fetchStats();
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateSubmit = async () => {
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
      await fetchUsers();
      await fetchStats();
    } catch (error: unknown) {
      console.error("Failed to create user:", error);
      setFormError((error as { message?: string })?.message || "Failed to create user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async () => {
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
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Failed to update user:", error);
      setFormError((error as { message?: string })?.message || "Failed to update user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuspendUser = async (user: User) => {
    try {
      setActionLoading(true);
      await usersApi.suspend(user._id, "Suspended by admin");
      await fetchUsers();
      await fetchStats();
    } catch (error) {
      console.error("Failed to suspend user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivateUser = async (user: User) => {
    try {
      setActionLoading(true);
      await usersApi.reactivate(user._id);
      await fetchUsers();
      await fetchStats();
    } catch (error) {
      console.error("Failed to reactivate user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerifyEmail = async (user: User) => {
    try {
      setActionLoading(true);
      await usersApi.forceVerifyEmail(user._id);
      await fetchUsers();
      await fetchStats();
    } catch (error) {
      console.error("Failed to verify email:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

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
        <Button
          onClick={handleCreateUser}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats?.total ?? totalUsers, color: "blue", icon: Users },
          { label: "Active", value: stats?.byStatus?.active ?? 0, color: "green", icon: UserCheck },
          { label: "Suspended", value: stats?.byStatus?.suspended ?? 0, color: "orange", icon: Ban },
          { label: "Email Verified", value: stats?.verification?.verified ?? 0, color: "purple", icon: Mail },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  {statsLoading ? (
                    <Skeleton className="w-12 h-7 mb-1" />
                  ) : (
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  )}
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 opacity-50`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and actions */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and filters */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="organiser">Organiser</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View toggle and actions */}
            <div className="flex items-center gap-2">
              {selectedUsers.length > 0 && (
                <span className="text-sm text-slate-400 mr-2">
                  {selectedUsers.length} selected
                </span>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                    : "bg-slate-800/50 border-slate-700 text-slate-400"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                    : "bg-slate-800/50 border-slate-700 text-slate-400"
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={fetchUsers}
                className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users display */}
      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-2"
          }
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-48 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      ) : viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              selected={selectedUsers.includes(user._id)}
              onSelect={() => handleSelectUser(user._id)}
              onView={() => handleViewUser(user)}
              onEdit={() => handleEditUser(user)}
              onDelete={() => handleDeleteUser(user)}
            />
          ))}
        </motion.div>
      ) : (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-slate-600"
                  />
                </TableHead>
                <TableHead className="text-slate-400">User</TableHead>
                <TableHead className="text-slate-400">Role</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Email Verified</TableHead>
                <TableHead className="text-slate-400">Last Login</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="border-slate-700 hover:bg-slate-800/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user._id)}
                      onCheckedChange={() => handleSelectUser(user._id)}
                      className="border-slate-600"
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
                      {user.role?.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusBadgeColors[user.status]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.email_verified
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                      }
                    >
                      {user.email_verified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                        <DropdownMenuItem onClick={() => handleViewUser(user)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        {user.status === "suspended" ? (
                          <DropdownMenuItem onClick={() => handleReactivateUser(user)} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                            <CheckCircle className="w-4 h-4 mr-2" /> Reactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleSuspendUser(user)} className="text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10">
                            <Ban className="w-4 h-4 mr-2" /> Suspend
                          </DropdownMenuItem>
                        )}
                        {!user.email_verified && (
                          <DropdownMenuItem onClick={() => handleVerifyEmail(user)} className="text-blue-400 hover:text-blue-300 focus:text-blue-300 focus:bg-blue-500/10">
                            <Mail className="w-4 h-4 mr-2" /> Verify Email
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
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
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white disabled:opacity-50"
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
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Delete User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
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
              onClick={confirmDelete}
              disabled={actionLoading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              onClick={handleCreateSubmit}
              disabled={actionLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
              onClick={handleEditSubmit}
              disabled={actionLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* User Avatar & Name */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.photo_url || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                    {selectedUser.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedUser.name}</h3>
                  <p className="text-slate-400">{selectedUser.email}</p>
                </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase">Role</p>
                  <Badge variant="outline" className={roleBadgeColors[selectedUser.role]}>
                    {selectedUser.role?.replace("_", " ")}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase">Status</p>
                  <Badge variant="outline" className={statusBadgeColors[selectedUser.status]}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase">Email Verified</p>
                  <Badge
                    variant="outline"
                    className={
                      selectedUser.email_verified
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                    }
                  >
                    {selectedUser.email_verified ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs uppercase">Last Login</p>
                  <p className="text-white text-sm">
                    {selectedUser.last_login
                      ? new Date(selectedUser.last_login).toLocaleString()
                      : "Never"}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-slate-700 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">Created:</span>
                  <span className="text-white">
                    {selectedUser.created_at
                      ? new Date(selectedUser.created_at).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">Updated:</span>
                  <span className="text-white">
                    {selectedUser.updated_at
                      ? new Date(selectedUser.updated_at).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowViewModal(false)}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowViewModal(false);
                if (selectedUser) handleEditUser(selectedUser);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
