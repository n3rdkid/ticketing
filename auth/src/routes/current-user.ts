import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/currentuser", (req, res) => {
  if (!req.session?.token) {
    return res.send({ currentuser: null });
  }
  try {
    const payload = jwt.verify(req.session.token, process.env.JWT_KEY!);
    res.send({ currentuser: payload });
  } catch (error) {
    res.send({ currentuser: null });
  }
});

export { router as currentUserRouter };
