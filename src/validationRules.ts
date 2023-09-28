// validationRules.ts

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && password.length <= 16;
};

export const validateUsername = (username: string): boolean => {
  return username.length <= 20;
};

export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
