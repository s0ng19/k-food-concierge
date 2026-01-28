"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, MessageCircle, ImagePlus, X } from "lucide-react";
import type { OrderData } from "@/app/page";
import Image from "next/image";

interface OrderFormProps {
  orderData: OrderData;
  onSubmit: (data: Pick<OrderData, "deliveryAddress" | "wechatId" | "note">) => void;
  onBack: () => void;
}

export function OrderForm({ orderData, onSubmit, onBack }: OrderFormProps) {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [wechatId, setWechatId] = useState("");
  const [note, setNote] = useState("");
  const [addressImage, setAddressImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAddressImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setAddressImage(null);
  };

  const totalPrice = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const serviceFee = 5000;
  const finalTotal = totalPrice + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress || !wechatId) return;
    onSubmit({ deliveryAddress, wechatId, note });
  };

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
            3단계 / 3단계
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            배송 정보를 입력해주세요
          </h1>
          <p className="text-muted-foreground">
            배송지 정보와 위챗 ID를 입력해주세요
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">배송 주소 *</Label>
              <Textarea
                id="address"
                placeholder="상세 주소를 입력해주세요 (호텔명, 객실번호 등)"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="min-h-24 resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                배송받으실 주소 (호텔명, 객실번호 등)
              </p>
            </div>

            {/* Address Image Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                주소 스크린샷 (선택)
              </Label>
              
              {!addressImage ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                    isDragging 
                      ? "border-foreground bg-secondary" 
                      : "border-border hover:border-muted-foreground hover:bg-secondary/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">이미지를 업로드하세요</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        클릭하거나 드래그하여 업로드
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border">
                  <Image
                    src={addressImage || "/placeholder.svg"}
                    alt="주소 스크린샷"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover max-h-48"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                지도 앱이나 호텔 예약 화면의 스크린샷을 올려주시면 주소 확인이 더 쉬워요
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wechat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                위챗 ID *
              </Label>
              <Input
                id="wechat"
                placeholder="위챗 ID를 입력해주세요"
                value={wechatId}
                onChange={(e) => setWechatId(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                결제 및 연락을 위한 위챗 ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">요청사항</Label>
              <Textarea
                id="note"
                placeholder="기타 요청사항 (예: 덜 맵게, 소스 많이 등)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-20 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                추가 요청사항 (선택사항)
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={!deliveryAddress || !wechatId}
            >
              주문 제출하기
            </Button>
          </form>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-secondary/50">
              <h3 className="font-semibold mb-4">주문 요약</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.nameKo} x {item.quantity}
                    </span>
                    <span>₩{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">소계</span>
                    <span>₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">대행 서비스 수수료</span>
                    <span>₩{serviceFee.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border flex justify-between font-semibold">
                  <span>총계</span>
                  <span>₩{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-accent/5">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">위챗페이 결제 안내</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    주문 제출 후, 위챗으로 연락드려 결제를 진행합니다. 위챗 ID가 정확한지 확인해주세요.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    주문 제출 후 위챗으로 결제 안내를 드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
