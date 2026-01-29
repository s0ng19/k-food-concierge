"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin } from "lucide-react";

interface CitySelectorProps {
  onSelect: (city: string) => void;
  onBack: () => void;
}

const cities = [
  { id: "seoul", name: "서울", nameEn: "Seoul", popular: true, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop" },
  { id: "busan", name: "부산", nameEn: "Busan", popular: true, image: "https://images.unsplash.com/photo-1596901058277-285628468725?q=80&w=800&auto=format&fit=crop" },
  { id: "jeju", name: "제주", nameEn: "Jeju", popular: true, image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop" },
  { id: "incheon", name: "인천", nameEn: "Incheon", popular: false },
  { id: "daegu", name: "대구", nameEn: "Daegu", popular: false },
  { id: "daejeon", name: "대전", nameEn: "Daejeon", popular: false },
  { id: "gwangju", name: "광주", nameEn: "Gwangju", popular: false },
  { id: "suwon", name: "수원", nameEn: "Suwon", popular: false },
];

export function CitySelector({ onSelect, onBack }: CitySelectorProps) {
  const popularCities = cities.filter((c) => c.popular);
  const otherCities = cities.filter((c) => !c.popular);

  return (
    <div className="min-h-screen flex flex-col bg-background animate-in fade-in duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 font-bold text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            뒤로
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <div className="space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            1단계 <span className="text-muted-foreground">/ 3단계</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            어디에 계신가요?
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium">
            현재 계신 도시를 선택하시면 가장 맛있는 배달 맛집을 찾아드릴게요.
          </p>
        </div>

        {/* Popular Cities */}
        <div className="mb-16">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            인기 도시
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelect(city.name)}
                className="group relative h-80 overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={city.image}
                  alt={city.nameEn}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-left text-white">
                  <p className="text-3xl font-extrabold mb-1 tracking-tight">{city.nameEn}</p>
                  <p className="text-lg font-bold opacity-80">{city.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Other Cities */}
        <div>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary/40 rounded-full"></span>
            기타 도시
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelect(city.name)}
                className="group p-6 rounded-2xl bg-secondary/30 border border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <p className="text-lg font-extrabold text-foreground group-hover:text-primary mb-1">{city.nameEn}</p>
                <p className="font-bold text-muted-foreground group-hover:text-primary/70">{city.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
