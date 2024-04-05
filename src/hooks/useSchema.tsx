'use client';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const tilakaNameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z_]{6,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[0-9a-zA-Z@#$%^&+=]{10,40}$/;

const validatePassword = (str: string) => {
  const isValidPassword = passwordRegex.test(str);

  return isValidPassword;
};

const useSchema = () => {
  const loginMsg = useTranslations('Login');
  const s = useTranslations('Settings');

  const validateEmailOrTilakaName = z
    .string()
    .min(1, { message: loginMsg('form.message.error.tilakaNameOrEmaildEmpty') })
    .refine(
      (value) => {
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

  const CreateNewPasswordSchema = z.object({
    oldPassword: z.string().min(1, {
      message: s(
        'dialog.changePassword.input.currentPassword.errorMessage.empty'
      )
    }),
    password: z
      .string()
      .min(10, {
        message: s(
          'dialog.changePassword.input.newPassword.errorMessage.passMin'
        )
      })
      .refine(
        (value) => {
          validatePassword(value);
        },
        {
          message: 'Kata sandi tidak valid'
        }
      ),
    confirmPassword: z
      .string()
      .min(10, {
        message: s(
          'dialog.changePassword.input.confirmPassword.errorMessage.passMin'
        )
      })
      .refine(
        (value) => {
          validatePassword(value);
        },
        {
          message: s(
            'dialog.changePassword.input.confirmPassword.errorMessage.notValid'
          )
        }
      )
  });

  // return new schema here
  return { LoginSchema, CreateNewPasswordSchema };
};

export default useSchema;
