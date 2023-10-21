const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create the schema
const imageSchema = new mongoose.Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

// Create a model using the schema
const ImageModel = mongoose.model('Image', imageSchema);

// Handle POST requests to save the image
app.post('/saveImage', async (req, res) => {
  try {
    const { title, imageData } = req.body;

    const image = new ImageModel({
      title: title,
      image: {
        data: Buffer.from(imageData, 'base64'),
        contentType: 'image/jpeg', // Adjust this based on the image type
      },
    });

    await image.save();
    console.log(`Image inserted with id: ${image._id}`);
    res.status(200).send('Image saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
