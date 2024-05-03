import { IsEmail, IsString } from "class-validator";
import { AuthLoginRequest } from "market-app-bff-models";

export class AuthLoginDto implements AuthLoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
