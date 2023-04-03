export const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
export const NICKNAME_MAX_LENGTH = 8;
export const POSSIBLE_EMAIL_MSG = '사용 가능한 이메일입니다.';
export const DUPLICATE_EMAIL_MSG = '이미 사용 중인 이메일입니다!';
export const POSSIBLE_NICKNAME_MSG = '사용 가능한 닉네임입니다.';
export const IMPOSSIBLE_NICKNAME_MSG = '이미 사용 중인 닉네임입니다.';
export const EMAIL_ERROR_MSG = '올바른 이메일 형식이 아닙니다!';
export const PASSWORD_ERROR_MSG = '영어,숫자,특수문자를 포함해 8-16자를 입력해주세요!';
export const PASSWORD_CONFIRM_ERROR_MSG = '비밀번호가 일치하지 않습니다!';
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;

export const initialSignupInfo = {
  emailInfo: {
    email: null,
    isValid: false,
    msg: null,
  },
  passwordInfo: {
    password: null,
    isValid: false,
    errorMsg: null,
  },
  passwordConfirmInfo: {
    isValid: false,
    errorMsg: null,
  },
};
