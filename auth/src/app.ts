import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-hander";
import { NotFoundError } from "./errors/not-found-errors";
import { Mongoose } from "mongoose";
const app = express();
//Making express aware that behind our proxy is Ingress nginx so trust the proxy
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use("/api/users", currentUserRouter);
app.use("/api/users", signInRouter);
app.use("/api/users", signOutRouter);
app.use("/api/users", signUpRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
