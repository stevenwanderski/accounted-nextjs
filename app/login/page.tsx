import Link from 'next/link';
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-10">
      <div className="text-2xl font-bold mb-8 grid justify-center">
        <Link href="/">Accounted</Link>
      </div>

      <LoginForm />
    </div>
  )
}