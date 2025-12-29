// ==================
// Vote Code Types
// ==================

export interface VoteCode {
  _id: ObjectId;
  code: string;
  event: ObjectId;
  payment: ObjectId;
  is_used: boolean;
  votes_purchased: number;
  votes_cast: number;
  votes_remaining: number;
  created_at: string;
  updated_at: string;
}
// ==================
// Common Types
// ==================

export type ObjectId = string;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

// ==================
// User Types
// ==================

export type UserRole = 'super_admin' | 'admin' | 'organiser' | 'moderator';
export type UserPermission = 'read' | 'write' | 'update' | 'delete' | 'super';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  role: UserRole;
  permissions: UserPermission[];
  email_verified: boolean;
  email_verified_at?: string | null;
  last_login?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: Exclude<UserRole, 'super_admin'>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  photo_url?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  bio?: string;
  status?: Exclude<UserStatus, 'deleted'>;
}

export interface UpdateUserRoleRequest {
  role: Exclude<UserRole, 'super_admin'>;
}

export interface UpdateUserPermissionsRequest {
  permissions: Exclude<UserPermission, 'super'>[];
}

export interface BulkUpdateUserStatusRequest {
  userIds: ObjectId[];
  status: Exclude<UserStatus, 'deleted'>;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<UserStatus, number>;
}

// ==================
// Candidate Auth Types
// ==================

export interface CandidateLoginRequest {
  identifier: string;
  password: string;
}

// ==================
// Event Types
// ==================

export type EventType = 'conference' | 'workshop' | 'seminar' | 'networking' | 'webinar' | 'hybrid' | 'other';
export type EventVisibility = 'public' | 'private' | 'unlisted';
export type EventStatus = 'active' | 'upcoming' | 'archived' | 'cancelled' | 'deleted' | 'pending';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'GHS' | 'NGN' | 'ZAR' | 'INR' | 'JPY' | 'CNY';

export interface EventLocation {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  website?: string;
  phone?: string;
  venueInfo?: string[];
  directions?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventTimelineItem {
  title: string;
  description?: string;
  time: string;
}

export interface EventOrganizer {
  name: string;
  email?: string;
  phone?: string;
}

export interface EventRegistrationFee {
  amount: number;
  currency: string;
  is_free: boolean;
}

export interface EventSocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export interface EventSpeaker {
  name: string;
  title?: string;
  bio?: string;
  photo_url?: string;
}

export interface EventSponsor {
  name: string;
  logo_url?: string;
  website?: string;
  tier?: string;
}

export interface EventGuestOfHonor {
  name: string;
  title?: string;
  bio?: string;
  photo_url?: string;
}

export interface Event {
  _id: ObjectId;
  name: string;
  description: string;
  slug: string;
  location?: EventLocation;
  start_date: string;
  end_date: string;
  event_type: EventType;
  visibility: EventVisibility;
  status: EventStatus;
  is_published: boolean;
  is_featured: boolean;
  logo_url?: string | null;
  banner_url?: string | null;
  cover_image?: string | null;
  gallery?: string[];
  speakers?: EventSpeaker[];
  sponsors?: EventSponsor[];
  guestOfHonor?: EventGuestOfHonor[];
  timeline?: EventTimelineItem[];
  related_events?: ObjectId[];
  categories?: ObjectId[];
  registration_form?: ObjectId;
  max_attendees?: number;
  current_attendees?: number;
  registration_deadline?: string;
  registration_fee?: EventRegistrationFee;
  tags?: string[];
  organizer?: EventOrganizer;
  contact_email?: string;
  social_links?: EventSocialLinks;
  requirements?: string[];
  cancellation_policy?: string;
  created_by?: ObjectId;
  updated_by?: ObjectId;
  currency: Currency;
  total_votes: number;
  color_theme?: string | null;
  created_at: string;
  updated_at: string;
  
  // Virtuals from backend
  isRegistrationOpen?: boolean;
  isFull?: boolean;
  duration?: number;
  durationInHours?: number;
  spotsRemaining?: number | null;
  isUpcoming?: boolean;
  isActive?: boolean;
  hasEnded?: boolean;
  daysUntilStart?: number;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  location: EventLocation;
  start_date: string;
  end_date: string;
  event_type?: EventType;
  visibility?: EventVisibility;
  currency?: Currency;
}

export interface UpdateEventRequest {
  name?: string;
  description?: string;
  location?: EventLocation;
  start_date?: string;
  end_date?: string;
  event_type?: EventType;
  visibility?: EventVisibility;
  logo_url?: string;
  banner_url?: string;
}

export interface UpdateEventStatusRequest {
  status: Exclude<EventStatus, 'deleted'>;
}

export interface EventStats {
  totalCategories: number;
  totalCandidates: number;
  totalVotes: number;
}

// ==================
// Category Types
// ==================

export type CategoryStatus = 'active' | 'inactive' | 'deleted' | 'archived' | 'closed';
export type ResultsVisibility = 'public' | 'authenticated' | 'admin_only';

export interface Category {
  _id: ObjectId;
  name: string;
  description?: string;
  icon?: string | null;
  slug: string;
  candidates: ObjectId[] | Candidate[];
  status: CategoryStatus;
  event: ObjectId | Event;
  is_voting_open: boolean;
  voting_start_date?: string | null;
  voting_deadline?: string | null;
  total_votes: number;
  min_candidates: number;
  max_candidates?: number | null;
  display_order: number;
  is_featured: boolean;
  voting_rules?: string | null;
  allow_write_in: boolean;
  require_authentication: boolean;
  results_visibility: ResultsVisibility;
  show_results_before_deadline: boolean;
  color_theme?: string | null;
  image?: string | null;
  nomination_form?: ObjectId | null;
  created_by?: ObjectId;
  updated_by?: ObjectId | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  
  // Virtuals from backend
  isDeleted?: boolean;
  isVotingActive?: boolean;
  hasVotingEnded?: boolean;
  isVotingUpcoming?: boolean;
  daysUntilVotingStarts?: number;
  daysUntilDeadline?: number;
  hoursUntilDeadline?: number;
  votingDurationInDays?: number;
  candidateCount?: number;
  hasMinimumCandidates?: boolean;
  isAtMaxCandidates?: boolean;
  remainingCandidateSlots?: number | null;
  canViewResults?: boolean;
  averageVotesPerCandidate?: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  icon?: string;
  event: ObjectId;
  voting_start_date?: string;
  voting_deadline?: string;
  min_candidates?: number;
  max_candidates?: number;
  voting_rules?: string;
  allow_write_in?: boolean;
  require_authentication?: boolean;
  results_visibility?: ResultsVisibility;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  icon?: string;
  voting_start_date?: string;
  voting_deadline?: string;
  min_candidates?: number;
  max_candidates?: number;
  voting_rules?: string;
  allow_write_in?: boolean;
  require_authentication?: boolean;
  results_visibility?: ResultsVisibility;
}

export interface ReorderCategoriesRequest {
  categories: Array<{
    id: ObjectId;
    display_order: number;
  }>;
}

export interface CategoryCandidatesRequest {
  candidates: ObjectId[];
}

export interface UpdateVotingDeadlineRequest {
  deadline: string;
}

export interface ExtendVotingDeadlineRequest {
  extension_hours: number;
}

export interface CategoryStats {
  totalCandidates: number;
  totalVotes: number;
  isVotingOpen: boolean;
}

export interface CategoryVoteCount {
  candidate: ObjectId;
  candidateName: string;
  voteCount: number;
}

// ==================
// Candidate Types
// ==================

export type CandidateStatus = 'pending' | 'approved' | 'rejected' | 'profile_update_pending' | 'pending_profile_completion';

export interface CandidateProject {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  date?: string;
}

export interface CandidateEducation {
  institution?: string;
  qualification?: string;
  field?: string;
  start_date?: string;
  end_date?: string;
}

export interface CandidateExperience {
  company: string;
  position: string;
  start_date?: string;
  end_date?: string;
  current?: boolean;
  description?: string;
}

export interface CandidateAchievement {
  title: string;
  description?: string;
  date?: string;
  organization?: string;
}

export interface CandidateEndorsement {
  name: string;
  position?: string;
  message?: string;
  image?: string;
}

export interface CandidateSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  tiktok?: string;
  github?: string;
  portfolio?: string;
}

export interface Candidate {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  candidate_code: string;
  phone_number?: string;
  slug: string;
  bio?: string;
  profile_image?: string | null;
  cover_image?: string | null;
  gallery?: string[];
  video_url?: string;
  projects?: CandidateProject[];
  skills?: string[];
  education?: CandidateEducation[];
  experience?: CandidateExperience[];
  achievements?: CandidateAchievement[];
  social_links?: CandidateSocialLinks;
  status: CandidateStatus;
  event: ObjectId;
  categories: ObjectId[];
  admin_verified_categories?: ObjectId[];
  vote_count: number;
  view_count?: number;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  why_nominate_me?: string;
  impact_statement?: string;
  endorsements?: CandidateEndorsement[];
  tags?: string[];
  nomination_date?: string;
  approval_date?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCandidateRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  bio?: string;
  profile_image?: string;
  event: ObjectId;
  categories?: ObjectId[];
}

export interface UpdateCandidateRequest {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  bio?: string;
  why_nominate_me?: string;
  profile_image?: string;
  cover_image?: string;
  gallery?: string[];
  video_url?: string;
  projects?: CandidateProject[];
  skills?: string[];
  education?: CandidateEducation[];
  experience?: CandidateExperience[];
  achievements?: CandidateAchievement[];
  social_links?: CandidateSocialLinks;
}

export interface CandidateProfileUpdateRequest {
  bio?: string;
  phone_number?: string;
  profile_image?: string;
  cover_image?: string;
  gallery?: string[];
  video_url?: string;
  projects?: CandidateProject[];
  skills?: string[];
  education?: CandidateEducation[];
  social_links?: CandidateSocialLinks;
}

export interface BulkCandidateRequest {
  candidateIds: ObjectId[];
  reason?: string;
}

export interface CandidateCategoriesRequest {
  categories: ObjectId[];
}

export interface CandidateStats {
  totalVotes: number;
  totalCategories: number;
  viewCount: number;
}

// ==================
// Vote Types
// ==================

export type VoteStatus = 'active' | 'refunded';

export interface Vote {
  _id: ObjectId;
  candidate: ObjectId;
  category: ObjectId;
  event: ObjectId;
  payment: ObjectId;
  vote_code: string;
  status: VoteStatus;
  ip_hash?: string;
  user_agent?: string;
  cast_at: string;
  refunded_at?: string | null;
  refund_reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CastVoteRequest {
  vote_code: string;
  candidate: ObjectId;
  category: ObjectId;
}

export interface VoteEligibilityRequest {
  vote_code: string;
  category: ObjectId;
}

export interface VoteEligibilityResponse {
  eligible: boolean;
  reason?: string;
  votes_remaining: number;
}

export interface VoteCountResponse {
  count: number;
}

export interface RefundVoteRequest {
  reason?: string;
}

// ==================
// Bundle Types
// ==================

export type BundleStatus = 'active' | 'inactive' | 'archived';

export interface Bundle {
  _id: ObjectId;
  name: string;
  description?: string;
  slug: string;
  vote_count: number;
  price: number;
  currency: string;
  discount_percentage?: number;
  original_price?: number;
  is_featured: boolean;
  is_popular: boolean;
  display_order: number;
  status: BundleStatus;
  valid_from?: string;
  valid_until?: string;
  created_at: string;
  updated_at: string;
  // Populated fields & Virtuals
  event: ObjectId | Event; 
  categories: ObjectId[] | Category[];
  
  // Virtuals from backend response
  isDeleted?: boolean;
  isValid?: boolean;
  isAvailable?: boolean;
  pricePerVote?: number;
  savingsAmount?: number;
  isRestricted?: boolean;
  daysUntilExpiry?: number;
  averageRevenuePerPurchase?: number;
}

export interface CreateBundleRequest {
  name: string;
  description?: string;
  event: ObjectId;
  categories?: ObjectId[];
  vote_count: number;
  price: number;
  currency?: string;
  discount_percentage?: number;
  is_featured?: boolean;
  valid_from?: string;
  valid_until?: string;
}

export interface UpdateBundleRequest {
  name?: string;
  description?: string;
  categories?: ObjectId[];
  vote_count?: number;
  price?: number;
  discount_percentage?: number;
  is_featured?: boolean;
  valid_from?: string;
  valid_until?: string;
}

export interface BundleValidationResponse {
  available: boolean;
  reason?: string;
}

// ==================
// Payment Types
// ==================

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer' | 'ussd' | 'mobile_money' | 'qr';

export interface Payment {
  _id: ObjectId;
  transaction_reference: string;
  paystack_reference?: string;
  bundle: ObjectId;
  event: ObjectId;
  coupon?: ObjectId;
  vote_code: string;
  votes_purchased: number;
  votes_cast: number;
  votes_remaining: number;
  amount_paid: number;
  original_amount?: number;
  discount_amount?: number;
  currency: string;
  voter_email: string;
  voter_phone?: string;
  voter_name?: string;
  status: PaymentStatus;
  payment_method?: PaymentMethod;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface InitializePaymentRequest {
  bundle: ObjectId;
  quantity?: number;
  voter_email: string;
  voter_name?: string;
  voter_phone?: string;
  candidate?: ObjectId;
  coupon_code?: string;
  callback_url?: string;
}

export interface InitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface ValidateVoteCodeRequest {
  vote_code: string;
}

export interface VoteCodeStatusResponse {
  votes_remaining: number;
  votes_cast: number;
  votes_purchased: number;
}

export interface ValidateVoteCodeResponse {
  valid: boolean;
  votes_remaining?: number;
}

export interface PaymentStats {
  totalRevenue: number;
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
}

export interface RevenueByBundle {
  bundle: string;
  revenue: number;
  count: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface RefundPaymentRequest {
  reason?: string;
}

// ==================
// Form Types
// ==================

export type FormType = 'nomination' | 'registration' | 'survey' | 'feedback';
export type FormStatus = 'draft' | 'active' | 'closed' | 'archived';
export type FieldType = 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'select' | 'multi_select' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime' | 'file' | 'image' | 'url' | 'rating' | 'slider' | 'color' | 'location';
export type ConditionalOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'in' | 'not_in' | 'exists';
export type DuplicateDetectionMethod = 'exact_match' | 'fuzzy_match' | 'field_similarity' | 'email_match' | 'phone_match';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  required?: boolean;
  min_length?: number;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  pattern?: string;
  custom_message?: string;
}

export interface FieldConditional {
  show_if?: {
    field_id: string;
    operator: ConditionalOperator;
    value: unknown;
  };
}

export interface FormField {
  field_id: string;
  label: string;
  field_type: FieldType;
  placeholder?: string;
  help_text?: string;
  default_value?: unknown;
  options?: FieldOption[];
  validation?: FieldValidation;
  conditional?: FieldConditional;
  order?: number;
}

export interface DuplicateDetection {
  enabled?: boolean;
  method?: DuplicateDetectionMethod;
  threshold?: number;
  fields?: string[];
}

export interface FormSettings {
  allow_anonymous?: boolean;
  require_email_verification?: boolean;
  submissions_per_user?: number;
  submissions_per_ip?: number;
  opens_at?: string;
  closes_at?: string;
  confirmation_message?: string;
  redirect_url?: string;
  duplicate_detection?: DuplicateDetection;
}

export interface Form {
  _id: ObjectId;
  name: string;
  description?: string;
  slug: string;
  form_type: FormType;
  event: ObjectId;
  categories?: ObjectId[];
  fields: FormField[];
  settings?: FormSettings;
  status: FormStatus;
  submission_count: number;
  candidate_field_mapping?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateFormRequest {
  name: string;
  description?: string;
  form_type: FormType;
  event: ObjectId;
  categories?: ObjectId[];
  fields: FormField[];
  settings?: FormSettings;
}

export interface UpdateFormRequest {
  name?: string;
  description?: string;
  categories?: ObjectId[];
  fields?: FormField[];
  settings?: FormSettings;
}

export interface FieldMappingRequest {
  name?: string;
  code?: string;
  bio?: string;
  photo?: string;
  custom_fields?: Record<string, string>;
}

// ==================
// Submission Types
// ==================

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'duplicate' | 'under_review';

export interface SubmittedBy {
  user_id?: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
}

export interface MatchedSubmission {
  submission_id: ObjectId;
  similarity: number;
  matched_fields: string[];
}

export interface DuplicateCheck {
  is_duplicate: boolean;
  similarity_score?: number;
  matched_submissions?: MatchedSubmission[];
  checked_at?: string;
}

export interface SubmissionApproval {
  reviewed_by?: ObjectId;
  reviewed_at?: string;
  review_notes?: string;
  rejection_reason?: string;
}

export interface SubmissionAttachment {
  field_id: string;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
  uploaded_at: string;
}

export interface Submission {
  _id: ObjectId;
  form: ObjectId | Form;
  event: ObjectId;
  categories?: ObjectId[];
  submission_data: Record<string, unknown>;
  normalized_data?: Record<string, string>;
  status: SubmissionStatus;
  submitted_by?: SubmittedBy;
  ip_hash?: string;
  user_agent?: string;
  session_id?: string;
  duplicate_check?: DuplicateCheck;
  nominee_identifier?: string;
  approval?: SubmissionApproval;
  candidate?: ObjectId;
  attachments?: SubmissionAttachment[];
  submission_number?: string;
  confirmation_sent?: boolean;
  confirmation_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSubmissionRequest {
  form: ObjectId;
  categories?: ObjectId[];
  submission_data: Record<string, unknown>;
  submitted_by?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface UpdateSubmissionRequest {
  submission_data?: Record<string, unknown>;
  categories?: ObjectId[];
  status?: 'pending' | 'under_review';
}

export interface ApproveSubmissionRequest {
  review_notes?: string;
  create_candidate?: boolean;
  candidate_data?: {
    name?: string;
    code?: string;
    category?: ObjectId;
  };
}

export interface RejectSubmissionRequest {
  rejection_reason: string;
  review_notes?: string;
  send_notification?: boolean;
}

export interface ResolveDuplicateRequest {
  resolution: 'keep' | 'merge' | 'reject';
  merge_with?: ObjectId;
  notes?: string;
}

// ==================
// Coupon Types
// ==================

export type CouponStatus = 'active' | 'inactive' | 'expired';
export type DiscountType = 'percentage' | 'fixed';

export interface Coupon {
  _id: ObjectId;
  code: string;
  description?: string;
  event: ObjectId;
  applicable_bundles?: ObjectId[];
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount?: number;
  min_purchase_amount: number;
  status: CouponStatus;
  max_total_uses?: number;
  max_uses_per_user: number;
  current_redemptions: number;
  validity_start?: string;
  validity_end?: string;
  is_public: boolean;
  terms_and_conditions?: string;
  metadata?: Record<string, string>;
  created_by?: ObjectId;
  updated_by?: ObjectId;
  created_at: string;
  updated_at: string;
}

export interface CreateCouponRequest {
  code: string;
  description?: string;
  event: ObjectId;
  applicable_bundles?: ObjectId[];
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount?: number;
  min_purchase_amount?: number;
  max_total_uses?: number;
  max_uses_per_user?: number;
  validity_start?: string;
  validity_end?: string;
  is_public?: boolean;
  terms_and_conditions?: string;
}

export interface UpdateCouponRequest {
  description?: string;
  applicable_bundles?: ObjectId[];
  discount_value?: number;
  max_discount_amount?: number;
  min_purchase_amount?: number;
  max_total_uses?: number;
  max_uses_per_user?: number;
  validity_start?: string;
  validity_end?: string;
  is_public?: boolean;
  terms_and_conditions?: string;
}

export interface ValidateCouponRequest {
  code: string;
  bundle: ObjectId;
  amount?: number;
}

export interface ValidateCouponResponse {
  valid: boolean;
  coupon?: Coupon;
  message?: string;
}

export interface ApplyCouponRequest {
  code: string;
  bundle: ObjectId;
  amount: number;
}

export interface ApplyCouponResponse {
  coupon: Coupon;
  original_amount: number;
  discount_amount: number;
  final_amount: number;
}

export interface GenerateCouponCodeRequest {
  prefix?: string;
  length?: number;
}

export interface CouponStats {
  total_redemptions: number;
  total_discount_given: number;
  unique_users: number;
  remaining_uses: number;
}

export interface CouponUserRedemptions {
  redemptions: number;
  remaining: number;
}

// ==================
// Slide Types
// ==================

export type SlideType = 'hero' | 'banner' | 'announcement' | 'promotion';
export type SlideStatus = 'active' | 'inactive' | 'draft' | 'scheduled';
export type SlidePosition = 'top' | 'middle' | 'bottom';
export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type AnimationType = 'fade' | 'slide' | 'zoom' | 'none';
export type TargetAudience = 'all' | 'logged_in' | 'guests' | 'admins';

export interface SlideImage {
  url: string;
  alt?: string;
  public_id?: string;
}

export interface SlideButton {
  text?: string;
  url?: string;
  style?: ButtonStyle;
  open_in_new_tab?: boolean;
}

export interface SlideAnimation {
  type?: AnimationType;
  duration?: number;
  delay?: number;
}

export interface SlideAnalytics {
  views?: number;
  clicks?: number;
  click_through_rate?: number;
}

export interface Slide {
  _id: ObjectId;
  title: string;
  subtitle?: string;
  description?: string;
  slide_type: SlideType;
  status: SlideStatus;
  event?: ObjectId;
  image: SlideImage;
  mobile_image?: SlideImage;
  background_color?: string;
  text_color: string;
  overlay_opacity: number;
  button?: SlideButton;
  position: SlidePosition;
  order: number;
  animation?: SlideAnimation;
  validity_start?: string;
  validity_end?: string;
  target_audience?: TargetAudience[];
  analytics?: SlideAnalytics;
  created_at: string;
  updated_at: string;
}

export interface CreateSlideRequest {
  title: string;
  subtitle?: string;
  description?: string;
  slide_type?: SlideType;
  event?: ObjectId;
  image: {
    url: string;
    alt?: string;
  };
  mobile_image?: {
    url: string;
    alt?: string;
  };
  background_color?: string;
  text_color?: string;
  overlay_opacity?: number;
  button?: SlideButton;
  position?: SlidePosition;
  order?: number;
  animation?: SlideAnimation;
  validity_start?: string;
  validity_end?: string;
  target_audience?: TargetAudience[];
}

export interface UpdateSlideRequest {
  title?: string;
  subtitle?: string;
  description?: string;
  slide_type?: SlideType;
  event?: ObjectId;
  image?: {
    url: string;
    alt?: string;
  };
  mobile_image?: {
    url: string;
    alt?: string;
  };
  background_color?: string;
  text_color?: string;
  overlay_opacity?: number;
  button?: SlideButton;
  position?: SlidePosition;
  order?: number;
  animation?: SlideAnimation;
  validity_start?: string;
  validity_end?: string;
  target_audience?: TargetAudience[];
}

export interface ReorderSlidesRequest {
  slides: Array<{
    id: ObjectId;
    order: number;
  }>;
}

export interface BulkUpdateSlideStatusRequest {
  ids: ObjectId[];
  status: SlideStatus;
}

// ==================
// Notification Types
// ==================

export type NotificationType = 
  | 'vote_cast' | 'vote_refunded'
  | 'voting_started' | 'voting_ending_soon' | 'voting_ended' | 'results_published'
  | 'payment_success' | 'payment_failed' | 'payment_pending' | 'refund_processed' | 'refund_failed'
  | 'form_submitted' | 'nomination_approved' | 'nomination_rejected' | 'nomination_converted'
  | 'event_created' | 'event_started' | 'event_ending_soon' | 'event_ended' | 'event_cancelled' | 'event_updated'
  | 'candidate_approved' | 'candidate_rejected' | 'candidate_leading' | 'candidate_profile_updated' | 'candidate_profile_completed'
  | 'coupon_received' | 'coupon_expiring_soon' | 'bundle_promotion'
  | 'suspicious_activity' | 'account_security' | 'login_alert' | 'password_changed' | 'email_verified'
  | 'system_announcement' | 'system_maintenance' | 'weekly_digest' | 'achievement_unlocked';

export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push' | 'webhook';
export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'cancelled';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Notification {
  _id: ObjectId;
  user: ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  priority: NotificationPriority;
  event?: ObjectId;
  candidate?: ObjectId;
  category?: ObjectId;
  vote?: ObjectId;
  payment?: ObjectId;
  action_url?: string;
  action_label?: string;
  icon?: string;
  image_url?: string;
  read_at?: string;
  clicked_at?: string;
  sent_at?: string;
  delivered_at?: string;
  expires_at?: string;
  retry_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateNotificationRequest {
  user: ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  channel?: NotificationChannel;
  priority?: NotificationPriority;
  event?: ObjectId;
  candidate?: ObjectId;
  category?: ObjectId;
  action_url?: string;
  action_label?: string;
  icon?: string;
  image_url?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

export interface BulkCreateNotificationRequest {
  users: ObjectId[];
  type: NotificationType;
  title: string;
  message: string;
  channel?: NotificationChannel;
  priority?: NotificationPriority;
  event?: ObjectId;
  action_url?: string;
  action_label?: string;
  expires_at?: string;
}

export interface UpdateNotificationRequest {
  title?: string;
  message?: string;
  priority?: NotificationPriority;
  action_url?: string;
  action_label?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

export interface BulkMarkAsReadRequest {
  ids: ObjectId[];
}

export interface UnreadCountResponse {
  count: number;
  by_type: Record<NotificationType, number>;
}

export interface MarkNotificationFailedRequest {
  error?: string;
}

// ==================
// Health Check Types
// ==================

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    database: string;
    cache: string;
    agenda: string;
  };
}
