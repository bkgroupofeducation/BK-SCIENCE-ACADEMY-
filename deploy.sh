#!/bin/bash

echo "🚀 Starting Deployment Process..."

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "🔄 Restarting backend process via PM2..."
pm2 restart backend || pm2 start server.js --name backend
pm2 save

# Frontend build
echo "🏗️ Building frontend..."
cd ../frontend
npm install
npm run build

# Deploy frontend files
echo "🚚 Copying build files to web server directory..."
sudo mkdir -p /var/www/frontend/
sudo rm -rf /var/www/frontend/*
sudo cp -r dist/* /var/www/frontend/

# Nginx restart
echo "⚙️ Restarting NGINX..."
sudo nginx -t && sudo systemctl restart nginx

echo "✅ Deployment completed successfully!"
