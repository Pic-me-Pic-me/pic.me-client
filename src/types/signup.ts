export interface SignUpInfo {
  emailInfo: EmailInfo;
  passwordInfo: PasswordInfo;
  passwordConfirmInfo: PasswordComfirmInfo;
}

export interface EmailInfo {
  email: string | null;
  isValid: boolean;
  errorMsg: string | null;
}
export interface PasswordInfo {
  password: string | null;
  isValid: boolean;
  errorMsg: string | null;
}

export interface PasswordComfirmInfo {
  isValid: boolean;
  errorMsg: string | null;
}

export interface DefaultNicknameInfo {
  typedNickname: string;
  state: 'default';
  finalNickname: null;
  errorMsg: null;
}

export interface ErrorNicknameInfo {
  typedNickname: string;
  state: 'error';
  finalNickname: null;
  errorMsg: string | null;
}
export interface PassNicknameInfo {
  typedNickname: string;
  state: 'pass';
  finalNickname: string;
  errorMsg: string;
}

export type NicknameInfo = DefaultNicknameInfo | ErrorNicknameInfo | PassNicknameInfo;

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
