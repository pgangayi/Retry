# Farmers Boot Local Development Setup Script
# This script sets up the local development environment

Write-Host "🚀 Setting up Farmers Boot for local development..." -ForegroundColor Green

# Check if Supabase CLI is installed
if (!(Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g supabase" -ForegroundColor Yellow
    Write-Host "Or visit: https://supabase.com/docs/guides/cli" -ForegroundColor Yellow
    exit 1
}

# Check if .env file exists
if (!(Test-Path ".env")) {
    Write-Host "📋 Copying .env.example to .env..." -ForegroundColor Blue
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please edit it with your local values." -ForegroundColor Green
    Write-Host "   For local development, uncomment the local Supabase values." -ForegroundColor Cyan
}

# Check if wrangler is installed
if (!(Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Wrangler CLI not found. Please install it:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
}

# Start Supabase locally
Write-Host "🗄️  Starting Supabase locally..." -ForegroundColor Blue
supabase start

# Run migrations
Write-Host "📄 Running database migrations..." -ForegroundColor Blue
supabase db reset

Write-Host "✅ Local development environment is ready!" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "📋 Next steps:" -ForegroundColor Magenta
Write-Host "1. Edit .env with your local Supabase values" -ForegroundColor White
Write-Host "2. Run: npm run dev:local (starts frontend + functions locally)" -ForegroundColor White
Write-Host "3. Or run: npm run dev (frontend only) + npm run dev:functions (functions only)" -ForegroundColor White
Write-Host "4. Visit: http://localhost:8788" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "🔧 Useful commands:" -ForegroundColor Cyan
Write-Host "  - supabase status    (check Supabase services)" -ForegroundColor White
Write-Host "  - supabase stop      (stop local Supabase)" -ForegroundColor White
Write-Host "  - supabase logs      (view Supabase logs)" -ForegroundColor White