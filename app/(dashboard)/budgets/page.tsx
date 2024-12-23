import { PrismaClient } from '@prisma/client'
import BudgetForm from './form';
import BudgetList from './list';

const prisma = new PrismaClient()

export default async function BudgetsPage() {
  const budgets = await prisma.budget.findMany()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <BudgetForm />
      </div>

      {budgets.length && <BudgetList budgets={budgets} />}
    </div>
  )
}