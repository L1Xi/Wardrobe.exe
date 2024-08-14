const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const port = 3000;

// MongoDB setup
mongoose.connect('mongodb://localhost/wardrobe', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const itemSchema = new mongoose.Schema({
    userId: String,
    category: String,
    image: String
});
const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Google OAuth setup
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

// Verify Google Token
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'YOUR_GOOGLE_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    return payload.sub;
}

// Routes
app.post('/upload', async (req, res) => {
    const { token, category, image } = req.body;
    try {
        const userId = await verify(token);
        const newItem = new Item({ userId, category, image });
        await newItem.save();
        res.status(200).send('Item saved');
    } catch (error) {
        res.status(400).send('Error saving item');
    }
});

app.get('/items', async (req, res) => {
    const { token } = req.query;
    try {
        const userId = await verify(token);
        const items = await Item.find({ userId });
        res.status(200).json(items);
    } catch (error) {
        res.status(400).send('Error fetching items');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
