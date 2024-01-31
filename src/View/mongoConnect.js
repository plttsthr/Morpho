const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = "mongodb+srv://plttsthr:DLoW5dtwTiXVjTn4@users.zcchw8g.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'users';

MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('MongoDB connection error:', err);
    return;
  }

  console.log('Connected to MongoDB Atlas successfully!');
  
  const db = client.db(dbName);

  app.get('/check-connection', (req, res) => {
    console.log('Checking connection...');
    // Check if you are connected to the MongoDB server
    if (client.isConnected()) {
      res.status(200).json({ message: 'Connected to MongoDB server!' });
      console.log('Connected to MongoDB server!');
    } else {
      console.log('Not connected to MongoDB server.');
      res.status(500).json({ message: 'Not connected to MongoDB server.' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
