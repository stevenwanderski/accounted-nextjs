'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

export async function login(prevState, formData) {
  const schema = z.object({
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' })
  });

  const validation = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validation.success) {
    const errArr = {};

    validation.error.errors.forEach(error => {
      errArr[error.path[0]] = error.message;
    });

    return {
      fieldErrors: errArr,
      email: formData.get('email')
    };
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      authError: 'Invalid login.',
      email: formData.get('email'),
      fieldErrors: {}
    };
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (!error) {
    redirect('/login');
  }
}