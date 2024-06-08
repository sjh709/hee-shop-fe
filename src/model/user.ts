export type RegisterFormType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  policy: boolean;
};

export type RegisterUserType = {
  email: string;
  name: string;
  password: string;
};

export type UserType = RegisterUserType & {
  level: string;
};
