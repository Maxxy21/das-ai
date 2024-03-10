import {cn} from "@/lib/utils";
import {useUser} from "@clerk/nextjs";
import {useEffect, useRef, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Poppins} from "next/font/google";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import useStoreUserEffect from "@/hooks/use-store-user-effect";
import {Textarea} from "@/components/ui/textarea";
import {SendHorizonal, Trash2, X} from "lucide-react";

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

    const NAME = user?.fullName || "Anonymous";

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
                "fixed bottom-2 right-2 h-[873px] w-[330px] bg-white rounded-md p-3 flex flex-col shadow-md",
                open ? "block" : "hidden",
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
                <div className="flex-1 p-2 space-y-2 w-1/3" style={{maxHeight: 'calc(873px - 150px)'}}>
                    {messages?.map((message) => (
                        <article
                            key={message._id}
                            className={`p-2 text-xs rounded-lg shadow 
                            ${message.author === 'DAS' ? "bg-green-100 text-green-800"
                                : message.author === NAME ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                            <div className="font-medium">{message.author}</div>
                            <p className="mt-1">
                                {message.body}
                            </p>
                        </article>
                    ))}
                </div>
            </ScrollArea>


            {/* Input form */}
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await sendMessage({body: newMessageText, author: NAME});
                    setNewMessageText("");
                }}
                className="flex items-center p-2"
            >
                <textarea
                    rows={2}
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Say something..."
                    className="flex-grow bg-white-100 p-4 text-sm rounded-lg bottom-0.5 border border-gray-300 focus:outline-blue-500 resize-none shadow"
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
    );
}