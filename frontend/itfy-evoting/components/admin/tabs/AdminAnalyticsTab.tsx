"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Vote,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity,
  PieChart,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { analyticsApi } from "@/lib/api/analytics";

// Colors
const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

// Mock data
const mockVotingTrends = [
  { date: "Dec 10", votes: 1234, revenue: 617 },
  { date: "Dec 11", votes: 1456, revenue: 728 },
  { date: "Dec 12", votes: 1823, revenue: 912 },
  { date: "Dec 13", votes: 2145, revenue: 1073 },
  { date: "Dec 14", votes: 1987, revenue: 994 },
  { date: "Dec 15", votes: 2456, revenue: 1228 },
  { date: "Dec 16", votes: 2789, revenue: 1395 },
];

const mockCategoryData = [
  { name: "Best Male Artist", votes: 15420, percentage: 28 },
  { name: "Best Female Artist", votes: 12340, percentage: 22 },
  { name: "Best Rapper", votes: 10890, percentage: 20 },
  { name: "Best Dancehall", votes: 8760, percentage: 16 },
  { name: "Best New Artist", votes: 7890, percentage: 14 },
];

const mockDeviceData = [
  { name: "Mobile", value: 65, color: "#3b82f6" },
  { name: "Desktop", value: 28, color: "#8b5cf6" },
  { name: "Tablet", value: 7, color: "#10b981" },
];

const mockRegionData = [
  { region: "Greater Accra", votes: 25430, percentage: 42 },
  { region: "Ashanti", votes: 18920, percentage: 31 },
  { region: "Western", votes: 8540, percentage: 14 },
  { region: "Central", votes: 4870, percentage: 8 },
  { region: "Others", votes: 3040, percentage: 5 },
];

const mockTopCandidates = [
  { name: "Sarkodie", category: "Best Rapper", votes: 15420, trend: 12.5 },
  { name: "Shatta Wale", category: "Best Dancehall", votes: 14280, trend: 8.3 },
  { name: "Stonebwoy", category: "Best Afrobeats", votes: 13560, trend: -2.1 },
  { name: "King Promise", category: "Best Male Artist", votes: 12890, trend: 15.7 },
  { name: "Wendy Shay", category: "Best Female Artist", votes: 11450, trend: 5.9 },
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

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = async () => {
    try {
      await analyticsApi.exportAnalytics({ format: "csv", type: "all" });
    } catch (error) {
      console.error("Failed to export analytics:", error);
    }
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Total Votes",
      value: "55,300",
      change: "+12.5%",
      trend: "up",
      icon: Vote,
      color: "blue",
    },
    {
      title: "Revenue",
      value: "GHS 27,650",
      change: "+8.3%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Active Users",
      value: "12,450",
      change: "+15.2%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Comprehensive voting and revenue insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport} className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button variant="outline" size="icon" className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-800">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statsCards.map((stat, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-500/20`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={stat.trend === "up" 
                      ? "bg-green-500/10 border-green-500/30 text-green-400" 
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                    }
                  >
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-900/50 border border-slate-700/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Overview
          </TabsTrigger>
          <TabsTrigger value="voting" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Voting
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Audience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Voting trends chart */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Voting Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockVotingTrends}>
                      <defs>
                        <linearGradient id="voteGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="votes"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#voteGradient)"
                        name="Votes"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Revenue chart */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockVotingTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue (GHS)" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Category breakdown and top candidates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category breakdown */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Votes by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={200}>
                      <RePieChart>
                        <Pie
                          data={mockCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="percentage"
                        >
                          {mockCategoryData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {mockCategoryData.map((cat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-slate-300 text-sm truncate max-w-[120px]">{cat.name}</span>
                          </div>
                          <span className="text-white font-medium text-sm">{cat.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top candidates */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-400" />
                  Top Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTopCandidates.map((candidate, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? "bg-yellow-500/20 text-yellow-400" :
                          index === 1 ? "bg-slate-400/20 text-slate-300" :
                          index === 2 ? "bg-orange-500/20 text-orange-400" :
                          "bg-slate-600/20 text-slate-400"
                        }`}>
                          <span className="text-sm font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{candidate.name}</p>
                          <p className="text-slate-500 text-xs">{candidate.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{candidate.votes.toLocaleString()}</p>
                        <Badge
                          variant="outline"
                          className={candidate.trend > 0
                            ? "bg-green-500/10 border-green-500/30 text-green-400 text-xs"
                            : "bg-red-500/10 border-red-500/30 text-red-400 text-xs"
                          }
                        >
                          {candidate.trend > 0 ? "+" : ""}{candidate.trend}%
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voting" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Detailed Voting Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-400">
                Advanced voting analytics coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-400">
                Detailed revenue breakdowns coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device breakdown */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={200}>
                    <RePieChart>
                      <Pie
                        data={mockDeviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {mockDeviceData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {mockDeviceData.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                          <span className="text-slate-300">{device.name}</span>
                        </div>
                        <span className="text-white font-medium">{device.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Region breakdown */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-400" />
                  Top Regions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRegionData.map((region, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 text-sm">{region.region}</span>
                        <span className="text-white font-medium text-sm">{region.votes.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${region.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
