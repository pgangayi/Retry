# Farmers Boot Deployment Script for Windows
# This script deploys the application to Cloudflare Pages

param(
    [switch]$SkipBuild,
    [switch]$DryRun
)

Write-Host "Starting Farmers Boot deployment..." -ForegroundColor Green

# Check if wrangler is installed
if (!(Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Host "Wrangler CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Check if Cloudflare credentials are set
$requiredVars = @("CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN")
$missingVars = @()

foreach ($var in $requiredVars) {
    if (!(Test-Path "env:$var") -or [string]::IsNullOrEmpty((Get-Item "env:$var").Value)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "Required Cloudflare environment variables not set. Please set:" -ForegroundColor Red
    foreach ($var in $missingVars) {
        Write-Host "  - $var" -ForegroundColor Yellow
    }
    exit 1
}

# Build the frontend
if (!$SkipBuild) {
    Write-Host "Building frontend..." -ForegroundColor Blue
    Push-Location frontend
    npm run build
    Pop-Location
}

# Initialize D1 database if needed
if (!$DryRun) {
    Write-Host "Checking D1 database..." -ForegroundColor Blue
    try {
        $dbExists = wrangler d1 list 2>$null | Select-String "farmers-boot-prod"
        if (!$dbExists) {
            Write-Host "Creating D1 database..." -ForegroundColor Yellow
            wrangler d1 create farmers-boot-prod
        }

        Write-Host "Running database migrations..." -ForegroundColor Blue
        wrangler d1 execute farmers-boot-prod --file=schema.sql --local
    } catch {
        Write-Host "D1 database setup failed. You may need to:" -ForegroundColor Yellow
        Write-Host "   - Check your API token permissions" -ForegroundColor White
        Write-Host "   - Create the database manually: wrangler d1 create farmers-boot-prod" -ForegroundColor White
        Write-Host "   - Run migrations manually: wrangler d1 execute farmers-boot-prod --file=schema.sql" -ForegroundColor White
    }
}

# Deploy to Cloudflare Pages
if (!$DryRun) {
    Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Blue
    wrangler pages deploy frontend/dist --project-name farmers-boot
    Write-Host "Deployment complete!" -ForegroundColor Green
    Write-Host "Your app should be available at your Cloudflare Pages URL" -ForegroundColor Cyan
} else {
    Write-Host "Dry run - would execute:" -ForegroundColor Yellow
    Write-Host "wrangler d1 create farmers-boot-prod" -ForegroundColor Gray
    Write-Host "wrangler d1 execute farmers-boot-prod --file=schema.sql --local" -ForegroundColor Gray
    Write-Host "wrangler pages deploy frontend/dist --project-name farmers-boot" -ForegroundColor Gray
}