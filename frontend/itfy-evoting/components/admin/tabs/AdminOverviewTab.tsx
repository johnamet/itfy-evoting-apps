"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Vote,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { analyticsApi, type DashboardOverview } from "@/lib/api/analytics";
import { activitiesApi, type Activity as ActivityType } from "@/lib/api/activities";

// Chart colors
const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"];
const GRADIENT_COLORS = {
  blue: { start: "#3B82F6", end: "#1D4ED8" },
  purple: { start: "#8B5CF6", end: "#6D28D9" },
  green: { start: "#10B981", end: "#059669" },
  orange: { start: "#F59E0B", end: "#D97706" },
  red: { start: "#EF4444", end: "#DC2626" },
  cyan: { start: "#06B6D4", end: "#0891B2" },
};

// Mock data for charts
const votingTrendsData = [
  { name: "Mon", votes: 420, revenue: 2100 },
  { name: "Tue", votes: 380, revenue: 1900 },
  { name: "Wed", votes: 560, revenue: 2800 },
  { name: "Thu", votes: 490, revenue: 2450 },
  { name: "Fri", votes: 630, revenue: 3150 },
  { name: "Sat", votes: 780, revenue: 3900 },
  { name: "Sun", votes: 520, revenue: 2600 },
];

const categoryDistribution = [
  { name: "Music", value: 35, color: "#3B82F6" },
  { name: "Film", value: 25, color: "#8B5CF6" },
  { name: "Sports", value: 20, color: "#10B981" },
  { name: "Fashion", value: 15, color: "#F59E0B" },
  { name: "Other", value: 5, color: "#6B7280" },
];

const revenueData = [
  { name: "Week 1", current: 12500, previous: 10200 },
  { name: "Week 2", current: 15800, previous: 13400 },
  { name: "Week 3", current: 18200, previous: 16800 },
  { name: "Week 4", current: 22500, previous: 19600 },
];

// Stat card component
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  color: keyof typeof GRADIENT_COLORS;
  loading?: boolean;
}

function StatCard({ title, value, change, changeLabel, icon: Icon, color, loading }: StatCardProps) {
  const isPositive = change && change >= 0;

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="w-16 h-6" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="w-32 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden relative group">
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${GRADIENT_COLORS[color].start}10, ${GRADIENT_COLORS[color].end}05)`,
          }}
        />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${GRADIENT_COLORS[color].start}20, ${GRADIENT_COLORS[color].end}10)`,
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: GRADIENT_COLORS[color].start }}
              />
            </div>
            {change !== undefined && (
              <Badge
                variant="secondary"
                className={`${
                  isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {Math.abs(change)}%
              </Badge>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            <p className="text-slate-400 text-sm mt-1">{title}</p>
            {changeLabel && (
              <p className="text-slate-500 text-xs mt-1">{changeLabel}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Activity item component
function ActivityItem({ activity }: { activity: ActivityType }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "vote":
        return Vote;
      case "payment":
        return DollarSign;
      case "user":
        return Users;
      case "event":
        return Calendar;
      case "login":
        return Activity;
      default:
        return Activity;
    }
  };

  const Icon = getActivityIcon(activity.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          activity.type === "payment"
            ? "bg-green-500/20 text-green-400"
            : activity.type === "vote"
            ? "bg-blue-500/20 text-blue-400"
            : activity.type === "login"
            ? "bg-purple-500/20 text-purple-400"
            : "bg-slate-700/50 text-slate-400"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">
          {activity.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">
            {activity.user?.name || "System"}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-500">
            {new Date(activity.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <Badge
        variant="outline"
        className={`text-xs ${
          activity.status === "success"
            ? "border-green-500/30 text-green-400"
            : activity.status === "failed"
            ? "border-red-500/30 text-red-400"
            : "border-slate-500/30 text-slate-400"
        }`}
      >
        {activity.status}
      </Badge>
    </motion.div>
  );
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name.includes("revenue") ? `GHS ${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminOverviewTab() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("weekly");
  const [stats, setStats] = useState<DashboardOverview | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard overview
      const [overviewRes, activitiesRes] = await Promise.allSettled([
        analyticsApi.getDashboardOverview({ period: period as any }),
        activitiesApi.getRecentActivities(10),
      ]);

      if (overviewRes.status === "fulfilled" && overviewRes.value.success) {
        setStats(overviewRes.value.data);
      } else {
        // Use mock data if API fails
        setStats({
          totalUsers: 1248,
          totalEvents: 42,
          totalVotes: 156780,
          totalRevenue: 783900,
          activeEvents: 8,
          completedEvents: 34,
          totalCandidates: 892,
          totalCategories: 156,
          overallParticipationRate: 78.5,
          systemHealthScore: 98,
          growthRate: {
            users: 12.5,
            events: 8.2,
            votes: 24.8,
            revenue: 18.6,
          },
          timestamp: new Date().toISOString(),
        });
      }

      if (activitiesRes.status === "fulfilled" && activitiesRes.value.data) {
        setActivities(activitiesRes.value.data);
      } else {
        // Mock activities
        setActivities([
          {
            _id: "1",
            action: "vote",
            type: "vote",
            description: "User voted for John Doe in GMA Best Artist",
            status: "success",
            created_at: new Date().toISOString(),
          },
          {
            _id: "2",
            action: "payment",
            type: "payment",
            description: "Payment of GHS 50.00 received",
            status: "success",
            created_at: new Date(Date.now() - 300000).toISOString(),
          },
          {
            _id: "3",
            action: "create",
            type: "event",
            description: "New event created: Youth Awards 2025",
            user: { _id: "u1", name: "Admin", email: "admin@itfy.com", role: "admin" },
            status: "success",
            created_at: new Date(Date.now() - 600000).toISOString(),
          },
          {
            _id: "4",
            action: "login",
            type: "login",
            description: "User login successful",
            user: { _id: "u2", name: "Jane Smith", email: "jane@example.com", role: "organiser" },
            status: "success",
            created_at: new Date(Date.now() - 900000).toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return `GHS ${num.toLocaleString()}`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="daily">Today</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Users"
          value={formatNumber(stats?.totalUsers || 0)}
          change={stats?.growthRate?.users}
          changeLabel="vs last period"
          icon={Users}
          color="blue"
          loading={loading}
        />
        <StatCard
          title="Active Events"
          value={stats?.activeEvents || 0}
          change={stats?.growthRate?.events}
          changeLabel={`${stats?.totalEvents || 0} total events`}
          icon={Calendar}
          color="purple"
          loading={loading}
        />
        <StatCard
          title="Total Votes"
          value={formatNumber(stats?.totalVotes || 0)}
          change={stats?.growthRate?.votes}
          changeLabel="votes cast"
          icon={Vote}
          color="green"
          loading={loading}
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats?.totalRevenue || 0)}
          change={stats?.growthRate?.revenue}
          changeLabel="total earnings"
          icon={DollarSign}
          color="orange"
          loading={loading}
        />
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Voting trends chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">Voting Trends</CardTitle>
                <p className="text-slate-400 text-sm">Votes & revenue over time</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={votingTrendsData}>
                    <defs>
                      <linearGradient id="voteGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="name"
                      stroke="#64748B"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748B"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatNumber(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="votes"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#voteGradient)"
                      name="Votes"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      name="Revenue (GHS)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category distribution */}
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Category Distribution</CardTitle>
              <p className="text-slate-400 text-sm">Votes by category</p>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-sm text-slate-400">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue comparison */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Revenue Comparison</CardTitle>
              <p className="text-slate-400 text-sm">Current vs previous period</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="name"
                      stroke="#64748B"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748B"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `GHS ${formatNumber(value)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="current"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      name="Current Period"
                    />
                    <Bar
                      dataKey="previous"
                      fill="#64748B"
                      radius={[4, 4, 0, 0]}
                      name="Previous Period"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                <p className="text-slate-400 text-sm">Latest platform activities</p>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                Live
              </Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <ScrollArea className="h-[280px] pr-4">
                <div className="space-y-1">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-4 p-3">
                          <Skeleton className="w-10 h-10 rounded-xl" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-2/3 h-3" />
                          </div>
                        </div>
                      ))
                    : activities.map((activity) => (
                        <ActivityItem key={activity._id} activity={activity} />
                      ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick stats row */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.totalCandidates || 0}
                </div>
                <p className="text-slate-400 text-sm">Total Candidates</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.totalCategories || 0}
                </div>
                <p className="text-slate-400 text-sm">Categories</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.overallParticipationRate?.toFixed(1) || 0}%
                </div>
                <p className="text-slate-400 text-sm">Participation Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {stats?.systemHealthScore || 0}%
                  </div>
                </div>
                <p className="text-slate-400 text-sm">System Health</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
