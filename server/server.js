const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── GZIP Compression (compress all responses >1kb) ─────────────────────────
app.use(compression({
    level: 6,           // balanced speed vs ratio
    threshold: 1024,    // only compress responses > 1kb
}));

// CORS Configuration
const allowedOrigins = [
    'https://svasc-eta.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000'
];

if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL.trim().replace(/\/$/, ''));
}

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.includes('localhost')
        ) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static Assets with long-term caching ───────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '7d',         // cache uploaded files for 7 days in browser
    etag: true,           // ETag for conditional revalidation
    lastModified: true,
}));

// ─── API Response Cache-Control Headers (short TTL for dynamic content) ──────
app.use('/api', (req, res, next) => {
    if (req.method === 'GET') {
        // Allow browsers & CDN to cache GET API responses for 60s, stale-while-revalidate for 300s
        res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    } else {
        // Mutations must never be cached
        res.setHeader('Cache-Control', 'no-store');
    }
    next();
});

// ─── Database Connection ─────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    // Connection pool: handle concurrent requests without waiting
    maxPoolSize: 10,
    minPoolSize: 2,
})
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err.message));

// Health Check & Root Routes
app.get('/', (req, res) => {
    res.status(200).send('API is running...');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Global Error Handler (Guarantees JSON error response)
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (0.0.0.0:${PORT})`);
    // Render Free Tier Keep-Alive: Ping self every 14 minutes to prevent idle spin-down
    const externalUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
    if (externalUrl) {
        const keepAliveUrl = `${externalUrl.replace(/\/+$/, '')}/health`;
        const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes
        setInterval(() => {
            try {
                const httpModule = keepAliveUrl.startsWith('https') ? require('https') : require('http');
                httpModule.get(keepAliveUrl, (res) => {
                    console.log(`[Keep-Alive] Pinged ${keepAliveUrl} - Status: ${res.statusCode}`);
                }).on('error', (err) => {
                    console.warn('[Keep-Alive] Ping note:', err.message);
                });
            } catch (e) {
                // Ignore keepalive error
            }
        }, INTERVAL_MS);
    }
});
