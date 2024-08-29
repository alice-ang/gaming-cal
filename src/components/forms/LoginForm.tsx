'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOff } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { login, signup } from './actions';
import { useToast } from '../ui/use-toast';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  username: z.string().min(4, { message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const LoginForm: FC = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);

  // }

  return (
    <Form {...form}>
      <form className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="enter password"
                    {...field}
                    variant="password"
                    type={isHidden ? 'password' : 'text'}
                    autoComplete="off"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-4 top-2/4 -translate-x-2/4 -translate-y-2/4"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsHidden((prev) => !prev);
                    }}
                  >
                    {isHidden ? <EyeIcon size={22} /> : <EyeOff size={22} />}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button variant="secondary" className="w-full" formAction={signup}>
            Sign up
          </Button>
          <Button className="w-full" formAction={login}>
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};
