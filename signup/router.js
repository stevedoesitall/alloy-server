import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.post("/", controller.user);

export { router as userRouter };