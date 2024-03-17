"use client";

import {Color} from "@/types/canvas";
import {colorToCss} from "@/lib/utils";
import {Hint} from "@/components/hint";
import {ChromePicker} from 'react-color'

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
                                onChange,
                            }: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >

            <ColorButton color={{r: 243, g: 82, b: 35}} onClick={onChange} colorName="Red"/>
            <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} colorName="Light Yellow" />
            <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} colorName="Green" />
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} colorName="Blue" />
            <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} colorName="Purple" />
            <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} colorName="Orange" />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} colorName="Black" />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} colorName="White" />
            {/*<ColorButton color={{ r: 245, g: 246, b: 248 }} colorName={"Gray"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 255, g: 249, b: 177 }} colorName={"Light Yellow"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 245, g: 209, b: 40 }} colorName={"Yellow"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 255, g: 157, b: 72 }} colorName={"Orange"} onClick={onChange} />*/}

            {/*<ColorButton color={{ r: 201, g: 223, b: 86 }} colorName={"Green"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 240, g: 147, b: 157 }} colorName={"Red"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 147, g: 210, b: 117 }} colorName={"Dark Green"} onClick={onChange} />*/}
            {/*<ColorButton color={{ r: 0, g: 0, b: 0 }} colorName={"Black"} onClick={onChange} />*/}



        </div>
    )
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
    colorName?: string;
};

const ColorButton = ({
                         onClick,
                         color,
                         colorName
                     }: ColorButtonProps) => {
    return (
        <Hint label={colorName || "Color"} side="bottom" align="center" sideOffset={12}>
            <button
                className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
                onClick={() => onClick(color)}
            >
                <div
                    className="h-8 w-8 rounded-md border border-neutral-300"
                    style={{background: colorToCss(color)}}
                />
            </button>
        </Hint>
    )
}