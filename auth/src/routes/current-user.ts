import express from "express";

const router = express.Router();

router.get("/currentuser", (req, res) => { 
    console.log("Current User")
    res.send("CURRENT USER")
})

export {router as currentUserRouter}