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

const corsOptions = {
    origin: true
};

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
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);

app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on ${port}`)
})
