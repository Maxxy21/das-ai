"use client";
import Image from 'next/image';
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import ChatBox from "./chat-box";

export const ChatButton = () => {
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
            <ChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)}/>
        </div>
    );
}

export const ChatButtonSkeleton = () => {
    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"/>
    );
};
