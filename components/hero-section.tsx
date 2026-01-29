"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              K-<span className="text-primary">Delivery</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <span className="hover:text-white cursor-pointer transition-colors">서비스 안내</span>
            <span className="hover:text-white cursor-pointer transition-colors">메뉴</span>
            <span className="hover:text-white cursor-pointer transition-colors">문의</span>
          </nav>
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            onClick={onStart}
          >
            지금 주문하기
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.1]">
              한국의 배달문화를<br />경험해보세요
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              한국 휴대폰 번호 없이도 인기 배달 음식을 주문하세요.<br />
              숙소까지 안전하게 배달해 드립니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
              onClick={onStart}
            >
              주문 시작하기
              <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 px-10 text-lg rounded-full bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:scale-105 transition-all"
            >
              서비스 더 알아보기
            </Button>
          </div>
        </div>

        {/* Features Overlay */}
        <div className="mt-32 w-full max-w-5xl mx-auto pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="메뉴 선택"
              subtitle="Authentic Korean Flavors"
              description="한국인들이 사랑하는 가장 인기 있는 메뉴들을 둘러보세요."
              icon="😋"
            />
            <FeatureCard
              title="주문하기"
              subtitle="Quick & Easy Ordering"
              description="간단한 정보 입력만으로 주문을 완료할 수 있어요."
              icon="📝"
            />
            <FeatureCard
              title="쉬운 결제"
              subtitle="Global Payment Methods"
              description="위챗페이, 알리페이, 또는 국제 카드로 간편하게 결제하세요."
              icon="💳"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-background border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-foreground">K-Delivery</span>
            <p>© 2026 Creatrip Clone. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-8">
            <span className="hover:text-primary cursor-pointer transition-colors">개인정보처리방침</span>
            <span className="hover:text-primary cursor-pointer transition-colors">이용약관</span>
            <span className="hover:text-primary cursor-pointer transition-colors">문의하기</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  subtitle,
  description,
  icon,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      <p className="text-sm font-bold text-primary mt-1 uppercase tracking-wider">{subtitle}</p>
      <p className="mt-4 text-muted-foreground leading-relaxed font-medium">{description}</p>
    </div>
  );
}
