'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' })
});

export async function login(prevState, formData) {
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

  // const supabase = await createClient()

  // const data = {
  //   email: formData.get('email'),
  //   password: formData.get('password')
  // }

  // const { error } = await supabase.auth.signInWithPassword(data)

  // if (error) {
  //   return {
  //     authError: error.message,
  //     email: formData.get('email'),
  //     fieldErrors: {}
  //   };
  // }

  redirect('/dashboard')
}

export async function signup(prevState, formData: FormData) {
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


  revalidatePath('/', 'layout');
  redirect('/?event=signup');
}

export async function logout() {
  // const supabase = await createClient()
  // const { error } = await supabase.auth.signOut()

  // if (!error) {
  //   redirect('/login');
  // }

  redirect('/login');
}