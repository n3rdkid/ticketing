import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/reqeust-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be provided!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters!"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use!");
    }
    const user = User.build({ email, password });
    await user.save();
    res.status(201).json(user);
  }
);

export { router as signUpRouter };
