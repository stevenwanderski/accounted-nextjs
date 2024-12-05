"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from './actions'

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn disabled:cursor-wait" disabled={pending}>
      Add
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div>
      <h1 className="mb-8 font-bold text-xl">Log In</h1>

      {state?.message && (
        <div className="text-red-500 mb-4">
          {state?.message}
        </div>
      )}

      <form action={formAction}>
        <div className="grid gap-8">
          <div>
            <label htmlFor="email" className="label">Email:</label>
            <input id="email" name="email" type="email" className="input w-full" />
          </div>

          <div>
            <label htmlFor="password" className="label">Password:</label>
            <input id="password" name="password" type="password" className="input w-full" />
          </div>

          <SubmitButton />
        </div>
      </form>
    </div>
  )
}