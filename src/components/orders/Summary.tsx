import { formatPersianNumber } from "@/lib/numberUtils";

export default function Summary({
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
  return (
    <>
      {type !== "deals" && summary && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <div className="flex flex-col gap-4">
            <div className="p-2 border rounded rtl bg-white">
              <p className="text-sm text-gray-500">مجموع باقی مانده</p>
              <p className="font-semibold">
                {formatPersianNumber(summary?.totalRemain, 4)} {"تومان"}
              </p>
            </div>
            <div className="p-2 border rounded bg-white">
              <p className="text-sm text-gray-500">میانگین وزندار قیمت</p>
              <p className="font-semibold">
                {formatPersianNumber(summary?.weightedAvgPrice, 4)} {"تومان"}
              </p>
            </div>
            <div className="p-2 border rounded bg-white">
              <p className="text-sm text-gray-500">مجموع ارزش</p>
              <p className="font-semibold">
                {formatPersianNumber(summary?.totalValue, 4)} {"تومان"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
