"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { formatPersianNumber } from "@/lib/numberUtils";
import { MarketType } from "@/types/market";
import { useNavigate } from "react-router-dom";
import CustomTable, { Column } from "@/components/table";

export default function MarketsPage() {
  const fetcher = (...args: [string, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data } = useSWR("https://api.bitpin.org/v1/mkt/markets/", fetcher);

  const navigate = useNavigate();

  const [selectedMarketBase, setSelectedMarketBase] = useState("تومان");
  const [filteredData, setFilteredData] = useState([]);

  const columns: Column<MarketType>[] = [
    {
      header: "نام رمزارز",
      accessor: "id",
      render: (row: MarketType) => {
        return (
          <div className="flex gap-2 items-center">
            <img src={row?.currency1?.image} width={30} height={30} alt="" />
            <div className="flex flex-col">
              <span className=" text-[14px] font-[500]">
                {row?.currency1?.title_fa}
              </span>
              <span className="text-[#676767] text-[12px]">{`${row?.currency1?.code} / ${row?.currency2?.code}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "آخرین قیمت",
      accessor: "price",
      render: (row: MarketType) => (
        <div className="flex flex-col">
          <span>{formatPersianNumber(Number(row?.price), 4)}</span>
          <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
        </div>
      ),
    },
    {
      header: "تغییرات",
      accessor: "id",
      render: (row: MarketType) => (
        <span
          className={`${
            row?.price_info?.change > 0
              ? "text-[#1FB87F]"
              : row?.price_info?.change < 0
              ? "text-[#EA373F]"
              : "text-[#000]"
          } font-[700] `}
        >{`% ${formatPersianNumber(row?.price_info?.change, 2)} `}</span>
      ),
    },
    {
      header: "ارزش معاملات ۲۴ ساعت",
      accessor: "market_cap",
      render: (row: MarketType) => (
        <div className="flex flex-col">
          <span>{formatPersianNumber(Number(row?.market_cap))}</span>
          <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
        </div>
      ),
    },
    {
      header: "حجم معاملات ۲۴ ساعت",
      accessor: "volume_24h",
      render: (row: MarketType) => (
        <div className="flex flex-col">
          <span>{formatPersianNumber(Number(row?.volume_24h))}</span>
          <span className="text-[#676767]"> {row?.currency2?.title_fa}</span>
        </div>
      ),
    },
    {
      header: "",
      accessor: "actions",
      render: (row: MarketType) => (
        <div className="flex flex-col">
          <button
            onClick={() => navigate(`/orders/${row?.id}`)}
            className="rounded-[10px] bg-[#00D890] py-1  cursor-[pointer]"
          >
            سفارشات
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!data) return;
    const filtered = data?.results?.filter((d: MarketType) =>
      selectedMarketBase === "تتر"
        ? d?.currency2?.code === "USDT"
        : d?.currency2?.code === "IRT"
    );
    setFilteredData(filtered);
  }, [selectedMarketBase, data]);

  return (
    <div dir="rtl" className="text-right border rounded-lg pb-2">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="pr-5">رمزارزهای برتر</span>
        <div className="flex justify-end">
          <div className="border grid grid-cols-2  gap-1 py-1 px-1 rounded-[10px]">
            <span
              className={`px-3 py-[6px]  rounded-[10px] cursor-pointer text-center transition-colors ${
                selectedMarketBase === "تتر" ? "bg-[#DEF3DE]" : "bg-white"
              } ${
                selectedMarketBase === "تتر"
                  ? "text-[#1FB87F]"
                  : "text-[#939696]"
              }`}
              onClick={() => {
                setSelectedMarketBase("تتر");
              }}
            >
              تتر
            </span>
            <span
              className={`px-3 py-[6px] rounded-[10px] cursor-pointer transition-colors ${
                selectedMarketBase === "تومان" ? "bg-[#DEF3DE]" : "bg-white"
              } ${
                selectedMarketBase === "تومان"
                  ? "text-[#1FB87F]"
                  : "text-[#939696]"
              }`}
              onClick={() => {
                setSelectedMarketBase("تومان");
              }}
            >
              تومان
            </span>
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredData || []}
        onRowClick={null}
        pageSize={10}
        pageSizeOptions={[5, 10, 15, 20]}
        rowHeight={80}
      />
    </div>
  );
}
