'use client';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const tilakaNameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_]{6,15}$/;

const useSchema = () => {
  const loginMsg = useTranslations('Login');
  const validateEmailOrTilakaName = z
    .string()
    .min(1, { message: loginMsg('form.message.error.tilakaNameOrEmaildEmpty') })
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);

        const isValidTilakaName = tilakaNameRegex.test(value);

        return isValidEmail || isValidTilakaName;
      },
      {
        message: loginMsg('form.message.error.tilakaNameOrEmailNotValid')
      }
    );

  const LoginSchema = z.object({
    tilakaName: validateEmailOrTilakaName,
    password: z
      .string()
      .min(1, { message: loginMsg('form.message.error.passwordEmpty') })
  });
  return { LoginSchema };
};

export default useSchema;
