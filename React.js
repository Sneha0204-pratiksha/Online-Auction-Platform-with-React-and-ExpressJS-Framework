/* Online Auction Platform - React (Frontend) and Express.js (Backend) */

// Backend: Express.js (server.js)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/auction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  startingBid: Number,
  currentBid: Number,
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Frontend: React (App.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  const addItem = () => {
    axios
      .post('http://localhost:5000/items', { name, description, startingBid, currentBid: startingBid })
      .then((response) => {
        setItems([...items, response.data]);
      });
  };

  return (
    <div>
      <h1>Online Auction Platform</h1>
      <div>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Starting Bid" type="number" onChange={(e) => setStartingBid(e.target.value)} />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name} - ${item.currentBid}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
