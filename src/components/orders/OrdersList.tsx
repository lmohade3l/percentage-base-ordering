import useSWR from "swr";
import CustomTable, { Column } from "../table";
import { OrderType } from "@/types/order";
import { formatPersianNumber } from "@/lib/numberUtils";
import { formatJallali } from "@/lib/dateUtils";

export default function OrdersList({
  marketId,
  type,
}: {
  marketId: number;
  type: "buy" | "sell" | "deals";
}) {
  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    type === "deals"
      ? `https://api.bitpin.org/v1/mth/matches/${marketId}/`
      : `https://api.bitpin.org/v2/mth/actives/${marketId}/?type=${type}`,
    fetcher
  );

  console.log({ type });

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
        <div className="flex flex  gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.price), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "ارزش باقی مانده",
      accessor: "value",
      render: (row: OrderType) => (
        <div className="flex flex  gap-1 items-end">
          <span>{formatPersianNumber(Number(row?.value), 4)}</span>
          <span className="text-[#676767] text-[13px]"> {"تومان"}</span>
        </div>
      ),
    },
    {
      header: "درصد پرشده",
      accessor: "value",
      render: (row: OrderType) => (
        <div className="flex flex  gap-1 items-end">
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
        <div className="flex flex  gap-1 items-end">
          <span>{Number(row?.remain) === 0 ? "تمام شده" : "در انتظار"}</span>
        </div>
      ),
    },
    {
      header: "",
      accessor: "actions",
      render: () => (
        <div className="flex flex  gap-1 items-end">
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
        <div className="flex flex  gap-1 items-end">
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
  return (
    <div>
      <CustomTable
        columns={
          type === "buy" || type === "sell" ? buyOrsellColumns : dealsColumns
        }
        data={
          type === "deals"
            ? data?.slice(0, 10)
            : data?.orders?.slice(0, 10) || []
        }
        onRowClick={null}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20]}
        rowHeight={45}
        pagination={false}
      />
    </div>
  );
}
