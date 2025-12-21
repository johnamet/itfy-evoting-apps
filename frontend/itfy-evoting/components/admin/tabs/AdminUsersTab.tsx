"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Clock,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
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
import { Label } from "@/components/ui/label";
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
import type { User, UserRole, UserStatus } from "@/types";

// Role badge colors
const roleBadgeColors: Record<UserRole, string> = {
  super_admin: "bg-red-500/20 text-red-400 border-red-500/30",
  admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  organiser: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  moderator: "bg-green-500/20 text-green-400 border-green-500/30",
};

// Status badge colors
const statusBadgeColors: Record<UserStatus, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  suspended: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
};

// Mock user data
const mockUsers: User[] = [
  {
    _id: "1",
    name: "John Mensah",
    email: "john@itfy.com",
    role: "super_admin",
    permissions: ["super"],
    email_verified: true,
    status: "active",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-12-01T08:30:00Z",
    photo_url: null,
    last_login: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    name: "Akua Boateng",
    email: "akua@events.gh",
    role: "organiser",
    permissions: ["read", "write", "update"],
    email_verified: true,
    status: "active",
    created_at: "2024-03-20T12:00:00Z",
    updated_at: "2024-11-28T16:45:00Z",
    photo_url: null,
    last_login: "2024-12-14T09:15:00Z",
  },
  {
    _id: "3",
    name: "Kwame Asante",
    email: "kwame@admin.gh",
    role: "admin",
    permissions: ["read", "write", "update", "delete"],
    email_verified: true,
    status: "active",
    created_at: "2024-02-10T09:00:00Z",
    updated_at: "2024-12-10T11:20:00Z",
    photo_url: null,
    last_login: "2024-12-15T11:00:00Z",
  },
  {
    _id: "4",
    name: "Ama Serwaa",
    email: "ama@moderator.gh",
    role: "moderator",
    permissions: ["read", "write"],
    email_verified: false,
    status: "inactive",
    created_at: "2024-06-05T14:30:00Z",
    updated_at: "2024-10-22T10:00:00Z",
    photo_url: null,
    last_login: "2024-10-20T15:45:00Z",
  },
  {
    _id: "5",
    name: "Kofi Owusu",
    email: "kofi@organiser.gh",
    role: "organiser",
    permissions: ["read", "write", "update"],
    email_verified: true,
    status: "suspended",
    created_at: "2024-04-12T08:00:00Z",
    updated_at: "2024-11-15T09:30:00Z",
    photo_url: null,
    last_login: "2024-11-10T12:00:00Z",
  },
];

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
              ) : (
                <UserX className="w-3 h-3 mr-1" />
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const itemsPerPage = 12;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter, statusFilter, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const filters: UserFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        role: roleFilter !== "all" ? (roleFilter as UserRole) : undefined,
        status: statusFilter !== "all" ? (statusFilter as 'active' | 'inactive' | 'suspended') : undefined,
      };

      const response = await usersApi.list(filters);

      if (response.success && response.data) {
        setUsers(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalUsers(response.pagination?.totalItems || response.data.length);
      } else {
        // Use mock data
        setUsers(mockUsers);
        setTotalPages(1);
        setTotalUsers(mockUsers.length);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers(mockUsers);
      setTotalPages(1);
      setTotalUsers(mockUsers.length);
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
    // Open view modal (to be implemented)
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    // Open edit modal (to be implemented)
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      // await usersApi.delete(selectedUser._id);
      await fetchUsers();
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
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
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: totalUsers, color: "blue" },
          { label: "Active", value: users.filter((u) => u.status === "active").length, color: "green" },
          { label: "Inactive", value: users.filter((u) => u.status === "inactive").length, color: "slate" },
          { label: "Suspended", value: users.filter((u) => u.status === "suspended").length, color: "orange" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
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
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
