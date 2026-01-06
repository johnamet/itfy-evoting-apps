# ITFY E-Voting Backend - Production Security Checklist

## 🔐 Pre-Deployment Security Checklist

### Critical Environment Configuration
- [ ] `NODE_ENV` is set to `production`
- [ ] `CORS_ORIGIN` is set to exact frontend URL (`https://evoting.itforyouthghana.org`) - NEVER use `*`
- [ ] `FRONTEND_URL` is set to production URL
- [ ] All secrets are strong and unique (not reused from other environments)

### JWT Security
- [ ] `JWT_SECRET` is at least 64 characters (use `node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"`)
- [ ] `JWT_REFRESH_SECRET` is different from `JWT_SECRET`
- [ ] `JWT_EXPIRATION` is set to 15-30 minutes for security
- [ ] Secrets are NOT the same as development/staging

### Database Security
- [ ] MongoDB has authentication enabled
- [ ] Database user has minimal required permissions (not admin)
- [ ] Connection uses TLS/SSL (for MongoDB Atlas, this is automatic)
- [ ] IP whitelist is configured (MongoDB Atlas Network Access)
- [ ] Database credentials are not shared or reused

### Payment Security (Paystack)
- [ ] Using LIVE keys (`pk_live_*` and `sk_live_*`) - NOT test keys
- [ ] Webhook secret is configured
- [ ] Callback URL points to production frontend

### Email Security
- [ ] Using app-specific password (not account password)
- [ ] 2FA is enabled on email account

## 🖥️ Server Configuration

### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name api.itforyouthghana.org;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.itforyouthghana.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.itforyouthghana.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Block sensitive files
    location ~ /\. {
        deny all;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.itforyouthghana.org;
    return 301 https://$server_name$request_uri;
}
```

### Firewall Rules (UFW)
```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block all other incoming traffic
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Enable firewall
sudo ufw enable
```

## 📊 Monitoring Setup

### Recommended Services
- [ ] **Error Tracking**: Sentry (configure `SENTRY_DSN`)
- [ ] **Uptime Monitoring**: UptimeRobot or Pingdom
- [ ] **Log Management**: PM2 logs or centralized logging (Papertrail, Loggly)
- [ ] **Performance**: New Relic or Datadog (optional)

### PM2 Monitoring Commands
```bash
# View logs
pm2 logs itfy-evoting-backend

# Monitor processes
pm2 monit

# View status
pm2 status

# View metrics
pm2 info itfy-evoting-backend
```

## 🚀 Deployment Steps

### Initial Setup
```bash
# 1. Clone repository
git clone <repo-url> /var/www/itfy-evoting-backend
cd /var/www/itfy-evoting-backend

# 2. Checkout production branch
git checkout production

# 3. Install dependencies
npm ci --production

# 4. Copy and configure environment
cp .env.production.example .env
nano .env  # Edit with actual production values

# 5. Build application
npm run build

# 6. Create log directories
mkdir -p logs uploads

# 7. Start with PM2
pm2 start ecosystem.config.cjs --env production

# 8. Save PM2 configuration
pm2 save

# 9. Setup PM2 startup script
pm2 startup
```

### Updating Production
```bash
# 1. SSH to server
ssh deploy@api.itforyouthghana.org

# 2. Navigate to app directory
cd /var/www/itfy-evoting-backend

# 3. Pull latest changes from production branch
git pull origin production

# 4. Install dependencies
npm ci --production

# 5. Build application
npm run build

# 6. Reload PM2 (zero-downtime)
pm2 reload itfy-evoting-backend
```

## 🔄 Git Workflow

### Branch Structure
- `production` - **DEFAULT BRANCH** - Production-ready code only
- `staging` - Pre-production testing
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a New Feature
```bash
# Always start from production branch
git checkout production
git pull origin production

# Create feature branch
git checkout -b feature/your-feature-name

# Work on feature, commit changes
git add .
git commit -m "feat: description of feature"

# Push feature branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub to merge into production
```

### Hotfix for Production
```bash
# Create hotfix from production
git checkout production
git pull origin production
git checkout -b hotfix/critical-fix

# Fix the issue
git add .
git commit -m "fix: critical issue description"

# Push and create PR
git push origin hotfix/critical-fix
# Create PR on GitHub, get review, merge to production
```

## ⚠️ Security Warnings

### NEVER DO
- ❌ Commit `.env` files to Git
- ❌ Use `*` for CORS in production
- ❌ Use test API keys in production
- ❌ Share or reuse secrets across environments
- ❌ Push directly to `production` branch
- ❌ Store secrets in code or configuration files

### ALWAYS DO
- ✅ Use environment variables for secrets
- ✅ Rotate secrets periodically
- ✅ Use feature branches for all changes
- ✅ Review PRs before merging
- ✅ Test in staging before production
- ✅ Keep dependencies updated
- ✅ Monitor logs for suspicious activity

## 📋 Post-Deployment Verification

After deploying, verify:
1. [ ] API is accessible at `https://api.itforyouthghana.org/health`
2. [ ] CORS is working (test from frontend)
3. [ ] Authentication flow works
4. [ ] Payment integration works (test with Paystack test mode first)
5. [ ] Email sending works
6. [ ] File uploads work
7. [ ] Check PM2 logs for errors: `pm2 logs`
8. [ ] SSL certificate is valid (check in browser)

## 🔑 Secret Rotation Schedule

| Secret | Rotation Frequency |
|--------|-------------------|
| JWT Secrets | Every 90 days |
| Database Password | Every 90 days |
| Email App Password | When compromised |
| Paystack Keys | When compromised |

---
**Last Updated**: January 2026
**Version**: 1.0.0
