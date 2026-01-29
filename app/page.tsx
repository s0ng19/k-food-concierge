"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { CitySelector } from "@/components/city-selector";
import { MenuSelector } from "@/components/menu-selector";
import { OrderForm } from "@/components/order-form";
import { OrderComplete } from "@/components/order-complete";
import { WeChatContact } from "@/components/wechat-contact";

export type OrderStep = "hero" | "city" | "menu" | "order" | "complete";

export interface OrderData {
  city: string;
  items: { id: string; name: string; nameKo: string; price: number; quantity: number }[];
  deliveryAddress: string;
  wechatId: string;
  note: string;
}

export default function Home() {
  const [step, setStep] = useState<OrderStep>("hero");
  const [orderData, setOrderData] = useState<OrderData>({
    city: "서울", // Seoul fixed for initial launch
    items: [],
    deliveryAddress: "",
    wechatId: "",
    note: "",
  });

  const handleCitySelect = (city: string) => {
    setOrderData((prev) => ({ ...prev, city }));
    setStep("menu");
  };

  const handleMenuSelect = (items: OrderData["items"]) => {
    setOrderData((prev) => ({ ...prev, items }));
    setStep("order");
  };

  const handleOrderSubmit = (data: Pick<OrderData, "deliveryAddress" | "wechatId" | "note">) => {
    setOrderData((prev) => ({ ...prev, ...data }));
    setStep("complete");
  };

  const handleReset = () => {
    setStep("hero");
    setOrderData({
      city: "서울",
      items: [],
      deliveryAddress: "",
      wechatId: "",
      note: "",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {step === "hero" && <HeroSection onStart={() => setStep("menu")} />}
      {step === "menu" && (
        <MenuSelector
          city={orderData.city}
          onSelect={handleMenuSelect}
          onBack={() => setStep("hero")}
        />
      )}
      {step === "order" && (
        <OrderForm
          orderData={orderData}
          onSubmit={handleOrderSubmit}
          onBack={() => setStep("menu")}
        />
      )}
      {step === "complete" && <OrderComplete orderData={orderData} onReset={handleReset} />}

      {/* Floating WeChat Contact */}
      <WeChatContact />
    </main>
  );
}
