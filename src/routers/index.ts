import animeRouter from "./animeRouter.js";
import userRouter from "./userRouter.js";
import { Router } from "express";

const router = Router();

router.use(animeRouter);
router.use(userRouter)

export default router;