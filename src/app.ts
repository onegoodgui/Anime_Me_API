import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";
import dotenv from "dotenv";
import { connectDb, disconnectDb } from "./config/database.js";
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

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
