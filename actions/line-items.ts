"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function parseISOLocal(s) {
  let [y, m, d] = s.split(/\D/);
  return new Date(y, --m, d);
}

export async function createLineItem(formData: FormData, budgetId: number) {
  const parsedDate = parseISOLocal(formData.get("date"));

  await prisma.lineItem.create({
    data: {
      name: formData.get("name") as string,
      date: parsedDate,
      amount: Number(formData.get("amount")),
      budgetId: Number(budgetId),
    },
  });

  revalidatePath(`/budgets/${budgetId}`);
}

export async function changePaid(value: boolean, id: number, budgetId: number) {
  await prisma.lineItem.update({
    where: {
      id: id,
    },
    data: {
      paid: value,
    },
  });

  revalidatePath(`/budgets/${budgetId}`);
}
