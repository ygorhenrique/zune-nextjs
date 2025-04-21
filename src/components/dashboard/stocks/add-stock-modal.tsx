"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface AddStockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  shares: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Shares must be a positive number",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  date: z.string().min(1, "Date is required"),
})

export function AddStockModal({ open, onOpenChange }: AddStockModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "",
      shares: "",
      price: "",
      date: new Date().toISOString().split("T")[0],
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      onOpenChange(false)
      form.reset()

      // Show success message
      alert("Stock added successfully!")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
          <DialogDescription>
            Add a new stock to your portfolio. Enter the ticker, number of shares, and purchase price.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticker Symbol</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stock" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AAPL">AAPL - Apple Inc.</SelectItem>
                      <SelectItem value="MSFT">MSFT - Microsoft Corporation</SelectItem>
                      <SelectItem value="AMZN">AMZN - Amazon.com Inc.</SelectItem>
                      <SelectItem value="GOOGL">GOOGL - Alphabet Inc.</SelectItem>
                      <SelectItem value="NVDA">NVDA - NVIDIA Corporation</SelectItem>
                      <SelectItem value="TSLA">TSLA - Tesla, Inc.</SelectItem>
                      <SelectItem value="JNJ">JNJ - Johnson & Johnson</SelectItem>
                      <SelectItem value="JPM">JPM - JPMorgan Chase & Co.</SelectItem>
                      <SelectItem value="V">V - Visa Inc.</SelectItem>
                      <SelectItem value="PG">PG - Procter & Gamble Co.</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Shares</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter number of shares" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price per Share (€)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter purchase price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Stock"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
