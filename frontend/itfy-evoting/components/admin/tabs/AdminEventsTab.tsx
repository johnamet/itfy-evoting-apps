"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  Globe,
  Lock,
  Star,
  StarOff,
  Copy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Archive,
  Send,
  BarChart3,
  Settings,
  CalendarDays,
  Link2,
  Palette,
  ImageIcon,
  Tag,
  FileText,
  Building2,
  UserCircle,
  Handshake,
  Images,
  Navigation,
  ListOrdered,
  Upload,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { InlineSpinner } from "@/components/ui/Spinner";
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { eventsApi, type EventFilters, type EventStatsResponse } from "@/lib/api/events";
import type { Event, EventStatus, EventType, EventVisibility, CreateEventRequest, UpdateEventRequest, EventOrganizer, EventRegistrationFee, EventSocialLinks, EventLocation, EventTimelineItem, EventSpeaker, EventSponsor, EventGuestOfHonor } from "@/types";

// Status badge colors
const statusColors: Record<EventStatus, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  archived: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  deleted: "bg-red-500/20 text-red-400 border-red-500/30",
  pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const statusIcons: Record<EventStatus, React.ReactNode> = {
  active: <Play className="w-3 h-3" />,
  upcoming: <Clock className="w-3 h-3" />,
  archived: <Archive className="w-3 h-3" />,
  cancelled: <XCircle className="w-3 h-3" />,
  deleted: <Trash2 className="w-3 h-3" />,
  pending: <AlertTriangle className="w-3 h-3" />,
};

// Event types
const eventTypes: { value: EventType; label: string }[] = [
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "networking", label: "Networking" },
  { value: "webinar", label: "Webinar" },
  { value: "hybrid", label: "Hybrid" },
  { value: "other", label: "Other" },
];

// Visibility options
const visibilityOptions: { value: EventVisibility; label: string; icon: React.ReactNode }[] = [
  { value: "public", label: "Public", icon: <Globe className="w-4 h-4" /> },
  { value: "private", label: "Private", icon: <Lock className="w-4 h-4" /> },
  { value: "unlisted", label: "Unlisted", icon: <Eye className="w-4 h-4" /> },
];

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

// Currency options
const currencyOptions = [
  { value: "GHS", label: "GHS - Ghana Cedi" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
];

// Initial form state with all fields
const initialEventFormState: Partial<CreateEventRequest> = {
  name: "",
  description: "",
  location: {
    name: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    website: "",
    phone: "",
    coordinates: undefined,
  },
  start_date: "",
  end_date: "",
  event_type: "conference",
  visibility: "public",
  currency: "GHS",
  // Media & theme
  cover_image: "",
  color_theme: "#3b82f6",
  gallery: [],
  // Registration
  max_attendees: undefined,
  registration_deadline: "",
  registration_fee: {
    amount: 0,
    currency: "GHS",
    is_free: true,
  },
  // Organizer & contact
  organizer: {
    name: "",
    email: "",
    phone: "",
  },
  contact_email: "",
  social_links: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  },
  // Additional
  tags: [],
  requirements: [],
  cancellation_policy: "",
  // Complex fields
  timeline: [],
  speakers: [],
  sponsors: [],
  guestOfHonor: [],
  related_events: [],
};

// Event card component
function EventCard({
  event,
  onView,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onToggleFeatured,
  onDuplicate,
  onUpdateStatus,
  onCancel,
  isLoading,
}: {
  event: Event;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onToggleFeatured: () => void;
  onDuplicate: () => void;
  onUpdateStatus: (status: EventStatus) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  const votingProgress = event.total_votes ? Math.min(100, (event.total_votes / 1000) * 100) : 0;

  const bannerBackground = useMemo(() => {
    if (event.cover_image) {
      return { backgroundImage: `url(${event.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { background: `linear-gradient(135deg, ${event.color_theme || '#3b82f6'}20, ${event.color_theme || '#8b5cf6'}20)` };
  }, [event.cover_image, event.color_theme]);

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl overflow-auto group h-full">
        {/* Event banner - uses inline style for dynamic user-uploaded images and color themes */}
        <div 
          className="h-32 relative bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          style={bannerBackground}
        >
          {/* Featured badge */}
          {event.is_featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500/90 text-yellow-900">
              <Trophy className="w-3 h-3 mr-1" /> Featured
            </Badge>
          )}
          
          {/* Published badge */}
          {!event.is_published && (
            <Badge className="absolute top-3 left-16 bg-orange-500/90 text-orange-900">
              Draft
            </Badge>
          )}

          {/* Actions dropdown */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 bg-black/20 text-white hover:bg-black/40"
                  disabled={isLoading}
                >
                  {isLoading ? <InlineSpinner className="w-4 h-4" /> : <MoreVertical className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 w-48">
                <DropdownMenuItem onClick={onView} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate} className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-700" />
                
                {/* Publish/Unpublish */}
                {event.is_published ? (
                  <DropdownMenuItem onClick={onUnpublish} className="text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10">
                    <XCircle className="w-4 h-4 mr-2" /> Unpublish
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={onPublish} className="text-green-400 hover:text-green-300 focus:text-green-300 focus:bg-green-500/10">
                    <CheckCircle className="w-4 h-4 mr-2" /> Publish
                  </DropdownMenuItem>
                )}

                {/* Feature/Unfeature */}
                <DropdownMenuItem onClick={onToggleFeatured} className="text-yellow-400 hover:text-yellow-300 focus:text-yellow-300 focus:bg-yellow-500/10">
                  {event.is_featured ? (
                    <><StarOff className="w-4 h-4 mr-2" /> Remove Featured</>
                  ) : (
                    <><Star className="w-4 h-4 mr-2" /> Set Featured</>
                  )}
                </DropdownMenuItem>

                {/* Status submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800">
                    <Settings className="w-4 h-4 mr-2" /> Change Status
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-slate-900 border-slate-700">
                    {(['pending', 'upcoming', 'active', 'archived'] as EventStatus[]).map((status) => (
                      <DropdownMenuItem 
                        key={status}
                        onClick={() => onUpdateStatus(status)}
                        className="text-slate-300 hover:text-white focus:text-white focus:bg-slate-800 capitalize"
                        disabled={event.status === status}
                      >
                        {statusIcons[status]}
                        <span className="ml-2">{status}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator className="bg-slate-700" />

                {/* Cancel */}
                {event.status !== 'cancelled' && (
                  <DropdownMenuItem onClick={onCancel} className="text-orange-400 hover:text-orange-300 focus:text-orange-300 focus:bg-orange-500/10">
                    <AlertTriangle className="w-4 h-4 mr-2" /> Cancel Event
                  </DropdownMenuItem>
                )}

                {/* Delete */}
                <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className={statusColors[event.status]}>
              {statusIcons[event.status]}
              <span className="ml-1 capitalize">{event.status}</span>
            </Badge>
          </div>

          {/* Visibility badge */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-600">
              {event.visibility === 'public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
              {event.visibility}
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
              <p className="text-white text-sm font-medium">{event.current_attendees || 0}</p>
              <p className="text-slate-500 text-xs">Attendees</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-800/50">
              <Vote className="w-4 h-4 mx-auto text-green-400 mb-1" />
              <p className="text-white text-sm font-medium">{event.total_votes?.toLocaleString() || 0}</p>
              <p className="text-slate-500 text-xs">Votes</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-800/50">
              <Calendar className="w-4 h-4 mx-auto text-purple-400 mb-1" />
              <p className="text-white text-sm font-medium">{event.categories?.length || 0}</p>
              <p className="text-slate-500 text-xs">Categories</p>
            </div>
          </div>

          {/* Voting progress */}
          {event.status === "active" && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Voting Progress</span>
                <span>{votingProgress.toFixed(0)}%</span>
              </div>
              <Progress value={votingProgress} className="h-2 bg-slate-800" />
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {new Date(event.start_date).toLocaleDateString()}
            </div>
            {event.location?.city && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location.city}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Event Details Dialog
function EventDetailsDialog({
  event,
  stats,
  isOpen,
  onClose,
  onPublishResults,
  isLoading,
}: {
  event: Event | null;
  stats: EventStatsResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onPublishResults: () => void;
  isLoading?: boolean;
}) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            {event.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Event details and statistics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="details" className="data-[state=active]:bg-slate-700">Details</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColors[event.status]}>
                {statusIcons[event.status]}
                <span className="ml-1 capitalize">{event.status}</span>
              </Badge>
              {event.is_published && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" /> Published
                </Badge>
              )}
              {event.is_featured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1" /> Featured
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="text-slate-400 text-sm">Description</Label>
              <p className="text-white mt-1">{event.description}</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Start Date</Label>
                <p className="text-white mt-1">{new Date(event.start_date).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">End Date</Label>
                <p className="text-white mt-1">{new Date(event.end_date).toLocaleString()}</p>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div>
                <Label className="text-slate-400 text-sm">Location</Label>
                <div className="text-white mt-1">
                  <p>{event.location.name}</p>
                  <p className="text-slate-400 text-sm">{event.location.address}</p>
                  <p className="text-slate-400 text-sm">{event.location.city}, {event.location.country}</p>
                </div>
              </div>
            )}

            {/* Event type and visibility */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400 text-sm">Event Type</Label>
                <p className="text-white mt-1 capitalize">{event.event_type}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-sm">Visibility</Label>
                <p className="text-white mt-1 capitalize">{event.visibility}</p>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <Label className="text-slate-400 text-sm">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {event.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="bg-slate-800 text-slate-300 border-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            {stats ? (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Vote className="w-6 h-6 mx-auto text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{stats.total_votes?.toLocaleString() || 0}</p>
                      <p className="text-slate-400 text-sm">Total Votes</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Users className="w-6 h-6 mx-auto text-blue-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{stats.total_candidates || 0}</p>
                      <p className="text-slate-400 text-sm">Candidates</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-6 h-6 mx-auto text-purple-400 mb-2" />
                      <p className="text-2xl font-bold text-white">{stats.total_categories || 0}</p>
                      <p className="text-slate-400 text-sm">Categories</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                      <p className="text-2xl font-bold text-white">GHS {(stats.total_revenue || 0).toLocaleString()}</p>
                      <p className="text-slate-400 text-sm">Revenue</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Votes by category */}
                {stats.votes_by_category && stats.votes_by_category.length > 0 && (
                  <div>
                    <Label className="text-slate-400 text-sm mb-2 block">Votes by Category</Label>
                    <div className="space-y-2">
                      {stats.votes_by_category.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-white">{cat.category_name}</span>
                          <span className="text-slate-400">{cat.vote_count.toLocaleString()} votes</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publish results button */}
                <div className="pt-4 border-t border-slate-700">
                  <Button 
                    onClick={onPublishResults}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-full"
                  >
                    {isLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Publish Results
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Loading statistics...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Event Form Dialog - inner component to handle form state reset via key prop
function EventFormDialogContent({
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}: {
  onClose: () => void;
  onSubmit: (data: CreateEventRequest | UpdateEventRequest) => void;
  initialData?: Event | null;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [tagsInput, setTagsInput] = useState("");
  const [requirementsInput, setRequirementsInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  
  // File upload state and refs
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Derive initial form data from props
  const derivedInitialData = useMemo(() => {
    if (initialData && mode === 'edit') {
      return {
        name: initialData.name,
        description: initialData.description,
        location: initialData.location || initialEventFormState.location,
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : '',
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : '',
        event_type: initialData.event_type,
        visibility: initialData.visibility,
        currency: initialData.currency || "GHS",
        // Media & theme
        cover_image: initialData.cover_image || "",
        color_theme: initialData.color_theme || "#3b82f6",
        gallery: initialData.gallery || [],
        // Registration
        max_attendees: initialData.max_attendees,
        registration_deadline: initialData.registration_deadline ? new Date(initialData.registration_deadline).toISOString().slice(0, 16) : '',
        registration_fee: initialData.registration_fee || { amount: 0, currency: "GHS", is_free: true },
        // Organizer & contact
        organizer: initialData.organizer || { name: "", email: "", phone: "" },
        contact_email: initialData.contact_email || "",
        social_links: initialData.social_links || { facebook: "", twitter: "", linkedin: "", instagram: "" },
        // Additional
        tags: initialData.tags || [],
        requirements: initialData.requirements || [],
        cancellation_policy: initialData.cancellation_policy || "",
        // Complex fields
        timeline: initialData.timeline || [],
        speakers: initialData.speakers || [],
        sponsors: initialData.sponsors || [],
        guestOfHonor: initialData.guestOfHonor || [],
        related_events: (initialData.related_events || []).map(e => typeof e === 'string' ? e : String(e)),
      };
    }
    return initialEventFormState;
  }, [initialData, mode]);

  const [formData, setFormData] = useState<Partial<CreateEventRequest>>(derivedInitialData);

  // Update location helper
  const updateLocation = (field: keyof EventLocation, value: string) => {
    setFormData({
      ...formData,
      location: { ...formData.location, [field]: value }
    });
  };

  // Update organizer helper
  const updateOrganizer = (field: keyof EventOrganizer, value: string) => {
    setFormData({
      ...formData,
      organizer: { 
        name: formData.organizer?.name || '',
        email: formData.organizer?.email,
        phone: formData.organizer?.phone,
        [field]: value 
      }
    });
  };

  // Update registration fee helper
  const updateRegistrationFee = (field: keyof EventRegistrationFee, value: number | string | boolean) => {
    setFormData({
      ...formData,
      registration_fee: { ...formData.registration_fee, [field]: value } as EventRegistrationFee
    });
  };

  // Update social links helper
  const updateSocialLinks = (field: keyof EventSocialLinks, value: string) => {
    setFormData({
      ...formData,
      social_links: { ...formData.social_links, [field]: value }
    });
  };

  // Update coordinates helper
  const updateCoordinates = (lat: number | undefined, lng: number | undefined) => {
    if (lat !== undefined && lng !== undefined) {
      setFormData({
        ...formData,
        location: { ...formData.location, coordinates: { lat, lng } }
      });
    } else {
      setFormData({
        ...formData,
        location: { ...formData.location, coordinates: undefined }
      });
    }
  };

  // Tags management
  const addTag = () => {
    if (tagsInput.trim() && !formData.tags?.includes(tagsInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagsInput.trim()] });
      setTagsInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tag) });
  };

  // Requirements management
  const addRequirement = () => {
    if (requirementsInput.trim() && !formData.requirements?.includes(requirementsInput.trim())) {
      setFormData({ ...formData, requirements: [...(formData.requirements || []), requirementsInput.trim()] });
      setRequirementsInput("");
    }
  };

  const removeRequirement = (req: string) => {
    setFormData({ ...formData, requirements: formData.requirements?.filter(r => r !== req) });
  };

  // Gallery management
  const addGalleryImage = () => {
    if (galleryInput.trim() && !formData.gallery?.includes(galleryInput.trim())) {
      setFormData({ ...formData, gallery: [...(formData.gallery || []), galleryInput.trim()] });
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (url: string) => {
    setFormData({ ...formData, gallery: formData.gallery?.filter(g => g !== url) });
  };

  // File upload handlers
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // For edit mode with existing event, upload directly
    if (mode === 'edit' && initialData?._id) {
      try {
        setCoverUploading(true);
        const response = await eventsApi.uploadCover(initialData._id, file);
        if (response.success && response.data) {
          setFormData({ ...formData, cover_image: response.data.cover_url });
          toast.success('Cover image uploaded successfully');
        }
      } catch (error) {
        toast.error('Failed to upload cover image');
        console.error(error);
      } finally {
        setCoverUploading(false);
      }
    } else {
      // For create mode, convert to base64 data URL or use local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, cover_image: reader.result as string });
        toast.success('Image selected - will be uploaded when event is created');
      };
      reader.readAsDataURL(file);
    }

    // Reset input
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    
    // Validate all files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`"${file.name}" is not an image file`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 5MB limit`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // For create mode, use local previews
    if (mode === 'create' || !initialData?._id) {
      const newUrls: string[] = [];
      for (const file of validFiles) {
        const url = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newUrls.push(url);
      }
      setFormData({ ...formData, gallery: [...(formData.gallery || []), ...newUrls] });
      toast.success(`${validFiles.length} image(s) selected - will be uploaded when event is created`);
    } else {
      // For edit mode, we would need a gallery upload endpoint
      // For now, convert to data URLs
      setGalleryUploading(true);
      try {
        const newUrls: string[] = [];
        for (const file of validFiles) {
          const url = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          newUrls.push(url);
        }
        setFormData({ ...formData, gallery: [...(formData.gallery || []), ...newUrls] });
        toast.success(`${validFiles.length} image(s) added to gallery`);
      } finally {
        setGalleryUploading(false);
      }
    }

    // Reset input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  // Timeline management
  const addTimelineItem = () => {
    const newItem: EventTimelineItem = { title: "", description: "", time: "" };
    setFormData({ ...formData, timeline: [...(formData.timeline || []), newItem] });
  };

  const updateTimelineItem = (index: number, field: keyof EventTimelineItem, value: string) => {
    const updated = [...(formData.timeline || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, timeline: updated });
  };

  const removeTimelineItem = (index: number) => {
    setFormData({ ...formData, timeline: formData.timeline?.filter((_, i) => i !== index) });
  };

  // Sponsors management
  const addSponsor = () => {
    const newSponsor: EventSponsor = { name: "", logo_url: "", website: "", tier: "silver" };
    setFormData({ ...formData, sponsors: [...(formData.sponsors || []), newSponsor] });
  };

  const updateSponsor = (index: number, field: keyof EventSponsor, value: string) => {
    const updated = [...(formData.sponsors || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, sponsors: updated });
  };

  const removeSponsor = (index: number) => {
    setFormData({ ...formData, sponsors: formData.sponsors?.filter((_, i) => i !== index) });
  };

  // Guest of Honor management
  const addGuestOfHonor = () => {
    const newGuest: EventGuestOfHonor = { name: "", title: "", bio: "", photo_url: "" };
    setFormData({ ...formData, guestOfHonor: [...(formData.guestOfHonor || []), newGuest] });
  };

  const updateGuestOfHonor = (index: number, field: keyof EventGuestOfHonor, value: string) => {
    const updated = [...(formData.guestOfHonor || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, guestOfHonor: updated });
  };

  const removeGuestOfHonor = (index: number) => {
    setFormData({ ...formData, guestOfHonor: formData.guestOfHonor?.filter((_, i) => i !== index) });
  };

  // Speakers management
  const addSpeaker = () => {
    const newSpeaker: EventSpeaker = { name: "", title: "", bio: "", photo_url: "" };
    setFormData({ ...formData, speakers: [...(formData.speakers || []), newSpeaker] });
  };

  const updateSpeaker = (index: number, field: keyof EventSpeaker, value: string) => {
    const updated = [...(formData.speakers || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, speakers: updated });
  };

  const removeSpeaker = (index: number) => {
    setFormData({ ...formData, speakers: formData.speakers?.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean up empty optional fields before submitting
    const cleanedData = { ...formData };
    if (!cleanedData.max_attendees) delete cleanedData.max_attendees;
    // Clean up empty arrays
    if (cleanedData.timeline?.length === 0 || cleanedData.timeline?.every(t => !t.title)) delete cleanedData.timeline;
    if (cleanedData.sponsors?.length === 0 || cleanedData.sponsors?.every(s => !s.name)) delete cleanedData.sponsors;
    if (cleanedData.guestOfHonor?.length === 0 || cleanedData.guestOfHonor?.every(g => !g.name)) delete cleanedData.guestOfHonor;
    if (cleanedData.speakers?.length === 0 || cleanedData.speakers?.every(s => !s.name)) delete cleanedData.speakers;
    if (cleanedData.gallery?.length === 0) delete cleanedData.gallery;
    if (!cleanedData.registration_deadline) delete cleanedData.registration_deadline;
    if (!cleanedData.cover_image) delete cleanedData.cover_image;
    if (!cleanedData.contact_email) delete cleanedData.contact_email;
    if (!cleanedData.cancellation_policy) delete cleanedData.cancellation_policy;
    
    onSubmit(cleanedData as CreateEventRequest);
  };

  return (
    <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
      <DialogHeader>
        <DialogTitle className="text-white text-xl flex items-center gap-2">
          {mode === 'create' ? <Plus className="w-5 h-5 text-blue-400" /> : <Edit className="w-5 h-5 text-blue-400" />}
          {mode === 'create' ? 'Create New Event' : 'Edit Event'}
        </DialogTitle>
        <DialogDescription className="text-slate-400">
          {mode === 'create' ? 'Fill in the details to create a new event' : 'Update the event information'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-shrink-0 overflow-x-auto pb-1">
            <TabsList className="inline-flex w-max min-w-full bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="basic" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <FileText className="w-3 h-3 mr-1" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <MapPin className="w-3 h-3 mr-1" />
                Location
              </TabsTrigger>
              <TabsTrigger value="registration" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <Users className="w-3 h-3 mr-1" />
                Registration
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <ImageIcon className="w-3 h-3 mr-1" />
                Media
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <ListOrdered className="w-3 h-3 mr-1" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="people" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <UserCircle className="w-3 h-3 mr-1" />
                People
              </TabsTrigger>
              <TabsTrigger value="additional" className="data-[state=active]:bg-blue-500/20 text-xs whitespace-nowrap">
                <Settings className="w-3 h-3 mr-1" />
                More
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 mt-0">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-slate-300">Event Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter event name"
                  required
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-slate-300">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your event"
                  required
                  rows={4}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date" className="text-slate-300">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date || ''}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="end_date" className="text-slate-300">End Date *</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date || ''}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              {/* Event type, visibility, currency */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-300">Event Type</Label>
                  <Select 
                    value={formData.event_type} 
                    onValueChange={(value: EventType) => setFormData({ ...formData, event_type: value })}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Visibility</Label>
                  <Select 
                    value={formData.visibility} 
                    onValueChange={(value: EventVisibility) => setFormData({ ...formData, visibility: value })}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {visibilityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            {opt.icon}
                            {opt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Currency</Label>
                  <Select 
                    value={formData.currency || "GHS"} 
                    onValueChange={(value) => setFormData({ ...formData, currency: value as "GHS" | "USD" | "EUR" | "GBP" })}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {currencyOptions.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>{curr.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Venue Name</Label>
                  <Input
                    placeholder="e.g., Convention Center"
                    value={formData.location?.name || ''}
                    onChange={(e) => updateLocation('name', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">City</Label>
                  <Input
                    placeholder="e.g., Accra"
                    value={formData.location?.city || ''}
                    onChange={(e) => updateLocation('city', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Full Address</Label>
                <Input
                  placeholder="Street address"
                  value={formData.location?.address || ''}
                  onChange={(e) => updateLocation('address', e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Country</Label>
                  <Input
                    placeholder="e.g., Ghana"
                    value={formData.location?.country || ''}
                    onChange={(e) => updateLocation('country', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Zip/Postal Code</Label>
                  <Input
                    placeholder="e.g., 00233"
                    value={formData.location?.zipCode || ''}
                    onChange={(e) => updateLocation('zipCode', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Venue Website</Label>
                  <Input
                    type="url"
                    placeholder="https://venue-website.com"
                    value={formData.location?.website || ''}
                    onChange={(e) => updateLocation('website', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Venue Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={formData.location?.phone || ''}
                    onChange={(e) => updateLocation('phone', e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
              </div>

              {/* Coordinates for Google Maps */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-green-400" />
                  Map Coordinates (for Google Maps)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Latitude</Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., 5.6037"
                      value={formData.location?.coordinates?.lat ?? ''}
                      onChange={(e) => {
                        const lat = e.target.value ? parseFloat(e.target.value) : undefined;
                        updateCoordinates(lat, formData.location?.coordinates?.lng);
                      }}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Longitude</Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., -0.1870"
                      value={formData.location?.coordinates?.lng ?? ''}
                      onChange={(e) => {
                        const lng = e.target.value ? parseFloat(e.target.value) : undefined;
                        updateCoordinates(formData.location?.coordinates?.lat, lng);
                      }}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                </div>
                <p className="text-slate-500 text-xs">You can find coordinates from Google Maps by right-clicking on a location</p>
              </div>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="registration" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Max Attendees</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Leave empty for unlimited"
                    value={formData.max_attendees || ''}
                    onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Registration Deadline</Label>
                  <Input
                    type="datetime-local"
                    value={formData.registration_deadline || ''}
                    onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>

              {/* Registration Fee Section */}
              <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    Registration Fee
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label className="text-slate-400 text-sm">Free Event</Label>
                    <Switch
                      checked={formData.registration_fee?.is_free ?? true}
                      onCheckedChange={(checked) => updateRegistrationFee('is_free', checked)}
                    />
                  </div>
                </div>

                {!formData.registration_fee?.is_free && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Fee Amount</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.registration_fee?.amount || ''}
                        onChange={(e) => updateRegistrationFee('amount', parseFloat(e.target.value) || 0)}
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Fee Currency</Label>
                      <Select 
                        value={formData.registration_fee?.currency || "GHS"} 
                        onValueChange={(value) => updateRegistrationFee('currency', value)}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          {currencyOptions.map((curr) => (
                            <SelectItem key={curr.value} value={curr.value}>{curr.value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Organizer Info */}
              <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  Organizer Information
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Organizer Name</Label>
                    <Input
                      placeholder="Organization or person name"
                      value={formData.organizer?.name || ''}
                      onChange={(e) => updateOrganizer('name', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Contact Email</Label>
                    <Input
                      type="email"
                      placeholder="contact@example.com"
                      value={formData.contact_email || ''}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Organizer Email</Label>
                    <Input
                      type="email"
                      placeholder="organizer@example.com"
                      value={formData.organizer?.email || ''}
                      onChange={(e) => updateOrganizer('email', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Organizer Phone</Label>
                    <Input
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      value={formData.organizer?.phone || ''}
                      onChange={(e) => updateOrganizer('phone', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Media & Theme Tab */}
            <TabsContent value="media" className="space-y-4 mt-0">
              {/* Cover Image */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Label className="text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  Cover Image
                </Label>
                
                {/* Upload Button */}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={coverInputRef}
                    onChange={handleCoverUpload}
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload cover image"
                  />
                  <Button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    variant="outline"
                    disabled={coverUploading}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 flex-1"
                  >
                    {coverUploading ? (
                      <>
                        <InlineSpinner className="w-4 h-4 mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  {formData.cover_image && (
                    <Button
                      type="button"
                      onClick={() => setFormData({ ...formData, cover_image: '' })}
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {/* URL Input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">OR enter URL:</span>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.cover_image?.startsWith('data:') ? '' : formData.cover_image || ''}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pl-24"
                  />
                </div>
                <p className="text-slate-500 text-xs">Recommended size: 1200x630 pixels. Max file size: 5MB</p>

                {/* Preview */}
                {formData.cover_image && (
                  <div className="relative h-40 rounded-lg overflow-hidden border border-slate-700 group">
                    <img 
                      src={formData.cover_image} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="10">Invalid Image</text></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs truncate">{formData.cover_image.startsWith('data:') ? 'Local file (pending upload)' : formData.cover_image}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-slate-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  Color Theme
                </Label>
                <div className="flex gap-3 mt-1">
                  <Input
                    type="color"
                    value={formData.color_theme || '#3b82f6'}
                    onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
                    className="w-14 h-10 p-1 bg-slate-800/50 border-slate-700 cursor-pointer"
                  />
                  <Input
                    type="text"
                    placeholder="#3b82f6"
                    value={formData.color_theme || ''}
                    onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 flex-1"
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">This color will be used as the event&apos;s theme accent</p>
              </div>

              {/* Color Preview */}
              <div 
                className="h-16 rounded-lg flex items-center justify-center text-white font-medium"
                style={{ background: `linear-gradient(135deg, ${formData.color_theme || '#3b82f6'}40, ${formData.color_theme || '#3b82f6'}80)` }}
              >
                Theme Color Preview
              </div>

              {/* Social Links */}
              <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-green-400" />
                  Social Media Links
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Facebook</Label>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={formData.social_links?.facebook || ''}
                      onChange={(e) => updateSocialLinks('facebook', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Twitter/X</Label>
                    <Input
                      type="url"
                      placeholder="https://twitter.com/..."
                      value={formData.social_links?.twitter || ''}
                      onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">LinkedIn</Label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/..."
                      value={formData.social_links?.linkedin || ''}
                      onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Instagram</Label>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/..."
                      value={formData.social_links?.instagram || ''}
                      onChange={(e) => updateSocialLinks('instagram', e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Images className="w-4 h-4 text-amber-400" />
                    Gallery Images
                    {formData.gallery && formData.gallery.length > 0 && (
                      <Badge variant="outline" className="ml-2 bg-amber-500/10 border-amber-500/30 text-amber-400">
                        {formData.gallery.length} images
                      </Badge>
                    )}
                  </Label>
                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={handleGalleryUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                    aria-label="Upload gallery images"
                  />
                  <Button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                    disabled={galleryUploading}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    {galleryUploading ? (
                      <>
                        <InlineSpinner className="w-4 h-4 mr-1" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
                
                {/* URL Input */}
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Or paste image URL..."
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button type="button" onClick={addGalleryImage} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-slate-500 text-xs">Upload multiple images or add URLs. Max 5MB per image.</p>
                
                {formData.gallery && formData.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData.gallery.map((url, idx) => (
                      <div key={idx} className="relative group h-24 rounded-lg overflow-hidden border border-slate-700">
                        <img 
                          src={url} 
                          alt={`Gallery ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="12">Error</text></svg>';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button" 
                            onClick={() => removeGalleryImage(url)} 
                            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <XCircle className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        {url.startsWith('data:') && (
                          <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-500/80 rounded text-[10px] text-white">
                            Pending
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-blue-400" />
                  Event Timeline / Schedule
                </Label>
                <Button type="button" onClick={addTimelineItem} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <p className="text-slate-500 text-sm">Create a schedule of activities for your event</p>

              {formData.timeline && formData.timeline.length > 0 ? (
                <div className="space-y-4">
                  {formData.timeline.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm font-medium">Schedule Item {idx + 1}</span>
                        <button 
                          type="button" 
                          onClick={() => removeTimelineItem(idx)} 
                          className="text-red-400 hover:text-red-300"
                          title="Remove timeline item"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-slate-400 text-sm">Title *</Label>
                          <Input
                            placeholder="e.g., Opening Ceremony"
                            value={item.title || ''}
                            onChange={(e) => updateTimelineItem(idx, 'title', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-sm">Time *</Label>
                          <Input
                            type="datetime-local"
                            value={item.time || ''}
                            onChange={(e) => updateTimelineItem(idx, 'time', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-400 text-sm">Description</Label>
                        <Textarea
                          placeholder="Brief description of this activity..."
                          value={item.description || ''}
                          onChange={(e) => updateTimelineItem(idx, 'description', e.target.value)}
                          rows={2}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No timeline items yet</p>
                  <p className="text-sm">Add schedule items to show event activities</p>
                </div>
              )}
            </TabsContent>

            {/* People Tab - Guests of Honor, Sponsors, Speakers */}
            <TabsContent value="people" className="space-y-6 mt-0">
              {/* Guest of Honor Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Guests of Honor
                  </Label>
                  <Button type="button" onClick={addGuestOfHonor} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Guest
                  </Button>
                </div>
                
                {formData.guestOfHonor && formData.guestOfHonor.length > 0 ? (
                  <div className="space-y-3">
                    {formData.guestOfHonor.map((guest, idx) => (
                      <div key={idx} className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-xs font-medium">Guest {idx + 1}</span>
                          <button type="button" onClick={() => removeGuestOfHonor(idx)} className="text-red-400 hover:text-red-300" title="Remove guest">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Name *"
                            value={guest.name || ''}
                            onChange={(e) => updateGuestOfHonor(idx, 'name', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                          <Input
                            placeholder="Title (e.g., CEO, Minister)"
                            value={guest.title || ''}
                            onChange={(e) => updateGuestOfHonor(idx, 'title', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                        </div>
                        <Input
                          placeholder="Photo URL"
                          value={guest.photo_url || ''}
                          onChange={(e) => updateGuestOfHonor(idx, 'photo_url', e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                        />
                        <Textarea
                          placeholder="Brief bio..."
                          value={guest.bio || ''}
                          onChange={(e) => updateGuestOfHonor(idx, 'bio', e.target.value)}
                          rows={2}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm p-3 bg-slate-800/30 rounded-lg">No guests of honor added</p>
                )}
              </div>

              {/* Speakers Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-purple-400" />
                    Speakers
                  </Label>
                  <Button type="button" onClick={addSpeaker} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Speaker
                  </Button>
                </div>
                
                {formData.speakers && formData.speakers.length > 0 ? (
                  <div className="space-y-3">
                    {formData.speakers.map((speaker, idx) => (
                      <div key={idx} className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 text-xs font-medium">Speaker {idx + 1}</span>
                          <button type="button" onClick={() => removeSpeaker(idx)} className="text-red-400 hover:text-red-300" title="Remove speaker">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Name *"
                            value={speaker.name || ''}
                            onChange={(e) => updateSpeaker(idx, 'name', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                          <Input
                            placeholder="Title (e.g., Keynote Speaker)"
                            value={speaker.title || ''}
                            onChange={(e) => updateSpeaker(idx, 'title', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                        </div>
                        <Input
                          placeholder="Photo URL"
                          value={speaker.photo_url || ''}
                          onChange={(e) => updateSpeaker(idx, 'photo_url', e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                        />
                        <Textarea
                          placeholder="Brief bio..."
                          value={speaker.bio || ''}
                          onChange={(e) => updateSpeaker(idx, 'bio', e.target.value)}
                          rows={2}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm p-3 bg-slate-800/30 rounded-lg">No speakers added</p>
                )}
              </div>

              {/* Sponsors Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Handshake className="w-4 h-4 text-green-400" />
                    Sponsors
                  </Label>
                  <Button type="button" onClick={addSponsor} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Sponsor
                  </Button>
                </div>
                
                {formData.sponsors && formData.sponsors.length > 0 ? (
                  <div className="space-y-3">
                    {formData.sponsors.map((sponsor, idx) => (
                      <div key={idx} className="p-3 bg-green-500/5 rounded-lg border border-green-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 text-xs font-medium">Sponsor {idx + 1}</span>
                          <button type="button" onClick={() => removeSponsor(idx)} className="text-red-400 hover:text-red-300" title="Remove sponsor">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Company Name *"
                            value={sponsor.name || ''}
                            onChange={(e) => updateSponsor(idx, 'name', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                          <Select 
                            value={sponsor.tier || 'silver'} 
                            onValueChange={(value) => updateSponsor(idx, 'tier', value)}
                          >
                            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white text-sm">
                              <SelectValue placeholder="Tier" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700">
                              <SelectItem value="platinum">Platinum</SelectItem>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="silver">Silver</SelectItem>
                              <SelectItem value="bronze">Bronze</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Logo URL"
                            value={sponsor.logo_url || ''}
                            onChange={(e) => updateSponsor(idx, 'logo_url', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                          <Input
                            placeholder="Website URL"
                            value={sponsor.website || ''}
                            onChange={(e) => updateSponsor(idx, 'website', e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm p-3 bg-slate-800/30 rounded-lg">No sponsors added</p>
                )}
              </div>
            </TabsContent>

            {/* Additional Settings Tab */}
            <TabsContent value="additional" className="space-y-4 mt-0">
              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-slate-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  Event Tags
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., music, tech, awards)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button type="button" onClick={addTag} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, idx) => (
                      <Badge key={idx} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-white" title={`Remove tag: ${tag}`}>
                          <XCircle className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <Label className="text-slate-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Event Requirements
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a requirement (e.g., ID required, Age 18+)"
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button type="button" onClick={addRequirement} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.requirements && formData.requirements.length > 0 && (
                  <div className="space-y-2">
                    {formData.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <span className="text-slate-300 text-sm">{req}</span>
                        <button type="button" onClick={() => removeRequirement(req)} className="text-red-400 hover:text-red-300" title={`Remove requirement: ${req}`}>
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div>
                <Label className="text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Cancellation Policy
                </Label>
                <Textarea
                  placeholder="Describe your event's cancellation and refund policy..."
                  value={formData.cancellation_policy || ''}
                  onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })}
                  rows={4}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Actions */}
        <DialogFooter className="pt-4 border-t border-slate-700 flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose} className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            {isLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : null}
            {mode === 'create' ? 'Create Event' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

// Event Form Dialog wrapper with key-based reset
function EventFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventRequest | UpdateEventRequest) => void;
  initialData?: Event | null;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}) {
  // Use a key based on the dialog state and initial data to reset form on open
  const dialogKey = isOpen ? `${mode}-${initialData?._id || 'new'}` : 'closed';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <EventFormDialogContent
        key={dialogKey}
        onClose={onClose}
        onSubmit={onSubmit}
        initialData={initialData}
        isLoading={isLoading}
        mode={mode}
      />
    </Dialog>
  );
}

// Cancel Event Dialog
function CancelEventDialog({
  isOpen,
  onClose,
  onConfirm,
  eventName,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  eventName: string;
  isLoading?: boolean;
}) {
  const [reason, setReason] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Cancel Event
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Are you sure you want to cancel &ldquo;{eventName}&rdquo;? This will notify all participants.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Label htmlFor="reason" className="text-slate-300">Cancellation Reason</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for cancellation..."
            rows={3}
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 mt-1"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Keep Event
          </Button>
          <Button 
            onClick={() => onConfirm(reason)}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isLoading ? <InlineSpinner className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
            Cancel Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper to extract error message from unknown error type
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'An unexpected error occurred';
}

export default function AdminEventsTab() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [publishedFilter, setPublishedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  // Selected event for dialogs
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventStats, setSelectedEventStats] = useState<EventStatsResponse | null>(null);

  // Stats summary
  const [statsSummary, setStatsSummary] = useState({
    total: 0,
    active: 0,
    upcoming: 0,
    archived: 0,
    published: 0,
  });

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const filters: EventFilters = {
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? (statusFilter as EventStatus) : undefined,
        is_published: publishedFilter !== "all" ? publishedFilter === "published" : undefined,
      };

      const response = await eventsApi.list(filters);

      if (response.success && response.data) {
        setEvents(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalItems(response.pagination?.totalItems || response.data.length);

        // Calculate stats from response
        const allEvents = response.data;
        setStatsSummary({
          total: response.pagination?.totalItems || allEvents.length,
          active: allEvents.filter((e) => e.status === "active").length,
          upcoming: allEvents.filter((e) => e.status === "upcoming").length,
          archived: allEvents.filter((e) => e.status === "archived").length,
          published: allEvents.filter((e) => e.is_published).length,
        });
      } else {
        setEvents([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery, publishedFilter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // API action handlers
  const handleCreateEvent = async (data: CreateEventRequest | UpdateEventRequest) => {
    try {
      setActionLoading('create');
      const response = await eventsApi.create(data as CreateEventRequest);
      if (response.success) {
        toast.success("Event created successfully");
        setCreateDialogOpen(false);
        fetchEvents();
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to create event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateEvent = async (data: CreateEventRequest | UpdateEventRequest) => {
    if (!selectedEvent) return;
    try {
      setActionLoading('update');
      const response = await eventsApi.update(selectedEvent._id, data as UpdateEventRequest);
      if (response.success) {
        toast.success("Event updated successfully");
        setEditDialogOpen(false);
        setSelectedEvent(null);
        fetchEvents();
      }
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      setActionLoading(selectedEvent._id);
      await eventsApi.delete(selectedEvent._id);
      toast.success("Event deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to delete event");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePublish = async (eventId: string) => {
    try {
      setActionLoading(eventId);
      await eventsApi.publish(eventId);
      toast.success("Event published successfully");
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to publish event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnpublish = async (eventId: string) => {
    try {
      setActionLoading(eventId);
      await eventsApi.unpublish(eventId);
      toast.success("Event unpublished");
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to unpublish event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeatured = async (eventId: string) => {
    try {
      setActionLoading(eventId);
      await eventsApi.toggleFeatured(eventId);
      toast.success("Featured status updated");
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update featured status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (eventId: string, status: EventStatus) => {
    try {
      setActionLoading(eventId);
      await eventsApi.updateStatus(eventId, status);
      toast.success(`Event status updated to ${status}`);
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelEvent = async (reason: string) => {
    if (!selectedEvent) return;
    try {
      setActionLoading(selectedEvent._id);
      await eventsApi.cancel(selectedEvent._id, reason);
      toast.success("Event cancelled");
      setCancelDialogOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to cancel event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicate = async (eventId: string) => {
    try {
      setActionLoading(eventId);
      await eventsApi.duplicate(eventId);
      toast.success("Event duplicated successfully");
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to duplicate event");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = async (event: Event) => {
    setSelectedEvent(event);
    setDetailsDialogOpen(true);
    
    // Fetch stats
    try {
      const statsResponse = await eventsApi.getStats(event._id);
      if (statsResponse.success) {
        setSelectedEventStats(statsResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch event stats:", error);
    }
  };

  const handlePublishResults = async () => {
    if (!selectedEvent) return;
    try {
      setActionLoading('results');
      await eventsApi.publishResults(selectedEvent._id);
      toast.success("Results published successfully");
      fetchEvents();
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to publish results");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Management</h1>
          <p className="text-slate-400 text-sm mt-1">Create and manage voting events</p>
        </div>
        <Button 
          onClick={() => setCreateDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Events", value: statsSummary.total, icon: Calendar, color: "blue" },
          { label: "Active", value: statsSummary.active, icon: Play, color: "green" },
          { label: "Upcoming", value: statsSummary.upcoming, icon: Clock, color: "purple" },
          { label: "Archived", value: statsSummary.archived, icon: Archive, color: "slate" },
          { label: "Published", value: statsSummary.published, icon: CheckCircle, color: "emerald" },
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
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search events..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Published filter */}
              <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue placeholder="Published" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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
              <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchEvents} 
                disabled={loading}
                className="bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
                <Skeleton className="w-3/4 h-5 bg-slate-800" />
                <Skeleton className="w-full h-4 bg-slate-800" />
                <Skeleton className="w-full h-4 bg-slate-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your filters to find events" 
                : "Create your first event to get started"}
            </p>
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Create Event
            </Button>
          </CardContent>
        </Card>
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
              onView={() => handleViewDetails(event)}
              onEdit={() => {
                setSelectedEvent(event);
                setEditDialogOpen(true);
              }}
              onDelete={() => {
                setSelectedEvent(event);
                setDeleteDialogOpen(true);
              }}
              onPublish={() => handlePublish(event._id)}
              onUnpublish={() => handleUnpublish(event._id)}
              onToggleFeatured={() => handleToggleFeatured(event._id)}
              onDuplicate={() => handleDuplicate(event._id)}
              onUpdateStatus={(status) => handleUpdateStatus(event._id, status)}
              onCancel={() => {
                setSelectedEvent(event);
                setCancelDialogOpen(true);
              }}
              isLoading={actionLoading === event._id}
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
          <span className="text-slate-400 text-sm px-4">
            Page {currentPage} of {totalPages} ({totalItems} events)
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

      {/* Dialogs */}
      <EventFormDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateEvent}
        isLoading={actionLoading === 'create'}
        mode="create"
      />

      <EventFormDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedEvent(null);
        }}
        onSubmit={handleUpdateEvent}
        initialData={selectedEvent}
        isLoading={actionLoading === 'update'}
        mode="edit"
      />

      <EventDetailsDialog
        event={selectedEvent}
        stats={selectedEventStats}
        isOpen={detailsDialogOpen}
        onClose={() => {
          setDetailsDialogOpen(false);
          setSelectedEvent(null);
          setSelectedEventStats(null);
        }}
        onPublishResults={handlePublishResults}
        isLoading={actionLoading === 'results'}
      />

      <CancelEventDialog
        isOpen={cancelDialogOpen}
        onClose={() => {
          setCancelDialogOpen(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleCancelEvent}
        eventName={selectedEvent?.name || ''}
        isLoading={actionLoading === selectedEvent?._id}
      />

      {/* Delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Event</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete &ldquo;{selectedEvent?.name}&rdquo;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading === selectedEvent?._id ? (
                <InlineSpinner className="w-4 h-4 mr-2" />
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
