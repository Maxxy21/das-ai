"use client";

import {ReactNode} from "react";
import {ClientSideSuspense} from "@liveblocks/react";

import {RawLayerData} from "@/types/canvas";
import {RoomProvider} from "@/liveblocks.config";
import {rawLayers} from "@/templates/lean-canvas";
import {convertRawLayers} from "@/lib/utils";


interface RoomProps {
    children: ReactNode
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
}

export const Room = ({
                         children,
                         roomId,
                         fallback,
                     }: RoomProps) => {

    const {layerIds, layers} = convertRawLayers(rawLayers as RawLayerData);
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
                selection: [],
                pencilDraft: null,
                penColor: null,
            }}
            initialStorage={{
                layers: layers,
                layerIds: layerIds,
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
};
