import express from 'express'
import cors from 'cors';
import connectDB from './db/index.js'
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});


const app = express();
app.use(cors());
app.use(express.json());



connectDB()
// connectDB().catch((err) => {
//   console.error('MongoDB connection failed:', err);
// });

app.post('/register', (req, res) => {
    console.log('Received data:', req.body);
    res.status(200).json({ message: 'Registration successful' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`Server is running on  http://localhost:${PORT}`))


export {app};