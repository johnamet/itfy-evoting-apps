# ITFY E-Voting Production Deployment Guide

## 🌐 Production URLs

- **API Base URL**: `https://api.itforyouthghana.org`
- **Frontend URL**: `https://evoting.itforyouthghana.org`
- **API Health Check**: `https://api.itforyouthghana.org/api/v1/health`

---

## 🔐 Security Checklist (CRITICAL)

### Before Deployment

- [ ] **Generate new JWT secrets** (NEVER reuse development secrets)
  ```bash
  # Generate secure secrets
  node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('base64'))"
  node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('base64'))"
  ```

- [ ] **Configure CORS properly**
  ```env
  CORS_ORIGIN=https://evoting.itforyouthghana.org
  ```

- [ ] **Set NODE_ENV to production**
  ```env
  NODE_ENV=production
  ```

- [ ] **Update FRONTEND_URL**
  ```env
  FRONTEND_URL=https://evoting.itforyouthghana.org
  ```

- [ ] **Switch to LIVE Paystack keys** (if accepting real payments)
  ```env
  PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
  PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxx
  ```

- [ ] **Secure MongoDB connection** (use Atlas or secured instance)
- [ ] **Configure Redis** for rate limiting (or use in-memory for small scale)
- [ ] **Set up SSL/TLS** (handled by reverse proxy/load balancer)
- [ ] **Configure Sentry** for error monitoring (optional but recommended)

### Environment Variables Required in Production

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Must be "production" | `production` |
| `CORS_ORIGIN` | Allowed frontend origin(s) | `https://evoting.itforyouthghana.org` |
| `JWT_SECRET` | Strong 64-byte secret | Generate new |
| `JWT_REFRESH_SECRET` | Different strong secret | Generate new |
| `MONGODB_URI` | Production database | Atlas connection string |
| `FRONTEND_URL` | Frontend application URL | `https://evoting.itforyouthghana.org` |

---

## 📦 Deployment Commands

### Using PM2 (Recommended)

```bash
# Build the application
npm run build

# Start in production mode
pm2 start ecosystem.config.cjs --env production

# Zero-downtime restart
pm2 reload itfy-evoting-backend

# View logs
pm2 logs itfy-evoting-backend

# Monitor
pm2 monit
```

### Manual Node.js

```bash
NODE_ENV=production node dist/app.js
```

---

## 🔄 Git Workflow

### Branch Structure

| Branch | Purpose | Deployment |
|--------|---------|------------|
| `production` | **Default branch** - Stable production code | Auto-deploys to production |
| `main` | Development integration | Pre-production testing |
| `feature/*` | New features | Development only |
| `fix/*` | Bug fixes | Development only |
| `hotfix/*` | Critical production fixes | Fast-track to production |

### Standard Workflow

1. **Create feature branch from production**
   ```bash
   git checkout production
   git pull origin production
   git checkout -b feature/your-feature-name
   ```

2. **Make changes, commit, push**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request to production branch**
   - Request code review
   - Ensure tests pass
   - Merge only after approval

### ⚠️ NEVER Work Directly on Production Branch

Always create a feature/fix branch first!

---

## 🛡️ API Documentation Security

### Option 1: Disable in Production (Recommended)
```env
SWAGGER_ENABLED=false
```

### Option 2: Password Protect
```env
SWAGGER_ENABLED=true
SWAGGER_PASSWORD=your-secure-password
```

Then access with: `admin:your-secure-password`

---

## 📊 Monitoring Endpoints

| Endpoint | Purpose | Authentication |
|----------|---------|----------------|
| `/api/v1/health` | Quick health check | None |
| `/api/v1/health/detailed` | Comprehensive health | None |
| `/metrics` | Prometheus metrics | Consider restricting in production |

---

## 🔧 Server Configuration (Nginx Example)

```nginx
server {
    listen 443 ssl http2;
    server_name api.itforyouthghana.org;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

---

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ORIGIN` matches frontend URL exactly (including https://)
2. **JWT Errors**: Verify secrets are set and match between restarts
3. **Database Connection**: Check MongoDB Atlas whitelist includes server IP
4. **Rate Limiting**: If Redis is not available, rate limiting uses in-memory (not distributed)

### Health Check

```bash
curl https://api.itforyouthghana.org/api/v1/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-06T...",
  "uptime": "..."
}
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-06 | Initial production deployment |

---

## 👥 Contacts

- **Technical Issues**: [Your contact]
- **Infrastructure**: [Your contact]
