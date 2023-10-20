const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/saveImage', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('your-database-name');
    const collection = database.collection('your-collection-name');

    const { title, imageData } = req.body;

    const image = {
      title: title,
      image: {
        data: Buffer.from(imageData, 'base64'),
        contentType: 'image/jpeg' // Adjust this based on the image type
      }
    };

    const result = await collection.insertOne(image);
    console.log(`Image inserted with id: ${result.insertedId}`);
    res.status(200).send('Image saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
