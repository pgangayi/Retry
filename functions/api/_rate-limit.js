// Rate limiting middleware for Pages Functions
// Uses Cloudflare KV for distributed rate limiting

export class RateLimiter {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async checkLimit(identifier, limit = 100, windowMs = 60000) { // 100 requests per minute default
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get current requests in window
    const requests = await this.env.RATE_LIMIT_KV?.get(key);
    let requestData = requests ? JSON.parse(requests) : { count: 0, resetTime: now + windowMs };

    // Reset if window has passed
    if (now > requestData.resetTime) {
      requestData = { count: 0, resetTime: now + windowMs };
    }

    // Check if limit exceeded
    if (requestData.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: requestData.resetTime,
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      };
    }

    // Increment counter
    requestData.count++;

    // Store updated data
    await this.env.RATE_LIMIT_KV?.put(key, JSON.stringify(requestData), {
      expirationTtl: Math.ceil(windowMs / 1000)
    });

    return {
      allowed: true,
      remaining: limit - requestData.count,
      resetTime: requestData.resetTime
    };
  }
}

export function withRateLimit(handler, options = {}) {
  const {
    limit = 100, // requests per window
    windowMs = 60000, // 1 minute
    identifierFn = (request) => {
      // Default: rate limit by IP address
      return request.headers.get('CF-Connecting-IP') ||
             request.headers.get('X-Forwarded-For') ||
             'unknown';
    },
    skipFn = () => false // function to skip rate limiting
  } = options;

  return async (context) => {
    const { request, env } = context;

    if (skipFn(request)) {
      return handler(context);
    }

    const identifier = identifierFn(request);
    const rateLimiter = new RateLimiter(null, env);

    const result = await rateLimiter.checkLimit(identifier, limit, windowMs);

    if (!result.allowed) {
      return new Response(JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: result.retryAfter
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': result.retryAfter.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': new Date(result.resetTime).toISOString()
        }
      });
    }

    // Add rate limit headers to response
    const response = await handler(context);

    // Clone response to add headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    newResponse.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    return newResponse;
  };
}