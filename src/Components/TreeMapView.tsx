// TreemapView.tsx
import React from "react";
// import type { ShapeWithBid } from "./types";
import { treeMap, Source } from "../TreeMap/TreeMap";

export interface Props {
  sources: Source[];
}

export const TreeMapView: React.FC<Props> = ({ sources }) => {
  const positioned = treeMap(sources, {
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
        {positioned.map(({ rect, source }) => {
          return (
            <div
              key={source.id}
              style={{
                position: "absolute",
                left: rect.x,
                top: rect.y,
                width: rect.width,
                height: rect.height,
                border: "1px solid #fff",
                boxSizing: "border-box",
                fontSize: 10,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // background: shape.color, // or some mapping
              }}
            >
              <div>{source.label}</div>
              <div>{source.value.toFixed(3)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
