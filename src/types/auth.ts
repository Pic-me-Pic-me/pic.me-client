export interface LoginType {
  provider_key: string;
  user_id: number;
  provider_type: string;
}

export interface RefreshType {
  status: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserData {
  status: number;
  success: boolean;
  message: string;
  data: UserInfo;
}

export interface UserInfo {
  uid: string;
  email: string;
  isUser: boolean;
}

export interface UsersResponse {
  data: UserInfo;
}

export interface UserTokenInfo {
  id: number;
  userName: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserToken {
  data: UserTokenInfo;
}

declare global {
  interface Window {
    Kakao: any; // 👈️ turn off type checking
  }
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface MemberData {
  userName: string;
  email: string;
}
