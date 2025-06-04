import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongo from './db/mongodb/mongodb.js';
import UserRoute from './routes/user/user.js';
import PasswordRoute from './routes/passwordreset/passwordreset.js';
import Products from './routes/products/products.js';
import Banner from './routes/banner/banner.js';

dotenv.config();

// const MONGO_URL = `mongodb+srv://${process.env.MONGO_CONNECT_URL_USER}:${process.env.MONGO_CONNECT_URL_PASS}@trango-db.0jcyp.mongodb.net/?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://localhost:27017/`;
connectToMongo(MONGO_URL);

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});
  
app.use('/api/user', UserRoute);
app.use('/api/password', PasswordRoute);
app.use('/api/products', Products);
app.use('/api/banner', Banner);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});