# API Integration Guide - ITFY E-Voting Platform

## Overview
This document provides a comprehensive guide to the API integration status, endpoints, and verification checklist for the ITFY E-Voting platform.

---

## ✅ API Configuration

### Base URL
- **Production**: `https://api.itforyouthghana.org/api`
- **Environment Variable**: `NEXT_PUBLIC_API_URL`
- **Location**: `/frontend/itfy-evoting/.env.local`

### Configuration Files
- **Main Config**: `lib/config.ts` - Centralized app configuration
- **API Client**: `lib/api/client.ts` - Base HTTP client with authentication
- **Responsive Utils**: `lib/responsive.ts` - Mobile/tablet optimization utilities

---

## ✅ Core API Modules Implemented

### 1. Authentication (`lib/api/auth.ts`)
**Status**: ✅ Implemented
**Endpoints**:
- POST `/auth/register` - User registration
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout
- POST `/auth/refresh-token` - Token refresh
- POST `/auth/candidate/login` - Candidate authentication
- GET `/auth/me` - Current user profile

**Features**:
- JWT token management
- Separate user and candidate auth contexts
- Automatic token refresh on 401
- Secure token storage (localStorage with SSR fallback)

### 2. Events (`lib/api/events.ts`)
**Status**: ✅ Fully Integrated
**Public Endpoints**:
- GET `/events/public` - List public events
- GET `/events/featured` - Featured events
- GET `/events/upcoming` - Upcoming events
- GET `/events/{id}` - Event details
- GET `/events/slug/{slug}` - Event by slug

**Admin Endpoints**:
- POST `/events` - Create event
- PUT `/events/{id}` - Update event
- DELETE `/events/{id}` - Delete event
- GET `/events/{id}/stats` - Event statistics
- GET `/events/{id}/results` - Event results

**Integration Points**:
- `components/EventsSection.tsx` - Public display
- `components/admin/tabs/AdminEventsTab.tsx` - Admin management
- Hook: `usePublicEvents()`, `useEventById()`

### 3. Candidates (`lib/api/candidates.ts`)
**Status**: ✅ Fully Integrated
**Public Endpoints**:
- GET `/candidates/public` - List public candidates
- GET `/candidates/{id}` - Candidate details
- GET `/candidates/slug/{slug}` - Candidate by slug
- GET `/events/{eventId}/candidates` - Candidates by event

**Admin Endpoints**:
- POST `/candidates` - Create candidate
- PUT `/candidates/{id}` - Update candidate
- DELETE `/candidates/{id}` - Delete candidate
- POST `/candidates/{id}/approve` - Approve candidate
- POST `/candidates/{id}/reject` - Reject candidate

**Candidate Portal (Authenticated)**:
- GET `/candidates/profile` - Get own profile
- PUT `/candidates/profile` - Update own profile
- POST `/candidates/profile/image` - Upload profile image

**Integration Points**:
- `components/CandidatesSection.tsx` - Public display
- `components/admin/tabs/AdminCandidatesTab.tsx` - Admin management
- Hook: `useCandidatesByEvent()`, `useCandidateById()`

### 4. Categories (`lib/api/categories.ts`)
**Status**: ✅ Fully Integrated
**Public Endpoints**:
- GET `/categories/featured` - Featured categories
- GET `/categories/{id}` - Category details
- GET `/events/{eventId}/categories` - Categories by event

**Admin Endpoints**:
- POST `/categories` - Create category
- PUT `/categories/{id}` - Update category
- DELETE `/categories/{id}` - Delete category
- GET `/categories/{id}/stats` - Category statistics

**Integration Points**:
- `components/CategoriesSection.tsx` - Public display
- `components/admin/tabs/AdminCategoriesTab.tsx` - Admin management
- Hook: `useFeaturedCategories()`, `useCategoriesByEvent()`

### 5. Voting (`lib/api/votes.ts`)
**Status**: ✅ Implemented
**Endpoints**:
- POST `/votes` - Cast vote
- GET `/votes/history` - User vote history
- GET `/categories/{id}/results` - Category results

**Features**:
- Vote creation with validation
- Vote count tracking
- Results visibility based on category settings

### 6. Bundles (`lib/api/bundles.ts`)
**Status**: ✅ Implemented
**Endpoints**:
- GET `/bundles` - List bundles
- GET `/events/{eventId}/bundles` - Bundles by event
- GET `/bundles/featured` - Featured bundles

**Integration Points**:
- Vote purchase workflow
- Event voting pages

### 7. Slides (`lib/api/slides.ts`)
**Status**: ✅ Implemented
**Public Endpoints**:
- GET `/slides/active` - Active slides
- GET `/slides/type/{type}` - Slides by type
- GET `/slides/featured` - Featured slides

**Admin Endpoints**:
- POST `/slides` - Create slide
- PUT `/slides/{id}` - Update slide
- DELETE `/slides/{id}` - Delete slide

**Integration Points**:
- `components/HeroCarousel.tsx` - Hero section
- `components/admin/tabs/AdminSlidesTab.tsx` - Admin management

### 8. Users (`lib/api/users.ts`)
**Status**: ✅ Implemented
**Admin Endpoints**:
- GET `/users` - List users
- POST `/users` - Create user
- PUT `/users/{id}` - Update user
- DELETE `/users/{id}` - Delete user

**Integration Points**:
- `components/admin/tabs/AdminUsersTab.tsx` - User management

### 9. Analytics (`lib/api/analytics.ts`)
**Status**: ✅ Implemented
**Endpoints**:
- GET `/analytics/dashboard` - Dashboard overview
- GET `/analytics/events/{eventId}` - Event analytics
- GET `/analytics/voting` - Voting analytics

**Integration Points**:
- `components/admin/tabs/AdminAnalyticsTab.tsx` - Analytics display
- `components/admin/tabs/AdminOverviewTab.tsx` - Overview stats

### 10. Payments (`lib/api/payments.ts`)
**Status**: ✅ Implemented
**Endpoints**:
- POST `/payments/initialize` - Initialize payment
- GET `/payments/verify/{reference}` - Verify payment
- GET `/payments/history` - Payment history

---

## ✅ Component Integration Status

### Public Pages
- **✅ Homepage** (`app/page.tsx`) - All sections using API
- **✅ Events Page** (`app/(public)/events/page.tsx`) - Real event data
- **✅ Event Detail** (`app/(public)/events/[slug]/page.tsx`) - Event details from API
- **✅ Categories** (`app/(public)/categories/page.tsx`) - Real categories
- **✅ Candidates/Nominees** (`app/(public)/nominees/page.tsx`) - Real candidate data
- **✅ Voting** (`app/(public)/vote/page.tsx`) - Vote integration

### Admin Pages
- **✅ Admin Overview** - Analytics dashboard
- **✅ Admin Events** - Event CRUD operations
- **✅ Admin Candidates** - Candidate management
- **✅ Admin Categories** - Category management
- **✅ Admin Users** - User management
- **✅ Admin Slides** - Slide management
- **✅ Admin Analytics** - Detailed analytics
- **✅ Admin Activities** - Activity logging

### Authentication Pages
- **✅ User Login** (`app/(auth)/login/page.tsx`) - User authentication
- **✅ Candidate Portal** (`app/(auth)/candidate-portal/page.tsx`) - Candidate interface

---

## ✅ Data Fetching Patterns

### React Query Hooks (Recommended)
```typescript
// Events
const { data, isLoading, error } = usePublicEvents({ limit: 10 });

// Candidates
const { data: candidates } = useCandidatesByEvent(eventId);

// Categories
const { data: categories } = useFeaturedCategories();
```

### Direct API Calls
```typescript
// Events
const response = await eventsApi.getPublicEvents();
const event = await eventsApi.getBySlug(slug);

// Candidates
const candidates = await candidatesApi.listPublic();

// Categories
const categories = await categoriesApi.getFeatured();
```

---

## ✅ Error Handling & Resilience

### Implemented Features
- ✅ Automatic token refresh on 401
- ✅ Request timeout handling (30s default)
- ✅ Error type definitions (ApiError class)
- ✅ Graceful fallbacks for missing data
- ✅ Skeleton loaders during loading states
- ✅ Error boundaries in components

### Error Types
```typescript
// Network errors
ApiError {
  status: 408,
  code: 'TIMEOUT',
  message: 'Request timed out'
}

// Server errors
ApiError {
  status: 500,
  code: 'SERVER_ERROR',
  message: 'Internal server error'
}

// Validation errors
ApiError {
  status: 400,
  code: 'VALIDATION_ERROR',
  details: { field: ['error message'] }
}
```

---

## ✅ Responsive Design Implementation

### Mobile Optimization
- ✅ Viewport meta tag configured
- ✅ Responsive grid layouts (1-4 columns based on screen)
- ✅ Mobile-first CSS approach
- ✅ Touch-friendly button sizes
- ✅ Collapsible admin sidebar
- ✅ Optimized fonts and spacing

### Breakpoints
- `xs` (0px) - Mobile
- `sm` (640px) - Small tablet
- `md` (768px) - Tablet
- `lg` (1024px) - Desktop
- `xl` (1280px) - Large desktop
- `2xl` (1536px) - Ultra-wide

### Key Responsive Classes
```typescript
// Container
'w-full px-4 sm:px-6 lg:px-8 mx-auto'

// Grid
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'

// Typography
'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
```

---

## ✅ Performance Optimizations

### Implemented
- ✅ React Query caching (stale times configured)
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting for admin components
- ✅ Request debouncing in search
- ✅ Lazy loading for modals and dialogs
- ✅ Skeleton loaders for better UX

### Cache Durations
- Events: 5 minutes
- Candidates: 2 minutes
- Categories: 5 minutes
- Slides: 10 minutes
- User data: 1 minute

---

## ✅ Security Considerations

### Implemented
- ✅ JWT-based authentication
- ✅ Secure token storage with SSR fallback
- ✅ HTTPS-only in production
- ✅ Role-based access control (admin vs user vs candidate)
- ✅ Input validation and sanitization
- ✅ CORS handling

### Token Management
- Access tokens: Short-lived (15-60 min typical)
- Refresh tokens: Long-lived in localStorage
- Automatic refresh: On 401 responses
- Logout: Clears all tokens

---

## 🔧 Verification Checklist

### API Configuration
- [ ] `NEXT_PUBLIC_API_URL` set correctly in `.env.local`
- [ ] Base URL is production API (`https://api.itforyouthghana.org/api`)
- [ ] All authentication headers configured
- [ ] CORS enabled for frontend domain

### Data Integration
- [ ] Events load from API (not mocks)
- [ ] Candidates display with real vote counts
- [ ] Categories show correct voting status
- [ ] Admin dashboard displays real analytics
- [ ] User authentication works
- [ ] Candidate portal accessible

### Mobile Responsiveness
- [ ] Pages display correctly on mobile (375px)
- [ ] Tablet layout works (768px)
- [ ] Desktop layout displays properly
- [ ] Sidebar collapses on mobile
- [ ] Images scale appropriately
- [ ] Touch targets are large enough (48px minimum)

### Error Handling
- [ ] Network errors show graceful messages
- [ ] Timeout errors trigger retry
- [ ] 401 errors trigger token refresh
- [ ] API failures show fallback UI
- [ ] Loading states display correctly

---

## 🚀 Next Steps

1. **Testing**: Run E2E tests against production API
2. **Monitoring**: Set up error tracking (Sentry, LogRocket)
3. **Analytics**: Configure GA4 or similar
4. **Performance**: Monitor Core Web Vitals
5. **Documentation**: Add API endpoint documentation

---

## 📞 Support

For issues or questions about API integration:
- Email: [email protected]
- Docs: https://api.itforyouthghana.org/docs
- Issues: Create issue in repository

---

**Last Updated**: 2/19/2026
**Version**: 1.0.0
