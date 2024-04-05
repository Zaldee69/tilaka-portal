'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { KeyIcon, SecurityIcon } from '../../../../../../public/icons/icons';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useSchema, { passwordRegex } from '@/hooks/useSchema';

const ChangePasswordDialog = () => {
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { CreateNewPasswordSchema } = useSchema();

  const form = useForm<z.infer<typeof CreateNewPasswordSchema>>({
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: { password: '', confirmPassword: '', oldPassword: '' }
  });

  const s = useTranslations('Settings');

  const onSubmit = () => {};

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  return (
    <>
      <AlertDialog
        open={showChangePasswordDialog}
        onOpenChange={setShowChangePasswordDialog}
      >
        <AlertDialogTrigger asChild>
          <Button
            size="lg"
            className="mt-4 w-full justify-start border-[#E0E0E0] hover:text-black bg-white font-semibold gap-2 border px-4 lg:hover:scale-105 transition-transform"
            variant="ghost"
          >
            <KeyIcon fill="#000" />
            {s('changePasswordButton')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {s('dialog.changePassword.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              {s('dialog.changePassword.subtitle')}
            </AlertDialogDescription>
            <Form {...form}>
              <form className="w-full max-w-md">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>
                        {s('dialog.changePassword.input.currentPassword.label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={s(
                            'dialog.changePassword.input.currentPassword.placeholder'
                          )}
                          autoComplete="off"
                          type={showOldPassword ? 'text' : 'password'}
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target;
                            const noWhiteSpace = /\s/g;

                            form.setValue(
                              'oldPassword',
                              value.replace(noWhiteSpace, '')
                            );

                            if (value.length >= 1) {
                              form.clearErrors('oldPassword');
                            }
                          }}
                          icon={
                            showOldPassword ? (
                              <EyeIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowOldPassword}
                              />
                            ) : (
                              <EyeOffIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowOldPassword}
                              />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="my-3">
                      <FormLabel>
                        {s('dialog.changePassword.input.newPassword.label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={s(
                            'dialog.changePassword.input.newPassword.placeholder'
                          )}
                          autoComplete="off"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target;
                            const noWhiteSpace = /\s/g;

                            form.setValue(
                              'password',
                              value.replace(noWhiteSpace, '')
                            );

                            if (passwordRegex.test(value)) {
                              form.clearErrors('password');
                            } else {
                              form.setError('password', {
                                type: 'manual',
                                message: s(
                                  'dialog.changePassword.input.newPassword.errorMessage.notValid'
                                )
                              });
                            }
                          }}
                          icon={
                            showPassword ? (
                              <EyeIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowPassword}
                              />
                            ) : (
                              <EyeOffIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowPassword}
                              />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {s('dialog.changePassword.input.confirmPassword.label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={s(
                            'dialog.changePassword.input.confirmPassword.placeholder'
                          )}
                          autoComplete="off"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target;
                            const noWhiteSpace = /\s/g;

                            form.setValue(
                              'confirmPassword',
                              value.replace(noWhiteSpace, '')
                            );

                            if (passwordRegex.test(value)) {
                              form.clearErrors('confirmPassword');
                            } else if (form.getValues('password') !== value) {
                              form.setError('confirmPassword', {
                                type: 'manual',
                                message: s(
                                  'dialog.changePassword.input.confirmPassword.errorMessage.notMatch'
                                )
                              });
                            } else {
                              form.setError('confirmPassword', {
                                type: 'manual',
                                message: s(
                                  'dialog.changePassword.input.confirmPassword.errorMessage.notValid'
                                )
                              });
                            }
                          }}
                          icon={
                            showConfirmPassword ? (
                              <EyeIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowConfirmPassword}
                              />
                            ) : (
                              <EyeOffIcon
                                height={20}
                                className="cursor-pointer mt-3.5 hover:text-primary hover:transition-colors"
                                onClick={toggleShowConfirmPassword}
                              />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-between">
            <AlertDialogCancel
              onClick={() => {
                form.clearErrors();
                form.reset();
                setShowConfirmPassword(false);
                setShowOldPassword(false);
                setShowPassword(false);
              }}
            >
              {s('dialog.changePassword.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              className="!m-0"
              onClick={form.handleSubmit(onSubmit)}
            >
              {s('dialog.changePassword.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChangePasswordDialog;
