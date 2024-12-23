import Link from 'next/link'
import { format } from 'date-fns';

export default function BudgetList({ budgets }) {
  return (
    <div className="divide-y mb-5">
      {budgets.map((budget) => {
        const date = new Date(budget.year, budget.month - 1);

        return (
          <div key={budget.id}>
            <Link href={`/budgets/${budget.id}`} className="text-sm block py-1.5 hover:opacity-70">
              {format(date, 'MMMM')} {format(date, 'u')}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
