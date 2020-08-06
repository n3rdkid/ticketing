import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/currentuser", (req, res) => {
  console.log("CURRENT USER");
  if (!req.session?.token) {
    console.log("JWT NOT SET");
    return res.send({ currentuser: null });
  }
  try {
    const payload = jwt.verify(req.session.token, process.env.JWT_KEY!);
    console.log(payload);
    console.log("PAYLOAD");
    res.send({ currentuser: payload });
  } catch (error) {
    console.log("CURRENT USER ERROR");
    console.log(error);
    res.send({ currentuser: null });
  }
});

export { router as currentUserRouter };
