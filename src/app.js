import cors from "cors";
import express from "express";
import { userRouter } from "../signup/router.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Hi");
});

app.use("/signup", userRouter);

export default app;