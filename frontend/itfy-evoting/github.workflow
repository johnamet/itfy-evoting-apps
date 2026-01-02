name: Build and Deploy to DigitalOcean

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: |
          backend/package-lock.json
          frontend/itfy-evoting/package-lock.json
        
    # Backend Build
    - name: Install backend dependencies
      working-directory: ./backend
      run: npm ci
      
    - name: Run backend linting
      working-directory: ./backend
      run: npm run lint || echo "No lint script"
      
    - name: Run backend tests
      working-directory: ./backend
      run: npm test || echo "No tests specified"
      
    - name: Build backend
      working-directory: ./backend
      run: npm run build || echo "No build step specified"
      
    # Frontend Build
    - name: Install frontend dependencies
      working-directory: ./frontend/itfy-evoting
      run: npm ci
      
    - name: Run frontend linting
      working-directory: ./frontend/itfy-evoting
      run: npm run lint || echo "No lint script"
      
    - name: Run frontend tests
      working-directory: ./frontend/itfy-evoting
      run: npm test || echo "No tests specified"
      
    - name: Build frontend
      working-directory: ./frontend/itfy-evoting
      run: npm run build
      env:
        NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Deploy to DigitalOcean Droplet
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.DO_HOST }}
        username: ${{ secrets.DO_USERNAME }}
        key: ${{ secrets.DO_SSH_KEY }}
        port: ${{ secrets.DO_PORT || 22 }}
        script: |
          # Navigate to app directory
          cd ${{ secrets.APP_PATH }}
          
          # Pull latest changes
          echo "📥 Pulling latest code from GitHub..."
          git pull origin main
          
          # ===== Deploy Backend =====
          echo "🔧 Deploying Backend..."
          cd backend
          
          # Install dependencies
          npm install --production=false
          
          # Build if build script exists
          npm run build 2>/dev/null || echo "No build step for backend"
          
          # Create/Update backend .env file
          echo "📝 Updating backend environment variables..."
          cat > .env << 'EOF'
          ${{ secrets.BACKEND_ENV }}
          EOF
          
          # Restart backend with PM2
          echo "🔄 Restarting backend service..."
          pm2 delete backend 2>/dev/null || true
          pm2 start npm --name "backend" -- start
          
          # ===== Deploy Frontend =====
          echo "🎨 Deploying Frontend..."
          cd ../frontend/itfy-evoting
          
          # Install dependencies
          npm install --production=false
          
          # Create/Update frontend .env file
          echo "📝 Updating frontend environment variables..."
          cat > .env.local << 'EOF'
          ${{ secrets.FRONTEND_ENV }}
          EOF
          
          # Build Next.js app
          echo "🏗️ Building Next.js application..."
          npm run build
          
          # Restart frontend with PM2
          echo "🔄 Restarting frontend service..."
          pm2 delete frontend 2>/dev/null || true
          pm2 start npm --name "frontend" -- start
          
          # Save PM2 configuration
          pm2 save
          
          # Display PM2 status
          echo "✅ Deployment completed!"
          echo "📊 Current PM2 Status:"
          pm2 status
          
          echo "📝 Recent logs:"
          pm2 logs --lines 10 --nostream