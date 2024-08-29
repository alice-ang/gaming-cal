'use server';

import { createClient } from '@/lib/supbase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formdata: FormData) {
  const supabase = createClient();

  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;
  const data = {
    email: email,
    password: password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formdata: FormData) {
  const supabase = createClient();
  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;

  const data = {
    display_name: 'test',
    email: email,
    password: password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
