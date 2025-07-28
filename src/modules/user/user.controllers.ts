import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { signupSchema, signinSchema } from "./user.validation";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey"; // Use environment variable for secret

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique constraint violation (e.g., email already exists)
      return res.status(409).json({ message: "Email already registered" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const validatedData = signinSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
