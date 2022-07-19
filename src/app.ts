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

app.use(express.json());

app.use(router);
app.use(errorHandlerMiddleware);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
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
