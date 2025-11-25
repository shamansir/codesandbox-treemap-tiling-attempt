// TreemapView.tsx
import React from "react";
// import type { ShapeWithBid } from "./types";
import { treeMap } from "../TreeMap/TreeMap";
import * as TreeMap from "../TreeMap/TreeMap";

export type Plate = {
  id: string;
  label: string;
  value: number;
};

export type Props = {
  sources: Plate[];
};

export const TreeMapView: React.FC<Props> = ({ sources }) => {
  const positioned = treeMap(sources, (p) => p.value, {
    width: 800,
    height: 400,
    direction: "horizontal",
    padding: 2,
    minValue: 0.01,
  });

  return (
    <div>
      <h2>Auction Treemap (by current price)</h2>
      <div
        style={{
          position: "relative",
          width: 800,
          height: 400,
          border: "1px solid #333",
        }}
      >
        {positioned.map(({ rect, source }) => (
          <TreeMapPlate rect={rect} source={source} />
        ))}
      </div>
    </div>
  );
};

const TreeMapPlate: React.FC<TreeMap.Positioned<Plate>> = ({
  rect,
  source,
}) => {
  return (
    <div
      key={source.id}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        border: "1px solid #000",
        boxSizing: "border-box",
        fontSize: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: valueToColor(source.value), // or some mapping
      }}
    >
      <div>{source.label}</div>
      <div>{source.value.toFixed(3)}</div>
    </div>
  );
};

/**
 * Generates an eye-friendly hex color for a value in range [0.0, 1.0]
 * - 0.0 → dark red (like stock losses)
 * - 0.5 → yellow/orange (neutral)
 * - 1.0 → bright green (like stock gains)
 */
export function valueToColor(value: number): string {
  // Clamp value between 0 and 1
  const clamped = Math.max(0, Math.min(1, value));

  let r: number, g: number, b: number;

  if (clamped < 0.5) {
    // Dark red to yellow (0.0 to 0.5)
    const t = clamped * 2; // Scale to [0, 1]
    r = Math.round(139 + (255 - 139) * t); // 139 (dark red) → 255
    g = Math.round(0 + 200 * t); // 0 → 200 (yellow-ish)
    b = 0;
  } else {
    // Yellow to bright green (0.5 to 1.0)
    const t = (clamped - 0.5) * 2; // Scale to [0, 1]
    r = Math.round(255 - 255 * t); // 255 → 0
    g = Math.round(200 + (220 - 200) * t); // 200 → 220 (bright green)
    b = Math.round(0 + 50 * t); // Add slight blue for vibrancy
  }

  // Convert to hex
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
