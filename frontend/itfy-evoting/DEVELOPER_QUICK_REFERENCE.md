# Developer Quick Reference - ITFY E-Voting

## Quick Start

### API Base URL
```
https://api.itforyouthghana.org/api
```

### Common Imports
```typescript
// API calls
import { eventsApi } from '@/lib/api/events';
import { candidatesApi } from '@/lib/api/candidates';
import { categoriesApi } from '@/lib/api/categories';
import { votesApi } from '@/lib/api/votes';

// Hooks for data fetching
import { usePublicEvents, useCandidatesByEvent, useFeaturedCategories } from '@/hooks/usePublicData';

// Configuration
import { config } from '@/lib/config';
import { responsiveClasses, getGridColumns } from '@/lib/responsive';

// UI Components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
```

---

## API Usage Examples

### Fetch Public Events
```typescript
// Using hooks (recommended)
const { data: eventsData, isLoading, error } = usePublicEvents({ limit: 10, page: 1 });

// Direct API call
const response = await eventsApi.getPublicEvents({ limit: 10 });
const events = response.data;
```

### Fetch Candidates by Event
```typescript
const { data, isLoading } = useCandidatesByEvent(eventId, { limit: 20 });
```

### Get Event by Slug
```typescript
const event = await eventsApi.getBySlug(slug);
console.log(event.data);
```

### Get Candidate Details
```typescript
const candidate = await candidatesApi.getById(candidateId);
// or
const candidate = await candidatesApi.getBySlug(slug);
```

### Cast a Vote
```typescript
const result = await votesApi.create({
  category_id: categoryId,
  candidate_id: candidateId,
  event_id: eventId,
});
```

### Admin: Create Event
```typescript
const newEvent = await eventsApi.create({
  name: 'Event Name',
  description: 'Description',
  start_date: '2026-03-01T00:00:00Z',
  end_date: '2026-03-15T23:59:59Z',
  location: { city: 'Accra', country: 'Ghana' },
  event_type: 'conference',
});
```

### Admin: Get Analytics
```typescript
const dashboard = await analyticsApi.getDashboard();
const eventStats = await analyticsApi.getEventStats(eventId);
```

---

## Common Component Patterns

### Loading State
```typescript
if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
```

### Error State
```typescript
if (error) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
      <p className="text-gray-400">Failed to load data</p>
      <Button onClick={() => window.location.reload()} className="mt-4">
        Try Again
      </Button>
    </div>
  );
}
```

### Empty State
```typescript
if (!data || data.length === 0) {
  return (
    <div className="text-center py-12">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
      <p className="text-gray-400">No items found</p>
    </div>
  );
}
```

### Responsive Grid
```typescript
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {items.map(item => (
    <Card key={item._id}>{/* Content */}</Card>
  ))}
</div>
```

---

## Responsive Design Quick Tips

### Classes to Use
```typescript
// Containers
'w-full px-4 sm:px-6 lg:px-8 mx-auto'

// Grids
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'

// Flexbox
'flex flex-col md:flex-row gap-4 md:gap-6'

// Typography
'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'

// Spacing
'py-12 md:py-16 lg:py-20'

// Images
'w-full h-auto object-cover'
```

### Avoid
```typescript
// DON'T: Hard-coded pixel values
'w-[400px]'  ❌

// DON'T: Too many breakpoints
'md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'  ❌

// DO: Use Tailwind utilities
'text-lg md:text-2xl'  ✅
```

---

## Authentication

### User Login
```typescript
const { loginUser } = useAuthStore();
const response = await loginUser(email, password);
```

### Candidate Login
```typescript
import { candidatesApi } from '@/lib/api/candidates';
const response = await candidatesApi.candidateLogin(email, password);
```

### Check Authentication
```typescript
const { user, isUserAuthenticated } = useAuthStore();
if (!isUserAuthenticated) {
  router.push('/login');
}
```

### Logout
```typescript
const { logoutUser } = useAuthStore();
await logoutUser();
router.push('/');
```

---

## State Management

### User State
```typescript
import { useAuthStore } from '@/store/auth';

const { user, isUserAuthenticated, loginUser, logoutUser } = useAuthStore();
```

### Admin State
```typescript
// Use React Query for server state
import { useQuery } from '@tanstack/react-query';
```

---

## Form Handling

### With React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Valid email required'),
});

const form = useForm({
  resolver: zodResolver(schema),
});

const onSubmit = async (data) => {
  await eventsApi.create(data);
};
```

---

## Error Handling

### Try-Catch
```typescript
try {
  const result = await eventsApi.create(data);
  toast.success('Event created!');
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 400) {
      toast.error('Validation error: ' + error.message);
    } else if (error.status === 401) {
      router.push('/login');
    } else {
      toast.error('An error occurred');
    }
  }
}
```

### Global Error Handler
```typescript
// Check lib/api/client.ts for global error handling
// Automatic retry on network failures
// Automatic token refresh on 401
```

---

## Data Fetching Best Practices

### Use React Query Hooks (Recommended)
```typescript
// ✅ Good: Automatic caching and updates
const { data, isLoading, error } = usePublicEvents();

// ✅ Good: Manual refetch control
const { data, refetch } = usePublicEvents({ enabled: false });
useEffect(() => {
  refetch();
}, [refetch]);
```

### Manual API Calls
```typescript
// Use for one-off calls or special cases
const handleDelete = async (id: string) => {
  await eventsApi.delete(id);
  queryClient.invalidateQueries({ queryKey: ['events'] });
};
```

---

## Performance Tips

### Image Optimization
```typescript
import Image from 'next/image';

// ✅ Good: Use Next.js Image
<Image 
  src={url} 
  alt="description" 
  width={400} 
  height={300} 
  className="w-full h-auto" 
/>

// ❌ Bad: Regular img tag
<img src={url} alt="description" />
```

### Memoization
```typescript
import { useMemo } from 'react';

// ✅ Memoize expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => b.votes - a.votes);
}, [items]);
```

### Query Caching
```typescript
// Cache times (from lib/config.ts):
// Events: 5 min, Candidates: 2 min, Categories: 5 min
// Slide: 10 min, Users: 1 min

// Invalidate cache when data changes
queryClient.invalidateQueries({ queryKey: ['events'] });
```

---

## Common Bugs & Solutions

### Issue: Component always loading
**Solution**: Check if hook is enabled
```typescript
const { data, isLoading } = usePublicEvents({ enabled: !!eventId });
```

### Issue: Stale data showing
**Solution**: Manual refetch or invalidate cache
```typescript
await queryClient.invalidateQueries({ queryKey: ['events'] });
```

### Issue: Mobile layout breaks
**Solution**: Check responsive classes and breakpoints
```typescript
// Use md: not md-width
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
```

### Issue: Images not loading
**Solution**: Check remote patterns in next.config.ts
```typescript
// Ensure domain is in remotePatterns
remotePatterns: [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'api.itforyouthghana.org' },
]
```

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build         # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types

# Testing
npm run test         # Run tests (if configured)
```

---

## File Locations

```
Key Directories:
- lib/api/          # API modules
- hooks/            # React hooks
- components/       # UI components
- components/admin/ # Admin components
- app/              # Next.js pages
- store/            # Zustand stores
- types/            # TypeScript types

Configuration:
- lib/config.ts              # App configuration
- lib/responsive.ts          # Responsive utilities
- next.config.ts             # Next.js config
- tailwind.config.ts         # Tailwind config

Documentation:
- API_INTEGRATION_GUIDE.md    # Complete API reference
- IMPLEMENTATION_SUMMARY.md   # Project summary
- DEVELOPER_QUICK_REFERENCE.md # This file
```

---

## Debugging

### Enable Debug Logs
```typescript
// In browser console
localStorage.setItem('debug', 'true');
// Then check console for [v0] logs
```

### Check API Calls
```typescript
// Browser Network tab shows all API requests
// Check headers for Authorization token
// Verify response status and data structure
```

### React DevTools
```bash
# Install React DevTools extension for Chrome/Firefox
# Inspect component props and state
# Use "Highlight updates" to see re-renders
```

---

## Useful Links

- **API Docs**: https://api.itforyouthghana.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **React Query Docs**: https://tanstack.com/query/latest
- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

## Version Info
- **Next.js**: 16.0.10
- **React**: 19.2.1
- **Tailwind CSS**: 4.0
- **TypeScript**: 5.x
- **React Query**: 5.90.12

---

Last Updated: 2/19/2026
