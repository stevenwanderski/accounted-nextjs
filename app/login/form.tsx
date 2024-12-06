"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from './actions'

const initialState = {
  authError: '',
  fieldErrors: {},
  email: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn disabled:cursor-wait" disabled={pending}>
      Log In
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div>
      <h1 className="mb-8 font-bold text-xl">Log In</h1>

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

          <SubmitButton />
        </div>
      </form>
    </div>
  )
}