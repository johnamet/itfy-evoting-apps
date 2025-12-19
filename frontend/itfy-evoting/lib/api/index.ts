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

// Default export with all APIs
const apiServices = {
  auth: authApi,
  candidateAuth: candidateAuthApi,
  users: usersApi,
  events: eventsApi,
  categories: categoriesApi,
  candidates: candidatesApi,
  votes: votesApi,
  bundles: bundlesApi,
  payments: paymentsApi,
  forms: formsApi,
  submissions: submissionsApi,
  coupons: couponsApi,
  slides: slidesApi,
  notifications: notificationsApi,
};

export default apiServices;
