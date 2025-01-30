"use client";

import { changePaid } from "@/actions/line-items";

export default function LineItemCheckbox({ checked, lineItemId, budgetId }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      className="w-4 h-4 cursor-pointer"
      onChange={(event) => {
        changePaid(event.target.checked, lineItemId, budgetId);
      }}
    />
  );
}
