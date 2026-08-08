import cors from 'cors';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // If no origin (e.g. server-to-server, curl, Postman), allow it
    if (!origin) return callback(null, true);
    // Return exact origin string so Access-Control-Allow-Origin equals the requesting origin
    return callback(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
});
