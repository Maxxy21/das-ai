import {Kalam} from "next/font/google";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";

import {NoteLayer} from "@/types/canvas";
import {cn, colorToCss, getContrastingTextColor} from "@/lib/utils";
import {useMutation} from "@/liveblocks.config";
import {getEmbedding} from "@/lib/openai";
import {dasIndex} from "@/lib/db/pinecone";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(
        fontSizeBasedOnHeight,
        fontSizeBasedOnWidth,
        maxFontSize
    );
}

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    boardId: string;
};

export const Note = ({
                         layer,
                         onPointerDown,
                         id,
                         selectionColor,
                         boardId
                     }: NoteProps) => {
    const {x, y, width, height, fill, value} = layer;

    const updateValue = useMutation(async (
        {storage},
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);

        const embedding = await getEmbedding(newValue)

        await dasIndex.upsert([
            {
                id: id,
                values: embedding,
                metadata: {boardId: boardId},
            },
        ]);

    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };




    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                backgroundColor: fill ? colorToCss(fill) : "#000",
            }}
            className="shadow-md drop-shadow-xl"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? getContrastingTextColor(fill) : "#000",
                }}
            />
        </foreignObject>
    );
};
