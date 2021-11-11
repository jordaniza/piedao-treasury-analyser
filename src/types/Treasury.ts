export interface AssetEntity {
  network: string;
  protocol: string;
  assets: number;
  debt: number;
  total: number;
};

export interface TreasuryEntity {
  _id: string;
  treasury: number;
  underlying_assets: AssetEntity[];
  createdAt: string;
  updatedAt: string;
};