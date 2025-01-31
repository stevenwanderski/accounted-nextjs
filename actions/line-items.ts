"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  name: z.string().min(1),
  date: z.string(),
  amount: z.coerce.number(),
});

function parseISOLocal(s) {
  let [y, m, d] = s.split(/\D/);
  return new Date(y, --m, d);
}

export async function createLineItem(
  prevData,
  formData: FormData,
  budgetId: number,
) {
  const entries = Object.fromEntries(formData);
  const parsed = schema.safeParse(entries);

  if (!parsed.success) {
    const formFieldErrors = parsed.error.flatten().fieldErrors;

    return {
      errors: {
        name: formFieldErrors?.name,
        date: formFieldErrors?.date,
        amount: formFieldErrors?.amount,
      },
      success: false,
    };
  }

  const parsedDate = parseISOLocal(parsed.data.date);

  await prisma.lineItem.create({
    data: {
      name: parsed.data.name,
      date: parsedDate,
      amount: parsed.data.amount,
      budgetId: Number(budgetId),
    },
  });

  revalidatePath(`/budgets/${budgetId}`);

  return {
    errors: {
      name: "",
      date: "",
      amount: "",
    },
    success: true,
  };
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
