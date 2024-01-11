const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("hello world");
});

mongoose.connect("mongodb+srv://admin:amansinha@cluster0.qo9f4yk.mongodb.net/auth?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//signup
app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email, 
            password: req.body.password,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'duplicate' });
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email, 
            password: req.body.password,
        });

        if (user) {
            return res.json({ status: 'ok' });
        } else {
            return res.json({ status: 'error' }); 
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 'error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port `);
});
