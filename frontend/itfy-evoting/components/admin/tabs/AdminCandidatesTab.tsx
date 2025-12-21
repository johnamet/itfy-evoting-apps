"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserCheck,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Vote,
  Trophy,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Hash,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { candidatesApi } from "@/lib/api/candidates";
import type { Candidate } from "@/types";

// Mock candidates
const mockCandidates: Candidate[] = [
  {
    _id: "1",
    name: "Sarkodie",
    code: "SARK001",
    bio: "Award-winning rapper and entrepreneur",
    category: { _id: "c1", name: "Best Rapper", slug: "best-rapper" } as any,
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    status: "approved",
    vote_count: 15420,
    created_at: "2024-11-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    name: "Shatta Wale",
    code: "SHAT002",
    bio: "Dancehall king and SM boss",
    category: { _id: "c2", name: "Best Dancehall Artist", slug: "best-dancehall" } as any,
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    status: "approved",
    vote_count: 14280,
    created_at: "2024-11-01T10:30:00Z",
    updated_at: "2024-12-15T12:00:00Z",
  },
  {
    _id: "3",
    name: "Stonebwoy",
    code: "STON003",
    bio: "Afro-dancehall superstar",
    category: { _id: "c3", name: "Best Afrobeats Artist", slug: "best-afrobeats" } as any,
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    status: "approved",
    vote_count: 13560,
    created_at: "2024-11-02T09:00:00Z",
    updated_at: "2024-12-14T16:45:00Z",
  },
  {
    _id: "4",
    name: "Medikal",
    code: "MEDI004",
    bio: "Hip-hop sensation",
    category: { _id: "c1", name: "Best Rapper", slug: "best-rapper" } as any,
    event: { _id: "e1", name: "Ghana Music Awards 2025" } as any,
    image_url: null,
    status: "pending",
    vote_count: 0,
    created_at: "2024-12-10T11:00:00Z",
    updated_at: "2024-12-10T11:00:00Z",
  },
];

// Status colors
const statusColors: Record<string, string> = {
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

// Candidate card
function CandidateCard({
  candidate,
  rank,
  onView,
  onEdit,
  onDelete,
}: {
  candidate: Candidate;
  rank: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            {/* Rank badge */}
            {rank <= 3 && candidate.status === "approved" && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                rank === 2 ? "bg-slate-400/20 text-slate-300" :
                "bg-orange-500/20 text-orange-400"
              }`}>
                <Trophy className="w-4 h-4" />
              </div>
            )}
            {rank > 3 && (
              <Badge variant="outline" className="bg-slate-800/50 border-slate-600 text-slate-400">
                #{rank}
              </Badge>
            )}
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
            <Avatar className="w-20 h-20 mb-3 ring-2 ring-slate-700">
              <AvatarImage src={candidate.image_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                {candidate.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-white text-lg">{candidate.name}</h3>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Hash className="w-3 h-3" />
              {candidate.code}
            </div>
          </div>

          {/* Category and event */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Category</span>
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                {typeof candidate.category === "object" ? candidate.category?.name : "N/A"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Event</span>
              <span className="text-slate-300 truncate max-w-[150px]">
                {typeof candidate.event === "object" ? candidate.event?.name : "N/A"}
              </span>
            </div>
          </div>

          {/* Stats and status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">{candidate.vote_count?.toLocaleString() || 0}</span>
              <span className="text-slate-500 text-sm">votes</span>
            </div>
            <Badge variant="outline" className={statusColors[candidate.status || "pending"]}>
              {candidate.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminCandidatesTab() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCandidates();
  }, [currentPage, statusFilter, eventFilter, searchQuery]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await candidatesApi.list({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        event: eventFilter !== "all" ? eventFilter : undefined,
      });

      if (response.success && response.data) {
        setCandidates(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setCandidates(mockCandidates);
      }
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      setCandidates(mockCandidates);
    } finally {
      setLoading(false);
    }
  };

  // Sort by votes for ranking
  const sortedCandidates = [...candidates].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidate Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage event candidates and nominations</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Candidate
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Candidates", value: candidates.length, color: "blue" },
          { label: "Approved", value: candidates.filter((c) => c.status === "approved").length, color: "green" },
          { label: "Pending", value: candidates.filter((c) => c.status === "pending").length, color: "orange" },
          { label: "Total Votes", value: candidates.reduce((acc, c) => acc + (c.vote_count || 0), 0).toLocaleString(), color: "purple" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
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
                  placeholder="Search candidates..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
              <Button variant="outline" size="icon" onClick={fetchCandidates} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-4 flex flex-col items-center">
                <Skeleton className="w-20 h-20 rounded-full mb-3" />
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-24 h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {sortedCandidates.map((candidate, index) => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              rank={index + 1}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </motion.div>
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
    </div>
  );
}
