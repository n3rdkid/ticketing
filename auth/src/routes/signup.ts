import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/signup", [body('email').isEmail().withMessage("Email must be provided!"), body('password').trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters!")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array())
    }


    const { email, password } = req.body;
    console.log("Sign up User")
    res.send("Sign up User")
})

export { router as signUpRouter };