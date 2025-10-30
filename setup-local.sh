#!/bin/bash

# Farmers Boot Local Development Setup Script
# This script sets up the local development environment

set -e

echo "🚀 Setting up Farmers Boot for local development..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "npm install -g supabase"
    echo "Or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your local values."
    echo "   For local development, uncomment the local Supabase values."
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it:"
    echo "npm install -g wrangler"
fi

# Start Supabase locally
echo "🗄️  Starting Supabase locally..."
supabase start

# Run migrations
echo "📄 Running database migrations..."
supabase db reset

echo "✅ Local development environment is ready!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env with your local Supabase values"
echo "2. Run: npm run dev:local (starts frontend + functions locally)"
echo "3. Or run: npm run dev (frontend only) + npm run dev:functions (functions only)"
echo "4. Visit: http://localhost:8788"
echo ""
echo "🔧 Useful commands:"
echo "  - supabase status    (check Supabase services)"
echo "  - supabase stop      (stop local Supabase)"
echo "  - supabase logs      (view Supabase logs)"