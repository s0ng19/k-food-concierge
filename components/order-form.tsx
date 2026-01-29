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
            3단계 <span className="text-muted-foreground">/ 3단계</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            배송 정보 입력
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto font-medium">
            정확한 배송을 위해 상세 정보를 입력해주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="address" className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  배송 주소
                </Label>
                <Textarea
                  id="address"
                  placeholder="상세 주소, 호텔 이름, 객실 번호 등..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="min-h-32 resize-none rounded-2xl border-2 border-border focus:border-primary transition-all text-lg p-5"
                  required
                />
              </div>

              {/* Address Image Upload */}
              <div className="space-y-4">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <ImagePlus className="h-5 w-5 text-primary" />
                  주소 스크린샷 (선택)
                </Label>

                {!addressImage ? (
                  <div
                    className={`relative border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer ${isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
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
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ImagePlus className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">이미지 클릭 또는 드래그</p>
                        <p className="text-sm text-muted-foreground font-medium">
                          호텔 주소 스크린샷을 올려주시면 더 정확한 배송이 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-[2rem] overflow-hidden border-2 border-border group shadow-lg">
                    <img
                      src={addressImage}
                      alt="Address Screenshot"
                      className="w-full h-auto object-cover max-h-64"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors shadow-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all pointer-events-none" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="wechat" className="text-lg font-bold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  위챗 ID
                </Label>
                <Input
                  id="wechat"
                  placeholder="위챗 ID를 입력해주세요"
                  value={wechatId}
                  onChange={(e) => setWechatId(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-border focus:border-primary transition-all text-lg px-6"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="note" className="text-lg font-bold flex items-center gap-2">
                  <span className="h-5 w-5 text-primary">📝</span>
                  요청 사항
                </Label>
                <Textarea
                  id="note"
                  placeholder="특이사항, 알러지, 또는 특별한 요청..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-24 resize-none rounded-2xl border-2 border-border focus:border-primary transition-all text-lg p-5"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-full text-lg font-black bg-primary hover:bg-primary/90 text-white shadow-xl hover:scale-[1.02] transition-all"
                disabled={!deliveryAddress || !wechatId}
              >
                PLACE YOUR ORDER
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-[2rem] bg-white border-2 border-border shadow-xl space-y-6">
              <h3 className="text-2xl font-black flex items-center gap-2">
                <span className="h-5 w-5 bg-primary rounded-full"></span>
                주문 요약
              </h3>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start group">
                    <div>
                      <p className="font-extrabold text-foreground group-hover:text-primary transition-colors">{item.nameKo}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase">{item.name} x {item.quantity}</p>
                    </div>
                    <p className="font-bold">₩{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t-2 border-dashed border-border">
                <div className="flex justify-between text-sm font-bold text-muted-foreground uppercase tracking-tight">
                  <span>소계</span>
                  <span>₩{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-muted-foreground uppercase tracking-tight">
                  <span>서비스 수수료</span>
                  <span>₩{serviceFee.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-6 border-t-2 border-border flex justify-between items-end">
                <span className="text-xl font-black text-foreground">총계</span>
                <span className="text-3xl font-black text-primary">₩{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-primary/5 border-2 border-primary/20 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-2xl shrink-0 shadow-lg">
                  💳
                </div>
                <div>
                  <h4 className="text-lg font-black text-primary mb-1">Payment Notice</h4>
                  <p className="text-sm font-bold text-primary/70 leading-relaxed uppercase tracking-tight mb-2">
                    WeChat / Alipay / Global Cards
                  </p>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    After placing the order, we will reach out via WeChat to complete the payment process.
                    Please ensure your WeChat ID is correct.
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

// Added missing imports for UI components if needed
import { MapPin } from "lucide-react";
