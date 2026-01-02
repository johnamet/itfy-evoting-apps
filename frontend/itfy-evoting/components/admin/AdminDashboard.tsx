"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  Tags,
  Presentation,
  Activity,
  TrendingUp,
  Settings,
  Package,
  Ticket,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Command,
  Plus,
  CheckCheck,
  FileText,
  Hash,
} from "lucide-react";
import { notificationsApi } from "@/lib/api/notifications";
import { eventsApi } from "@/lib/api/events";
import { candidatesApi } from "@/lib/api/candidates";
import { usersApi } from "@/lib/api/users";
import type { Notification, Event, Candidate, User as UserType } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner, InlineSpinner } from "@/components/ui/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAuthStore } from "@/store/auth";
import type { User } from "@/types";

// Tab components (to be created)
import AdminOverviewTab from "./tabs/AdminOverviewTab";
import AdminUsersTab from "./tabs/AdminUsersTab";
import AdminEventsTab from "./tabs/AdminEventsTab";
import AdminCandidatesTab from "./tabs/AdminCandidatesTab";
import AdminCategoriesTab from "./tabs/AdminCategoriesTab";
import AdminSlidesTab from "./tabs/AdminSlidesTab";
import AdminAnalyticsTab from "./tabs/AdminAnalyticsTab";
import AdminSettingsTab from "./tabs/AdminSettingsTab";
import AdminActivitiesTab from "./tabs/AdminActivitiesTab";
import AdminBundlesTab from "./tabs/AdminBundlesTab";
import AdminCouponsTab from "./tabs/AdminCouponsTab";

// Navigation items
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
  { id: "users", label: "Users", icon: Users, badge: null },
  { id: "events", label: "Events", icon: Calendar, badge: 3 },
  { id: "candidates", label: "Candidates", icon: UserCheck, badge: null },
  { id: "categories", label: "Categories", icon: Tags, badge: null },
  { id: "slides", label: "Hero Slides", icon: Presentation, badge: null },
  { id: "bundles", label: "Vote Bundles", icon: Package, badge: null },
  { id: "coupons", label: "Coupons", icon: Ticket, badge: null },
  { id: "activities", label: "Activities", icon: Activity, badge: 12 },
  { id: "analytics", label: "Analytics", icon: TrendingUp, badge: null },
  { id: "settings", label: "Settings", icon: Settings, badge: null },
];

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const { logoutUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  
  // Search state
  const [searchResults, setSearchResults] = useState<{
    events: Event[];
    candidates: Candidate[];
    users: UserType[];
  }>({ events: [], candidates: [], users: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);

  // Search functionality with debounce
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults({ events: [], candidates: [], users: [] });
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    try {
      const [eventsRes, candidatesRes, usersRes] = await Promise.allSettled([
        eventsApi.list({ search: query, limit: 5 }),
        candidatesApi.list({ search: query, limit: 5 }),
        usersApi.list({ search: query, limit: 5 }),
      ]);

      setSearchResults({
        events: eventsRes.status === "fulfilled" && eventsRes.value.success ? eventsRes.value.data : [],
        candidates: candidatesRes.status === "fulfilled" && candidatesRes.value.success ? candidatesRes.value.data : [],
        users: usersRes.status === "fulfilled" && usersRes.value.success ? usersRes.value.data : [],
      });
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults({ events: [], candidates: [], users: [] });
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length >= 2) {
      setSearchLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
    } else {
      setSearchResults({ events: [], candidates: [], users: [] });
      setSearchLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  // Handle search result click
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchResultClick = (type: string, _id: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    
    // Navigate to the appropriate tab
    // TODO: Could also store the ID to highlight/scroll to the item
    switch (type) {
      case "event":
        setActiveTab("events");
        break;
      case "candidate":
        setActiveTab("candidates");
        break;
      case "user":
        setActiveTab("users");
        break;
    }
  };

  // Get total search results count
  const totalSearchResults = searchResults.events.length + searchResults.candidates.length + searchResults.users.length;

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setNotificationsLoading(true);
        const response = await notificationsApi.getMyNotifications({ limit: 10 });
        if (response.success && response.data) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setNotificationsLoading(false);
      }
    };

    fetchNotifications();
    // Refetch every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, status: "read" as const, read_at: new Date().toISOString() }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Format notification time
  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Escape to close search
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Render active tab content
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewTab />;
      case "users":
        return <AdminUsersTab />;
      case "events":
        return <AdminEventsTab />;
      case "candidates":
        return <AdminCandidatesTab />;
      case "categories":
        return <AdminCategoriesTab />;
      case "slides":
        return <AdminSlidesTab />;
      case "bundles":
        return <AdminBundlesTab />;
      case "coupons":
        return <AdminCouponsTab />;
      case "activities":
        return <AdminActivitiesTab />;
      case "analytics":
        return <AdminAnalyticsTab />;
      case "settings":
        return <AdminSettingsTab user={user} />;
      default:
        return <AdminOverviewTab />;
    }
  }, [activeTab, user]);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  const unreadNotifications = notifications.filter((n) => !n.read_at && n.status !== "read").length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-[100px] animate-spin-slow" />
        </div>

        {/* Global search modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Search Input */}
                  <div className="flex items-center px-4 border-b border-slate-700/50">
                    {searchLoading ? (
                      <InlineSpinner className="w-5 h-5" />
                    ) : (
                      <Search className="w-5 h-5 text-slate-400" />
                    )}
                    <input
                      type="text"
                      placeholder="Search events, candidates, users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-4 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white mr-2"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-400">
                      ESC
                    </kbd>
                  </div>

                  {/* Search Results */}
                  <ScrollArea className="max-h-[60vh]">
                    {searchQuery.length < 2 ? (
                      <div className="p-6 text-center">
                        <Search className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p className="text-sm text-slate-500">
                          Type at least 2 characters to search across events, candidates, and users
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-600">
                          <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">↑</kbd>
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">↓</kbd>
                            to navigate
                          </span>
                          <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Enter</kbd>
                            to select
                          </span>
                        </div>
                      </div>
                    ) : searchLoading ? (
                      <div className="p-8 text-center">
                        <Spinner size="md" text="Searching..." />
                      </div>
                    ) : totalSearchResults === 0 ? (
                      <div className="p-8 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p className="text-sm text-slate-400">No results found for &quot;{searchQuery}&quot;</p>
                        <p className="text-xs text-slate-500 mt-1">Try different keywords or check spelling</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {/* Events Results */}
                        {searchResults.events.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                              <Calendar className="w-3.5 h-3.5" />
                              Events ({searchResults.events.length})
                            </div>
                            {searchResults.events.map((event) => (
                              <button
                                key={event._id}
                                onClick={() => handleSearchResultClick("event", event._id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                                    {event.name}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate">
                                    {event.status} • {event.event_type || "Event"}
                                  </p>
                                </div>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${
                                    event.status === "active" 
                                      ? "bg-green-500/20 text-green-400" 
                                      : event.status === "upcoming"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-slate-500/20 text-slate-400"
                                  }`}
                                >
                                  {event.status}
                                </Badge>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Candidates Results */}
                        {searchResults.candidates.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                              <UserCheck className="w-3.5 h-3.5" />
                              Candidates ({searchResults.candidates.length})
                            </div>
                            {searchResults.candidates.map((candidate) => {
                              const candidateName = `${candidate.first_name} ${candidate.last_name}`;
                              return (
                                <button
                                  key={candidate._id}
                                  onClick={() => handleSearchResultClick("candidate", candidate._id)}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left group"
                                >
                                  <Avatar className="w-10 h-10 border border-slate-700">
                                    <AvatarImage src={candidate.profile_image || undefined} />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                                      {candidate.first_name?.charAt(0).toUpperCase() || "C"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-purple-400 transition-colors">
                                      {candidateName}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                                      <Hash className="w-3 h-3" />
                                      {candidate.candidate_code}
                                    </p>
                                  </div>
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${
                                      candidate.status === "approved" 
                                        ? "bg-green-500/20 text-green-400" 
                                        : candidate.status === "pending"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : "bg-slate-500/20 text-slate-400"
                                    }`}
                                  >
                                    {candidate.status}
                                  </Badge>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Users Results */}
                        {searchResults.users.length > 0 && (
                          <div className="mb-2">
                            <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                              <Users className="w-3.5 h-3.5" />
                              Users ({searchResults.users.length})
                            </div>
                            {searchResults.users.map((userItem) => (
                              <button
                                key={userItem._id}
                                onClick={() => handleSearchResultClick("user", userItem._id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/70 transition-colors text-left group"
                              >
                                <Avatar className="w-10 h-10 border border-slate-700">
                                  <AvatarImage src={userItem.photo_url || undefined} />
                                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-500 text-white text-sm">
                                    {userItem.name?.charAt(0).toUpperCase() || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                    {userItem.name}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate">
                                    {userItem.email}
                                  </p>
                                </div>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${
                                    userItem.role === "admin" || userItem.role === "super_admin"
                                      ? "bg-red-500/20 text-red-400" 
                                      : userItem.role === "organiser"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "bg-slate-500/20 text-slate-400"
                                  }`}
                                >
                                  {userItem.role}
                                </Badge>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Footer with result count */}
                  {searchQuery.length >= 2 && totalSearchResults > 0 && (
                    <div className="px-4 py-3 border-t border-slate-700/50 bg-slate-800/30">
                      <p className="text-xs text-slate-500 text-center">
                        Found {totalSearchResults} result{totalSearchResults !== 1 ? "s" : ""} • Click to navigate
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? 80 : 280,
            x: mobileMenuOpen ? 0 : typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={`fixed top-0 left-0 h-full z-50 lg:z-30 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">i</span>
                    </div>
                    <div>
                      <h1 className="font-bold text-white">ITFY Admin</h1>
                      <p className="text-xs text-slate-400">E-Voting Platform</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {sidebarCollapsed && (
                <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">i</span>
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
              <nav className="px-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <Tooltip key={item.id} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <motion.button
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <Icon className={`w-5 h-5 ${isActive ? "text-blue-400" : ""}`} />
                          <AnimatePresence mode="wait">
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex-1 text-left text-sm font-medium"
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {!sidebarCollapsed && item.badge && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-400 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </motion.button>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right" className="bg-slate-800 border-slate-700">
                          <p>{item.label}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </ScrollArea>

            {/* Collapse toggle */}
            <div className="hidden lg:block p-3 border-t border-slate-700/50">
              <motion.button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.div>
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">Collapse</span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* Main content wrapper */}
        <motion.div
          initial={false}
          animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen flex flex-col lg:ml-0"
        >
          {/* Header */}
          <header className="sticky top-0 z-20 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
            <div className="h-full flex items-center justify-between px-4 lg:px-6">
              {/* Left section */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5 text-slate-400" />
                </button>

                {/* Breadcrumb */}
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Admin</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <span className="text-white font-medium capitalize">{activeTab}</span>
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Search button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Search</span>
                  <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-700 text-xs">
                    <Command className="w-3 h-3" />K
                  </kbd>
                </motion.button>

                {/* Quick actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-slate-900 border-slate-700"
                  >
                    <DropdownMenuLabel className="text-slate-400">
                      Quick Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                      <Calendar className="w-4 h-4 mr-2" /> New Event
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                      <UserCheck className="w-4 h-4 mr-2" /> Add Candidate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                      <Users className="w-4 h-4 mr-2" /> Invite User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                      <Package className="w-4 h-4 mr-2" /> Create Bundle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                          {unreadNotifications > 9 ? "9+" : unreadNotifications}
                        </span>
                      )}
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 bg-slate-900 border-slate-700"
                  >
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span className="text-slate-400">Notifications</span>
                      <div className="flex items-center gap-2">
                        {unreadNotifications > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleMarkAllAsRead();
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <CheckCheck className="w-3 h-3" />
                            Mark all read
                          </button>
                        )}
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          {unreadNotifications} new
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <ScrollArea className="h-64">
                      {notificationsLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Spinner size="sm" />
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                          <Bell className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-sm">No notifications</span>
                        </div>
                      ) : (
                        notifications.map((notification) => {
                          const isUnread = !notification.read_at && notification.status !== "read";
                          return (
                            <DropdownMenuItem
                              key={notification._id}
                              className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${
                                isUnread ? "bg-slate-800/50" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                <span className="font-medium text-white text-sm flex-1 truncate">
                                  {notification.title}
                                </span>
                                {isUnread && (
                                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                )}
                              </div>
                              <span className="text-slate-400 text-xs line-clamp-2">
                                {notification.message}
                              </span>
                              <span className="text-slate-500 text-xs">
                                {formatNotificationTime(notification.created_at)}
                              </span>
                            </DropdownMenuItem>
                          );
                        })
                      )}
                    </ScrollArea>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="justify-center text-blue-400 hover:text-blue-300 focus:text-blue-300">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                    >
                      <Avatar className="w-8 h-8 border-2 border-slate-700">
                        <AvatarImage src={user?.photo_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                          {user?.name?.charAt(0).toUpperCase() || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-white">{user?.name || "Admin"}</p>
                        <p className="text-xs text-slate-400 capitalize">{user?.role?.replace('_', ' ') || "User"}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-slate-900 border-slate-700"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-white">{user?.name || "Admin"}</span>
                        <span className="text-slate-400 text-xs font-normal">
                          {user?.email || ""}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={() => setActiveTab("settings")}
                      className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main ref={mainContentRef} className="flex-1 p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>

        {/* Custom styles for animations */}
        <style jsx global>{`
          @keyframes spin-slow {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
}
