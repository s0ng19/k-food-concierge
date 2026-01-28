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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">주문이 접수되었습니다</h1>
          <p className="text-muted-foreground">
            주문이 성공적으로 제출되었습니다
          </p>
        </div>

        {/* Order Number */}
        <div className="p-4 rounded-xl bg-secondary/50">
          <p className="text-sm text-muted-foreground">주문번호</p>
          <p className="text-xl font-mono font-semibold mt-1">{orderNumber}</p>
        </div>

        {/* Order Details */}
        <div className="p-6 rounded-2xl bg-secondary/50 text-left">
          <h3 className="font-semibold mb-4">주문 상세</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">도시</span>
              <span>{orderData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">상품</span>
              <span className="text-right">
                {orderData.items.map((item) => `${item.nameKo} x${item.quantity}`).join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">배송 주소</span>
              <span className="text-right max-w-48 truncate">{orderData.deliveryAddress}</span>
            </div>
            <div className="pt-3 border-t border-border flex justify-between font-semibold">
              <span>총계</span>
              <span>₩{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="font-semibold">다음 단계</h3>
          <div className="space-y-3">
            <StepCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="위챗 연락"
              description="10분 이내에 위챗으로 연락드립니다"
              descriptionSub="결제 및 주문 확인을 위해 연락드립니다"
            />
            <StepCard
              icon={<Clock className="h-5 w-5" />}
              title="확인 및 결제"
              description="주문 확인 후 위챗페이로 결제를 진행합니다"
              descriptionSub="결제가 완료되면 배달 주문을 진행합니다"
            />
            <StepCard
              icon={<Home className="h-5 w-5" />}
              title="배달 완료"
              description="저희가 대신 주문하고 숙소까지 배달해 드립니다"
              descriptionSub="배달 완료 후 알림을 드립니다"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full gap-2 bg-transparent"
            onClick={onReset}
          >
            <Home className="h-4 w-4" />
            홈으로 돌아가기
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
  descriptionSub,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  descriptionSub: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 text-left">
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{descriptionSub}</p>
      </div>
    </div>
  );
}
