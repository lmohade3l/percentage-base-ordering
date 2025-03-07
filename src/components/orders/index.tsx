import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import OrdersList from "./OrdersList";

export function OrdersPage() {
  const { marketId } = useParams();
  const [activeTab, setActiveTab] = useState<string>("buy");
  
  const tabOrder = ["buy", "sell", "deals"];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        setActiveTab(tabOrder[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabOrder[currentIndex - 1]);
      }
    },
    swipeDuration: 500, 
    preventScrollOnSwipe: true,
    trackMouse: false
  });

  return (
    <div className="w-full rtl" {...handlers}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full m-2" dir="rtl">
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