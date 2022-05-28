const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()
// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('manufacturer server worked')
})
app.listen(port, () => console.log('manufacturer port worked'));