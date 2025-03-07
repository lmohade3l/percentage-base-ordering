import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import OrdersList from "./OrdersList";

export function OrdersPage() {
  const { marketId } = useParams();

  return (
    <div className="w-full rtl">
      <Tabs defaultValue="buy" className="w-full m-2" dir="rtl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className="cursor-[pointer]" value="buy">
            سفارشات خرید
          </TabsTrigger>
          <TabsTrigger className="cursor-[pointer]" value="sell">
            سفارشات فروش
          </TabsTrigger>
          <TabsTrigger className="cursor-[pointer]" value="deals">
            معاملات
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deals">
          <OrdersList type="deals" marketId={Number(marketId)} />
        </TabsContent>
        <TabsContent value="buy">
          <OrdersList type="buy" marketId={Number(marketId)} />
        </TabsContent>
        <TabsContent value="sell">
          <OrdersList type="sell" marketId={Number(marketId)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
