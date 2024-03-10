import {cn} from "@/lib/utils";
import {useUser} from "@clerk/nextjs";
import {Message} from "ai";
import {useChat} from "ai/react";
import {Bot, Trash2, X} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef} from "react";
import {Input} from "@/components/ui/input";
import {Poppins} from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});


interface ChatBoxProps {
    open: boolean;
    boardId: string;
    onClose: () => void;
}

export default function ChatBox({open, onClose, boardId}: ChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error,
    } = useChat({
        body: {boardId},
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

    return (
        <div
            className={cn(
                "absolute h-[873px] w-[330px] bottom-2 right-2 bg-white rounded-md p-3 flex flex-col justify-between shadow-md",
                open ? "fixed" : "hidden",
            )}
        >
            <div className='w-full flex justify-between'>
                <h1 className={cn(
                    "font-semibold text-2xl ml-2 text-black",
                    font.className,
                )}>
                    DAS
                </h1>
                <div className='flex'>

                    <button
                        className="mb-1 ms-auto block"
                        onClick={() => setMessages([])}
                    >
                        <Trash2/>
                    </button>
                    <button
                        onClick={onClose}
                        className="mb-1 ms-auto block"
                    >
                        <X/>
                    </button>

                </div>
            </div>
            <div className="flex flex-col h-[800px]">
                <div className="flex-grow overflow-y-auto px-3 my-3" ref={scrollRef}>
                    {messages.map((message) => (
                        <ChatMessage message={message} key={message.id}/>
                    ))}
                    {isLoading && lastMessageIsUser && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "Thinking...",
                            }}
                        />
                    )}
                    {error && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "Something went wrong. Please try again.",
                            }}
                        />
                    )}
                    {!error && messages.length === 0 && (
                        <div className="flex h-full items-center justify-center gap-3">
                            <Bot/>
                            Ask the bot a question to get started
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <form onSubmit={handleSubmit} className="flex gap-1">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Say something..."
                            ref={inputRef}
                            className="flex-grow rounded-full p-2 border-2 border-gray-300"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

function ChatMessage({
                         message: {role, content},
                     }: {
    message: Pick<Message, "role" | "content">;
}) {
    const {user} = useUser();

    const isAiMessage = role === "assistant";
    const imageSize = 24; // Smaller image size in pixels

    return (
        <div
            className={cn(
                "mb-3 flex items-center",
                isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
            )}
        >
            {isAiMessage && <Bot className="mr-2 shrink-0"/>}
            <p
                className={cn(
                    "text-sm whitespace-pre-line rounded-md border px-1 py-1",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
                )}
            >
                {content}
            </p>
            {!isAiMessage && user?.imageUrl && (
                <Image
                    src={user.imageUrl}
                    alt="User image"
                    width={imageSize}
                    height={imageSize}
                    className="ml-2 rounded-full object-cover"
                    style={{width: imageSize, height: imageSize}} // Inline styles for size
                />
            )}
        </div>
    );
}
