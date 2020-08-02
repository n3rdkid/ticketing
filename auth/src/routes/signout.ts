import express from "express";

const router = express.Router();

router.post("/signout", (req, res) => {
    console.log("Sign out User")
    res.send("Sign out")
})

export { router as signOutRouter };