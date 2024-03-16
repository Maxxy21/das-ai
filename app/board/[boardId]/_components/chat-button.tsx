"use client";
import {useState} from "react";
import Image from 'next/image';
import {Hint} from "@/components/hint";
import ChatInput from "@/app/board/[boardId]/_components/chat-input";


interface ChatButtonProps {
    boardId: string;
    isChatOpen: boolean;
    setChatOpen: (open: boolean) => void;
}

export const ChatButton = ({boardId, setChatOpen, isChatOpen}: ChatButtonProps) => {


    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <Hint label="Explore how AI can help you" side="top" sideOffset={12}>
                <Image
                    src="/chat-icon.svg"
                    alt="Board logo"
                    height={32}
                    width={32}
                    onClick={() => setChatOpen(!isChatOpen)}
                />
            </Hint>
            <ChatInput open={isChatOpen} onClose={() => setChatOpen(false)} boardId={boardId}/>
        </div>

    );
}

export const ChatButtonSkeleton = () => {
    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"/>
    );
};
