"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin } from "lucide-react";

interface CitySelectorProps {
  onSelect: (city: string) => void;
  onBack: () => void;
}

const cities = [
  { id: "seoul", name: "서울", nameEn: "Seoul", popular: true },
  { id: "busan", name: "부산", nameEn: "Busan", popular: true },
  { id: "incheon", name: "인천", nameEn: "Incheon", popular: false },
  { id: "daegu", name: "대구", nameEn: "Daegu", popular: false },
  { id: "daejeon", name: "대전", nameEn: "Daejeon", popular: false },
  { id: "gwangju", name: "광주", nameEn: "Gwangju", popular: false },
  { id: "suwon", name: "수원", nameEn: "Suwon", popular: false },
  { id: "jeju", name: "제주", nameEn: "Jeju", popular: true },
];

export function CitySelector({ onSelect, onBack }: CitySelectorProps) {
  const popularCities = cities.filter((c) => c.popular);
  const otherCities = cities.filter((c) => !c.popular);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 -ml-2">
            <ChevronLeft className="h-4 w-4" />
            뒤로
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            1단계 / 3단계
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            도시를 선택해주세요
          </h1>
          <p className="text-muted-foreground">
            배달을 원하시는 도시를 선택하세요
          </p>
        </div>

        {/* Popular Cities */}
        <div className="mt-12">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">인기 도시</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {popularCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelect(city.name)}
                className="group p-6 rounded-2xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all text-left"
              >
                <MapPin className="h-5 w-5 mb-3 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                <p className="text-lg font-semibold">{city.name}</p>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                  {city.nameEn}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Other Cities */}
        <div className="mt-10">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">기타 도시</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSelect(city.name)}
                className="group p-4 rounded-xl bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all text-left"
              >
                <p className="font-medium">{city.name}</p>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                  {city.nameEn}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
