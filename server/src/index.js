require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const restrictInDemo = require('./middleware/demoMiddleware');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://dealflow-demo.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS not allowed'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(fileUpload());

// Demo Restriction Global Middleware
app.use('/api', restrictInDemo);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));

// Config route for demo mode check
app.get('/api/config/demo', (req, res) => {
    res.json({ demoMode: process.env.DEMO_MODE === 'true' });
});

app.get('/', (req, res) => {
    res.send('DealFlow API is running...');
});

// Custom 404 for debugging
app.use((req, res, next) => {
    console.log(`[404 DEBUG] Unmatched ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: `Route ${req.originalUrl} not found on this server` });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
