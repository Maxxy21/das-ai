import {useSelf, useMutation} from "@/liveblocks.config";
import {dasIndex} from "@/lib/db/pinecone";

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useMutation(async (
        {storage, setMyPresence}
    ) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        for (const id of selection) {
            liveLayers.delete(id);
            console.log("id", id);
            await dasIndex.deleteOne(id);

            const index = liveLayerIds.indexOf(id);

            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }

        setMyPresence({selection: []}, {addToHistory: true});
    }, [selection]);
};
