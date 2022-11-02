const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // eta na likhle environment variable pabo na
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

//mongodb atlas connection code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qlhnchw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//from crud documents
async function run() {
    try {
        const productCollection = client.db("emaJohn").collection("products");

        // 1.
        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            const count = await productCollection.estimatedDocumentCount() //total koyta page ache
            res.send({count, products})
        })

    }

    finally {

    }
}
run().catch(err=>{
    console.error(err)
});


//primary step
app.get('/', (req, res) => {
    res.send('ema-john-server is running')
})

app.listen(port, () => {
    console.log(`ema john running on port ${port}`);
})