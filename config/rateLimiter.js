const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
            error: "You have exceeded your 5 requests per minute limit",
        });
    }
});

module.exports = rateLimiter;