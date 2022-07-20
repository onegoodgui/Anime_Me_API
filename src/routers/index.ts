import animeRouter from "./animeRouter.js";
import userRouter from "./userRouter.js";
import { Router } from "express";

const router = Router();

router.use(animeRouter);
router.use(userRouter);
router.get("/health", (req, res) => {
  res.sendStatus(200);
});

export default router;
