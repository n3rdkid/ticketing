import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-hander";
import { NotFoundError } from "./errors/not-found-errors";
import { Mongoose } from "mongoose";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", currentUserRouter);
app.use("/api/users", signInRouter);
app.use("/api/users", signOutRouter);
app.use("/api/users", signUpRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Auth DB is up and running.")
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Auth service listening at port :: ${PORT} !!`);
  });
};
start();
