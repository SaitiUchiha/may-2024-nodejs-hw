const express = require('express')
const dotenv = require('dotenv')
const users = require('./users.json');
dotenv.config({path:'.env'})

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));




app.get('/users', (req, res) => {
    res.status(200).json(users);
});
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    users.push(newUser)
    res.status(201).json(newUser);
});
app.delete('/users/:userId', (req, res) => {
    const filteredUser = users.filter(user => user.id !== Number(req.params.userId));
    res.sendStatus(204).json(filteredUser);
});

app.get('/users/:userId', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.userId));
    res.sendStatus(200).json(user);
});

app.patch('/users/:userId', (req, res) => {
    const {
        params: { userId },
        body,
    } = req;
    const parseId = parseInt(userId);
    if (isNaN(parseId)) return res.sendStatus(400);

    const findUserIndex = users.findIndex((user) => user.id === parseId);
    if (findUserIndex === -1) return res.sendStatus(404);

    users[findUserIndex] = { ...users[findUserIndex], ...body };

    return res.sendStatus(201).json(users);
});







const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server has been started on port ${port}`);
})