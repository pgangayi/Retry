#!/bin/bash

# Farmers Boot Local Development Setup Script
# This script sets up the local development environment

set -e

echo "🚀 Setting up Farmers Boot for local development..."

# Check if Wrangler CLI is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it first:"
    echo "npm install -g wrangler"
    echo "Or visit: https://developers.cloudflare.com/workers/wrangler/install-and-update/"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your local values."
    echo "   For local development, uncomment the local Cloudflare values."
fi

# Initialize D1 database if not exists
echo "🗄️  Initializing Cloudflare D1 database..."
wrangler d1 create farmers-boot-local || echo "Database may already exist"

# Run migrations
echo "📄 Running database migrations..."
wrangler d1 execute farmers-boot-local --file=schema.sql

echo "✅ Local development environment is ready!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env with your local Cloudflare values"
echo "2. Run: npm run dev:local (starts frontend + functions locally)"
echo "3. Or run: npm run dev (frontend only) + npm run dev:functions (functions only)"
echo "4. Visit: http://localhost:8788"
echo ""
echo "🔧 Useful commands:"
echo "  - wrangler pages dev frontend --local    (start local Pages)"
echo "  - wrangler dev --local                   (start local functions)"
echo "  - wrangler d1 execute farmers-boot-local --command='SELECT * FROM farms;' (query DB)"