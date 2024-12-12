const express = require('express')
const dotenv = require('dotenv')
const users = require('./fs.service.js');
dotenv.config({path:'.env'})

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));




app.get('/users', async (req, res) => {
    try {
        const usersGet = await users.read();
        res.status(200).json(usersGet);
    } catch (e) {
        res.status(500).json(e.message);
    }
});
app.post('/users', async (req, res) => {
    try {
        const usersGet = await users.read();
        const newUser = {
            id: usersGet.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        usersGet.push(newUser);
        await users.write(usersGet);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json(e.message);
    }
});
app.delete('/users/:userId', async (req, res) => {
    try {
        const usersGet = await users.read();
        const filteredUser = usersGet.filter(user => user.id !== Number(req.params.userId));
        await users.write(filteredUser);
        res.sendStatus(204).json(usersGet);
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const usersGet = await users.read();
        const user = usersGet.find(user => user.id === Number(req.params.userId));
        if (!user) return res.sendStatus(404);
        res.json(user);
        res.status(200);
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.patch('/users/:userId', async (req, res) => {
    const {
        params: { userId },
        body,
    } = req;
    const parseId = parseInt(userId);
    if (isNaN(parseId)) return res.sendStatus(400);

    const usersGet = await users.read();
    const findUserIndex = usersGet.findIndex((user) => user.id === parseId);
    if (findUserIndex === -1) return res.sendStatus(404);

    usersGet[findUserIndex] = { ...usersGet[findUserIndex], ...body };

    await users.write(usersGet);
    return res.sendStatus(201).json(usersGet);
});







const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server has been started on port ${port}`);
})