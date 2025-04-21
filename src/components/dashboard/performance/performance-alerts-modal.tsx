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

interface PerformanceAlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  alertType: z.enum(["portfolio_drop", "portfolio_gain", "asset_drop", "asset_gain"]),
  threshold: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Threshold must be a positive number",
  }),
  timeframe: z.enum(["day", "week", "month"]),
  asset: z.string().optional(),
})

export function PerformanceAlertsModal({ open, onOpenChange }: PerformanceAlertsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alertType: "portfolio_drop",
      threshold: "5",
      timeframe: "day",
      asset: "",
    },
  })

  const alertType = form.watch("alertType")
  const showAssetField = alertType === "asset_drop" || alertType === "asset_gain"

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      onOpenChange(false)
      form.reset()

      // Show success message
      alert("Performance alert set successfully!")
    }, 1500)
  }

  const getAlertDescription = (type: string, threshold: string, timeframe: string, asset?: string) => {
    const timeframeText = timeframe === "day" ? "a day" : timeframe === "week" ? "a week" : "a month"

    switch (type) {
      case "portfolio_drop":
        return `Alert me if my portfolio drops by ${threshold}% in ${timeframeText}`
      case "portfolio_gain":
        return `Alert me if my portfolio gains ${threshold}% in ${timeframeText}`
      case "asset_drop":
        return `Alert me if ${asset || "[asset]"} drops by ${threshold}% in ${timeframeText}`
      case "asset_gain":
        return `Alert me if ${asset || "[asset]"} gains ${threshold}% in ${timeframeText}`
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Set Performance Alerts</DialogTitle>
          <DialogDescription>
            Create alerts to stay informed about significant changes in your portfolio performance.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="alertType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="portfolio_drop">Portfolio Drop</SelectItem>
                      <SelectItem value="portfolio_gain">Portfolio Gain</SelectItem>
                      <SelectItem value="asset_drop">Asset Drop</SelectItem>
                      <SelectItem value="asset_gain">Asset Gain</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showAssetField && (
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AAPL">AAPL</SelectItem>
                        <SelectItem value="MSFT">MSFT</SelectItem>
                        <SelectItem value="AMZN">AMZN</SelectItem>
                        <SelectItem value="GOOGL">GOOGL</SelectItem>
                        <SelectItem value="NVDA">NVDA</SelectItem>
                        <SelectItem value="TSLA">TSLA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threshold (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter percentage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeframe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <p className="font-medium">Alert Preview:</p>
              <p className="mt-1">
                {getAlertDescription(
                  form.watch("alertType"),
                  form.watch("threshold"),
                  form.watch("timeframe"),
                  form.watch("asset"),
                )}
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Setting Alert..." : "Set Alert"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
