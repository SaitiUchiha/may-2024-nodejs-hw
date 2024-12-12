import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { read, result, write } from "./services/fs.service";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const usersGet = await read();
    res.status(200).json(usersGet);
  } catch (e) {
    res.status(500).json(e.message);
  }
});
app.post("/users", async (req: Request, res: Response) => {
  try {
    const usersGet = await read();
    const newUser = {
      id: usersGet.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    usersGet.push(newUser);
    await write(usersGet);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
});
// app.delete('/users/:userId', async (req: Request, res:Response): Promise<void> => {
//     try {
//         const usersGet = await result();
//         const filteredUser = usersGet.filter(user => user.id === Number(req.params.userId));
//         if (filteredUser === -1) {
//             return res.status(404).json('User not found');
//         }
//         usersGet.splice(filteredUser, 1);
//         await write(usersGet);
//         res.sendStatus(204).json(usersGet);
//     } catch (e) {
//         res.status(500).json(e.message);
//     }
// });

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const usersGet = await result();
    const user = usersGet.find((user) => user.id === Number(req.params.userId));
    res.json(user);
    res.status(200);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// app.patch('/users/:userId', async (req: Request, res:Response): Promise<void> => {
//     const {
//         params: { userId },
//         body,
//     } = req;
//     const parseId = parseInt(userId);
//     if (isNaN(parseId)) return res.sendStatus(400);
//
//     const usersGet = await result();
//     const findUserIndex = usersGet.findIndex((user) => user.id === parseId);
//     if (findUserIndex === -1) return res.sendStatus(404);
//
//     usersGet[findUserIndex] = { ...usersGet[findUserIndex], ...body };
//
//     await write(usersGet);
//     return res.sendStatus(201).json(usersGet);
// });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
