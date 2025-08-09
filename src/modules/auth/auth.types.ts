export interface RegisterDTO {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhoneNumber?: string;
  password: string;
  role?: "SELLER" | "BUYER" | "ADMIN" | "SUPERADMIN" | "UN_VERIFIEDUSER";
  nationalIdNumber?: string;
  nationalIdFront?: string;
  nationalIdBack?: string;
}

export interface LoginDTO {
  userEmail: string;
  password: string;
}
