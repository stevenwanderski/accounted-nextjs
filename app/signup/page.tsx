import Link from 'next/link';
import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto my-10">
      <div className="text-2xl font-bold mb-8 grid justify-center">
        <Link href="/">Accounted</Link>
      </div>

      <SignupForm />
    </div>
  )
}