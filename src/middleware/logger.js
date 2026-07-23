/**
 * Custom middleware for logging incoming API requests.
 * Logs: timestamp, HTTP method, original URL, and response status/time.
 */

function requestLogger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = requestLogger;
