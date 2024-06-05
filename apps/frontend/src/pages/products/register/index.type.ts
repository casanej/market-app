import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface ProductRegisterFormFields {
  code: string;
  brand: string;
  name: string;
  content: string;
  contentType: string;
  image: string;
  showName: string;
}

export const schemaResolverFormProductRegister = zodResolver(z.object({
  code: z.string().min(13),
  brand: z.string().min(1),
  name: z.string().min(1),
  content: z.string().min(1),
  contentType: z.string().min(1),
  image: z.string().url().optional().or(z.literal('')),
  showName: z.string().min(1),
}));