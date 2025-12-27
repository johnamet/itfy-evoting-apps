"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  User,
  Vote,
  CreditCard,
  Settings,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Globe,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
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

import { activitiesApi } from "@/lib/api/activities";
import type { Activity as ActivityType } from "@/lib/api/activities";

// Activity types with icons and colors
const activityConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  login: { icon: User, color: "text-green-400", bg: "bg-green-500/20" },
  logout: { icon: User, color: "text-slate-400", bg: "bg-slate-500/20" },
  vote: { icon: Vote, color: "text-blue-400", bg: "bg-blue-500/20" },
  payment: { icon: CreditCard, color: "text-purple-400", bg: "bg-purple-500/20" },
  settings: { icon: Settings, color: "text-orange-400", bg: "bg-orange-500/20" },
  security: { icon: Shield, color: "text-red-400", bg: "bg-red-500/20" },
  create: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20" },
  update: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/20" },
  delete: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20" },
  default: { icon: Activity, color: "text-slate-400", bg: "bg-slate-500/20" },
};

// Mock activities
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

// Format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Activity row component
function ActivityRow({ activity }: { activity: ActivityType }) {
  const config = activityConfig[activity.action] || activityConfig.default;
  const Icon = config.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bg}`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-white font-medium">{activity.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-5 h-5">
                <AvatarImage src={activity.user?.avatar || undefined} />
                <AvatarFallback className="text-[10px] bg-slate-700">
                  {activity.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-slate-400 text-sm">{activity.user?.name || "Unknown"}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-slate-500 text-xs">{formatRelativeTime(activity.created_at)}</span>
            <Badge variant="outline" className="ml-2 text-xs bg-slate-800/50 border-slate-700 text-slate-400">
              {activity.entity_type}
            </Badge>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          {activity.ip_address && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>{activity.ip_address}</span>
            </div>
          )}
          {activity.user_agent && (
            <div className="flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              <span className="truncate max-w-[200px]">
                {activity.user_agent.includes("iPhone") ? "iPhone" :
                 activity.user_agent.includes("Android") ? "Android" :
                 activity.user_agent.includes("Windows") ? "Windows" :
                 activity.user_agent.includes("Mac") ? "macOS" : "Unknown"}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminActivitiesTab() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchActivities();
  }, [currentPage, typeFilter, dateFilter, searchQuery]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await activitiesApi.getActivities({
        page: currentPage,
        limit: 20,
        search: searchQuery || undefined,
        action: typeFilter !== "all" ? typeFilter : undefined,
      });

      if (response.success && response.data) {
        setActivities(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      await activitiesApi.exportActivities({ format: "csv" });
    } catch (error) {
      console.error("Failed to export activities:", error);
    }
  };

  // Stats
  const stats = [
    { label: "Total Activities", value: activities.length, icon: Activity, color: "blue" },
    { label: "Votes", value: activities.filter((a) => a.action === "vote").length, icon: Vote, color: "green" },
    { label: "Payments", value: activities.filter((a) => a.action === "payment").length, icon: CreditCard, color: "purple" },
    { label: "Logins", value: activities.filter((a) => a.action === "login").length, icon: User, color: "orange" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity Log</h1>
          <p className="text-slate-400 text-sm mt-1">Track all platform activities and audit trails</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
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
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vote">Votes</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="login">Logins</SelectItem>
                  <SelectItem value="create">Creates</SelectItem>
                  <SelectItem value="update">Updates</SelectItem>
                  <SelectItem value="delete">Deletes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={fetchActivities} className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity timeline */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-xl">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="w-3/4 h-4 mb-2" />
                    <Skeleton className="w-1/2 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {activities.map((activity) => (
                <ActivityRow key={activity._id} activity={activity} />
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && activities.length === 0 && (
            <div className="py-12 text-center">
              <Activity className="w-12 h-12 mx-auto text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No activities found</h3>
              <p className="text-slate-400 text-sm">Activity logs will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

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
