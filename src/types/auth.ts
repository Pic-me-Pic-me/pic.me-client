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

export interface UserInfo {
  uid: number;
  email: string;
  isUser: boolean;
}

export interface UserTokenInfo {
  id: number;
  userName: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface MemberData {
  userName: string;
  email: string;
}
