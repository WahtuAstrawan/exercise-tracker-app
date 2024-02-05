require('dotenv').config();

const apiKeyChecker = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if(!apiKey || apiKey !== process.env.API_KEY){
        return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
    }

    next();
}

module.exports = apiKeyChecker;