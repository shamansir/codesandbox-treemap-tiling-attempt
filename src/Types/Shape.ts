export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'diamond';

export type Shape = {
    type: ShapeType;
    color: string;
}

export const SHAPE_COLORS = [
    '#FF6B6B', // red
    '#4ECDC4', // teal
    '#45B7D1', // blue
    '#96CEB4', // green
    '#FFEAA7', // yellow
    '#DDA0DD', // plum
    '#98D8C8', // mint
    '#F7DC6F', // gold
];

export const SHAPES: ShapeType[] = ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond'];