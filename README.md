# ITFY E-Voting Platform

A comprehensive, secure, and scalable electronic voting platform designed for events, competitions, and awards. Built with modern web technologies to provide a seamless voting experience for organizers, candidates, and voters.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black)](https://nextjs.org/)

## 🌟 Features

### Core Voting Features
- **Event Management** - Create and manage voting events with customizable settings
- **Category System** - Organize candidates into multiple voting categories
- **Candidate Profiles** - Rich candidate profiles with images, bio, social links, and projects
- **Secure Voting** - Payment-integrated voting system with vote bundles and codes
- **Real-time Results** - Live vote counting and analytics
- **Coupon System** - Discount codes for vote bundles

### Advanced Features
- **Dynamic Forms** - Create custom nomination and registration forms
- **Submission Management** - Review and approve form submissions with duplicate detection
- **Payment Integration** - Paystack payment gateway for vote purchases
- **Email Notifications** - Automated email notifications for events and updates
- **Promotional Slides** - Manage hero banners and promotional content
- **Analytics Dashboard** - Comprehensive voting statistics and insights
- **Role-Based Access** - Multi-level user roles (Super Admin, Admin, Organiser, Moderator)

### Security & Performance
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - API rate limiting to prevent abuse
- **Redis Caching** - High-performance caching layer
- **Input Sanitization** - MongoDB injection prevention
- **Helmet Security** - HTTP header security
- **CORS Protection** - Configurable cross-origin resource sharing

## 🏗️ Architecture

The platform consists of three main components:

```
itfy-evoting-apps/
├── backend/          # Node.js/Express API server
├── frontend/
│   ├── itfy-evoting/    # Next.js Admin Dashboard
│   ├── itfy-webapp/     # Next.js Public Voting Interface
│   └── itfy-webpage/    # (Reserved for future use)
```

### Technology Stack

#### Backend (API Server)
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis (IORedis)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **File Upload**: Multer + Sharp (image processing)
- **Email**: Nodemailer
- **Payment**: Paystack
- **Job Scheduling**: Agenda
- **Security**: Helmet, bcrypt, mongo-sanitize
- **API Documentation**: Swagger UI + ReDoc (OpenAPI 3.0)
- **Testing**: Jest + Supertest
- **Build Tools**: Babel

#### Frontend - Admin Dashboard (itfy-evoting)
- **Framework**: Next.js 16.x (App Router)
- **UI Library**: React 19.x
- **Styling**: Tailwind CSS 4.x
- **Component Library**: Radix UI
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query (React Query)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Carousel**: Swiper

#### Frontend - Public Interface (itfy-webapp)
- **Framework**: Next.js 16.x
- **UI Library**: React 19.x
- **Styling**: Tailwind CSS 4.x
- **Carousel**: Swiper

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0 or **yarn** >= 1.22.0
- **MongoDB** >= 6.0 (local or cloud instance)
- **Redis** >= 6.0 (optional but recommended for caching)
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/johnamet/itfy-evoting-apps.git
cd itfy-evoting-apps
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

The backend includes an interactive setup wizard for first-time configuration:

```bash
npm run setup
```

This will guide you through:
- Environment settings (NODE_ENV, PORT, CORS)
- Database configuration (MongoDB URI)
- Cache configuration (Redis - optional)
- JWT secret generation
- Email/SMTP settings (optional)
- Frontend URL configuration
- First admin account creation

Alternatively, manually create a `.env` file in the backend directory:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/itfy-evoting

# Redis Cache (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:3001

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@itfy-evoting.com

# Paystack (for payments)
PAYSTACK_SECRET_KEY=your-paystack-secret-key
PAYSTACK_PUBLIC_KEY=your-paystack-public-key

# Cloudinary (for image uploads - optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Run Database Seeders (Optional)

```bash
npm run seed
```

#### Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

The API will be available at `http://localhost:3000`

#### API Documentation

Once the server is running, access the API documentation:
- **Swagger UI**: http://localhost:3000/api-docs
- **ReDoc**: http://localhost:3000/api-docs-redoc

### 3. Frontend Setup

#### Admin Dashboard (itfy-evoting)

```bash
cd frontend/itfy-evoting
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Start the development server:

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3001`

#### Public Voting Interface (itfy-webapp)

```bash
cd frontend/itfy-webapp
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Start the development server:

```bash
npm run dev
```

The public interface will be available at `http://localhost:3002`

## 🎮 Admin Console

The backend includes a powerful CLI tool for system administration:

```bash
cd backend
npm run console
```

### Console Features

- **First-Time Setup Wizard** - Interactive configuration setup
- **Authentication** - Secure login with role-based access
- **User Management** - Create, edit, delete users and manage roles
- **Server Control** - Start, stop, restart the backend server
- **Database Operations** - Status, statistics, seeding, and backup
- **Configuration Management** - View and modify environment settings
- **Event Management** - List and view event details
- **Cache Management** - Clear cache and view statistics

For detailed console documentation, see [Backend Console README](./backend/src/console/README.md)

## 📁 Project Structure

```
itfy-evoting-apps/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Main application entry
│   │   ├── config/                # Configuration files
│   │   ├── console/               # CLI admin console
│   │   ├── database/              # Database models and seeders
│   │   ├── middleware/            # Express middlewares
│   │   ├── modules/               # Feature modules
│   │   │   ├── auth/              # Authentication
│   │   │   ├── bundles/           # Vote bundles
│   │   │   ├── candidates/        # Candidate management
│   │   │   ├── categories/        # Category management
│   │   │   ├── coupons/           # Discount coupons
│   │   │   ├── events/            # Event management
│   │   │   ├── forms/             # Dynamic forms
│   │   │   ├── notifications/     # Notification system
│   │   │   ├── payments/          # Payment processing
│   │   │   ├── slides/            # Promotional slides
│   │   │   ├── submissions/       # Form submissions
│   │   │   ├── users/             # User management
│   │   │   └── votes/             # Voting system
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic services
│   │   ├── templates/             # Email templates
│   │   └── utils/                 # Utility functions
│   ├── openapi.yaml               # API documentation
│   ├── package.json
│   └── .babelrc
│
├── frontend/
│   ├── itfy-evoting/              # Admin Dashboard
│   │   ├── app/                   # Next.js app directory
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utilities and helpers
│   │   ├── public/                # Static assets
│   │   └── package.json
│   │
│   └── itfy-webapp/               # Public Voting Interface
│       ├── app/                   # Next.js app directory
│       ├── components/            # React components
│       ├── public/                # Static assets
│       └── package.json
│
└── README.md                      # This file
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
```

### Frontend Tests

```bash
cd frontend/itfy-evoting
npm test
```

## 📝 API Documentation

The backend provides comprehensive API documentation using OpenAPI 3.0 specification. Once the server is running:

- **Interactive Swagger UI**: http://localhost:3000/api-docs
- **Beautiful ReDoc**: http://localhost:3000/api-docs-redoc
- **OpenAPI Spec**: Available at `backend/openapi.yaml`

### Key API Endpoints

- **Authentication**: `/api/v1/auth/*`
- **Events**: `/api/v1/events/*`
- **Categories**: `/api/v1/categories/*`
- **Candidates**: `/api/v1/candidates/*`
- **Votes**: `/api/v1/votes/*`
- **Bundles**: `/api/v1/bundles/*`
- **Payments**: `/api/v1/payments/*`
- **Forms**: `/api/v1/forms/*`
- **Submissions**: `/api/v1/submissions/*`
- **Coupons**: `/api/v1/coupons/*`
- **Slides**: `/api/v1/slides/*`
- **Notifications**: `/api/v1/notifications/*`
- **Users**: `/api/v1/users/*`

## 🔐 User Roles

The platform supports multiple user roles with different permissions:

| Role | Description | Permissions |
|------|-------------|-------------|
| **super_admin** | System administrator | Full system access, all permissions |
| **admin** | Administrative user | Manage events, users, and content |
| **organiser** | Event organizer | Create and manage events, categories, candidates |
| **moderator** | Content moderator | View and moderate content, approve submissions |

## 🚢 Deployment

### Backend Deployment

1. Build the application:
```bash
cd backend
npm run build
```

2. Set environment variables for production
3. Start the production server:
```bash
npm start
```

### Frontend Deployment

For Next.js applications (both admin and public interfaces):

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Recommended Hosting Options

- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean, Render
- **Frontend**: Vercel (recommended for Next.js), Netlify, AWS Amplify
- **Database**: MongoDB Atlas (cloud), MongoDB on VPS
- **Cache**: Redis Cloud, AWS ElastiCache, DigitalOcean Redis

## 🔧 Development Scripts

### Backend

```bash
npm run dev          # Start development server with nodemon
npm run build        # Build with Babel
npm start            # Start production server
npm test             # Run tests
npm run lint         # Lint code
npm run lint:fix     # Lint and auto-fix issues
npm run seed         # Run database seeders
npm run console      # Start admin console
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Lint code
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**John Ametepe Agboku**

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for secure and reliable electronic voting systems
- Special thanks to all contributors and users

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: support@itfy-evoting.com

## 🗺️ Roadmap

- [ ] Mobile applications (iOS/Android)
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Real-time voting dashboard
- [ ] SMS voting integration
- [ ] Blockchain voting verification
- [ ] Social media integration
- [ ] Advanced fraud detection

---

Made with ❤️ for transparent and secure voting
