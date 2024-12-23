import { PrismaClient } from '@prisma/client'
import BudgetName from '@/components/budget-name';

const prisma = new PrismaClient()

export default async function BudgetPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const budget = await prisma.budget.findUnique({
    where: { id: Number(id) }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">
        Budget: <BudgetName budget={budget} />
      </h1>
    </div>
  )
}