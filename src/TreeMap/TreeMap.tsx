// treeMap.ts

export type Direction = "horizontal" | "vertical";

export interface Source {
  id: string;
  label: string;
  value: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Positioned {
  source: Source;
  rect: Rect;
}

export type Options = {
  width: number;
  height: number;
  direction?: Direction;
  padding?: number; // inner padding for each rect
  minValue?: number; // ignore very small / zero values
};

export type DefinedOptions = {
  width: number;
  height: number;
  direction: Direction;
  padding: number; // inner padding for each rect
  minValue: number; // ignore very small / zero values
};

/**
 * Simple slice-and-dice treemap layout.
 *
 * - Accepts items with id / label / value
 * - Returns rectangles in [0,width]x[0,height]
 * - `direction` controls first split (then alternates)
 */
export function treeMap(
  items: Source[],
  partialOptions: Options
): Positioned[] {
  const options: DefinedOptions = {
    ...partialOptions,
    direction: partialOptions.direction || "horizontal",
    padding: partialOptions.padding ?? 0,
    minValue: partialOptions.minValue ?? 0,
  };
  const filtered = items.filter((it) => it.value > options.minValue);
  const total = filtered.reduce((sum, it) => sum + it.value, 0);

  if (filtered.length === 0 || total <= 0) {
    return [];
  }

  // Sort by value descending for nicer layout
  const sorted = [...filtered].sort((a, b) => b.value - a.value);

  const rects: Positioned[] = [];

  layoutSliceAndDice(
    sorted,
    0,
    0,
    options.width,
    options.height,
    options.direction,
    total,
    options.padding,
    rects
  );

  return rects;
}

function layoutSliceAndDice(
  items: Source[],
  x: number,
  y: number,
  width: number,
  height: number,
  direction: Direction,
  totalValue: number,
  padding: number,
  output: Positioned[]
) {
  if (items.length === 0 || width <= 0 || height <= 0) return;

  if (items.length === 1) {
    const source = items[0];
    const rect = applyPadding(
      {
        x,
        y,
        width,
        height,
      },
      padding
    );
    output.push({ source, rect });
    return;
  }

  // Slice entire region into strips in current direction.
  let offset = direction === "horizontal" ? x : y;
  const isHorizontal = direction === "horizontal";

  for (const source of items) {
    const ratio = source.value / totalValue;

    if (isHorizontal) {
      const w = width * ratio;
      const rect = applyPadding(
        {
          x: offset,
          y,
          width: w,
          height,
        },
        padding
      );
      output.push({ source, rect });
      offset += w;
    } else {
      const h = height * ratio;
      const rect = applyPadding({ x, y: offset, width, height: h }, padding);
      output.push({ source, rect });
      offset += h;
    }
  }

  // NOTE:
  // This version is a pure slice-and-dice (no deeper recursion).
  // Still a valid treemap; easy to understand & explain in interview.
}

function applyPadding(rect: Rect, padding: number): Rect {
  const x = rect.x + padding;
  const y = rect.y + padding;
  const width = Math.max(0, rect.width - padding * 2);
  const height = Math.max(0, rect.height - padding * 2);

  return { x, y, width, height };
}
