import { format } from 'date-fns';
import Budget from '@/types/budget';

export default function BudgetName({ budget } : { budget: Budget }) {
  const date = new Date(budget.year, budget.month - 1);

  return (
    <>
      {format(date, 'MMMM')} {format(date, 'u')}
    </>
  )
}