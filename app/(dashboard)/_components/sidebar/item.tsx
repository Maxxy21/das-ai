"use client";

import Image from "next/image";
import {useOrganization, useOrganizationList} from "@clerk/nextjs";
import {cn} from "@/lib/utils";
import {Hint} from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export const Item = ({id, name, imageUrl}: ItemProps) => {
    const {organization} = useOrganization();
    const {setActive} = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!isActive) return;

        setActive({organization: id});
    };

    return (
        <div className="aspect-square relative">
            <Hint
                label={name}
                sideOffset={18}
                side="right"
                align="start"
            >
                <Image
                    src={imageUrl}
                    onClick={onClick}
                    alt={name}
                    fill
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    );
};