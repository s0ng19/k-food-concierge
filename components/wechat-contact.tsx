"use client";

import React, { useState } from "react";
import { X, MessageCircle, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WeChatContact() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    const copyAndOpenWeChat = (wechatId: string) => {
        // 기능 제거 요청으로 인해 비활성화됨
        // navigator.clipboard.writeText(wechatId)...
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={togglePopup}
                className="fixed bottom-8 right-8 z-[9999] group transition-transform hover:scale-110 active:scale-95"
                aria-label="WeChat 문의"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
                    <div className="relative h-16 w-16 bg-[#07C160] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                        <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="block h-2 w-2 bg-white rounded-full animate-pulse" />
                    </div>
                </div>
            </button>

            {/* Popup Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300"
                    onClick={togglePopup}
                >
                    <div
                        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-8 pb-4 text-center relative">
                            <button
                                onClick={togglePopup}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
                            >
                                <X className="h-6 w-6 text-muted-foreground" />
                            </button>

                            <div className="inline-flex items-center justify-center h-20 w-20 bg-[#07C160]/10 rounded-full mb-6">
                                <MessageCircle className="h-10 w-10 text-[#07C160]" />
                            </div>
                            <h2 className="text-3xl font-black text-[#07C160] mb-2">WeChat 고객 상담</h2>
                            <p className="text-muted-foreground font-medium">
                                QR 코드를 바로 스캔하시거나<br />ID를 위챗에서 검색해 주세요.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-0">
                            <div className="grid grid-cols-2 gap-6 my-8">
                                <AgentBox
                                    name="김당장 매니저"
                                    id="kim_manager_id"
                                    imageSrc="/qr.png"
                                />
                                <AgentBox
                                    name="이담당 매니저"
                                    id="lee_manager_id"
                                    placeholder="QR Code B"
                                />
                            </div>

                            <Button
                                onClick={togglePopup}
                                variant="secondary"
                                className="w-full h-14 rounded-full text-lg font-bold"
                            >
                                닫기
                            </Button>
                        </div>

                        {/* Footer */}
                        <div className="bg-secondary/30 p-4 text-center">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Service Hours: 09:00 - 24:00 (KST)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function AgentBox({ name, id, placeholder, imageSrc }: { name: string; id: string; placeholder?: string; imageSrc?: string }) {
    return (
        <div
            className="group flex flex-col items-center p-4 rounded-3xl border-2 border-transparent transition-all outline-none"
        >
            <div className="relative mb-4">
                <div className="h-32 w-32 rounded-2xl bg-secondary flex items-center justify-center border-2 border-border overflow-hidden group-hover:scale-105 transition-transform">
                    <img
                        src={imageSrc || `https://placehold.co/150x150/f9f9f9/333?text=${placeholder}`}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="text-center">
                <p className="font-black text-foreground mb-0.5">{name}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter flex items-center justify-center gap-1">
                    ID: {id}
                </p>
            </div>
        </div>
    );
}
