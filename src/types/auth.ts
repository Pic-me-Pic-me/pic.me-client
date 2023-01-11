// export interface UserInfo {
//   user_id: number;
//   user_name: string;
//   email: string;
//   password: string;
//   refreshToken: string;
// }

// export interface LoginType {
//   provider_key: string;
//   user_id: number;
//   provider_type: string;
// }

export interface UserInfo {
  userName: string;
  email: string;
}

export interface UsersResponse {
  status: number;
  success: boolean;
  message: string;
  data: UserInfo;
}

export interface UserToken {
  status: number;
  success: boolean;
  message: string;
  data: UserInfo;
}

export interface LoginInfo {
  id: number;
  user_name: string;
  accessToken: string;
  refreshToken: string;
}

export interface DeleteUserInfo {
  status: number;
  success: boolean;
  message: string;
}
