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
    name: "Classic Fried Chicken",
    nameKo: "후라이드 치킨",
    description: "Extra crispy Korean-style golden fried chicken.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    tag: "Best"
  },
  {
    id: "yangnyeom-chicken",
    name: "Sweet & Spicy (Yangnyeom)",
    nameKo: "양념 치킨",
    description: "Glazed in Korea's famous sweet and tangy chili sauce.",
    price: 19000,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c8d38f58?q=80&w=800&auto=format&fit=crop",
    tag: "Hot"
  },
  {
    id: "soy-garlic-chicken",
    name: "Soy Garlic Glazed",
    nameKo: "간장 마늘 치킨",
    description: "Perfect balance of savory soy and roasted garlic.",
    price: 19000,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "half-half",
    name: "Half & Half (Banban)",
    nameKo: "반반 치킨",
    description: "Can't decide? Get both Original and Yangnyeom!",
    price: 20000,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c71f9867?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "honey-butter-chicken",
    name: "Honey Butter Snow",
    nameKo: "허니버터 치킨",
    description: "Sweet honey glaze with savory butter powder.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?q=80&w=800&auto=format&fit=crop",
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
    <div className="min-h-screen flex flex-col pb-40 bg-background animate-in fade-in duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 font-bold text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            뒤로
          </Button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-bold text-muted-foreground uppercase tracking-tight">
            📍 {city}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            2단계 <span className="text-muted-foreground">/ 3단계</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            무엇을 드실래요?
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium">
            한국인들이 가장 즐겨 먹는 인기 메뉴들을 모아봤어요.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className={`group flex flex-col overflow-hidden rounded-[2rem] border-2 transition-all duration-300 ${qty > 0
                  ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                  : "border-border bg-white hover:border-primary/50 hover:shadow-xl"
                  }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* @ts-ignore */}
                  {item.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                      {/* @ts-ignore */}
                      {item.tag === "Best" ? "베스트" : item.tag === "Hot" ? "인기" : item.tag}
                    </div>
                  )}
                  {qty > 0 && (
                    <div className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-bold animate-in scale-in">
                      {qty}
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground">{item.nameKo}</h3>
                    <p className="font-bold text-muted-foreground uppercase tracking-tight text-sm">{item.name}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="pt-4 mt-auto flex items-center justify-between">
                    <p className="text-2xl font-black text-foreground">
                      ₩{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4">
                      {qty > 0 && (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, -1);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant={qty > 0 ? "default" : "secondary"}
                        size={qty > 0 ? "icon" : "sm"}
                        className={`h-10 rounded-full font-extrabold ${qty > 0 ? "w-10 shadow-lg" : "px-6 hover:bg-primary hover:text-white transition-colors"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, 1);
                        }}
                      >
                        {qty > 0 ? <Plus className="h-4 w-4" /> : "담기"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
          <div className="bg-foreground text-background rounded-full p-4 shadow-2xl flex items-center justify-between backdrop-blur-md bg-opacity-90 border border-white/20 animate-in slide-in-from-bottom-10">
            <div className="pl-6">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                {totalItems}개 상품 선택됨
              </p>
              <p className="text-2xl font-bold">₩{totalPrice.toLocaleString()}</p>
            </div>
            <Button
              size="lg"
              className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black gap-2 group"
              onClick={handleContinue}
            >
              확인
              <ChevronLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
