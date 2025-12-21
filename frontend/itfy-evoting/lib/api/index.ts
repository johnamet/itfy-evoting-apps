/**
 * API Services Index
 * Central export for all API services
 */

// Base client exports
export {
  api,
  apiRequest,
  ApiError,
  tokenManager,
  buildPaginationParams,
  uploadFile,
  uploadFiles,
  type AuthType,
  type RequestOptions,
  type PaginatedResponse,
} from './client';

// Auth services
export {
  authApi,
  candidateAuthApi,
  type LoginResponse,
  type RegisterResponse,
  type RefreshTokenResponse,
  type CandidateAuthResponse,
} from './auth';

// Users service
export {
  usersApi,
  type UsersListResponse,
  type UserFilters,
  type CreateUserRequest,
  type AdminUpdateUserRequest,
} from './users';

// Events service
export {
  eventsApi,
  type EventsListResponse,
  type EventFilters,
  type EventStatsResponse,
  type EventResultsResponse,
} from './events';

// Categories service
export {
  categoriesApi,
  type CategoriesListResponse,
  type CategoryFilters,
  type CategoryStatsResponse,
  type CategoryResultsResponse,
} from './categories';

// Candidates service
export {
  candidatesApi,
  type CandidatesListResponse,
  type CandidateFilters,
  type CandidateStatsResponse,
  type CandidateWithVotes,
} from './candidates';

// Votes service
export {
  votesApi,
  type VotesListResponse,
  type VoteFilters,
  type VoteEligibilityResponse,
  type VoteCountResponse,
  type CategoryVoteResults,
  type EventVoteResults,
  type VoteTrendsResponse,
  type VoteStatisticsResponse,
} from './votes';

// Bundles service
export {
  bundlesApi,
  type BundlesListResponse,
  type BundleFilters,
  type BundleStatsResponse,
} from './bundles';

// Payments service
export {
  paymentsApi,
  type PaymentsListResponse,
  type VoteCodesListResponse,
  type PaymentFilters,
  type VoteCodeFilters,
  type InitializePaymentResponse,
  type VerifyPaymentResponse,
  type PaymentStatsResponse,
} from './payments';

// Forms service
export {
  formsApi,
  type FormsListResponse,
  type FormFilters,
  type FormStatsResponse,
} from './forms';

// Submissions service
export {
  submissionsApi,
  type SubmissionsListResponse,
  type SubmissionFilters,
  type SubmitFormRequest,
  type ReviewSubmissionRequest,
  type DuplicateCheckResponse,
} from './submissions';

// Coupons service
export {
  couponsApi,
  type CouponsListResponse,
  type CouponFilters,
  type ValidateCouponResponse,
  type ApplyCouponResponse,
  type CouponStatsResponse,
} from './coupons';

// Slides service
export {
  slidesApi,
  type SlidesListResponse,
  type SlideFilters,
  type SlideStatsResponse,
} from './slides';

// Notifications service
export {
  notificationsApi,
  type NotificationsListResponse,
  type NotificationFilters,
  type NotificationPreferences,
} from './notifications';

// Analytics service
export {
  analyticsApi,
  type DashboardOverview,
  type VotingAnalytics,
  type PaymentAnalytics,
  type EventAnalytics,
  type ActivityHeatmap,
  type ConversionFunnel,
  type RealTimeMetrics,
  type AnalyticsQueryParams,
} from './analytics';

// Activities service
export {
  activitiesApi,
  type Activity,
  type ActivityType,
  type ActivityAction,
  type ActivityFilters,
  type ActivityStats,
  type ActivitiesListResponse,
} from './activities';

const apiServices = {
  auth: () => import('./auth'),
  users: () => import('./users'),
  events: () => import('./events'),
  categories: () => import('./categories'),
  candidates: () => import('./candidates'),
  votes: () => import('./votes'),
  bundles: () => import('./bundles'),
  payments: () => import('./payments'),
  forms: () => import('./forms'),
  submissions: () => import('./submissions'),
  coupons: () => import('./coupons'),
  slides: () => import('./slides'),
  notifications: () => import('./notifications'),
  analytics: () => import('./analytics'),
  activities: () => import('./activities'),
};

export default apiServices;
