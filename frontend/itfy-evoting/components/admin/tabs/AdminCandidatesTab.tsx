"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Hash,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  BarChart3,
  User,
  Clock,
  CheckSquare,
  Square,
  Users,
  History,
  ArrowRight,
  Award,
  Globe,
  GlobeLock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { candidatesApi, type CandidateFilters, type CandidateStatsResponse } from "@/lib/api/candidates";
import { categoriesApi } from "@/lib/api/categories";
import { eventsApi } from "@/lib/api/events";
import type { Candidate, Category, Event, CandidateStatus, CreateCandidateRequest, UpdateCandidateRequest } from "@/types";

// Status colors
const statusColors: Record<CandidateStatus, string> = {
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  profile_update_pending: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending_profile_completion: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const statusIcons: Record<CandidateStatus, React.ReactNode> = {
  approved: <CheckCircle className="w-3 h-3" />,
  pending: <AlertTriangle className="w-3 h-3" />,
  rejected: <XCircle className="w-3 h-3" />,
  profile_update_pending: <Clock className="w-3 h-3" />,
  pending_profile_completion: <User className="w-3 h-3" />,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Helper to get candidate display name
const getCandidateName = (candidate: Candidate): string => {
  if (candidate.first_name && candidate.last_name) {
    return `${candidate.first_name} ${candidate.last_name}`;
  }
  return candidate.first_name || candidate.last_name || "Unknown";
};

// Helper to get candidate initials
const getCandidateInitials = (candidate: Candidate): string => {
  const first = candidate.first_name?.charAt(0) || "";
  const last = candidate.last_name?.charAt(0) || "";
  return (first + last).toUpperCase() || "?";
};

// Candidate card component
function CandidateCard({
  candidate,
  rank,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onTogglePublish,
  isLoading,
}: {
  candidate: Candidate;
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onApprove: () => void;
  onReject: () => void;
  onTogglePublish: () => void;
  isLoading?: boolean;
}) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden group transition-all ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            {/* Selection checkbox and rank */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-blue-400" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
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
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-400 hover:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 w-48">
                <DropdownMenuItem onClick={onView} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-700" />
                
                {/* Status actions */}
                {candidate.status === "pending" && (
                  <>
                    <DropdownMenuItem onClick={onApprove} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onReject} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                      <XCircle className="w-4 h-4 mr-2" /> Reject
                    </DropdownMenuItem>
                  </>
                )}
                
                {candidate.status === "rejected" && (
                  <DropdownMenuItem onClick={onApprove} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                  </DropdownMenuItem>
                )}
                
                {candidate.status === "profile_update_pending" && (
                  <DropdownMenuItem onClick={onApprove} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve Update
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-slate-700" />

                {/* Publish/Unpublish toggle */}
                <DropdownMenuItem 
                  onClick={onTogglePublish} 
                  className={candidate.is_published 
                    ? "text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10"
                    : "text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10"
                  }
                >
                  {candidate.is_published ? (
                    <><GlobeLock className="w-4 h-4 mr-2" /> Unpublish</>
                  ) : (
                    <><Globe className="w-4 h-4 mr-2" /> Publish</>
                  )}
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
              <AvatarImage src={candidate.profile_image || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                {getCandidateInitials(candidate)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-white text-lg">{getCandidateName(candidate)}</h3>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Hash className="w-3 h-3" />
              {candidate.candidate_code}
            </div>
          </div>

          {/* Categories */}
          {candidate.categories && candidate.categories.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 justify-center">
                {candidate.categories.slice(0, 1).map((cat, idx) => {
                  const categoryObj = typeof cat === 'object' ? cat as { _id: string; name: string } : null;
                  const categoryName = categoryObj?.name || String(cat);
                  return (
                    <Badge key={idx} variant="outline" className="bg-purple-500/30 border-purple-500/40 text-purple-200 text-xs font-semibold">
                      <Award className="w-3 h-3 mr-1" />
                      {categoryName}
                    </Badge>
                  );
                })}
                {candidate.categories.length > 1 && (
                  <Badge variant="outline" className="bg-slate-500/10 border-slate-500/30 text-slate-400 text-xs">
                    +{candidate.categories.length - 1}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Stats and status */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">{(candidate.vote_count || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Publish status indicator */}
              {candidate.is_published ? (
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Published
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-xs">
                  <GlobeLock className="w-3 h-3 mr-1" />
                  Unpublished
                </Badge>
              )}
             
            </div>
            
          </div>
           <div className="flex flex-col items-center mt-3">
                <Badge variant="outline" className={statusColors[candidate.status]}>
                {statusIcons[candidate.status]}
                <span className="ml-1 capitalize">{candidate.status}</span>
                </Badge>
              </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Candidate Details Dialog
function CandidateDetailsDialog({
  candidate,
  stats,
  isOpen,
  onClose,
  isLoading,
}: {
  candidate: Candidate | null;
  stats: CandidateStatsResponse | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}) {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={candidate.profile_image || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {getCandidateInitials(candidate)}
              </AvatarFallback>
            </Avatar>
            {getCandidateName(candidate)}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Candidate details and statistics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="details" className="data-[state=active]:bg-slate-700">Details</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700">Statistics</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColors[candidate.status]}>
                {statusIcons[candidate.status]}
                <span className="ml-1 capitalize">{candidate.status}</span>
              </Badge>
              {candidate.is_featured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Trophy className="w-3 h-3 mr-1" /> Featured
                </Badge>
              )}
              {candidate.is_published ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Globe className="w-3 h-3 mr-1" /> Published
                </Badge>
              ) : (
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  <GlobeLock className="w-3 h-3 mr-1" /> Unpublished
                </Badge>
              )}
            </div>

            {/* Basic info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Candidate Code</Label>
                <p className="text-white mt-1 font-mono">{candidate.candidate_code}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Email</Label>
                <p className="text-white mt-1">{candidate.email}</p>
              </div>
            </div>

            {candidate.phone_number && (
              <div>
                <Label className="text-slate-400 text-sm">Phone</Label>
                <p className="text-white mt-1">{candidate.phone_number}</p>
              </div>
            )}

            {/* Bio */}
            {candidate.bio && (
              <div>
                <Label className="text-slate-400 text-sm">Bio</Label>
                <p className="text-white mt-1">{candidate.bio}</p>
              </div>
            )}

            {/* Why nominate me */}
            {candidate.why_nominate_me && (
              <div>
                <Label className="text-slate-400 text-sm">Why Nominate Me</Label>
                <p className="text-white mt-1">{candidate.why_nominate_me}</p>
              </div>
            )}

            {/* Impact statement */}
            {candidate.impact_statement && (
              <div>
                <Label className="text-slate-400 text-sm">Impact Statement</Label>
                <p className="text-white mt-1">{candidate.impact_statement}</p>
              </div>
            )}

            {/* Skills */}
            {candidate.skills && candidate.skills.length > 0 && (
              <div>
                <Label className="text-slate-400 text-sm">Skills</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {candidate.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-slate-800 text-slate-300 border-slate-600">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Categories (Nominated For) */}
            {candidate.categories && candidate.categories.length > 0 && (
              <div>
                <Label className="text-slate-400 text-sm">Nominated Categories</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.categories.map((category) => {
                    // Handle both populated object and ObjectId string
                    const categoryObj = typeof category === 'object' ? category as { _id: string; name: string; slug?: string } : null;
                    const categoryName = categoryObj?.name || String(category);
                    const categoryId = categoryObj?._id || String(category);
                    return (
                      <Badge 
                        key={categoryId} 
                        className="bg-purple-500/20 text-purple-400 border-purple-500/30"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {categoryName}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div>
                <Label className="text-slate-400 text-sm">Created At</Label>
                <p className="text-white mt-1">{new Date(candidate.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Last Updated</Label>
                <p className="text-white mt-1">{new Date(candidate.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Rejection reason */}
            {candidate.status === "rejected" && candidate.rejection_reason && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <Label className="text-red-400 text-sm">Rejection Reason</Label>
                <p className="text-white mt-1">{candidate.rejection_reason}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
            ) : stats ? (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Vote className="w-6 h-6 mx-auto text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{(stats.total_votes || 0).toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Total Votes</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Trophy className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                      <p className="text-2xl font-bold text-white">#{stats.rank || "-"}</p>
                      <p className="text-slate-400 text-sm">Rank</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="w-6 h-6 mx-auto text-blue-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{(stats.percentage || 0).toFixed(1)}%</p>
                      <p className="text-slate-400 text-sm">Vote Share</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Eye className="w-6 h-6 mx-auto text-purple-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{(stats.view_count || 0).toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Views</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Votes over time */}
                {stats.votes_over_time && stats.votes_over_time.length > 0 && (
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Recent Vote Activity</Label>
                    <div className="space-y-2">
                      {stats.votes_over_time.slice(0, 7).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300">{new Date(item.date).toLocaleDateString()}</span>
                          <span className="text-white font-medium">{item.count} votes</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No statistics available</p>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-4">
            {candidate.profile_update_history && candidate.profile_update_history.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm text-slate-400 mb-4">
                  Showing {candidate.profile_update_history.length} update{candidate.profile_update_history.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-3">
                  {candidate.profile_update_history
                    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                    .map((entry, index) => (
                    <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${entry.updated_by_candidate ? 'bg-blue-500' : 'bg-purple-500'}`} />
                          <span className="text-white font-medium">
                            {entry.updated_by_candidate ? 'Candidate Update' : 'Admin Update'}
                          </span>
                        </div>
                        <span className="text-slate-400 text-sm">
                          {new Date(entry.updated_at).toLocaleDateString()} at {new Date(entry.updated_at).toLocaleTimeString()}
                        </span>
                      </div>

                      {/* Status Change */}
                      {(entry.previous_status || entry.new_status) && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-400 text-sm">Status:</span>
                          {entry.previous_status && (
                            <Badge variant="outline" className="text-xs">
                              {entry.previous_status}
                            </Badge>
                          )}
                          {entry.previous_status && entry.new_status && (
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          )}
                          {entry.new_status && (
                            <Badge className={`text-xs ${
                              entry.new_status === 'approved' ? 'bg-green-500/20 text-green-400' :
                              entry.new_status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                              entry.new_status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-slate-500/20 text-slate-400'
                            }`}>
                              {entry.new_status}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Fields Changed */}
                      {entry.fields_changed && entry.fields_changed.length > 0 && (
                        <div className="mb-2">
                          <span className="text-slate-400 text-sm">Fields changed: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {entry.fields_changed.map((field, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-slate-700/50">
                                {field.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reason */}
                      {entry.reason && (
                        <div className="mt-2 p-2 bg-slate-900/50 rounded text-sm text-slate-300">
                          <span className="text-slate-400">Reason: </span>
                          {entry.reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No update history available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Create/Edit Candidate Dialog
function CandidateFormDialog({
  candidate,
  events,
  categories,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  onEventChange,
}: {
  candidate: Candidate | null;
  events: Event[];
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCandidateRequest | UpdateCandidateRequest) => void;
  isLoading?: boolean;
  onEventChange?: (eventId: string) => void;
}) {
  // Compute initial form data directly from candidate prop
  const initialFormData: Partial<CreateCandidateRequest> = candidate
    ? {
        first_name: candidate.first_name || "",
        last_name: candidate.last_name || "",
        email: candidate.email || "",
        phone_number: candidate.phone_number || "",
        bio: candidate.bio || "",
        event: candidate.event?.toString() || "",
        categories: candidate.categories || [],
        profile_image: candidate.profile_image || "",
        cover_image: candidate.cover_image || "",
        video_url: candidate.video_url || "",
        why_nominate_me: candidate.why_nominate_me || "",
        impact_statement: candidate.impact_statement || "",
        is_featured: candidate.is_featured || false,
        is_published: candidate.is_published || false,
        display_order: candidate.display_order || 0,
        social_links: candidate.social_links || {},
        skills: candidate.skills || [],
        tags: candidate.tags || [],
      }
    : {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        bio: "",
        event: "",
        categories: [],
        profile_image: "",
        cover_image: "",
        video_url: "",
        why_nominate_me: "",
        impact_statement: "",
        is_featured: false,
        is_published: false,
        display_order: 0,
        social_links: {},
        skills: [],
        tags: [],
      };

  const [formData, setFormData] = useState<Partial<CreateCandidateRequest>>(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Reset form when candidate changes (use useMemo pattern to track previous)
  const candidateId = candidate?._id ?? null;
  const prevCandidateIdRef = React.useRef<string | null>(candidateId);

  if (prevCandidateIdRef.current !== candidateId) {
    prevCandidateIdRef.current = candidateId;
    // Only update if values actually changed (avoid unnecessary re-renders)
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      setFormData(initialFormData);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as CreateCandidateRequest);
  };

  const handleEventChange = (eventId: string) => {
    setFormData({ ...formData, event: eventId, categories: [] });
    onEventChange?.(eventId);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = formData.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    setFormData({ ...formData, categories: newCategories });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = formData.skills || [];
      if (!currentSkills.includes(skillInput.trim())) {
        setFormData({ ...formData, skills: [...currentSkills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const currentSkills = formData.skills || [];
    setFormData({ ...formData, skills: currentSkills.filter(s => s !== skill) });
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentTags = formData.tags || [];
      if (!currentTags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...currentTags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = formData.tags || [];
    setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      social_links: {
        ...formData.social_links,
        [platform]: value,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            {candidate ? "Edit Candidate" : "Add New Candidate"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {candidate ? "Update candidate information" : "Create a new candidate for an event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="bg-slate-800 border-slate-700 w-full grid grid-cols-4">
              <TabsTrigger value="basic" className="data-[state=active]:bg-slate-700 text-xs">Basic</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-slate-700 text-xs">Details</TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-slate-700 text-xs">Social</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700 text-xs">Settings</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">First Name *</Label>
                  <Input
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="John"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Last Name *</Label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Doe"
                    required
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Phone Number</Label>
                <Input
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="+233 XX XXX XXXX"
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              {!candidate && (
                <div>
                  <Label className="text-slate-300">Event *</Label>
                  <Select
                    value={formData.event}
                    onValueChange={handleEventChange}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {events.map((event) => (
                        <SelectItem key={event._id} value={event._id}>
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Categories */}
              {(formData.event || candidate) && categories.length > 0 && (
                <div>
                  <Label className="text-slate-300 mb-2 block">Categories *</Label>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg max-h-32 overflow-y-auto">
                    {categories.map((category) => {
                      const isSelected = formData.categories?.includes(category._id);
                      return (
                        <button
                          key={category._id}
                          type="button"
                          onClick={() => handleCategoryToggle(category._id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                  {formData.categories && formData.categories.length > 0 && (
                    <p className="text-slate-400 text-xs mt-1">
                      {formData.categories.length} category(ies) selected
                    </p>
                  )}
                </div>
              )}

              <div>
                <Label className="text-slate-300">Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about the candidate..."
                  rows={3}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-300">Profile Image URL</Label>
                <Input
                  value={formData.profile_image || ""}
                  onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Cover Image URL</Label>
                <Input
                  value={formData.cover_image || ""}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Video URL</Label>
                <Input
                  value={formData.video_url || ""}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Why Nominate Me</Label>
                <Textarea
                  value={formData.why_nominate_me || ""}
                  onChange={(e) => setFormData({ ...formData, why_nominate_me: e.target.value })}
                  placeholder="Why should people vote for this candidate..."
                  rows={3}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Impact Statement</Label>
                <Textarea
                  value={formData.impact_statement || ""}
                  onChange={(e) => setFormData({ ...formData, impact_statement: e.target.value })}
                  placeholder="What impact will this candidate make..."
                  rows={3}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>

              {/* Skills */}
              <div>
                <Label className="text-slate-300">Skills</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill..."
                    className="bg-slate-800/50 border-slate-700 text-white"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button type="button" onClick={handleAddSkill} variant="outline" className="bg-slate-800 border-slate-700 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.skills && formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-red-400"
                          title={`Remove ${skill}`}
                          aria-label={`Remove ${skill}`}
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <Label className="text-slate-300">Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    className="bg-slate-800/50 border-slate-700 text-white"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" className="bg-slate-800 border-slate-700 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-400"
                          title={`Remove ${tag}`}
                          aria-label={`Remove ${tag}`}
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Social Links Tab */}
            <TabsContent value="social" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Facebook</Label>
                  <Input
                    value={formData.social_links?.facebook || ""}
                    onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Twitter/X</Label>
                  <Input
                    value={formData.social_links?.twitter || ""}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Instagram</Label>
                  <Input
                    value={formData.social_links?.instagram || ""}
                    onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">LinkedIn</Label>
                  <Input
                    value={formData.social_links?.linkedin || ""}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">GitHub</Label>
                  <Input
                    value={formData.social_links?.github || ""}
                    onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Portfolio/Website</Label>
                  <Input
                    value={formData.social_links?.portfolio || formData.social_links?.website || ""}
                    onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">YouTube</Label>
                  <Input
                    value={formData.social_links?.youtube || ""}
                    onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">TikTok</Label>
                  <Input
                    value={formData.social_links?.tiktok || ""}
                    onChange={(e) => handleSocialLinkChange("tiktok", e.target.value)}
                    placeholder="https://tiktok.com/@..."
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <div>
                    <Label className="text-slate-300">Featured</Label>
                    <p className="text-slate-500 text-xs">Highlight this candidate</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                    title={formData.is_featured ? "Unmark as featured" : "Mark as featured"}
                    aria-label={formData.is_featured ? "Unmark as featured" : "Mark as featured"}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.is_featured ? "bg-yellow-500" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        formData.is_featured ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <div>
                    <Label className="text-slate-300">Published</Label>
                    <p className="text-slate-500 text-xs">Make visible to public</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}
                    title={formData.is_published ? "Unpublish" : "Publish"}
                    aria-label={formData.is_published ? "Unpublish" : "Publish"}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.is_published ? "bg-green-500" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        formData.is_published ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min={0}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
                <p className="text-slate-500 text-xs mt-1">Lower numbers appear first</p>
              </div>

              {candidate && (
                <div className="p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
                  <Label className="text-slate-400 text-sm">Candidate Code</Label>
                  <p className="text-white font-mono mt-1">{candidate.candidate_code}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

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
                  {candidate ? "Updating..." : "Creating..."}
                </>
              ) : (
                candidate ? "Update Candidate" : "Create Candidate"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Reject Dialog with reason
function RejectDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  candidateName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
  candidateName: string;
}) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Reject Candidate
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Are you sure you want to reject <span className="text-white font-medium">{candidateName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div>
          <Label className="text-slate-300">Rejection Reason (Optional)</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide a reason for rejection..."
            rows={3}
            className="bg-slate-800/50 border-slate-700 text-white mt-1"
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-slate-800 border-slate-700 text-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main component
export default function AdminCandidatesTab() {
  // Data state
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  
  // UI state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Dialog state
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateStats, setCandidateStats] = useState<CandidateStatsResponse | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch events for filter dropdown
  const fetchEvents = useCallback(async () => {
    try {
      const response = await eventsApi.list({ limit: 100 });
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, []);

  // Fetch categories for a specific event (for form dialog)
  const fetchCategoriesByEvent = useCallback(async (eventId: string) => {
    try {
      const response = await categoriesApi.getByEvent(eventId, { limit: 100 });
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  }, []);

  // Fetch candidates
  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const filters: CandidateFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as CandidateStatus) : undefined,
        event: eventFilter !== "all" ? eventFilter : undefined,
      };

      const response = await candidatesApi.list(filters);

      if (response.success && response.data) {
        setCandidates(response.data);
        setTotalPages(response.pagination?.total_pages || 1);
        setTotalItems(response.pagination?.total_items || 0);
      } else {
        setCandidates([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      toast.error("Failed to fetch candidates");
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, statusFilter, eventFilter, searchQuery]);

  // Fetch candidate stats
  const fetchCandidateStats = async (candidateId: string) => {
    try {
      setStatsLoading(true);
      const response = await candidatesApi.getStats(candidateId);
      if (response.success && response.data) {
        setCandidateStats(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch candidate stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, eventFilter, searchQuery, itemsPerPage]);

  // Handler for items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value, 10));
    setCurrentPage(1);
  };

  // Handlers
  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsDialog(true);
    fetchCandidateStats(candidate._id);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // Fetch categories for the candidate's event when editing
    if (candidate.event) {
      const eventId = typeof candidate.event === 'object' ? (candidate.event as Event)._id : candidate.event.toString();
      fetchCategoriesByEvent(eventId);
    }
    setShowFormDialog(true);
  };

  const handleCreateCandidate = () => {
    setSelectedCandidate(null);
    setCategories([]); // Clear categories when creating new (will be loaded when event is selected)
    setShowFormDialog(true);
  };

  const handleFormSubmit = async (data: CreateCandidateRequest | UpdateCandidateRequest) => {
    try {
      setActionLoading("form");
      if (selectedCandidate) {
        await candidatesApi.update(selectedCandidate._id, data as UpdateCandidateRequest);
        toast.success("Candidate updated successfully");
      } else {
        await candidatesApi.create(data as CreateCandidateRequest);
        toast.success("Candidate created successfully");
      }
      setShowFormDialog(false);
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Operation failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (candidate: Candidate) => {
    try {
      setActionLoading(candidate._id);
      await candidatesApi.approve(candidate._id);
      toast.success(`${getCandidateName(candidate)} approved`);
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to approve candidate";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedCandidate) return;
    try {
      setActionLoading(selectedCandidate._id);
      await candidatesApi.reject(selectedCandidate._id, reason);
      toast.success(`${getCandidateName(selectedCandidate)} rejected`);
      setShowRejectDialog(false);
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to reject candidate";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedCandidate) return;
    try {
      setActionLoading(selectedCandidate._id);
      await candidatesApi.delete(selectedCandidate._id);
      toast.success(`${getCandidateName(selectedCandidate)} deleted`);
      setShowDeleteDialog(false);
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete candidate";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePublish = async (candidate: Candidate) => {
    try {
      setActionLoading(candidate._id);
      if (candidate.is_published) {
        await candidatesApi.unpublish(candidate._id);
        toast.success(`${getCandidateName(candidate)} unpublished`);
      } else {
        await candidatesApi.publish(candidate._id);
        toast.success(`${getCandidateName(candidate)} published`);
      }
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update publish status";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === candidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(candidates.map((c) => c._id)));
    }
  };

  // Bulk actions
  const handleBulkApprove = async () => {
    if (selectedIds.size === 0) return;
    try {
      setActionLoading("bulk");
      await candidatesApi.bulkApprove(Array.from(selectedIds));
      toast.success(`${selectedIds.size} candidates approved`);
      setSelectedIds(new Set());
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bulk approve failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkReject = async () => {
    if (selectedIds.size === 0) return;
    try {
      setActionLoading("bulk");
      await candidatesApi.bulkReject(Array.from(selectedIds));
      toast.success(`${selectedIds.size} candidates rejected`);
      setSelectedIds(new Set());
      fetchCandidates();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bulk reject failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Sort by votes for ranking
  const sortedCandidates = [...candidates].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));

  // Stats calculations
  const stats = {
    total: totalItems,
    approved: candidates.filter((c) => c.status === "approved").length,
    pending: candidates.filter((c) => c.status.includes("pending")).length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
    totalVotes: candidates.reduce((acc, c) => acc + (c.vote_count || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-blue-400" />
            Candidate Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage event candidates and nominations</p>
        </div>
        <Button 
          onClick={handleCreateCandidate}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Candidate
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Candidates", value: stats.total, icon: Users, color: "blue" },
          { label: "Approved", value: stats.approved, icon: CheckCircle, color: "green" },
          { label: "Pending", value: stats.pending, icon: AlertTriangle, color: "orange" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "red" },
          { label: "Total Votes", value: stats.totalVotes.toLocaleString(), icon: Vote, color: "purple" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and bulk actions */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              {/* Event filter */}
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Event" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event._id} value={event._id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              {/* Bulk actions */}
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-slate-400 text-sm">{selectedIds.size} selected</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleBulkApprove}
                    disabled={actionLoading === "bulk"}
                    className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleBulkReject}
                    disabled={actionLoading === "bulk"}
                    className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              )}

              {/* View mode toggle */}
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchCandidates} 
                disabled={loading}
                className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates display */}
      {loading ? (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "space-y-2"
        }>
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
      ) : candidates.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <UserCheck className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No candidates found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || statusFilter !== "all" || eventFilter !== "all"
                ? "Try adjusting your filters"
                : "Get started by adding your first candidate"}
            </p>
            <Button onClick={handleCreateCandidate} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Candidate
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {sortedCandidates.map((candidate, index) => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              rank={index + 1}
              isSelected={selectedIds.has(candidate._id)}
              onSelect={() => toggleSelection(candidate._id)}
              onView={() => handleViewCandidate(candidate)}
              onEdit={() => handleEditCandidate(candidate)}
              onDelete={() => { setSelectedCandidate(candidate); setShowDeleteDialog(true); }}
              onApprove={() => handleApprove(candidate)}
              onReject={() => { setSelectedCandidate(candidate); setShowRejectDialog(true); }}
              onTogglePublish={() => handleTogglePublish(candidate)}
              isLoading={actionLoading === candidate._id}
            />
          ))}
        </motion.div>
      ) : (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="text-slate-400 w-12">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-white">
                    {selectedIds.size === candidates.length ? (
                      <CheckSquare className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </TableHead>
                <TableHead className="text-slate-400">#</TableHead>
                <TableHead className="text-slate-400">Candidate</TableHead>
                <TableHead className="text-slate-400">Code</TableHead>
                <TableHead className="text-slate-400">Email</TableHead>
                <TableHead className="text-slate-400">Votes</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCandidates.map((candidate, index) => (
                <TableRow 
                  key={candidate._id} 
                  className={`border-slate-700 hover:bg-slate-800/50 ${selectedIds.has(candidate._id) ? "bg-blue-500/10" : ""}`}
                >
                  <TableCell>
                    <button 
                      onClick={() => toggleSelection(candidate._id)} 
                      className="text-slate-400 hover:text-white"
                    >
                      {selectedIds.has(candidate._id) ? (
                        <CheckSquare className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-slate-400">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={candidate.profile_image || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                          {getCandidateInitials(candidate)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{getCandidateName(candidate)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300 font-mono">{candidate.candidate_code}</TableCell>
                  <TableCell className="text-slate-400">{candidate.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-white">
                      <Vote className="w-4 h-4 text-green-400" />
                      {(candidate.vote_count || 0).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[candidate.status]}>
                      {statusIcons[candidate.status]}
                      <span className="ml-1 capitalize">{candidate.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                        <DropdownMenuItem onClick={() => handleViewCandidate(candidate)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCandidate(candidate)} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        {candidate.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(candidate)} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSelectedCandidate(candidate); setShowRejectDialog(true); }} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                              <XCircle className="w-4 h-4 mr-2" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={() => { setSelectedCandidate(candidate); setShowDeleteDialog(true); }} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
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
      {totalItems > 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Items info */}
              <div className="text-slate-400 text-sm">
                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} candidates
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronLeft className="w-4 h-4 -ml-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages around current
                      return page === 1 || 
                             page === totalPages || 
                             Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
                      const prevPage = array[index - 1];
                      const showEllipsisBefore = prevPage && page - prevPage > 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="text-slate-500 px-2">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page 
                              ? "bg-blue-500 text-white" 
                              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                            }
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4 -ml-3" />
                </Button>
              </div>

              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-20 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <CandidateDetailsDialog
        candidate={selectedCandidate}
        stats={candidateStats}
        isOpen={showDetailsDialog}
        onClose={() => { setShowDetailsDialog(false); setCandidateStats(null); }}
        isLoading={statsLoading}
      />

      <CandidateFormDialog
        candidate={selectedCandidate}
        events={events}
        categories={categories}
        isOpen={showFormDialog}
        onClose={() => { setShowFormDialog(false); setCategories([]); }}
        onSubmit={handleFormSubmit}
        isLoading={actionLoading === "form"}
        onEventChange={fetchCategoriesByEvent}
      />

      <RejectDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={handleReject}
        isLoading={actionLoading === selectedCandidate?._id}
        candidateName={selectedCandidate ? getCandidateName(selectedCandidate) : ""}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Candidate</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete <span className="text-white font-medium">{selectedCandidate ? getCandidateName(selectedCandidate) : ""}</span>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={actionLoading === selectedCandidate?._id}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading === selectedCandidate?._id ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
