# Farmers Boot - Phase 4: Deployment & Monitoring Guide

## Overview

Phase 4 introduces production-ready deployment, monitoring, and automation capabilities to the Farmers Boot application. This includes background workers, audit logging, rate limiting, Sentry monitoring, and comprehensive testing.

## Architecture

- **Frontend**: React + TypeScript + Vite, deployed to Cloudflare Pages
- **Backend**: Cloudflare Pages Functions with Supabase
- **Database**: Supabase PostgreSQL with PostGIS
- **Monitoring**: Sentry for error tracking
- **Rate Limiting**: Cloudflare KV-based rate limiting
- **Testing**: Playwright for E2E tests, Vitest for unit tests

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Supabase Project**: Create at [supabase.com](https://supabase.com)
3. **Wrangler CLI**: `npm install -g wrangler`
4. **Node.js**: Version 18 or higher

## Environment Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd farmers-boot-retry
npm install
cd frontend && npm install && cd ..
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (keep secret!)
- `SENTRY_DSN`: Sentry DSN for error tracking (optional)
- `RATE_LIMIT_KV_ID`: Cloudflare KV namespace ID (optional)

### 3. Database Setup

Run migrations in order:

```bash
# Apply all migrations
psql "$SUPABASE_DB_URL" -f migrations/0001_enable_postgis.sql
psql "$SUPABASE_DB_URL" -f migrations/0002_core_inventory_finance.sql
psql "$SUPABASE_DB_URL" -f migrations/0003_operations_idempotency_and_rls.sql
psql "$SUPABASE_DB_URL" -f migrations/0004_fn_apply_treatment.sql
psql "$SUPABASE_DB_URL" -f migrations/0005_audit_logs_and_operations.sql
```

## Deployment

### Automated Deployment

#### Unix/Linux/macOS:
```bash
npm run deploy
```

#### Windows:
```bash
npm run deploy:windows
```

### Manual Deployment

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   ```bash
   wrangler pages deploy frontend/dist --compatibility-date 2024-01-01
   ```

### Cloudflare Dashboard Configuration

After deployment, configure these in your Cloudflare Pages project:

1. **Environment Variables:**
   - Go to Pages → [Your Project] → Settings → Environment variables
   - Add all variables from `.env.example`

2. **KV Namespace (for Rate Limiting):**
   - Go to Workers → KV
   - Create namespace: `farmers-boot-rate-limit`
   - Copy the namespace ID to `RATE_LIMIT_KV_ID`

3. **Custom Domain (Optional):**
   - Add your custom domain in Pages settings

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific test
npx playwright test treatment-flow.spec.ts
```

## Monitoring & Health Checks

### Health Check Endpoint
```bash
curl https://your-domain.pages.dev/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "checks": {
    "supabase": "ok",
    "kv": "ok"
  }
}
```

### Sentry Monitoring

Errors are automatically captured and sent to Sentry. Configure:
1. Create project at [sentry.io](https://sentry.io)
2. Add DSN to environment variables
3. Monitor errors in Sentry dashboard

### Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via `RATE_LIMIT_KV_ID`
- Headers returned: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Background Workers & Automation

### Event-Driven Processing

The application includes background workers that automatically:

1. **Finance Entries**: When treatments are applied, finance entries are created
2. **Procurement Tasks**: Low inventory triggers automatic procurement tasks
3. **Audit Logging**: All mutations are logged with user context

### Webhook Configuration

Set up webhooks in Supabase Dashboard:
- URL: `https://your-domain.pages.dev/api/webhooks/events`
- Events: `treatment.applied`, `inventory.low`
- Method: POST

## Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   cd frontend && npm install && npm run build
   ```

2. **Environment Variables:**
   - Ensure all required variables are set
   - Check Cloudflare Pages environment variables

3. **Database Connection:**
   - Verify Supabase credentials
   - Check RLS policies

4. **Rate Limiting Issues:**
   - Verify KV namespace ID
   - Check rate limit headers in responses

### Logs & Debugging

- **Cloudflare Logs:** Pages → [Project] → Functions → Logs
- **Sentry:** Check error dashboard
- **Local Development:** Use `npm run dev`

## Security Considerations

- Never commit service role keys to version control
- Use environment variables for all secrets
- Enable RLS (Row Level Security) in Supabase
- Regularly rotate API keys
- Monitor for unusual activity patterns

## Performance Optimization

- **Caching**: Static assets cached by Cloudflare
- **Database**: Use indexes on frequently queried columns
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **Monitoring**: Proactive issue detection

## Support

For issues or questions:
1. Check this documentation
2. Review Cloudflare Pages Functions logs
3. Check Sentry for application errors
4. Verify database connectivity

---

**Phase 4 Complete**: Your Farmers Boot application is now production-ready with automation, monitoring, and comprehensive testing! 🚀