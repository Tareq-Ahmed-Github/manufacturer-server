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
    const ordersCollection = client.db("bike-hunt").collection("orders");
    const usersCollection = client.db("bike-hunt").collection("users");

    app.get("/tools", async (req, res) => {
      const tools = await toolsCollection.find({}).toArray();
      console.log(tools);
      res.send(tools);
    });

    app.get('/tools/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productsCollection.findOne(query);
      res.send(product);
  })

    app.put("/tools/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: data };
      const option = { upsert: true };

      const result = await servicesCollection.updateOne(
        filter,
        updateDoc,
        option
      );

      res.send(result);
    });

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedDoc = {
          $set: user,
      };
      const result = await usersCollection.updateOne(filter, updatedDoc, options);
      res.send({ result });
  })


  app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users);
  });

  // make admin 
  app.put('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updatedDoc = {
          $set: { role: 'admin' },
      };
      const result = await usersCollection.updateOne(filter, updatedDoc);
      res.send(result);
  })

  app.post('/orders', async (req, res) => {
      const order = req.body
      const result = await ordersCollection.insertOne(order);
      res.send(result)
  })
  //get
  app.get('/orders', async (req, res) => {
      const query = {};
      const cursor = ordersCollection.find(query);
      const order = await cursor.toArray();
      res.send(order);
  });

    app.delete("/tools/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);

      res.send(result);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('manufacturer server worked')
})
app.listen(port, () => console.log('manufacturer port worked'));