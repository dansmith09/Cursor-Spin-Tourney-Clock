export interface Player {
  id: string;
  name: string;
}

export type Prize = '$40' | '$100' | '$500' | '$1000' | 'JACKPOT';

export interface BlindLevel {
  level: number;
  smallBlind: number;
  bigBlind: number;
  ante?: number;
}

export interface GameState {
  players: Player[];
  selectedPrize: Prize | null;
  currentBlindLevel: number;
  gameStarted: boolean;
} 