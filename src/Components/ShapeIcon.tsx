import React from 'react';
import { ShapeType } from '../Types/Shape';

interface ShapeIconProps {
  shape: ShapeType;
  color: string;
  size?: number;
}

export const ShapeIcon: React.FC<ShapeIconProps> = ({ shape, color, size = 40 }) => {
  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return <circle cx="50" cy="50" r="45" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
      case 'square':
        return <rect x="10" y="10" width="80" height="80" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
      case 'triangle':
        return <polygon points="50,5 95,90 5,90" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
      case 'hexagon':
        return <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
      case 'star':
        return (
          <polygon
            points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
            fill={color}
            strokeWidth={3}
            stroke="black"
            stroke-linejoin="round"
          />
        );
      case 'diamond':
        return <polygon points="50,5 95,50 50,95 5,50" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
      default:
        return <circle cx="50" cy="50" r="45" fill={color} strokeWidth={3} stroke="black" stroke-linejoin="round" />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {renderShape()}
    </svg>
  );
};