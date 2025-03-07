import useSWR from "swr";
import CustomTable from "../table";

export default function OrdersList({
  marketId,
  type,
}: {
  marketId: number;
  type: "buy" | "sell" | "deal";
}) {
  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data } = useSWR(
    type === "deal"
      ? `https://api.bitpin.org/v1/mth/matches/${marketId}/`
      : `https://api.bitpin.org/v2/mth/actives/${marketId}/?type=${type}`,
    fetcher
  );

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
      header: "قیمت هدف",
      accessor: "match_amount",
    },
    {
      header: "قیمت",
      accessor: "price",
    },
    {
      header: "تاریخ",
      accessor: "time",
    },
  ];
  return (
    <div>
      <CustomTable
        columns={(type === "buy" || "sell" )? buyOrsellColumns : dealsColumns}
        data={
          type === "deal"
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
