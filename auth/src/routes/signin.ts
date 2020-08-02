import express from "express";

const router = express.Router();

router.post("/signin", (req, res) => {
    console.log("SignIn User")
    res.send("Sign In")
})

export { router as signInRouter };