import { createClient } from '@/utils/supabase/server'
import { logout } from '../login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  return (
    <div className="max-w-5xl mx-auto py-24">
      <h1>Dashboard.</h1>

      <div>
        {data.user.email}
      </div>

      <form action={logout}>
        <button type="submit" className="btn">Logout</button>
      </form>
    </div>
  )
}