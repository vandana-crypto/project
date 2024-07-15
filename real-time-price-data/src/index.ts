import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/stockdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model
const stockSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    timestamp: Date,
});

const Stock = mongoose.model('Stock', stockSchema);

// Fetch and store data
const fetchData = async () => {
    const symbols = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'bitcoin-cash'];
    for (const symbol of symbols) {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
            const price = response.data[symbol].usd;
            const newStock = new Stock({ symbol, price, timestamp: new Date() });
            await newStock.save();
        } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
        }
    }
};

setInterval(fetchData, 5000);

app.get('/data/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const data = await Stock.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
