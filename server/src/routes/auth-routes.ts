import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  const match = await bcrypt.compare(password, user?.password || "");
  if (user && match) {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
