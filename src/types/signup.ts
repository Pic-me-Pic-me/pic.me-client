export interface SignUpInfo {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface NicknameInfo {
  nickname: string;
}

export interface SignUpPostInfo {
  dataInfo: AddAccountInfo;
  username: string;
}

export interface AddAccountInfo {
  email: string;
  password: string;
}

export interface KakaoSignupPostInfo {
  uid: string;
  socialType: string;
  userName: string;
  email: string;
}

export interface KakaoAddNicknameInfo {
  uid: string;
  socialType: string;
  email: string;
}
