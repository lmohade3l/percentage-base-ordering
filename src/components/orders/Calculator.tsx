import { useState, useEffect, ChangeEvent } from "react";
import { formatPersianNumber } from "@/lib/numberUtils";

export default function Calculator({
  summary,
  type,
}: {
  summary: {
    totalRemain: number;
    totalValue: number;
    weightedAvgPrice: number;
  };
  type: "buy" | "sell" | "deals";
}) {
  const [percentage, setPercentage] = useState(100);
  const [calculatedValues, setCalculatedValues] = useState({
    totalRemain: 0,
    weightedAvgPrice: 0,
    totalPaymentAmount: 0,
  });

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

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-medium mb-3">محاسبه گر سفارش</h3>

      <div className="mb-4">
        <label htmlFor="percentage" className="block mb-1">
          درصد موردنظر:
        </label>
        <input
          id="percentage"
          type="number"
          min="0"
          max="100"
          value={percentage}
          onChange={handlePercentageChange}
          className="p-2 border rounded w-full"
          dir="rtl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border rounded bg-white">
          <p className="text-sm text-gray-500">مجموع حجم ارز قابل دریافت</p>
          <p className="text-lg font-medium mt-1">
            {formatPersianNumber(calculatedValues.totalRemain, 4)}
            <span className="text-[#676767] text-[13px] mr-1">
              {type === "buy" ? "واحد" : "تومان"}
            </span>
          </p>
        </div>

        <div className="p-3 border rounded bg-white">
          <p className="text-sm text-gray-500">میانگین قیمت ارز</p>
          <p className="text-lg font-medium mt-1">
            {formatPersianNumber(calculatedValues.weightedAvgPrice, 4)}
            <span className="text-[#676767] text-[13px] mr-1">تومان</span>
          </p>
        </div>

        <div className="p-3 border rounded bg-white">
          <p className="text-sm text-gray-500">مجموع مبلغ قابل پرداخت</p>
          <p className="text-lg font-medium mt-1">
            {formatPersianNumber(calculatedValues.totalPaymentAmount, 4)}
            <span className="text-[#676767] text-[13px] mr-1">
              {type === "buy" ? "تومان" : "واحد"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
