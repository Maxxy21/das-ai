"use client";

import {Plus, Minus, RotateCcw} from "lucide-react";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";


interface ZoomButtonsProps {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    scale: number;
}


export const ZoomButtons = ({
                                zoomIn,
                                zoomOut,
                                resetZoom,
                                scale
                            }: ZoomButtonsProps) => {
    const scalePercentage = Math.round(scale * 100);
    return (
        <div
            className="absolute right-[70px] bottom-2 bg-white rounded-md space-x-1 p-1 h-12 flex items-center shadow-md">
            <Hint label="Zoom Out" side="top" sideOffset={12}>
                <Button
                    onClick={zoomOut}
                    variant="board"
                    className="px-2"
                >
                    <Minus className="h-5 w-5"/>
                </Button>
            </Hint>

            <Hint label="Zoom to 100%" side="top" sideOffset={12}>
                <Button
                    onClick={resetZoom}
                    variant="board"
                    className="px-2">
                    <span className="text-sm font-semibold">{`${scalePercentage}%`}</span>
                </Button>
            </Hint>
            <Hint label="Zoom In" side={"top"} sideOffset={12}>
                <Button
                    variant="board"
                    onClick={zoomIn}
                    className="p-2 rounded hover:bg-[#d8dffe] focus:outline-none"
                >
                    <Plus className="h-5 w-5"/>
                </Button>
            </Hint>
        </div>
    );
};

export const ZoomButtonsSkeleton = () => {
    return (
        <div
            className="absolute right-[70px] bottom-2 bg-white rounded-md space-x-1 p-1 h-12 flex items-center shadow-md w-[130px]"
        />
    );
};
