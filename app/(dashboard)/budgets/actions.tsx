'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBudget(formData) {
  await prisma.budget.create({
    data: {
      month: Number(formData.get('month')),
      year: Number(formData.get('year'))
    },
  });

  revalidatePath('/budgets');
}