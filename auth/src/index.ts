import express from "express";
import { currentUserRouter } from "./routes/current-user"
import { signInRouter} from "./routes/signin"
import { signOutRouter } from "./routes/signout"
import { signUpRouter } from "./routes/signup"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users",currentUserRouter);
app.use("/api/users",signInRouter);
app.use("/api/users",signOutRouter);
app.use("/api/users",signUpRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Auth service listening at port :: ${PORT} !!`)
})