import { useState, useEffect, ChangeEvent } from "react";
import { formatPersianNumber } from "@/lib/numberUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useMarket } from "@/hooks/useMarket";

interface CalculatorProps {
  summary: {
    totalRemain: number;
    totalValue: number;
    weightedAvgPrice: number;
  } | null;
  type: "buy" | "sell" | "deals";
}

interface CalculatedValues {
  totalRemain: number;
  weightedAvgPrice: number;
  totalPaymentAmount: number;
}

export default function Calculator({ summary, type }: CalculatorProps) {
  const [percentage, setPercentage] = useState<number>(100);
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    totalRemain: 0,
    weightedAvgPrice: 0,
    totalPaymentAmount: 0,
  });
  const { currentCoin } = useMarket();

  useEffect(() => {
    if (summary) {
      const factor = percentage / 100;
      const calculatedRemain = summary.totalRemain * factor;
      const calculatedPaymentAmount = summary.totalValue * factor;

      setCalculatedValues({
        totalRemain: calculatedRemain,
        weightedAvgPrice: summary.weightedAvgPrice,
        totalPaymentAmount: calculatedPaymentAmount,
      });
    }
  }, [percentage, summary]);

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setPercentage(value);
  };

  const handleSliderChange = (value: number[]) => {
    setPercentage(value[0]);
  };

  if (!summary) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">محاسبه گر سفارش</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="percentage">درصد موردنظر: {percentage}%</Label>
            <Input
              id="percentage"
              type="number"
              min="0"
              max="100"
              value={percentage}
              onChange={handlePercentageChange}
              className="w-full"
              dir="rtl"
            />
          </div>
          <Slider
            defaultValue={[percentage]}
            max={100}
            step={1}
            value={[percentage]}
            onValueChange={handleSliderChange}
            className="py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border shadow-sm h-20">
            <CardContent className=" flex flex-col justify-between h-full -my-2">
              <p className="text-sm text-gray-500">مجموع حجم ارز قابل دریافت</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(calculatedValues.totalRemain, 4)}
                <span className="text-[#676767] text-[13px] mr-1">
                  {currentCoin?.currency2?.title_fa}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm h-20">
            <CardContent className="flex flex-col justify-between h-full -my-2">
              <p className="text-sm text-gray-500">میانگین قیمت ارز</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(calculatedValues.weightedAvgPrice, 4)}
                <span className="text-[#676767] text-[13px] mr-1">
                  {currentCoin?.currency2?.title_fa}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm h-20">
            <CardContent className="flex flex-col justify-between h-full -my-2">
              <p className="text-sm text-gray-500">مجموع مبلغ قابل پرداخت</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(calculatedValues.totalPaymentAmount, 4)}
                <span className="text-[#676767] text-[13px] mr-1">
                  {currentCoin?.currency2?.title_fa}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
