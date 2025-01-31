"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormItem from "@/components/form-item";
import { useState, useActionState, useEffect } from "react";
import { createLineItem } from "@/actions/line-items";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialState = {
  errors: {
    name: "",
    date: "",
    amount: "",
  },
  success: false,
};

export default function LineItemForm({ budgetId }: { budgetId: number }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    (prevState, formData) => createLineItem(prevState, formData, budgetId),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Line Item</DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <div className="mb-5 space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" />
            {state.errors?.name && (
              <p className="text-red-500 text-sm pt-1">{state.errors.name}</p>
            )}
          </div>

          <div className="flex gap-5 mb-5">
            <FormItem>
              <Label htmlFor="date">Date</Label>
              <Input type="date" name="date" id="date" />
            </FormItem>

            <FormItem>
              <Label htmlFor="amount">Amount</Label>
              <Input type="text" name="amount" id="amount" />
            </FormItem>
          </div>

          <div className="flex gap-3">
            <Button aria-disabled={pending} disabled={pending}>
              Add
            </Button>

            <Button variant="outline">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
