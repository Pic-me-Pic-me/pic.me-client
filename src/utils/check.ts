interface ErrorPatternValue<T> {
  value: T;
  message?: string;
}

interface ErrorCondition {
  required?: ErrorPatternValue<boolean>;
  pattern?: ErrorPatternValue<RegExp>;
  maxLength?: ErrorPatternValue<number>;
}

export const emailErrorPatterns: ErrorCondition = {
  required: { value: true },
  pattern: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '올바른 이메일 형식이 아닙니다!',
  },
};

export const passwordErrorPatterns: ErrorCondition = {
  required: { value: true },
  pattern: {
    value: /^[A-za-z0-9]{10,16}$/,
    message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
  },
};

export const nicknameErrorPatterns: ErrorCondition = {
  required: { value: true },
  maxLength: {
    value: 8,
  },
};

export const errorPatterns: { [key: string]: ErrorCondition } = {
  email: emailErrorPatterns,
  password: passwordErrorPatterns,
  nickname: nicknameErrorPatterns,
};
