"use client";

import React from "react"

import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Clock, Home } from "lucide-react";
import type { OrderData } from "@/app/page";

interface OrderCompleteProps {
  orderData: OrderData;
  onReset: () => void;
}

export function OrderComplete({ orderData, onReset }: OrderCompleteProps) {
  const totalPrice = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceFee = 5000;
  const finalTotal = totalPrice + serviceFee;

  const orderNumber = `KD${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background animate-in zoom-in duration-500">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">주문 완료!</h1>
          <p className="text-xl text-muted-foreground font-medium">
            주문이 성공적으로 접수되었습니다. 곧 연락드릴게요!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Order Details Card */}
          <div className="p-8 rounded-[2rem] bg-white border-2 border-border shadow-xl space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">주문 번호</p>
              <p className="text-2xl font-black font-mono">{orderNumber}</p>
            </div>

            <div className="space-y-4 pt-6 border-t-2 border-dashed border-border">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase">도시</span>
                <span className="font-extrabold">{orderData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase">메뉴</span>
                <span className="font-extrabold text-right">
                  {orderData.items.map((item) => `${item.nameKo} x${item.quantity}`).join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase">배송지</span>
                <span className="font-extrabold text-right truncate max-w-32">{orderData.deliveryAddress}</span>
              </div>
              <div className="pt-4 border-t-2 border-border flex justify-between items-end">
                <span className="text-lg font-black text-foreground uppercase tracking-tight">총 결제 금액</span>
                <span className="text-2xl font-black text-primary">₩{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Next Steps List */}
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              다음 단계는?
            </h3>
            <div className="space-y-4">
              <StepCard
                icon={<MessageCircle className="h-5 w-5 text-primary" />}
                title="위챗 확인"
                description="주문 확인을 위해 10분 이내에 위챗으로 연락드립니다."
              />
              <StepCard
                icon={<Clock className="h-5 w-5 text-primary" />}
                title="결제 완료"
                description="확인 후 결제가 완료되면 공식 주문이 진행됩니다."
              />
              <StepCard
                icon={<Home className="h-5 w-5 text-primary" />}
                title="숙소 배달"
                description="편안히 기다려주세요! 숙소까지 안전하게 배달해 드립니다."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            size="lg"
            className="rounded-full h-16 px-10 text-lg font-black bg-primary hover:bg-primary/90 text-white shadow-xl hover:scale-105 transition-all"
            onClick={onReset}
          >
            <Home className="mr-2 h-6 w-6" />
            홈으로 돌아가기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-16 px-10 text-lg font-bold border-2 border-border hover:bg-secondary transition-all"
          >
            주문 내역 관리
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-lg font-black text-foreground mb-1">{title}</p>
        <p className="text-sm font-medium text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
