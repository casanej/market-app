export interface JwtUserData {
  sub: string;
  name: string;
  role: number;
  iat: number;
  exp: number;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  accessToken: string;
}