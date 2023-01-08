export interface SignUpInfo {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface NicknameInfo {
  username: string;
}

export interface SignUpPostInfo {
  dataInfo: AddAccountInfo;
  username: string;
}

export interface AddAccountInfo {
  email: string;
  password: string;
}
