import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { RegisterDTO, LoginDTO } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const register = async (data: RegisterDTO) => {
    // Check existing email or nationalIdNumber uniqueness
    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                { userEmail: data.userEmail },
                data.nationalIdNumber ? { nationalIdNumber: data.nationalIdNumber } : undefined,
            ].filter(Boolean) as any[],
        },
    });

    if (existing) throw new Error("Email or national ID already registered");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber ?? "",
            userHashedPassword: hashed,
            role: data.role ?? "UN_VERIFIEDUSER",
            nationalIdNumber: data.nationalIdNumber,
            nationalIdFront: data.nationalIdFront,
            nationalIdBack: data.nationalIdBack,
        },
    });

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET as jwt.Secret,
        { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );

    // strip password before returning
    // (prisma returns the fields; but we don't include userHashedPassword)
    // You can return selected fields instead
    const { userHashedPassword, ...safeUser } = (user as any);

    return { user: safeUser, token };
};

export const login = async (data: LoginDTO) => {
    const user = await prisma.user.findUnique({
        where: { userEmail: data.userEmail },
    });

    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(data.password, user.userHashedPassword);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET as jwt.Secret,
        { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );
    const { userHashedPassword, ...safeUser } = (user as any);
    return { user: safeUser, token };
};
