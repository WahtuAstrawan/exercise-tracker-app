const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "You have exceeded your 100 requests per minute limit",
    headers: true,
});

module.exports = rateLimiter;