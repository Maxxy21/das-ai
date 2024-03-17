"use client";
import Image from 'next/image';
import {Hint} from "@/components/hint";
import ChatInput from "@/app/board/[boardId]/_components/chat-input";
import {Button} from "@/components/ui/button";


interface ChatButtonProps {
    boardId: string;
    isChatOpen: boolean;
    setChatOpen: (open: boolean) => void;
}

export const ChatButton = ({boardId, setChatOpen, isChatOpen}: ChatButtonProps) => {


    return (

            <Hint label="Explore how AI can help you" side="top" sideOffset={12}>
                <Button
                    variant="board"
                    onClick={() => setChatOpen(!isChatOpen)}
                    className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"
                >
                    <div>
                        <Image
                            src="/chat-icon.svg"
                            alt="Board logo"
                            height={32}
                            width={32}
                        />
                        <ChatInput open={isChatOpen} onClose={() => setChatOpen(false)} boardId={boardId}/>
                    </div>

                </Button>
            </Hint>

    )
        ;
}

export const ChatButtonSkeleton = () => {
    return (
        <div className="absolute h-12 bottom-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[50px]"/>
    );
};
