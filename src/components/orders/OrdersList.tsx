import CustomTable, { Column } from "../table";
import { OrderType } from "@/types/order";
import { formatPersianNumber } from "@/lib/numberUtils";
import { formatJallali } from "@/lib/dateUtils";
import Summary from "./Summary";
import { useMemo } from "react";
import Calculator from "./Calculator";
import { useFetchData } from "@/hooks/useFetchData";

export default function OrdersList({
  marketId,
  type,
}: {
  marketId: number;
  type: "buy" | "sell" | "deals";
}) {
  const { data } = useFetchData<{ orders: OrderType[] } | OrderType[]>(
    type === "deals"
      ? `https://api.bitpin.org/v1/mth/matches/${marketId}/`
      : `https://api.bitpin.org/v2/mth/actives/${marketId}/?type=${type}`,
    3000
  );

  const buyOrsellColumns: Column<OrderType>[] = [
    {
      header: "باقی مانده",
      accessor: "remain",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.remain), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "قیمت",
      accessor: "price",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.price), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "ارزش باقی مانده",
      accessor: "value",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.value), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "درصد پرشده",
      accessor: "value",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>
            {(100 - (Number(row?.remain) / Number(row?.amount)) * 100).toFixed(
              2
            )}
          </span>
        </div>
      ),
    },
    {
      header: "وضعیت",
      accessor: "status",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{Number(row?.remain) === 0 ? "تمام شده" : "در انتظار"}</span>
        </div>
      ),
    },
    {
      header: "",
      accessor: "actions",
      render: () => (
        <div className="flex flex gap-1 items-end">
          <button>{"لغو"}</button>
        </div>
      ),
    },
  ];

  const dealsColumns: Column<OrderType>[] = [
    {
      header: "مقدار هدف",
      accessor: "match_amount",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.match_amount), 2)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "قیمت",
      accessor: "price",
      render: (row: OrderType) => (
        <div className="flex flex gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.price), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "تاریخ",
      accessor: "time",
      render: (row: OrderType) => <span>{formatJallali(row?.time)}</span>,
    },
    {
      header: "نوع سفارش",
      accessor: "time",
      render: (row: OrderType) => (
        <span>{row?.type === "buy" ? "خرید" : "فروش"}</span>
      ),
    },
  ];

  const calculateSummary = useMemo(() => {
    if (!data || type === "deals") return null;

    const orders = (data as { orders: OrderType[] }).orders?.slice(0, 10) || [];

    if (!orders || orders.length === 0) return null;

    let totalRemain = 0;
    let totalValue = 0;
    let weightedPriceSum = 0;

    orders.forEach((order: OrderType) => {
      const remain = Number(order.remain || 0);
      const price = Number(order.price || 0);
      const value = Number(order.value || 0);

      totalRemain += remain;
      totalValue += value;
      weightedPriceSum += price * remain;
    });

    const weightedAvgPrice =
      totalRemain > 0 ? weightedPriceSum / totalRemain : 0;

    return {
      totalRemain,
      totalValue,
      weightedAvgPrice,
    };
  }, [data, type]);

  const tableData = useMemo(() => {
    if (!data) return [];

    if (type === "deals") {
      return (data as OrderType[]).slice(0, 10) || [];
    } else {
      return ((data as { orders: OrderType[] }).orders || []).slice(0, 10);
    }
  }, [data, type]);

  return (
    <div className="w-full">
      <CustomTable
        columns={
          type === "buy" || type === "sell" ? buyOrsellColumns : dealsColumns
        }
        data={tableData}
        onRowClick={null}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20]}
        rowHeight={45}
        pagination={false}
      />

      {calculateSummary && type !== "deals" && (
        <div className="grid grid-cols-2 gap-3" style={{gridTemplateColumns:"1fr 2fr"}}>
          <Summary summary={calculateSummary} type={type} />
          <Calculator summary={calculateSummary} type={type} />
        </div>
      )}
    </div>
  );
}
