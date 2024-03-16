"use client";

import {Plus, Minus, RotateCcw} from "lucide-react";
import {Hint} from "@/components/hint";


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
                <button
                    onClick={zoomOut}
                    className="p-2 rounded hover:bg-[#d8dffe] focus:outline-none "
                >
                    <Minus className="h-4 w-4"/>
                </button>
            </Hint>

            <Hint label="Zoom to 100%" side="top" sideOffset={12}>
                <button
                    onClick={resetZoom}
                    className="p-2 rounded hover:bg-[#d8dffe] focus:outline-none">
                    <span className="text-sm font-semibold">{`${scalePercentage}%`}</span>
                </button>
            </Hint>
            <Hint label="Zoom In" side={"top"} sideOffset={12}>
                <button
                    onClick={zoomIn}
                    className="p-2 rounded hover:bg-[#d8dffe] focus:outline-none"
                >
                    <Plus className="h-4 w-4"/>
                </button>
            </Hint>
        </div>
    );
};

export const ZoomButtonsSkeleton = () => {
    return (
        <div
            className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md"
        />
    );
};
