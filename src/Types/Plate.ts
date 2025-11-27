import { LotListing } from './Auction';
import { Shape } from './Shape';

export type Plate = {
  id: string;
  label: string;
  shape : Shape;
  currentValue: number;
  enabled: boolean;
  lines : string[];
  // ownerId: string | null;
  // ownerName: string | null;
};

export function lotListingToPlate(lot : LotListing): Plate {
  return {
    id: lot.id,
    label: lot.label,
    currentValue: lot.currentPrice,
    shape : lot.shape,
    enabled: lot.ownerId !== null,
    lines: lot.ownerName !== null
      ? [ `Owner: ${lot.ownerName}` ]
      : []
  };
}