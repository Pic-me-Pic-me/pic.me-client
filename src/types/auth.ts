export interface UserInfo {
  userName: string;
  email: string;
}

export interface UserData {
  status: number;
  success: boolean;
  message: string;
  data: UserInfo;
}
