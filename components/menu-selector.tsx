"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";

interface MenuSelectorProps {
  city: string;
  onSelect: (items: { id: string; name: string; nameKo: string; price: number; quantity: number }[]) => void;
  onBack: () => void;
}

const menuItems = [
  {
    id: "fried-chicken",
    name: "Fried Chicken",
    nameKo: "후라이드 치킨",
    description: "바삭바삭한 한국식 클래식 후라이드 치킨",
    price: 18000,
    image: "🍗",
  },
  {
    id: "yangnyeom-chicken",
    name: "Yangnyeom Chicken",
    nameKo: "양념 치킨",
    description: "달콤 매콤한 양념소스, 한국에서 가장 인기있는 치킨",
    price: 19000,
    image: "🍗",
  },
  {
    id: "soy-garlic-chicken",
    name: "Soy Garlic Chicken",
    nameKo: "간장 마늘 치킨",
    description: "간장과 마늘의 조화, 짭짤하고 달콤한 맛",
    price: 19000,
    image: "🍗",
  },
  {
    id: "half-half",
    name: "Half & Half",
    nameKo: "반반 치킨",
    description: "후라이드 반, 양념 반으로 두 가지 맛을 한 번에",
    price: 20000,
    image: "🍗",
  },
  {
    id: "cheese-chicken",
    name: "Cheese Chicken",
    nameKo: "치즈 치킨",
    description: "진한 치즈 소스와 함께, 치즈 러버들의 선택",
    price: 22000,
    image: "🧀",
  },
  {
    id: "spicy-chicken",
    name: "Spicy Chicken",
    nameKo: "매운 치킨",
    description: "한국식 매운 양념, 매운맛을 좋아하시는 분들에게 추천",
    price: 19000,
    image: "🌶️",
  },
];

export function MenuSelector({ city, onSelect, onBack }: MenuSelectorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      if (newQty === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const handleContinue = () => {
    const items = Object.entries(quantities).map(([id, quantity]) => {
      const item = menuItems.find((m) => m.id === id)!;
      return {
        id,
        name: item.name,
        nameKo: item.nameKo,
        price: item.price,
        quantity,
      };
    });
    onSelect(items);
  };

  return (
    <div className="min-h-screen flex flex-col pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 -ml-2">
            <ChevronLeft className="h-4 w-4" />
            뒤로
          </Button>
          <span className="text-sm text-muted-foreground">{city}</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            2단계 / 3단계
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            치킨 메뉴를 선택하세요
          </h1>
          <p className="text-muted-foreground">
            원하시는 한국 치킨을 골라주세요
          </p>
        </div>

        {/* Menu Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border transition-all ${
                  qty > 0
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-3xl">{item.image}</span>
                    <h3 className="mt-3 font-semibold">{item.nameKo}</h3>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-3 text-lg font-semibold">
                      ₩{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3">
                  {qty > 0 ? (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-transparent"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      추가
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border p-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {totalItems}개 상품
              </p>
              <p className="text-xl font-semibold">₩{totalPrice.toLocaleString()}</p>
            </div>
            <Button size="lg" className="rounded-full gap-2" onClick={handleContinue}>
              <ShoppingBag className="h-5 w-5" />
              계속하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
