import useSWR from "swr";
import CustomTable from "../table";
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

  const buyOrsellColumns = [
    {
      header: "باقی مانده",
      accessor: "remain",
    },
    {
      header: "قیمت",
      accessor: "price",
    },
    {
      header: "ارزش",
      accessor: "value",
    },
  ];
  
  const dealsColumns = [
    {
      header: "مقدار هدف",
      accessor: "match_amount",
      render: (row: OrderType) => (
        <div className="flex flex-col">
          <span>{formatPersianNumber(Number(row?.match_amount), 2)}</span>
          <span className="text-[#676767]"> {"toman"}</span>
        </div>
      ),
    },
    {
      header: "قیمت",
      accessor: "price",
      render: (row: OrderType) => (
        <div className="flex flex-col">
          <span>{formatPersianNumber(Number(row?.price), 4)}</span>
          <span className="text-[#676767]"> {"toman"}</span>
        </div>
      ),
    },
    {
      header: "تاریخ",
      accessor: "time",
      render: (row: OrderType) => (
        <div className="flex flex-col">
          <span>{formatJallali(row?.time)}</span>
        </div>
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
        onRowClick={() => {}}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20]}
        rowHeight={50}
      />
    </div>
  );
}
