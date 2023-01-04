export interface SignUpInfo {
  user_id: string;
  password: string;
  passwordConfirm: string;
}

export interface NicknameInfo {
  nickname: string;
}

export interface UserInfo {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  refreshToken: string;
}

export interface LoginType {
  provider_key: string;
  user_id: number;
  provider_type: string;
}
