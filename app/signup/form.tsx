"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from '../../auth/actions'
import Link from 'next/link';

const initialState = {
  authError: '',
  fieldErrors: {},
  email: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn disabled:cursor-wait" disabled={pending}>
      Sign Up
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signup, initialState);

  return (
    <div className="px-10 py-8 rounded border-white border">
      <h1 className="mb-8 font-bold">Sign Up</h1>

      {state?.authError && (
        <div className="text-red-500 mb-4">
          {state?.authError}
        </div>
      )}

      <form action={formAction}>
        <div className="grid gap-8">
          <div>
            <label htmlFor="email" className="label">Email:</label>

            <input
              id="email"
              name="email"
              type="text"
              className="input w-full"
              defaultValue={state.email}
            />

            {state.fieldErrors['email'] && (
              <div className="text-sm text-red-500 mt-2">
                {state.fieldErrors['email']}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label">Password:</label>

            <input
              id="password"
              name="password"
              type="password"
              className="input w-full"
            />

            {state.fieldErrors['password'] && (
              <div className="text-sm text-red-500 mt-2">
                {state.fieldErrors['password']}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <SubmitButton />

            <Link href="/login">Log In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}