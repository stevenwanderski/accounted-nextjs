import { PrismaClient } from "@prisma/client";
import BudgetName from "@/components/budget-name";
import LineItemForm from "@/components/line-item-form";
import LineItemList from "@/components/line-item-list";

const prisma = new PrismaClient();

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const budget = await prisma.budget.findUnique({
    where: { id: Number(id) },
    include: {
      lineItems: {
        orderBy: {
          date: "asc",
        },
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-md font-bold">
          <BudgetName budget={budget} />
        </h1>

        <div>
          <LineItemForm budgetId={id} />
        </div>
      </div>

      <div>
        <LineItemList lineItems={budget?.lineItems} />
      </div>
    </div>
  );
}
