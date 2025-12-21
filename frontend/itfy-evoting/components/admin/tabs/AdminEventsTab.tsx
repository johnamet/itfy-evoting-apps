"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Users,
  Vote,
  DollarSign,
  Trophy,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
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

import { eventsApi, type EventFilters } from "@/lib/api/events";
import type { Event, EventStatus } from "@/types";

// Status badge colors
const statusColors: Record<EventStatus, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  archived: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
  pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

// Mock events
const mockEvents: Event[] = [
  {
    _id: "1",
    name: "Ghana Music Awards 2025",
    slug: "ghana-music-awards-2025",
    description: "The biggest music awards in Ghana",
    status: "active",
    visibility: "public",
    event_type: "conference",
    start_date: "2025-03-15T18:00:00Z",
    end_date: "2025-03-15T23:00:00Z",
    voting_start_date: "2025-01-01T00:00:00Z",
    voting_end_date: "2025-03-10T23:59:59Z",
    is_featured: true,
    is_published: true,
    vote_price: 1,
    currency: "GHS",
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  },
  {
    _id: "2",
    name: "Youth Excellence Awards",
    slug: "youth-excellence-awards",
    description: "Celebrating young achievers",
    status: "upcoming",
    visibility: "public",
    event_type: "seminar",
    start_date: "2025-05-20T17:00:00Z",
    end_date: "2025-05-20T22:00:00Z",
    voting_start_date: "2025-04-01T00:00:00Z",
    voting_end_date: "2025-05-15T23:59:59Z",
    is_featured: false,
    is_published: true,
    vote_price: 0.5,
    currency: "GHS",
    created_at: "2024-11-15T09:00:00Z",
    updated_at: "2024-12-10T11:20:00Z",
  },
  {
    _id: "3",
    name: "Sports Personality Awards",
    slug: "sports-personality-awards",
    description: "Honoring sports excellence",
    status: "archived",
    visibility: "public",
    event_type: "conference",
    start_date: "2024-11-30T19:00:00Z",
    end_date: "2024-11-30T23:00:00Z",
    voting_start_date: "2024-10-01T00:00:00Z",
    voting_end_date: "2024-11-25T23:59:59Z",
    is_featured: false,
    is_published: true,
    vote_price: 1,
    currency: "GHS",
    created_at: "2024-08-20T12:00:00Z",
    updated_at: "2024-12-01T10:00:00Z",
  },
];

// Event card component
function EventCard({
  event,
  onView,
  onEdit,
  onDelete,
}: {
  event: Event;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const votingProgress = 75; // Mock progress

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group">
        {/* Event banner */}
        <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative">
          {event.is_featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500/90 text-yellow-900">
              <Trophy className="w-3 h-3 mr-1" /> Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 text-white hover:bg-black/40">
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
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className={statusColors[event.status]}>
              {event.status === "active" ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
              {event.status}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-white text-lg truncate mb-2">{event.name}</h3>
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 rounded-lg bg-slate-800/50">
              <Users className="w-4 h-4 mx-auto text-blue-400 mb-1" />
              <p className="text-white text-sm font-medium">24</p>
              <p className="text-slate-500 text-xs">Candidates</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-800/50">
              <Vote className="w-4 h-4 mx-auto text-green-400 mb-1" />
              <p className="text-white text-sm font-medium">1.2K</p>
              <p className="text-slate-500 text-xs">Votes</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-800/50">
              <DollarSign className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
              <p className="text-white text-sm font-medium">GHS 2.4K</p>
              <p className="text-slate-500 text-xs">Revenue</p>
            </div>
          </div>

          {/* Voting progress */}
          {event.status === "active" && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Voting Progress</span>
                <span>{votingProgress}%</span>
              </div>
              <Progress value={votingProgress} className="h-2 bg-slate-800" />
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(event.start_date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">GHS {event.vote_price}/vote</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminEventsTab() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [currentPage, statusFilter, searchQuery]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsApi.list({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as EventStatus) : undefined,
      });

      if (response.success && response.data) {
        setEvents(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setEvents(mockEvents);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents(mockEvents);
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-bold text-white">Event Management</h1>
          <p className="text-slate-400 text-sm mt-1">Create and manage voting events</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: events.length, icon: Calendar, color: "blue" },
          { label: "Active", value: events.filter((e) => e.status === "active").length, icon: Play, color: "green" },
          { label: "Upcoming", value: events.filter((e) => e.status === "upcoming").length, icon: Clock, color: "blue" },
          { label: "Archived", value: events.filter((e) => e.status === "archived").length, icon: Pause, color: "slate" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
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
                  placeholder="Search events..."
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
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
              <Button variant="outline" size="icon" onClick={fetchEvents} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50">
              <div className="h-32 bg-slate-800/50" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="w-3/4 h-5" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
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
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-slate-400 text-sm px-4">Page {currentPage} of {totalPages}</span>
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
    </div>
  );
}
