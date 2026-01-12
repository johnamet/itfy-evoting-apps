# ITFY E-Voting Platform - AI Coding Instructions

## Project Overview
Backend-focused monorepo for an event-based e-voting platform. Node.js/Express backend with MongoDB, Redis caching, Agenda.js job processing, and Handlebars email templates. Frontend directory exists but is currently empty.

## Architecture Pattern: Model-Repository-Service-Validation

Every backend module follows this strict 4-file structure:
```
modules/<domain>/
  ├── <domain>.model.js      # Mongoose schema (extends BaseModel)
  ├── <domain>.repository.js # Data access layer (extends BaseRepository)
  ├── <domain>.service.js    # Business logic (extends BaseService)
  └── <domain>.validation.js # Joi schemas (named exports)
```

**Key Examples:** `user/`, `event/`, `candidate/`, `vote/vote/`, `payment/`, `form/`

---

## Base Classes (CRITICAL - Follow These Patterns)

### 1. BaseModel (`modules/shared/base.model.js`)
- Uses **snake_case timestamps**: `created_at`, `updated_at`, `deleted_at` (NOT camelCase)
- Soft delete enabled by default (filters `deleted_at: null`)
- Bypass soft delete: `query._includeDeleted = true`

```javascript
class MyEntity extends BaseModel {
  constructor() {
    const schemaDefinition = {
      name: { type: String, required: true },
      event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      status: { type: String, enum: Object.values(STATUS) },
      // Use snake_case for all fields
    };
    super(schemaDefinition, { softDelete: true });
  }
}
export default new MyEntity().model;
```

### 2. BaseRepository (`modules/shared/base.repository.js`)
- Inherited methods: `create()`, `findById()`, `findOne()`, `findAll()`, `update()`, `delete()`, `restore()`
- **Don't wrap inherited methods** - only add domain-specific queries
- Repositories return `null` for not found, **never throw business errors**

```javascript
// ✅ CORRECT - Only add domain-specific methods
class BundleRepository extends BaseRepository {
  constructor() {
    super(Bundle);
  }

  // Domain-specific query - worth adding
  async findAvailableByEvent(eventId, options = {}) {
    return await this.findAll(
      { event: eventId, status: BUNDLE_STATUS.ACTIVE, stock: { $gt: 0 } },
      options
    );
  }

  // ❌ WRONG - Don't wrap inherited methods
  // async createBundle(data) { return await this.create(data); }
}
export default new BundleRepository();
```

### 3. BaseService (`modules/shared/base.service.js`)
- Use dependency injection pattern for repositories
- Use `this.validate()` for Joi validation (requires `BaseService.setValidation(Joi)` at startup)
- Use `this.transaction()` for multi-step operations
- Services throw business logic errors

```javascript
// ✅ CORRECT Pattern
class BundleService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || BundleRepository;
    this.eventRepository = dependencies.eventRepository || EventRepository;
    this.activityService = dependencies.activityService || ActivityService;
  }

  async createBundle(bundleData, adminId) {
    // Use inherited validation
    const validated = this.validate(bundleData, createBundleSchema);

    // Check business rules (service responsibility)
    const event = await this.eventRepository.findById(validated.event_id);
    if (!event) throw new Error("Event not found");

    // Create via repository
    const bundle = await this.repository.create({
      ...validated,
      created_by: adminId,
    });

    // Fire-and-forget side effects (don't await)
    this.activityService.log({ /* ... */ }).catch(console.error);

    return bundle;
  }
}

// Export both for testability
export { BundleService };
export default new BundleService();
```

---

## Layer Responsibilities

| Layer | Does | Does NOT |
|-------|------|----------|
| **Model** | Schema definition, indexes, instance methods for entity logic | Business validation, external service calls |
| **Repository** | Data access, queries, aggregations | Business logic, throwing user-facing errors |
| **Service** | Business logic, validation, orchestration, error handling | Direct DB queries (use repository) |
| **Validation** | Joi schemas for input validation | Database constraints (use model) |

---

## Naming Conventions

- **Files/Folders**: kebab-case (`activity-logger.middleware.js`)
- **Database Fields**: snake_case (`password_hash`, `email_verified_at`, `event_id`)
- **JavaScript Variables**: camelCase (`userId`, `eventData`)
- **Constants**: UPPER_SNAKE_CASE exports (`ROLES`, `STATUS`, `ACTION_TYPE`)
- **Models**: PascalCase (`User`, `Event`, `VoteBundle`)

---

## Validation Pattern

**Export named schemas** (not classes):
```javascript
// ✅ CORRECT - Named exports
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

export const createBundleSchema = Joi.object({
  name: Joi.string().required(),
  event_id: Joi.objectId().required(),
  price: Joi.number().min(0).required(),
});

export const updateBundleSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0),
}).min(1);
```

**In services - use `this.validate()`**:
```javascript
async createBundle(data) {
  const validated = this.validate(data, createBundleSchema);
  // proceed with validated data
}
```

---

## Error Handling Pattern

```javascript
// Repository - return null, don't throw business errors
async findByEmail(email, options = {}) {
  return await this.findOne({ email }, options); // Returns null if not found
}

// Service - handle business logic, throw meaningful errors
async getUser(userId) {
  const user = await this.repository.findById(userId);
  if (!user) throw new Error("User not found"); // Service throws
  return user;
}
```

---

## Async Operations (Emails, Notifications, Logging)

**Don't block on non-critical operations:**
```javascript
// ✅ CORRECT - Fire and forget
agendaManager.now("send-email", { to, template, context }).catch(err => {
  console.error('Email queue error:', err);
});
return result; // Return immediately

// ❌ WRONG - Blocking on email
await agendaManager.now("send-email", { ... });
return result;
```

---

## Transactions for Multi-Step Operations

```javascript
async approveSubmission(submissionId, adminId) {
  return await this.transaction(async (session) => {
    const submission = await this.repository.approve(submissionId, adminId, { session });
    const candidate = await this.candidateService.create(submission, { session });
    await this.repository.updateById(submissionId, { candidate: candidate._id }, { session });
    return { submission, candidate };
  });
}
```

---

## Query Options Pattern

```javascript
const user = await userRepo.findById(id, {
  lean: true,              // Return plain object (faster)
  select: 'name email',    // Include only these fields
  populate: 'event',       // Populate refs (string or array)
  includeDeleted: true     // Include soft-deleted records
});
```

---

## Constants Architecture

**Location**: `utils/constants/*.constants.js`
```javascript
// Always import constants - never use magic strings
import { ROLES, STATUS } from '../../utils/constants/user.constants.js';
import { ACTION_TYPE, ENTITY_TYPE } from '../../utils/constants/activity.constants.js';
```

---

## Development Commands

```bash
npm run dev          # Nodemon with babel-node (hot reload)
npm start            # Production start
npm run build        # Transpile to dist/
npm test             # Jest tests
npm run lint         # ESLint with auto-fix
npm run seed         # Database seeders
```

---

## Key Integration Points

1. **Startup Sequence** (`app.js`): MongoDB → Cache → Agenda → Express server
2. **Health Check**: `GET /health` returns DB/cache/agenda status
3. **Activity Tracking**: All mutations should use `logActivity` middleware
4. **Email Notifications**: Service layer calls `EmailService` after significant actions
5. **File Uploads**: Use `services/file.service.js` multer middleware

## When Adding New Features

1. **New Module**: Create all 4 files (model, repository, service, validation)
2. **Extend Base Classes**: Don't reimplement CRUD - use inherited methods
3. **Register Model**: Import and register in `database/app.database.js`
4. **Add Constants**: Create/update relevant `*.constants.js` file
5. **Add Validation**: Export Joi schemas from `*.validation.js`
6. **Email Template**: Add `.hbs` file to `templates/emails/` if needed
7. **Activity Logging**: Use middleware on routes that mutate data

## Common Pitfalls to Avoid

- ❌ Don't use camelCase for DB field names (use snake_case: `user_id`, not `userId`)
- ❌ Don't query directly from services (always go through repositories)
- ❌ Don't forget to extend base classes (Model, Repository, Service)
- ❌ Don't bypass cache invalidation (it's automatic in BaseRepository)
- ❌ Don't use magic strings (import from `*.constants.js`)
- ❌ Don't forget `timestamps: true` option conflicts with snake_case fields (BaseModel handles this)

---

## Database & Caching

**MongoDB Connection** (`database/app.database.js`):
- Centralized `DatabaseManager` class registers all models
- Connection with retry logic (max 5 retries, 5s delay)
- All models imported and registered in `app.database.js`

**Redis Cache** (`utils/cache/cache.utils.js`):
- `CacheManager` singleton - auto-fallback to in-memory if Redis unavailable
- `process.env.USE_IN_MEMORY_CACHE=true` or `NODE_ENV=test` → in-memory mode
- Cache invalidation on mutations handled by `BaseRepository._invalidateCache()`

---

## Activity Logging Middleware

**Location**: `middleware/activity-logger.middleware.js`

Use `logActivity` middleware on routes that mutate data:
```javascript
import { logActivity } from '../middleware/activity-logger.middleware.js';
import { ACTION_TYPE, ENTITY_TYPE } from '../utils/constants/activity.constants.js';

// Basic usage
router.post('/', logActivity(ACTION_TYPE.BUNDLE_CREATED, ENTITY_TYPE.BUNDLE), createBundle);
router.put('/:id', logActivity(ACTION_TYPE.BUNDLE_UPDATED, ENTITY_TYPE.BUNDLE), updateBundle);
router.delete('/:id', logActivity(ACTION_TYPE.BUNDLE_DELETED, ENTITY_TYPE.BUNDLE), deleteBundle);

// With custom options
router.post('/:id/approve', logActivity(
  ACTION_TYPE.SUBMISSION_APPROVED,
  ENTITY_TYPE.SUBMISSION,
  {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Approved submission ${req.params.id}`,
    getMetadata: (req) => ({ adminId: req.user.id }),
    severity: 'info'
  }
), approveSubmission);
```

---

## Testing Patterns

**Test File Location**: Same directory as source, with `.test.js` suffix
```
modules/bundle/
  ├── bundle.service.js
  └── bundle.service.test.js
```

**Testing Services with Dependency Injection**:
```javascript
import { BundleService } from './bundle.service.js';

describe('BundleService', () => {
  let service;
  let mockRepository;
  let mockActivityService;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    mockActivityService = {
      log: jest.fn().mockResolvedValue({}),
    };
    
    service = new BundleService({
      repository: mockRepository,
      activityService: mockActivityService,
    });
  });

  describe('createBundle', () => {
    it('should create bundle and log activity', async () => {
      const bundleData = { name: 'Test', event_id: '...', price: 100 };
      mockRepository.create.mockResolvedValue({ _id: '123', ...bundleData });

      const result = await service.createBundle(bundleData, 'admin123');

      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(bundleData));
      expect(result._id).toBe('123');
    });
  });
});
```

**In-Memory MongoDB for Integration Tests**:
```javascript
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

---

## IP Hashing Utility

**Location**: `utils/helpers/ip.helper.js`

All IP address handling uses a standardized utility:
```javascript
import { IPHelper } from '../../utils/helpers/ip.helper.js';

// In services - only store hash, never plain IP
const ipHash = IPHelper.hash(req.ip);

// Check if IP should be captured based on config
if (IPHelper.shouldCapture(eventConfig)) {
  data.ip_hash = IPHelper.hash(ipAddress);
}
```

**Implementation**:
```javascript
// utils/helpers/ip.helper.js
import crypto from 'crypto';

export class IPHelper {
  static hash(ip) {
    if (!ip) return null;
    return crypto.createHash('sha256').update(ip).digest('hex');
  }

  static shouldCapture(config) {
    return config?.capture_ip !== false;
  }
}
```
