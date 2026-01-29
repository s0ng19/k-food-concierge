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
    image: "https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Best"
  },
  {
    id: "yangnyeom-chicken",
    name: "Sweet & Spicy (Yangnyeom)",
    nameKo: "양념 치킨",
    description: "Glazed in Korea's famous sweet and tangy chili sauce.",
    price: 19000,
    image: "https://images.pexels.com/photos/5836628/pexels-photo-5836628.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Hot"
  },
  {
    id: "soy-garlic-chicken",
    name: "Soy Garlic Glazed",
    nameKo: "간장 마늘 치킨",
    description: "Perfect balance of savory soy and roasted garlic.",
    price: 19000,
    image: "https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "half-half",
    name: "Half & Half (Banban)",
    nameKo: "반반 치킨",
    description: "Can't decide? Get both Original and Yangnyeom!",
    price: 20000,
    image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "honey-butter-chicken",
    name: "Honey Butter Snow",
    nameKo: "허니버터 치킨",
    description: "Sweet honey glaze with savory butter powder.",
    price: 22000,
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    <>
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
              1단계 <span className="text-muted-foreground">/ 2단계</span>
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
      </div>

      {/* Floating Cart Widget - OUTSIDE main container to fix position:fixed */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-24 z-[9998] pointer-events-none">
          <div className="max-w-md pointer-events-auto">
            <div className="bg-foreground text-background rounded-xl p-3 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-5 duration-300">
              {/* Cart Summary Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/20">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                      {totalItems}개 상품
                    </p>
                    <p className="text-base font-black">₩{totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs rounded-full text-background/70 hover:text-background hover:bg-white/10"
                    onClick={() => setQuantities({})}
                  >
                    비우기
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 px-4 text-sm rounded-full bg-primary hover:bg-primary/90 text-white font-bold gap-1"
                    onClick={handleContinue}
                  >
                    주문
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}
