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
            const index = liveLayerIds.indexOf(id);
            try {
                const response = await fetch('/api/delete-layer', {
                    method: 'DELETE',
                    body: JSON.stringify(
                        {
                            id: id,
                        })
                })
                if (!response.ok) throw Error("Status code: " + response.status);

            } catch (e) {
                console.error(e)
            }

            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }

        setMyPresence({selection: []}, {addToHistory: true});
    }, [selection]);
};