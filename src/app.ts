import cors from "cors";
import express from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from 'dotenv'
// import recommendationRouter from "./routers/recommendationRouter.js";
// import testsRouter from "./routers/testsRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorHandlerMiddleware);

// if (process.env.NODE_ENV) {
//   console.log("cypress testing");
//   app.use("/tests", testsRouter);
// }

export default app;