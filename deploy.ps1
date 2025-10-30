# Farmers Boot Deployment Script for Windows
# This script deploys the application to Cloudflare Pages

param(
    [switch]$SkipBuild,
    [switch]$DryRun
)

Write-Host "🚀 Starting Farmers Boot deployment..." -ForegroundColor Green

# Check if wrangler is installed
if (!(Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Wrangler CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Check if environment variables are set
$requiredVars = @("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY")
$missingVars = @()

foreach ($var in $requiredVars) {
    if (!(Test-Path "env:$var") -or [string]::IsNullOrEmpty((Get-Item "env:$var").Value)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "❌ Required environment variables not set. Please set:" -ForegroundColor Red
    foreach ($var in $missingVars) {
        Write-Host "  - $var" -ForegroundColor Yellow
    }
    Write-Host "  - SENTRY_DSN (optional)" -ForegroundColor Gray
    Write-Host "  - RATE_LIMIT_KV_ID (optional)" -ForegroundColor Gray
    exit 1
}

# Build the frontend
if (!$SkipBuild) {
    Write-Host "📦 Building frontend..." -ForegroundColor Blue
    Push-Location frontend
    npm run build
    Pop-Location
}

# Deploy to Cloudflare Pages
if (!$DryRun) {
    Write-Host "☁️  Deploying to Cloudflare Pages..." -ForegroundColor Blue
    wrangler pages deploy frontend/dist --compatibility-date 2024-01-01
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host "🌐 Your app should be available at your Cloudflare Pages URL" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Magenta
    Write-Host "1. Set environment variables in Cloudflare Dashboard" -ForegroundColor White
    Write-Host "2. Run health check: curl https://your-domain.pages.dev/health" -ForegroundColor White
    Write-Host "3. Test the application functionality" -ForegroundColor White
} else {
    Write-Host "🔍 Dry run - would execute:" -ForegroundColor Yellow
    Write-Host "wrangler pages deploy frontend/dist --compatibility-date 2024-01-01" -ForegroundColor Gray
}