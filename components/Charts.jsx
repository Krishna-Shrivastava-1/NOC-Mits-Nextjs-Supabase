"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,

} from "@/components/ui/chart"

export const description = "A linear line chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} 
const year = new Date()

export function ChartLineLinear({data}) {
  return (
    <Card className='w-xl m-4'>
      <CardHeader>
      <CardTitle>Weekly NOC Request Activity</CardTitle>
<CardDescription>
  Showing daily submissions for the past 7 days
</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            
            <CartesianGrid vertical={false} />
           <XAxis
  dataKey="day"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
  tickFormatter={(value) => {
    const date = new Date(value)
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  }}
/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="noc_requests"
              type="natural"
              stroke="var(--color-desktop)"
              fill="url(#fillMobile)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
   <CardFooter className="flex-col items-start gap-2 text-sm">
  <div className="font-medium">
    Daily NOC submissions overview
  </div>
  <div className="text-muted-foreground">
    Reflects student applications received in the past week
  </div>
</CardFooter>
    </Card>
  )
}
