const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

app.use(express.json());
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb+srv://Mydb:1Z3JsdwYucQQsUvD@cluster0.tzvbqwg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

  const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  app.use(cors(corsOptions));
  

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving users' });
    });
});


app.post('/users', (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating user' });
    });
});


app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findOne({ id: userId })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving user' });
    });
});



app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  User.findOneAndUpdate({ id: userId }, updatedUser, { new: true })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating user' });
    });
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findOneAndDelete({ id: userId })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting user' });
    });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
