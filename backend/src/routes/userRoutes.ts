import express, { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; //npm install @types/jsonwebtoken
import userModel from "../models/user";
import RefreshToken from "../models/token";
 
const router = express.Router();

const signedUpBody = z.object({
    username: z.string().min(1, {message: "Name cannot be empty"}).max(50),
    email: z.string().email(),
    password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), { // Customize special characters as needed
      message: 'Password must contain at least one special character',
    })
});

router.post("/signup", async(req: Request, res:Response): Promise<void> => {
    const validationResult = signedUpBody.safeParse(req.body);
    if(!validationResult.success) {
        return void res.status(403).json({
            msg: validationResult.error.errors
        })
    }

    const existingUser = await userModel.findOne({ email: req.body.email })
    if(existingUser) {
      return void res.status(403).json({
        msg: "User already exists."
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userProfile = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await userProfile.save();

    res.status(200).json({
        msg: "User created successfully"
    })
});

function generateAccessToken(user: { userId: string }) {
  return jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1m" });
}

function generateRefreshToken(user: { userId: string }) {
  return jwt.sign({userId: user.userId}, process.env.REFRESH_TOKEN_SECRET as string)
}

const loginBody = z.object({
  email: z.string({ required_error: "email is incorrect" }).nonempty({ message: "email is required" }).email({ message: "Please provide a valid email address" }),
  password: z.string({ required_error: "Password is incorrect" }).nonempty({ message: "Password is required" })
})

router.post("/login", async (req: Request, res: Response) => {
  const { success, error } = loginBody.safeParse(req.body);
  if (!success) {
    return void res.status(403).json({
      msg: error.message,
    });
  }

  const existingUser = await userModel.findOne({ email: req.body.email });
  if (!existingUser) {
    return void res.status(403).json({
      msg: "User does not exist",
    });
  }

  const isMatch = await bcrypt.compare(req.body.password as string, existingUser.password as string);
  if (!isMatch) {
    return void res.status(400).json({
      msg: "Invalid Credentials",
    });
  }

  const accessToken = generateAccessToken({ userId: existingUser._id.toString() });
  const refreshToken = generateRefreshToken({ userId: existingUser._id.toString() });

  const newRefreshToken = new RefreshToken({ token: refreshToken });
  await newRefreshToken.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    msg: "Login Successful",
    userId: existingUser._id,
    accessToken,
  });
});


router.post("/refreshToken", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return void res.status(401).json({
      msg: "Refresh Token is required.",
    });
  }

  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) {
    return void res.status(403).json({
      msg: "Invalid Refresh Token",
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;

  const accessToken = generateAccessToken({ userId: decoded.userId });

  res.json({ accessToken });
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" }); // or wherever you are storing it
  res.status(200).json({ message: "Logged out successfully" });
});


export default router;