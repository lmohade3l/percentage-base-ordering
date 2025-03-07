import { formatPersianNumber } from "@/lib/numberUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarket } from "@/hooks/useMarket";

interface SummaryProps {
  summary: {
    totalRemain: number;
    totalValue: number;
    weightedAvgPrice: number;
  } | null;
  type: "buy" | "sell" | "deals";
}

export default function Summary({ summary, type }: SummaryProps) {
  if (type === "deals" || !summary) {
    return null;
  }

  const { currentCoin } = useMarket();

  return (
    <Card className="mt-4">
      <CardHeader className="">
        <CardTitle className="text-lg">خلاصه سفارشات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <Card className="border shadow-sm h-20">
            <CardContent className="-my-2">
              <p className="text-sm text-gray-500 mb-1">مجموع باقی مانده</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(summary.totalRemain, 4)}
                <span className="text-[#676767] text-[13px] mr-1">
                  {currentCoin?.currency2?.title_fa}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm h-20">
            <CardContent className="-my-2">
              <p className="text-sm text-gray-500 mb-1">میانگین قیمت</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(summary.weightedAvgPrice, 4)}
                <span className="text-[#676767] text-[13px] mr-1">
                  {currentCoin?.currency2?.title_fa}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm h-20">
            <CardContent className="-my-2">
              <p className="text-sm text-gray-500 mb-1">مجموع ارزش</p>
              <p className="font-semibold text-lg">
                {formatPersianNumber(summary.totalValue, 4)}
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
