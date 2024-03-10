"use client";
import {useState} from "react";
import Image from 'next/image';
import {Hint} from "@/components/hint";
import ChatBox from "./chat-box";
import ChatInput from "@/app/board/[boardId]/_components/chat-input";


interface ChatButtonProps {
    boardId: string;
}

export const ChatButton = ({boardId}: ChatButtonProps) => {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <Hint label="Explore how AI can help you" side="top" sideOffset={12}>
                <Image
                    src="/chat-icon.svg"
                    alt="Board logo"
                    height={32}
                    width={32}
                    onClick={() => setChatBoxOpen(true)}
                />
            </Hint>
            <ChatInput open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} boardId={boardId}/>
        </div>

    );
}

export const ChatButtonSkeleton = () => {
    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"/>
    );
};
