"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormItem from "@/components/form-item";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createLineItem } from "@/actions/line-items";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending}>
      Add
    </Button>
  );
}

export default function LineItemForm({ budgetId }: { budgetId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Line Item</DialogTitle>
        </DialogHeader>

        <form
          action={async (formValues) => {
            createLineItem(formValues, budgetId);

            setOpen(false);
          }}
        >
          <div className="mb-5 space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" />
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
            <SubmitButton />
            <Button variant="outline">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
