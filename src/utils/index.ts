import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

const rules = {
  email: { required, email },
  password: {
    required,
    minLength: minLength(6),
    containsPasswordRequirement: helpers.withMessage(
      () =>
        `The password requires an uppercase, lowercase, number and special character`,
      (value: string) =>
        // eslint-disable-next-line no-useless-escape
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
    ),
  },
};

export const setupValidation = (state: any) => {
  return useVuelidate(rules, state);
};
