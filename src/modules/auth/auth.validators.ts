import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userEmail: z.string().email(),
  password: z.string().min(6),
  userPhoneNumber: z.string().optional(),
  role: z.enum(["SELLER","BUYER","ADMIN","SUPERADMIN","UN_VERIFIEDUSER"]).optional(),
  nationalIdNumber: z.string().optional(),
  nationalIdFront: z.string().optional(),
  nationalIdBack: z.string().optional(),
});

export const loginSchema = z.object({
  userEmail: z.string().email(),
  password: z.string().min(6),
});
