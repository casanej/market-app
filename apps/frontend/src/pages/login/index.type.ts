import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface LoginFormFields {
  email: string;
  currentPassword: string;
}

export const schemaResolverFormLogin = zodResolver(z.object({
  email: z.string().email().min(1),
  currentPassword: z.string().min(8),
}));
