import {useSelf, useMutation, useStorage} from "@/liveblocks.config";

export const useSelectAllLayers = () => {
    return useMutation(
        ({storage, setMyPresence}) => {
            const liveLayerIds = storage.get("layerIds").toArray();
            setMyPresence({selection: liveLayerIds}, {addToHistory: true});
        },
        [] // The dependency array is empty to keep the mutation callback stable
    );
};

