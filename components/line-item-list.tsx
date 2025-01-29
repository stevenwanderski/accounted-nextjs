import { LineItem } from "@prisma/client";
import { format } from "date-fns";

export default function LineItemList({ lineItems }: { lineItems: LineItem[] }) {
  const total = lineItems.reduce(
    (currentValue: number, lineItem: LineItem) =>
      lineItem.amount + currentValue,
    0,
  );

  return (
    <div>
      <div className="grid grid-cols-3 text-sm py-2 font-bold border-b border-gray-200">
        <div>Date</div>
        <div>Name</div>
        <div>Amount</div>
      </div>

      <div className="divide-y divide-gray-200">
        {lineItems.map((lineItem) => (
          <div key={lineItem.id} className="grid grid-cols-3 text-sm py-2">
            <div>{format(lineItem.date, "MM/dd/yyyy")}</div>
            <div>{lineItem.name}</div>
            <div>${lineItem.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 text-sm py-2 border-black border-double border-t-2">
        <div></div>
        <div></div>
        <div className="font-bold">${total.toLocaleString()}</div>
      </div>
    </div>
  );
}
