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
export interface forgetPasswordDTO {
  userEmail : string;
}
export interface resetPasswordDTO {
  resetCode : string;
  newPassword : string;
  userEmail : string;
}
export interface uploadNationalIdDTO {
  nationalIdFront : string;
  nationalIdBack : string;
  userEmail : string;
  nationalIdNumber : string;
}