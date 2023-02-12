export const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
export const NICKNAME_MAX_LENGTH = 8;
export const POSSIBLE_NICKNAME_MSG = '사용 가능한 닉네임입니다.';
export const IMPOSSIBLE_NICKNAME_MSG = '이미 사용 중인 닉네임입니다.';
export const EMAIL_ERROR_MSG = '올바른 이메일 형식이 아닙니다!';
export const PASSWORD_ERROR_MSG = '영어,숫자,특수문자를 포함해 8-16자를 입력해주세요!';
export const PASSWORD_CONFIRM_ERROR_MSG = '비밀번호가 틀립니다!';
