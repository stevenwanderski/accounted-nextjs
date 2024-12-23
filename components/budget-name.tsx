import { format } from 'date-fns';

export default function BudgetName({ budget }) {
  const date = new Date(budget.year, budget.month - 1);

  return (
    <>
      {format(date, 'MMMM')} {format(date, 'u')}
    </>
  )
}