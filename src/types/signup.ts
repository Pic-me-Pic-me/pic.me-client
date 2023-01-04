export interface SignUpInfo {
  user_id: string;
  password: string;
  passwordConfirm: string;
}

export interface NicknameInfo {
  nickname: string;
}

export interface ErrorPatternInfo<T> {
  value: T;
  message: string;
}

export interface ErrorCondition {
  required: ErrorPatternInfo<boolean>;
  pattern?: ErrorPatternInfo<RegExp>;
  validate?: (value: string) => string | true;
  minLength?: ErrorPatternInfo<number>;
  maxLength?: ErrorPatternInfo<number>;
}

export const emailErrorPatterns: ErrorCondition = {
  required: { value: true, message: '아이디를 입력하지 않았습니다' },
  pattern: {
    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,}/i,
    message: '이메일 형식이 맞지 않습니다',
  },
};

export const passwordErrorPatterns: ErrorCondition = {
  required: { value: true, message: '영어/숫자를 포함하여 10-16자로 입력해주세요!' },
  minLength: {
    value: 10,
    message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
  },
  maxLength: {
    value: 16,
    message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
  },
  pattern: {
    value: /^[A-za-z0-9]{0,16}$/,
    message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
  },
};

export const passwordConfirmErrorPatterns: ErrorCondition = {
  required: { value: true, message: '영어/숫자를 포함하여 10-16자로 입력해주세요!' },
};

export const errorPatterns: { [key: string]: ErrorCondition } = {
  email: emailErrorPatterns,
  password: passwordErrorPatterns,
  passwordConfirm: passwordConfirmErrorPatterns,
};
