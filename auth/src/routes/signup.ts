import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/reqeust-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    throw new DatabaseConnectionError();
    const { email, password } = req.body;
    console.log("Sign up User");
    res.send("Sign up User");
  }
);

export { router as signUpRouter };
