import connectToMongo from './db/db.js';
import express from 'express';
import cors from 'cors';
import ContactFormSubmit from './routes/contactform.js';
import Products from './routes/products.js';
import Orders from './routes/orderform.js';
import dotenv from 'dotenv';
import Banner from "./routes/banner.js";

dotenv.config();

const Mongo_URL = `mongodb+srv://${process.env.MONGO_CONNECT_URL_USER}:${process.env.MONGO_CONNECT_URL_PASS}@trango-db.0jcyp.mongodb.net/?retryWrites=true&w=majority`;
connectToMongo(Mongo_URL);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// Available Routes
app.use('/api/contactform', ContactFormSubmit);
app.use('/api/products', Products);
app.use('/api/orders', Orders);
app.use('/api/banner', Banner);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});