"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">K-Delivery</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">서비스 소개</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">가격</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">문의하기</span>
          </nav>
          <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={onStart}>
            주문하기
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-14">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
              외국인 관광객 배달 대행 서비스
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-balance leading-tight">
              한국의 배달문화를
              <br />
              경험해보세요
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              한국 휴대폰 번호 없이도 한국의 인기 배달음식을 주문하세요.
              <br className="hidden md:block" />
              저희가 대신 주문하고, 숙소까지 배달해 드립니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base rounded-full"
              onClick={onStart}
            >
              주문 시작하기
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-base rounded-full bg-transparent"
            >
              자세히 알아보기
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 mb-16 w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="도시 선택"
              subtitle="Select City"
              description="현재 계신 한국 도시를 선택하세요"
            />
            <FeatureCard
              number="02"
              title="메뉴 선택"
              subtitle="Choose Menu"
              description="원하시는 메뉴를 선택하세요"
            />
            <FeatureCard
              number="03"
              title="위챗페이 결제"
              subtitle="WeChat Pay"
              description="위챗으로 결제하고 배달을 기다리세요"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 K-Delivery. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">개인정보처리방침</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">이용약관</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  subtitle,
  description,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
      <span className="text-sm font-medium text-muted-foreground">{number}</span>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
