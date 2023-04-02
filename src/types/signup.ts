export interface SignUpInfo {
  emailInfo: EmailInfo;
  passwordInfo: PasswordInfo;
  passwordConfirmInfo: PasswordComfirmInfo;
}

export interface EmailInfo {
  email: string | null;
  isValid: boolean;
  msg: string | null;
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
}

export interface ErrorNicknameInfo {
  typedNickname: string;
  state: 'error';
  errorMsg: string | null;
}
export interface PassNicknameInfo {
  typedNickname: string;
  state: 'pass';
  finalNickname: string;
  passMsg: string;
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
