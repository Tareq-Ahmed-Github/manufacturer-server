const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ian6n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toolsCollection = client.db("bike-hunt").collection("tools");

    app.get("/tools", async (req, res) => {
      const tools = await toolsCollection.find({}).toArray();
      console.log(tools);
      res.send(tools);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('manufacturer server worked')
})
app.listen(port, () => console.log('manufacturer port worked'));