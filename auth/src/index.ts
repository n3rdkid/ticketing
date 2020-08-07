import mongoose from "mongoose";
import { app } from "./app";
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT must be defined!");
    }

    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Auth DB is up and running.");
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Auth service listening at port :: ${PORT} !!`);
  });
};
start();
