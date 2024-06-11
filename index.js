import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from './Routes/authRoute.js';
import userRoute from './Routes/userRoute.js';
import doctorRoute from './Routes/doctorRoute.js';
import reviewRoute from './Routes/reviewRoute.js';
import bookingRoute from './Routes/bookingRoute.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const allowedOrigins = ['http://localhost:5173', 'https://heal-mate.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// const corsOptions = {
//     origin: 'http://localhost:5173', // Specify your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204
// };

app.get('/', (req, res) => {
    res.send("API is working")
})

// Database connection
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

// Middleware
// app.use(cors(corsOptions)); // Ensure CORS is applied before other middlewares and routes
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);

app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on ${port}`)
})
