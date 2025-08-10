import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Declare our own allowed string formats
type JwtExpireFormat = `${number}d` | `${number}h` | `${number}m` | `${number}s`;

// Use our type so TS knows it's valid
const JWT_EXPIRES_IN: number | JwtExpireFormat =
  (process.env.JWT_EXPIRES_IN as JwtExpireFormat) || "7d";

export interface JwtPayload {
  id: number;
  role: string;
}

export const generateToken = (payload: JwtPayload) => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
};



export const verifyToken = <T = any>(token: string): T => {
  return jwt.verify(token, JWT_SECRET) as T;
};
