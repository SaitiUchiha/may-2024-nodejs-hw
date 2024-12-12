import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";
// import { read, result, write } from "./services/fs.service";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status ?? 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
