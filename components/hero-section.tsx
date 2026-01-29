"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, UtensilsCrossed, Sparkles, Scissors, X, MapPin, CreditCard, Clock, MessageCircle } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  const [showServiceInfo, setShowServiceInfo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-white">
              K-<span className="text-primary">Service</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => setShowServiceInfo(true)}
            >
              서비스 안내
            </span>
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

      {/* Service Info Modal */}
      {showServiceInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowServiceInfo(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-foreground">서비스 이용 안내</h2>
              <button
                onClick={() => setShowServiceInfo(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* How to Order */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UtensilsCrossed className="h-4 w-4 text-primary" />
                  </div>
                  주문 방법
                </h3>
                <div className="pl-10 space-y-2 text-muted-foreground">
                  <p><span className="font-bold text-foreground">1.</span> 원하는 메뉴를 선택하고 수량을 조절하세요.</p>
                  <p><span className="font-bold text-foreground">2.</span> 배송지 주소와 WeChat ID를 입력하세요.</p>
                  <p><span className="font-bold text-foreground">3.</span> 주문 완료 후 WeChat으로 결제 안내를 받으세요.</p>
                  <p><span className="font-bold text-foreground">4.</span> 결제 확인 후 음식이 배달됩니다!</p>
                </div>
              </div>

              {/* Delivery Area */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-500" />
                  </div>
                  배달 가능 지역
                </h3>
                <div className="pl-10 space-y-2 text-muted-foreground">
                  <p>현재 <span className="font-bold text-primary">서울 전 지역</span>에서 서비스를 제공하고 있습니다.</p>
                  <p className="text-sm">• 강남, 홍대, 명동, 이태원, 동대문 등 주요 관광지 포함</p>
                  <p className="text-sm">• 호텔, 에어비앤비, 게스트하우스 모두 배달 가능</p>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-green-500" />
                  </div>
                  결제 방법
                </h3>
                <div className="pl-10 space-y-2 text-muted-foreground">
                  <p><span className="font-bold text-foreground">WeChat Pay</span> - 위챗 페이로 간편하게 결제</p>
                  <p><span className="font-bold text-foreground">Alipay</span> - 알리페이 결제 가능</p>
                  <p className="text-sm text-amber-600">* 현금 결제는 지원하지 않습니다.</p>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  배달 시간
                </h3>
                <div className="pl-10 space-y-2 text-muted-foreground">
                  <p>주문 확인 후 평균 <span className="font-bold text-primary">40~60분</span> 이내 배달</p>
                  <p className="text-sm">• 운영 시간: 오전 11:00 ~ 오후 10:00</p>
                  <p className="text-sm">• 주문량에 따라 배달 시간이 달라질 수 있습니다.</p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#07C160]/10 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-[#07C160]" />
                  </div>
                  문의하기
                </h3>
                <div className="pl-10 space-y-2 text-muted-foreground">
                  <p>궁금한 점이 있으시면 <span className="font-bold text-[#07C160]">WeChat</span>으로 문의해 주세요!</p>
                  <p className="text-sm">화면 오른쪽 하단의 WeChat 버튼을 클릭하세요.</p>
                </div>
              </div>

              {/* Service Fee Notice */}
              <div className="bg-muted/50 rounded-2xl p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">💡 서비스 수수료 안내</span><br />
                  모든 주문에는 ₩5,000의 서비스 수수료가 포함됩니다.
                  이 수수료는 대행 주문, 배달, 고객 지원 서비스를 위해 사용됩니다.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 rounded-b-3xl">
              <Button
                className="w-full rounded-full h-12 text-lg font-bold"
                onClick={() => {
                  setShowServiceInfo(false);
                  onStart();
                }}
              >
                지금 주문하기
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.1]">
              한국의 프리미엄 서비스를<br />경험해보세요
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              한국 휴대폰 번호 없이도 다양한 서비스를 이용하세요.<br />
              배달, 마사지, 헤어샵까지 원스톱으로!
            </p>
          </div>

          {/* Service Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Delivery - Active */}
            <div
              onClick={onStart}
              className="group relative p-6 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-primary shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-full">
                  이용 가능
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">배달 서비스</h3>
                  <p className="text-sm text-muted-foreground mt-1">한국 인기 음식 배달</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  치킨, 피자, 분식 등 한국인들이 사랑하는 배달 음식을 숙소까지 안전하게 배달해 드립니다.
                </p>
                <Button className="w-full rounded-full mt-2 group-hover:bg-primary/90">
                  주문하기
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Massage - Coming Soon */}
            <div className="group relative p-6 rounded-3xl bg-white/60 backdrop-blur-xl border-2 border-white/30 shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold bg-amber-500 text-white rounded-full">
                  서비스 예정
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 opacity-80">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">마사지</h3>
                  <p className="text-sm text-muted-foreground mt-1">프리미엄 스파 & 마사지</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  한국 최고의 스파와 마사지샵을 예약하세요. 피로를 풀어드립니다.
                </p>
                <Button disabled variant="outline" className="w-full rounded-full mt-2 opacity-50">
                  준비 중
                </Button>
              </div>
            </div>

            {/* Hair Salon - Coming Soon */}
            <div className="group relative p-6 rounded-3xl bg-white/60 backdrop-blur-xl border-2 border-white/30 shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold bg-amber-500 text-white rounded-full">
                  서비스 예정
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 opacity-80">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                  <Scissors className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">헤어샵</h3>
                  <p className="text-sm text-muted-foreground mt-1">K-뷰티 헤어 스타일링</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  한국 트렌디한 헤어샵에서 K-스타일 헤어컷과 염색을 경험하세요.
                </p>
                <Button disabled variant="outline" className="w-full rounded-full mt-2 opacity-50">
                  준비 중
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-background border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-foreground">K-Service</span>
            <p>© 2026 K-Service. All rights reserved.</p>
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
