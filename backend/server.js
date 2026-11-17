require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');                          // NEW
const mongoSanitize = require('express-mongo-sanitize');    // NEW
const rateLimit = require('express-rate-limit'); 
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // NEW
const categoryRoutes = require('./routes/categoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const articleRoutes = require('./routes/articleRoutes');
const sitemapRoutes = require('./routes/sitemapRoutes');

if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be configured before starting the API');
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be configured with at least 32 characters before starting the API');
}

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

app.use('/api', (req, res, next) => {
  const isMutation = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
  const origin = req.get('origin');
  if (isMutation && (!origin || !allowedOrigins.includes(origin))) {
    return res.status(403).json({ message: 'Request origin is not allowed' });
  }
  next();
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' }
});

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/analytics', analyticsRoutes); // NEW
app.use('/api/categories', categoryRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/articles', articleRoutes);
app.use('/sitemap.xml', sitemapRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`BookishVerse API running on port ${PORT}`));
});
