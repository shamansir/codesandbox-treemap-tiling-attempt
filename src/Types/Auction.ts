import type { Shape } from './Shape';

export interface PresentedLot {
  id: string;
  label: string;
  shape : Shape;
  minPrice: number;
}

export interface Lot extends PresentedLot {
  currentPrice: number;
  ownerId: string | null;
}

export interface Bid {
  lotId: string;
  accountId: string;
  amount: number;
}

export interface LotListing extends Lot {
  ownerName: string | null;
  totalBids: number;
  highestBid: number;
  currentUserBid: number;
  hasBid: boolean;
  isAvailable: boolean;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

