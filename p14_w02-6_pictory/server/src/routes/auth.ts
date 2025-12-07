import { Router } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/User.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password, nickname } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
        // Check if user already exists
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        // Hash password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = userRepository.create({
            email,
            password_hash,
            nickname,
            // provider defaults to 'local'
        });
        await userRepository.save(newUser);

        // Omit password_hash from the response for security
        const { password_hash: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({ message: "User registered successfully.", user: userWithoutPassword });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
