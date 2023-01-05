export interface SignUpInfo {
  user_id: string;
  password: string;
  passwordConfirm: string;
}

export interface NicknameInfo {
  nickname: string;
}

export interface SignUpPostInfo {
  dataInfo: AddAccountInfo;
  nickname: string;
}

export interface AddAccountInfo {
  user_id: string;
  password: string;
}
