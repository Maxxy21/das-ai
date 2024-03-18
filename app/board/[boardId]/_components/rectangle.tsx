import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={2}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};

//Thicker bo
// export const Rectangle = ({
//                             id,
//                             layer,
//                             onPointerDown,
//                             selectionColor,
//                           }: RectangleProps) => {
//   const { x, y, width, height, fill } = layer;
//
//   return (
//       <rect
//           className="shadow-md" // Apply a drop shadow filter if necessary
//           onPointerDown={(e) => onPointerDown(e, id)}
//           style={{
//             transform: `translate(${x}px, ${y}px)`,
//           }}
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           strokeWidth={1} // Make the border a bit thicker for visibility
//           fill={fill ? colorToCss(fill) : "#000"}// Set fill to none for a transparent center
//           stroke={selectionColor || "#000"} // Set the default stroke color to black or selection color
//       />
//   );
// };