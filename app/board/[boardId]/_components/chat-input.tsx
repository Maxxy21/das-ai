import {cn} from "@/lib/utils";
import {useUser} from "@clerk/nextjs";
import {useEffect, useRef, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Poppins} from "next/font/google";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {SendHorizonal, Trash2, X} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});


interface ChatInputProps {
    open: boolean;
    boardId: string;
    onClose: () => void;
}

export default function ChatInput({open, onClose, boardId}: ChatInputProps) {

    const {user} = useUser()

    const NAME = user?.firstName || "Anonymous";

    const messages = useQuery(api.messages.list);
    const sendMessage = useMutation(api.messages.send);
    const [newMessageText, setNewMessageText] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
        }, 0);
    }, [messages]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);


    return (
        <div
            className={cn(
                "fixed bottom-2 right-2 transition-transform transform duration-300",
                open ? "translate-y-0" : "translate-y-[calc(100%+2rem)]", // This moves the chat box completely out of view
                "w-[330px] bg-white rounded-md p-3 flex flex-col shadow-md overflow-hidden",
                open ? "h-[873px]" : "h-0",
            )}
        >
            <div className='flex justify-between p-3 border-b'>
                <h1 className="font-semibold text-xl text-black">
                    DAS
                </h1>
                <div className='flex space-x-2'>
                    <button

                    >
                        <Trash2 size={23}/>
                    </button>
                    <button
                        onClick={onClose}
                    >
                        <X size={25}/>
                    </button>
                </div>
            </div>


            <ScrollArea>
                <div className="flex-1 p-2 space-y-2 w-full" style={{maxHeight: 'calc(873px - 150px)'}}>
                    {messages?.map((message) => (
                        <article
                            key={message._id}
                            className={`flex ${message.author === NAME ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-2 text-xs rounded-lg shadow max-w-xs 
                                ${message.author === 'DAS' ? "bg-green-100 text-green-800"
                                    : message.author === NAME ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"}`}
                            >
                                <div className="font-medium">{message.author}</div>
                                <p className="mt-1 break-words">
                                    {message.body}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </ScrollArea>


            {/* Input form */}
            <div className="p-2 bottom-0 absolute w-[315px]">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await sendMessage({body: newMessageText, author: NAME, boardId});
                        setNewMessageText("");
                    }}
                    className="flex items-center"
                >
                    <Textarea
                        rows={2}
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-grow bg-gray-100 p-4 text-sm rounded-lg border border-bg-gray-500
                        focus:outline-none resize-none shadow"
                        style={{minHeight: '40px'}}
                    />
                    <button
                        type="submit"
                        disabled={!newMessageText}
                        className="ml-2 bg-blue-500 p-2 text-white rounded-full shadow flex items-center justify-center"
                    >
                        <SendHorizonal size={20}/>
                    </button>
                </form>
            </div>
        </div>
    );
}