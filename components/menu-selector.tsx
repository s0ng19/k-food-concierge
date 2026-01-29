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
    id: "bbq-ppum",
    name: "BBQ Cheese Powder",
    nameKo: "BBQ 뿜치킨",
    description: "바삭한 치킨 위에 진한 치즈 파우더를 듬뿍! BBQ만의 시그니처 치즈 치킨.",
    price: 22000,
    image: "/menu-3.jpg",
    tag: "New"
  },
  {
    id: "bbq-olive",
    name: "BBQ Golden Olive",
    nameKo: "BBQ 황금올리브",
    description: "100% 올리브유로 튀겨낸 담백하고 바삭한 프리미엄 후라이드. BBQ 대표 메뉴!",
    price: 20000,
    image: "/menu-4.jpg",
    tag: "Best"
  },
  {
    id: "bhc-ppuring",
    name: "BHC Ppurinkle",
    nameKo: "BHC 뿌링클",
    description: "달콤한 치즈 시즈닝을 뿌린 BHC 인기 메뉴. 특제 뿌링 소스와 함께!",
    price: 21000,
    image: "/menu-1.png",
  },
  {
    id: "bhc-makcho",
    name: "BHC Mak Choking",
    nameKo: "BHC 막초킹",
    description: "마늘 간장 소스에 파채와 청양고추를 더한 매콤달콤한 갈릭 치킨.",
    price: 21000,
    image: "/menu-5.png",
    tag: "Hot"
  },
  {
    id: "kyochon-red",
    name: "Kyochon Red Combo",
    nameKo: "교촌 레드콤보",
    description: "교촌만의 비법 레드 양념 소스! 달콤하고 매콤한 국민 양념 치킨. 무와 함께 제공.",
    price: 22000,
    image: "/menu-2.jpg",
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
                        {item.tag === "Best" ? "베스트" : item.tag === "Hot" ? "인기" : item.tag === "New" ? "신메뉴" : item.tag}
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
