# Farmers Boot Local Development Setup Script
# This script sets up the local development environment

Write-Host "🚀 Setting up Farmers Boot for local development..." -ForegroundColor Green

# Check if Wrangler CLI is installed
if (!(Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Wrangler CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    Write-Host "Or visit: https://developers.cloudflare.com/workers/wrangler/install-and-update/" -ForegroundColor Yellow
    exit 1
}

# Check if .env file exists
if (!(Test-Path ".env")) {
    Write-Host "📋 Copying .env.example to .env..." -ForegroundColor Blue
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please edit it with your local values." -ForegroundColor Green
    Write-Host "   For local development, uncomment the local Cloudflare values." -ForegroundColor Cyan
}

# Initialize D1 database if not exists
Write-Host "🗄️  Initializing Cloudflare D1 database..." -ForegroundColor Blue
wrangler d1 create farmers-boot-local 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "Database may already exist" -ForegroundColor Yellow }

# Run migrations
Write-Host "📄 Running database migrations..." -ForegroundColor Blue
wrangler d1 execute farmers-boot-local --file=schema.sql

Write-Host "✅ Local development environment is ready!" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "📋 Next steps:" -ForegroundColor Magenta
Write-Host "1. Edit .env with your local Cloudflare values" -ForegroundColor White
Write-Host "2. Run: npm run dev:local (starts frontend + functions locally)" -ForegroundColor White
Write-Host "3. Or run: npm run dev (frontend only) + npm run dev:functions (functions only)" -ForegroundColor White
Write-Host "4. Visit: http://localhost:8788" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "🔧 Useful commands:" -ForegroundColor Cyan
Write-Host "  - wrangler pages dev frontend --local    (start local Pages)" -ForegroundColor White
Write-Host "  - wrangler dev --local                   (start local functions)" -ForegroundColor White
Write-Host "  - wrangler d1 execute farmers-boot-local --command='SELECT * FROM farms;' (query DB)" -ForegroundColor White